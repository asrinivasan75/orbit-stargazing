import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

const SPHERE_RADIUS = 100;

// Convert RA/Dec (degrees) to 3D position on a celestial sphere
function celestialToCartesian(ra, dec, radius = SPHERE_RADIUS) {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.cos(decRad) * Math.cos(raRad),
    radius * Math.sin(decRad),
    radius * Math.cos(decRad) * Math.sin(raRad)
  );
}

// Map magnitude to visual size
function magToSize(mag) {
  const clamped = Math.max(-1.5, Math.min(mag, 6));
  return THREE.MathUtils.lerp(14, 2, (clamped + 1.5) / 7.5);
}

/* ═══════════════════════════════════════════
   STAR POINTS — custom shader with glow
   ═══════════════════════════════════════════ */
export function StarPoints({ stars, onStarClick }) {
  const meshRef = useRef();
  const { camera, pointer } = useThree();

  const { positions, colors, sizes, starMap } = useMemo(() => {
    const pos = new Float32Array(stars.length * 3);
    const col = new Float32Array(stars.length * 3);
    const siz = new Float32Array(stars.length);
    const map = [];
    const tmpColor = new THREE.Color();

    stars.forEach((star, i) => {
      const vec = celestialToCartesian(star.ra, star.dec);
      pos[i * 3] = vec.x;
      pos[i * 3 + 1] = vec.y;
      pos[i * 3 + 2] = vec.z;

      tmpColor.set(star.color || "#ffffff");
      col[i * 3] = tmpColor.r;
      col[i * 3 + 1] = tmpColor.g;
      col[i * 3 + 2] = tmpColor.b;

      siz[i] = magToSize(star.mag);
      map.push({ ...star, position: vec, index: i });
    });

    return { positions: pos, colors: col, sizes: siz, starMap: map };
  }, [stars]);

  // Twinkle
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const sizeAttr = meshRef.current.geometry.getAttribute("size");
    for (let i = 0; i < stars.length; i++) {
      const base = magToSize(stars[i].mag);
      const twinkle =
        1 +
        0.18 * Math.sin(time * 1.8 + i * 2.1) +
        0.08 * Math.sin(time * 3.7 + i * 0.5);
      sizeAttr.array[i] = base * twinkle;
    }
    sizeAttr.needsUpdate = true;
  });

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      let closest = null;
      let closestDist = 0.06;

      starMap.forEach((star) => {
        const screenPos = star.position.clone().project(camera);
        const dx = screenPos.x - pointer.x;
        const dy = screenPos.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = star;
        }
      });

      if (closest && onStarClick) onStarClick(closest);
    },
    [starMap, camera, pointer, onStarClick]
  );

  return (
    <points ref={meshRef} onClick={handleClick}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={stars.length} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={stars.length} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={stars.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          varying float vSize;
          void main() {
            vColor = color;
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (800.0 / -mvPosition.z);
            gl_PointSize = max(gl_PointSize, 2.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vSize;
          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float d = length(uv);
            if (d > 0.5) discard;

            // 4-point diffraction spikes
            float spike = 0.0;
            float angle1 = abs(uv.x);
            float angle2 = abs(uv.y);
            spike += exp(-angle1 * 25.0) * exp(-d * 6.0) * 0.3;
            spike += exp(-angle2 * 25.0) * exp(-d * 6.0) * 0.3;

            // Core + glow layers
            float core = exp(-d * d * 80.0);
            float innerGlow = exp(-d * 8.0) * 0.6;
            float outerGlow = exp(-d * 3.0) * 0.2;
            float alpha = core + innerGlow + outerGlow + spike;

            // White-hot center, colored edges
            vec3 col = mix(vColor, vec3(1.0), core * 0.8 + innerGlow * 0.3);

            gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
          }
        `}
        transparent
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   BACKGROUND STARS — faint scatter
   ═══════════════════════════════════════════ */
export function BackgroundStars() {
  const count = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 190 + Math.random() * 10;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = max(650.0 / -mvPosition.z, 1.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = exp(-d * d * 20.0) * 0.4;
            gl_FragColor = vec4(0.6, 0.62, 0.72, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   NEBULA GLOW — subtle milky way band
   Uses shader for circular soft particles
   ═══════════════════════════════════════════ */
export function NebulaGlow() {
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const raBase = (266 + (Math.random() - 0.5) * 160) * (Math.PI / 180);
      const decBase = (-29 + (Math.random() - 0.5) * 22) * (Math.PI / 180);
      const r = SPHERE_RADIUS - 1 + Math.random() * 2;
      pos[i * 3] = -r * Math.cos(decBase) * Math.cos(raBase);
      pos[i * 3 + 1] = r * Math.sin(decBase);
      pos[i * 3 + 2] = r * Math.cos(decBase) * Math.sin(raBase);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 4000.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = exp(-d * d * 6.0) * 0.035;
            gl_FragColor = vec4(0.4, 0.38, 0.58, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   CONSTELLATION LINES — single instanced mesh
   One draw call for ALL lines
   ═══════════════════════════════════════════ */

export function ConstellationLines({ constellations, stars, activeConstellation }) {
  const meshRef = useRef();

  const { geometry, count } = useMemo(() => {
    const starById = {};
    stars.forEach((s) => { starById[s.id] = s; });

    const toRender = activeConstellation
      ? constellations.filter((c) => c.id === activeConstellation)
      : constellations;

    // Collect all line segments
    const segments = [];
    toRender.forEach((constellation) => {
      if (!constellation.lines) return;
      const isActive = activeConstellation === constellation.id;
      constellation.lines.forEach(([id1, id2]) => {
        const s1 = starById[id1];
        const s2 = starById[id2];
        if (s1 && s2) {
          segments.push({
            start: celestialToCartesian(s1.ra, s1.dec),
            end: celestialToCartesian(s2.ra, s2.dec),
            isActive,
          });
        }
      });
    });

    if (segments.length === 0) {
      return { geometry: null, count: 0 };
    }

    // Build merged geometry: each segment is a thin quad (2 triangles)
    const positions = new Float32Array(segments.length * 6 * 3); // 6 verts per quad
    const colors = new Float32Array(segments.length * 6 * 4); // rgba

    const up = new THREE.Vector3(0, 1, 0);
    const tmpDir = new THREE.Vector3();
    const tmpPerp = new THREE.Vector3();

    segments.forEach((seg, i) => {
      const thickness = seg.isActive ? 0.25 : 0.12;
      const color = seg.isActive
        ? [0.65, 0.55, 0.98, 0.6]
        : [0.4, 0.45, 0.67, 0.25];

      tmpDir.subVectors(seg.end, seg.start).normalize();
      // Get perpendicular direction for thickness
      tmpPerp.crossVectors(tmpDir, seg.start.clone().normalize()).normalize().multiplyScalar(thickness);

      const s = seg.start;
      const e = seg.end;

      // Quad vertices: s-perp, s+perp, e+perp, e+perp, e-perp, s-perp
      const base = i * 18;
      // Triangle 1
      positions[base]     = s.x - tmpPerp.x; positions[base+1]  = s.y - tmpPerp.y; positions[base+2]  = s.z - tmpPerp.z;
      positions[base+3]   = s.x + tmpPerp.x; positions[base+4]  = s.y + tmpPerp.y; positions[base+5]  = s.z + tmpPerp.z;
      positions[base+6]   = e.x + tmpPerp.x; positions[base+7]  = e.y + tmpPerp.y; positions[base+8]  = e.z + tmpPerp.z;
      // Triangle 2
      positions[base+9]   = e.x + tmpPerp.x; positions[base+10] = e.y + tmpPerp.y; positions[base+11] = e.z + tmpPerp.z;
      positions[base+12]  = e.x - tmpPerp.x; positions[base+13] = e.y - tmpPerp.y; positions[base+14] = e.z - tmpPerp.z;
      positions[base+15]  = s.x - tmpPerp.x; positions[base+16] = s.y - tmpPerp.y; positions[base+17] = s.z - tmpPerp.z;

      // Colors for all 6 verts
      const cBase = i * 24;
      for (let v = 0; v < 6; v++) {
        colors[cBase + v*4]   = color[0];
        colors[cBase + v*4+1] = color[1];
        colors[cBase + v*4+2] = color[2];
        colors[cBase + v*4+3] = color[3];
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));

    return { geometry: geo, count: segments.length };
  }, [constellations, stars, activeConstellation]);

  if (!geometry || count === 0) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={`
          attribute vec4 color;
          varying vec4 vColor;
          void main() {
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec4 vColor;
          void main() {
            gl_FragColor = vColor;
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export { celestialToCartesian };

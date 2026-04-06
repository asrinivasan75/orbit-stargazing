import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { StarPoints, BackgroundStars, ConstellationLines, NebulaGlow } from "./StarField";
import useStore from "../hooks/useStore";
import { useCallback, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* FOV zoom — telescope effect */
function FovZoom() {
  const { camera, gl } = useThree();
  const fovRef = useRef(65);

  useEffect(() => {
    const el = gl.domElement;
    const onWheel = (e) => {
      e.preventDefault();
      fovRef.current = Math.max(12, Math.min(90, fovRef.current + e.deltaY * 0.035));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl]);

  useFrame(() => {
    camera.fov += (fovRef.current - camera.fov) * 0.1;
    camera.updateProjectionMatrix();
  });

  return null;
}

/* Animate camera to look at a target RA/Dec */
function CameraNavigator({ controlsRef }) {
  const { camera } = useThree();
  const cameraTarget = useStore((s) => s.cameraTarget);
  const targetRef = useRef(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (cameraTarget) {
      // Convert RA/Dec to a point on the sphere the camera should look at
      const raRad = (cameraTarget.ra * Math.PI) / 180;
      const decRad = (cameraTarget.dec * Math.PI) / 180;
      const r = 100;
      targetRef.current = new THREE.Vector3(
        -r * Math.cos(decRad) * Math.cos(raRad),
        r * Math.sin(decRad),
        r * Math.cos(decRad) * Math.sin(raRad)
      );
      animatingRef.current = true;
    }
  }, [cameraTarget]);

  useFrame(() => {
    if (!animatingRef.current || !targetRef.current || !controlsRef.current) return;

    const controls = controlsRef.current;
    const target = targetRef.current;

    // Smoothly interpolate the OrbitControls target toward the constellation
    controls.target.lerp(target, 0.04);
    controls.update();

    // Stop animating when close enough
    if (controls.target.distanceTo(target) < 0.5) {
      animatingRef.current = false;
    }
  });

  return null;
}

export default function SkyScene() {
  const stars = useStore((s) => s.stars);
  const constellations = useStore((s) => s.constellations);
  const selectedConstellation = useStore((s) => s.selectedConstellation);
  const setSelectedStar = useStore((s) => s.setSelectedStar);
  const controlsRef = useRef();

  const handleStarClick = useCallback(
    (star) => setSelectedStar(star),
    [setSelectedStar]
  );

  return (
    <div className="sky-canvas" data-lenis-prevent>
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "#000" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 0.01]} fov={65} near={0.01} far={500} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={-0.35}
          dampingFactor={0.05}
          enableDamping
        />
        <FovZoom />
        <CameraNavigator controlsRef={controlsRef} />

        <NebulaGlow />
        <BackgroundStars />

        {stars.length > 0 && (
          <StarPoints stars={stars} onStarClick={handleStarClick} />
        )}

        {constellations.length > 0 && (
          <ConstellationLines
            constellations={constellations}
            stars={stars}
            activeConstellation={selectedConstellation?.id || null}
          />
        )}
      </Canvas>
    </div>
  );
}

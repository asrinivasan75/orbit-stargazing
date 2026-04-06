import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export default function useLenis() {
  const location = useLocation();

  useEffect(() => {
    // Don't use smooth scroll on the sky page — it intercepts wheel events
    if (location.pathname === "/sky") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);
}

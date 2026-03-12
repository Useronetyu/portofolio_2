import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .card-tilt, .glass-hover")) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: hovering
            ? "hsl(270 60% 55%)"
            : "hsl(217 100% 60%)",
          boxShadow: hovering
            ? "0 0 16px hsl(270 60% 55% / 0.8), 0 0 40px hsl(270 60% 55% / 0.4)"
            : "0 0 12px hsl(217 100% 60% / 0.8), 0 0 30px hsl(217 100% 60% / 0.3)",
          transition: "background 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{
          width: hovering ? 50 : 40,
          height: hovering ? 50 : 40,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "hsl(270 60% 55% / 0.6)" : "hsl(217 100% 60% / 0.4)"}`,
          transition: "width 0.3s, height 0.3s, border-color 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;

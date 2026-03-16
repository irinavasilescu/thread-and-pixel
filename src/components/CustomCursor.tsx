import { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const addHover = useCallback(() => setHovering(true), []);
  const removeHover = useCallback(() => setHovering(false), []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const { x, y } = posRef.current;
          if (cursorRef.current) {
            cursorRef.current.style.left = x + "px";
            cursorRef.current.style.top = y + "px";
          }
          if (dotRef.current) {
            dotRef.current.style.left = x + "px";
            dotRef.current.style.top = y + "px";
          }
          rafRef.current = 0;
        });
      }
      if (!visible) setVisible(true);
    };

    const hide = () => setVisible(false);

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  // Attach hover listeners with proper cleanup via event delegation
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea");
      if (target) setHovering(true);
    };
    const handleOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea");
      if (target) setHovering(false);
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? "hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const move = (e: MouseEvent) => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const x = e.clientX + "px";
          const y = e.clientY + "px";
          cursor.style.left = x;
          cursor.style.top = y;
          dot.style.left = x;
          dot.style.top = y;
          cursor.style.opacity = "1";
          dot.style.opacity = "1";
          rafRef.current = 0;
        });
      }
    };

    const hide = () => {
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const handleOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select");
      if (target) cursor.classList.add("hovering");
    };
    const handleOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select");
      if (target) cursor.classList.remove("hovering");
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </>
  );
};

export default CustomCursor;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      if (!visible) setVisible(true);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    const hide = () => setVisible(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [visible]);

  // Re-attach interactive listeners on DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const addHover = () => setHovering(true);
      const removeHover = () => setHovering(false);
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Hide on touch devices
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

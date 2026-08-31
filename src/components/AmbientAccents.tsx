interface AmbientAccentsProps {
  /** Which corner-ish anchors the accents lean toward */
  variant?: "left" | "right" | "center";
  className?: string;
}

/**
 * 2–3 asymmetrical, out-of-focus glass accents placed near section margins.
 * Purely decorative, GPU-composited, no layout impact.
 */
const AmbientAccents = ({ variant = "left", className = "" }: AmbientAccentsProps) => {
  const layouts = {
    left: [
      "top-[12%] -left-24 w-[22rem] h-[22rem]",
      "bottom-[10%] left-[4%] w-36 h-36",
    ],
    right: [
      "top-[18%] -right-28 w-[26rem] h-[26rem]",
      "bottom-[14%] right-[5%] w-32 h-32",
    ],
    center: [
      "top-[6%] left-[8%] w-[18rem] h-[18rem]",
      "bottom-[8%] -right-20 w-[24rem] h-[24rem]",
    ],
  } as const;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute rounded-full blur-3xl animate-accent-drift ${layouts[variant][0]}`}
        style={{ background: "hsl(var(--primary) / 0.10)" }}
      />
      <div
        className={`absolute rounded-[2rem] rotate-12 backdrop-blur-md border border-border/40 animate-accent-drift ${layouts[variant][1]}`}
        style={{ background: "hsl(var(--foreground) / 0.02)", animationDelay: "-8s" }}
      />
    </div>
  );
};

export default AmbientAccents;

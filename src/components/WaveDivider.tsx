interface WaveDividerProps {
  fillColor?: string;
  flip?: boolean;
  className?: string;
}

const WaveDivider = ({
  fillColor = "hsl(var(--background))",
  flip = false,
  className = "",
}: WaveDividerProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] z-10 ${className}`}
      style={{
        transform: flip ? "rotate(180deg)" : undefined,
        marginTop: flip ? "-1px" : undefined,
        marginBottom: flip ? undefined : "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[120%] -ml-[10%] h-[60px] md:h-[80px] lg:h-[100px] block"
        preserveAspectRatio="none"
      >
        {/* Shadow wave */}
        <path
          className="animate-wave-slow"
          fill={fillColor}
          opacity={0.4}
          d="M0,90 C200,50 400,110 600,70 C800,30 1000,90 1200,60 C1320,40 1400,70 1440,90 L1440,120 L0,120 Z"
        />
        {/* Main wave */}
        <path
          className="animate-wave"
          fill={fillColor}
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;

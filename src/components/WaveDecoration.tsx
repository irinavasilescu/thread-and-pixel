interface WaveDecorationProps {
  color?: string;
  className?: string;
  opacity?: number;
}

const WaveDecoration = ({
  color = "hsl(var(--primary) / 0.08)",
  className = "",
  opacity = 1,
}: WaveDecorationProps) => {
  return (
    <div className={`absolute pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 600 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          className="animate-wave-deco"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          d="M0,100 C100,150 200,50 300,100 C400,150 500,50 600,100"
        />
        <path
          className="animate-wave-deco-alt"
          stroke={color}
          strokeWidth="1"
          fill="none"
          d="M0,110 C100,60 200,140 300,90 C400,40 500,140 600,110"
        />
      </svg>
    </div>
  );
};

export default WaveDecoration;

import { motion } from "framer-motion";

interface WaveDividerProps {
  fillColor?: string;
  flip?: boolean;
  className?: string;
  speed?: number;
}

const WaveDivider = ({
  fillColor = "hsl(var(--background))",
  flip = false,
  className = "",
  speed = 8,
}: WaveDividerProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] z-10 ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined, marginTop: flip ? "-1px" : undefined, marginBottom: flip ? undefined : "-1px" }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[60px] md:h-[80px] lg:h-[100px] block"
        preserveAspectRatio="none"
      >
        {/* Shadow wave behind — subtle depth */}
        <motion.path
          fill={fillColor}
          opacity={0.4}
          animate={{
            d: [
              "M0,90 C200,50 400,110 600,70 C800,30 1000,90 1200,60 C1320,40 1400,70 1440,90 L1440,120 L0,120 Z",
              "M0,70 C200,100 400,40 600,80 C800,110 1000,50 1200,80 C1320,100 1400,60 1440,70 L1440,120 L0,120 Z",
              "M0,85 C200,60 400,100 600,55 C800,40 1000,95 1200,70 C1320,50 1400,85 1440,85 L1440,120 L0,120 Z",
              "M0,90 C200,50 400,110 600,70 C800,30 1000,90 1200,60 C1320,40 1400,70 1440,90 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: speed * 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Main wave */}
        <motion.path
          fill={fillColor}
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,80 C240,20 480,100 720,40 C960,0 1200,100 1440,80 L1440,120 L0,120 Z",
              "M0,40 C240,100 480,20 720,80 C960,120 1200,20 1440,40 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;

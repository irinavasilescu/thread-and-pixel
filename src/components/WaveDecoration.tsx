import { motion } from "framer-motion";

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
        <motion.path
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              "M0,100 C100,150 200,50 300,100 C400,150 500,50 600,100",
              "M0,120 C100,60 200,140 300,80 C400,40 500,140 600,120",
              "M0,80 C100,140 200,60 300,120 C400,160 500,60 600,80",
              "M0,100 C100,150 200,50 300,100 C400,150 500,50 600,100",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          stroke={color}
          strokeWidth="1"
          fill="none"
          animate={{
            d: [
              "M0,110 C100,60 200,140 300,90 C400,40 500,140 600,110",
              "M0,90 C100,140 200,60 300,110 C400,160 500,60 600,90",
              "M0,130 C100,70 200,120 300,70 C400,30 500,130 600,130",
              "M0,110 C100,60 200,140 300,90 C400,40 500,140 600,110",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default WaveDecoration;

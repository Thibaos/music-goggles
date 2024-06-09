"use client";

import { motion } from "framer-motion";
import {
  memo,
  useEffect,
  useId,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { cn } from "~/lib/utils";

function getPos(
  width: number,
  height: number,
  dimensions: { width: number; height: number },
) {
  return {
    x: Math.floor((Math.random() * dimensions.width) / width),
    y: Math.floor((Math.random() * dimensions.height) / height),
  };
}

// Adjust the generateSquares function to return objects with an id, x, and y
function generateSquares(
  count: number,
  width: number,
  height: number,
  dimensions: { width: number; height: number },
) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: getPos(width, height, dimensions),
  }));
}

interface GridPatternProps {
  width?: number;
  height?: number;
  numSquares?: number;
  className?: string;
  duration?: number;
}

interface SquaresProps {
  width: number;
  height: number;
  numSquares: number;
  duration: number;
  containerRef: MutableRefObject<null>;
}

function Squares({
  width,
  height,
  numSquares,
  duration,
  containerRef,
}: SquaresProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() =>
    generateSquares(numSquares, width, height, dimensions),
  );

  const imagesNumber = 1;
  const getRandomImage = () => {
    return `/${Math.floor(Math.random() * imagesNumber) + 1}.jpg`;
  };

  // Function to update a single square's position
  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(width, height, dimensions),
            }
          : sq,
      ),
    );
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares, width, height, dimensions));
    }
  }, [dimensions, numSquares, width, height]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current]);

  return squares.map(({ pos: { x, y }, id }, index) => (
    <motion.image
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        repeat: 1,
        delay: index * 0.1,
        repeatType: "reverse",
      }}
      onAnimationComplete={() => updateSquarePosition(id)}
      key={`${x}-${y}-${id}`}
      width={width - 1}
      height={height - 1}
      x={x * width + 1}
      y={y * height + 1}
      xlinkHref={getRandomImage()}
    />
  ));
}

function Grid({
  width = 40,
  height = 40,
  numSquares = 50,
  className,
  duration = 4,
  ...props
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray stroke-amber-500/25",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg className="overflow-visible">
        <title>squares</title>
        <Squares
          containerRef={containerRef}
          numSquares={numSquares}
          width={width}
          height={height}
          duration={duration}
        />
      </svg>
    </svg>
  );
}

export const AnimatedGridPattern = memo(Grid);

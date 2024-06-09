"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

const MAX_COL = 8;

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows: number[] = new Array(16).fill(1);
  const cols: number[] = new Array(MAX_COL).fill(1);

  const imagesNumber = 1;
  const getRandomImage = () => {
    return `/${Math.floor(Math.random() * imagesNumber) + 1}.jpg`;
  };

  return (
    <div
      className={cn(
        "absolute flex justify-center items-center w-full h-full z-0",
        className,
      )}
      {...rest}
    >
      <div
        style={{
          maskImage: "radial-gradient(white, transparent)",
        }}
        className="flex bg-background"
      >
        {rows.map((x, i) => (
          <div className="w-32 h-32 relative" key={`${x}`}>
            {cols.map((y, j) => (
              <div
                className={`w-32 h-32 border-t-2 border-r-2 relative ${i === 0 ? "border-l-2" : ""} ${j === MAX_COL - 1 ? "border-b-2" : ""}`}
                key={y}
              >
                <motion.div
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.1 },
                  }}
                  animate={{
                    transition: { duration: 1.5 },
                  }}
                  className={"opacity-0"}
                >
                  <Image
                    src={getRandomImage()}
                    alt={"image"}
                    width="256"
                    height="256"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);

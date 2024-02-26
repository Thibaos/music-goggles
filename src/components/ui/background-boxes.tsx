"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(24).fill(1);
  const cols = new Array(24).fill(1);

  const imagesNumber = 1;
  const getRandomImage = () => {
    return `/${Math.floor(Math.random() * imagesNumber) + 1}.jpg`;
  };

  return (
    <div
      style={{
        transform:
          "translate(-40%,-20%) skewX(-48deg) skewY(14deg) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div className="w-32 h-8 relative" key={i}>
          {cols.map((_, j) => (
            <div className="w-32 h-16 border-t-2 border-r-2 relative" key={j}>
              <motion.div
                whileHover={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                animate={{
                  transition: { duration: 2 },
                }}
                className={"opacity-0"}
              >
                <Image
                  src={getRandomImage()}
                  alt={"image"}
                  width="128"
                  height="32"
                />
              </motion.div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);

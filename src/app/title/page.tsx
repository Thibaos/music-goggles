"use client";

import { PlayIcon } from "@radix-ui/react-icons";
import { AnimatedGridPattern } from "~/components/ui/bg-animated-grid";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function BackgroundBoxes() {
  return (
    <main
      className={cn(
        "absolute -z-10 top-0 w-full h-lvh flex items-center justify-center ",
      )}
    >
      <div
        className="absolute w-full h-full overflow-hidden"
        style={{
          maskImage: "radial-gradient(white,transparent 65%)",
        }}
      >
        <AnimatedGridPattern
          width={64}
          height={64}
          className={cn("inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")}
        />
      </div>

      <Button
        className={"z-20 rounded-full w-24 h-24"}
        variant={"outline"}
        size={"icon"}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <PlayIcon />
      </Button>
    </main>
  );
}

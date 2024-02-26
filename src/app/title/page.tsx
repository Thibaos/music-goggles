import { PlayIcon } from "@radix-ui/react-icons";
import { Boxes } from "~/components/ui/background-boxes";
import { Button } from "~/components/ui/button";

export default function BackgroundBoxesDemo() {
  return (
    <main className="absolute -z-10 top-0 w-full h-lvh overflow-hidden flex items-center justify-center">
      <div className="overflow-hidden h-full w-full flex flex-col items-center justify-center rounded-lg">
        <div
          className="absolute inset-0 w-full h-full bg-background z-10 pointer-events-none"
          style={{
            maskImage: "radial-gradient(transparent, white)",
          }}
        />

        <Boxes />

        <Button
          className={"z-20 rounded-full w-24 h-24"}
          variant={"outline"}
          size={"icon"}
          style={{ backdropFilter: "blur(8px)" }}
        >
          <PlayIcon />
        </Button>
      </div>
    </main>
  );
}

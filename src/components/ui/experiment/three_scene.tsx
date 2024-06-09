"use client";

import { animated, useSpring } from "@react-spring/three";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3, type Mesh, type MeshBasicMaterial } from "three";

const SQUARE_SIZE = 128;

function Sphere({ x, y }: { x: number; y: number }) {
  const [active, setActive] = useState(false);
  const sphere = useRef<Mesh>(null);
  const sphereMat = useRef<MeshBasicMaterial>(null);

  const { opacity } = useSpring({
    opacity: active ? 1 : 0,
    config: {
      mass: 0.1,
      tension: 1000,
      friction: 100,
    },
  });

  return (
    <mesh
      ref={sphere}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      position={new Vector3(x, y, 0)}
      scale={new Vector3(SQUARE_SIZE, SQUARE_SIZE, 1)}
    >
      <planeGeometry />

      <animated.meshBasicMaterial
        ref={sphereMat}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function Scene() {
  const three = useThree();

  const { width, height } = three.size;

  const aspect_ratio = width / height;

  const rows_count = 12;
  const cols_count = Math.ceil(rows_count * aspect_ratio);

  const x_offset = rows_count * SQUARE_SIZE * (aspect_ratio / 2);
  const y_offset = (rows_count * SQUARE_SIZE) / 2;

  useEffect(() => {
    console.log(x_offset, y_offset);
  });

  const spheres = () => {
    const elements = [];

    for (let y = 0; y < rows_count; y++) {
      for (let x = 0; x < cols_count; x++) {
        elements.push(
          <Sphere
            key={y * cols_count + x}
            x={x * SQUARE_SIZE - x_offset}
            y={y * SQUARE_SIZE - y_offset}
          />,
        );
      }
    }

    return elements;
  };

  return <>{spheres()}</>;
}

export default function CanvasBoxes() {
  return (
    <div
      className="absolute w-full h-full bg-background"
      style={{
        maskImage: "radial-gradient(white, white 20%, transparent)",
      }}
    >
      <Canvas orthographic color="black">
        <ambientLight intensity={1} />
        <group>
          <Scene />
        </group>
      </Canvas>
    </div>
  );
}

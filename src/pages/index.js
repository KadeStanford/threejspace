import React, { useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  PerspectiveCamera,
  CameraControls,
  KeyboardControls,
  Stage,
  Backdrop,
  CurveModifier,
  OrbitControls,
  Text3D,
  useAspect,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Flex, Box } from "@react-three/flex";

function Cube(props) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={[11, 1.5, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Button3D(props) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const font = "Inter_Bold.json";

  const mesh = useRef();

  const handleClick = () => {
    window.location.href = "https://stanforddev.vercel.app";
  };

  return (
    <mesh
      ref={mesh}
      {...props}
      scale={active ? 1.1 : 1}
      onClick={handleClick}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      <Cube position={[5.4, 0.5, -1.0]} />
      <Text3D
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        textAnchor="center"
        textAlign="center"
        font={font}
        fontSize={1}
        letterSpacing={-0.06}
        lineHeight={0.8}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
      >
        <meshStandardMaterial color={hovered ? "blue" : "navy"} />
        View My Projects
      </Text3D>
    </mesh>
  );
}

export default function Home() {
  const controlsRef = useRef();

  return (
    <Canvas style={{ width: "100%", height: "100vh" }}>
      <color attach="background" args={["skyblue"]} />

      <Stage
        intensity={1.5}
        shadows="contact"
        environment={"city"}
        scale={[900, 100, 100]}
      >
        <OrbitControls ref={controlsRef} minZoom={20} maxZoom={30} />
        <CameraControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.5}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={5}
          maxDistance={20}
          target={[0, 0, 0]}
        />
        <ambientLight intensity={1.5} color={"green"} />
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.8}
          letterSpacing={-0.06}
          size={1.5}
          font="Inter_Bold.json"
        >
          {`      Stanford\n Development\n      Solutions`}
          <meshNormalMaterial />
        </Text3D>
        <Button3D position={[1.3, 2, 0]} />
      </Stage>
    </Canvas>
  );
}

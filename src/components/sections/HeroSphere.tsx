import { Float, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const NODES = [
  [1.55, 0.1, 0.65],
  [-1.2, 0.75, 0.8],
  [0.3, -1.2, 1.2],
  [-0.75, -0.4, -1.2],
  [0.8, 1.25, -0.65],
] as const;

function OrbitalCore() {
  const group = useRef<Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;

    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.025;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.72, 2]} />
        <meshBasicMaterial color="#f2f2f2" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#bdbdbd" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshStandardMaterial
          color="#111111"
          emissive="#eeeeee"
          emissiveIntensity={0.16}
          metalness={0.6}
          roughness={0.28}
          transparent
          opacity={0.82}
        />
      </mesh>
      {NODES.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroSphere() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      fallback={
        <div className="hero-orb-fallback absolute left-1/2 top-1/2 h-[min(80vw,46rem)] w-[min(80vw,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      }
      gl={{ alpha: true, antialias: false }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 3, 4]} intensity={18} color="#ffffff" />
      <Stars radius={24} depth={18} count={90} factor={1.4} fade speed={0.25} />
      <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.18}>
        <OrbitalCore />
      </Float>
    </Canvas>
  );
}

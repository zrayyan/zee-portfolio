"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

const nodes = [
  { position: [ -2, 1, 0 ] },
  { position: [ 0, 1, 0 ] },
  { position: [ 2, 1, 0 ] },
  { position: [ -1, -1, 0 ] },
  { position: [ 1, -1, 0 ] },
];
const edges = [
  [0,1],[1,2],[0,3],[1,4],[3,4]
];

function Rotator() {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return <group ref={ref} />;
}

export default function Research3D() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0,0,5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10,10,10]} />
        <Rotator />
        {nodes.map((n,i)=> (
          <Sphere key={i} args={[0.3, 32, 32]} position={n.position}>
            <meshStandardMaterial color="#3B82F6" />
          </Sphere>
        ))}
        {edges.map(([a,b],i)=>(
          <Line
            key={i}
            points={[nodes[a].position, nodes[b].position]}
            color="#3B82F6"
            lineWidth={2}
          />
        ))}
      </Canvas>
    </div>
  );
}

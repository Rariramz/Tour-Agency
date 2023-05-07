import { memo, useRef, useState, RefObject } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { Model } from '../Model/Model';
import { OrbitControls } from '@react-three/drei';
import { Group } from 'three';

const Globe = memo((props: ThreeElements['group']) => {
  const modelRef: RefObject<Group> = useRef(null);
  // const [hovered, hover] = useState(false);
  // const [clicked, click] = useState(false);
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group {...props} ref={modelRef}>
      <ambientLight />
      <directionalLight position={[85.0, 80.0, 70.0]} />
      <Model
        url={"./little_planet_earth/scene.gltf"}
        // url={"./earth_terrain_and_sea_map/scene.gltf"}
      />
      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
        maxDistance={2000}
        minDistance={800}
      />
    </group>
    // <mesh
    //   {...props}
    //   ref={ref}
    //   scale={clicked ? 1.5 : 1}
    //   onClick={(event) => click(!clicked)}
    //   onPointerOver={(event) => hover(true)}
    //   onPointerOut={(event) => hover(false)}
    // >
    //   <boxGeometry args={[1, 1, 1]} />
    //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    // </mesh>
  );
});

Globe.displayName = 'Globe';

export { Globe };

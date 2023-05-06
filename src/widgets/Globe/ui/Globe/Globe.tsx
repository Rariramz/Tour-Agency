import { memo, useRef, useState, RefObject } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { Model } from '../Model/Model';

const Globe = memo((props: ThreeElements['mesh']) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // useFrame((state, delta) => (ref.current!.rotation.x += delta));

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model url={"./little_planet_earth/scene.gltf"}/>
    </>
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

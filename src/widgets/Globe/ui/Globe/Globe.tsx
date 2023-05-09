import { memo, useRef, RefObject } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { Model } from '../Model/Model';
import { OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import { Marker } from '../Marker/Marker';
import { getTourMarkers } from '../../model/selectors/getTourMarkers';

const Globe = memo((props: ThreeElements['group']) => {
  const modelRef: RefObject<Group> = useRef(null);
  const tourMarkers = getTourMarkers();
  
  useFrame(() => {
    if (modelRef.current) {
      // modelRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group {...props} ref={modelRef}>
      <ambientLight />
      <directionalLight position={[85.0, 80.0, 70.0]} />
      <Model url={"./good_earth/scene.gltf"} />
      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
        maxDistance={2.2}
        minDistance={1.2}
      />
      {tourMarkers.map(({name, position}) => (
        <Marker
          key={name}
          position={position}
          onClick={() => console.log(`Marker ${name} clicked!`)}
          name={name}
        />
      ))}
    </group>
  );
});

Globe.displayName = 'Globe';

export { Globe };

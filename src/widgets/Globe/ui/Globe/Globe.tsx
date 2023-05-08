import { memo, useRef, useState, RefObject } from 'react';
import { useFrame, ThreeElements, useLoader, ThreeEvent } from '@react-three/fiber';
import { Model } from '../Model/Model';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { Marker } from '../Marker/Marker';

const Globe = memo((props: ThreeElements['group']) => {
  const modelRef: RefObject<Group> = useRef(null);
  const [markers, setMarkers] = useState<Vector3[]>([]);

  const handleGlobeClick = (event: ThreeEvent<MouseEvent>) => {
    const { x, y, z } = event.point;

  // Get the position of the globe in world space
  const globeWorldPos = new Vector3();
  modelRef.current!.getWorldPosition(globeWorldPos);

  // Move the marker to the clicked point relative to the globe's world position
  const markerPos = new Vector3(x, y, z).sub(globeWorldPos);
  setMarkers([...markers, markerPos]);
  };
  
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group {...props} ref={modelRef} onClick={handleGlobeClick}>
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
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.x, marker.y, marker.z]}
          globePosition={[modelRef.current!.position.x, modelRef.current!.position.y, modelRef.current!.position.x]}
          onClick={() => console.log(`Marker ${index} clicked!`)}
        />
      ))}
    </group>
  );
});

Globe.displayName = 'Globe';

export { Globe };

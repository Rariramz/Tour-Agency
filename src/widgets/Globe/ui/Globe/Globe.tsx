import { memo, useRef, useState, RefObject } from 'react';
import { useFrame, ThreeElements, useLoader, ThreeEvent } from '@react-three/fiber';
import { Model } from '../Model/Model';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import { Marker } from '../Marker/Marker';

interface CityData {
  name: string;
  position: [number, number, number];
}

const cityData: CityData[] = [
  { name: 'New York City', position: [-74.00597, 40.71427, 0] },
  { name: 'London', position: [-0.118092, 51.509865, 0] },
  { name: 'Tokyo', position: [139.691711, 35.689487, 0] }
];

const Globe = memo((props: ThreeElements['group']) => {
  const modelRef: RefObject<Group> = useRef(null);
  const [markers, setMarkers] = useState<Vector3[]>([]);
  const [cityMarkers, setCityMarkers] = useState<CityData[]>([]);

  const handleGlobeClick = (event: ThreeEvent<MouseEvent>) => {
    const { x, y, z } = event.point;

    // Get the position of the globe in world space
    const globeWorldPos = new Vector3();
    modelRef.current!.getWorldPosition(globeWorldPos);

    // Move the marker to the clicked point relative to the globe's world position
    const markerPos = new Vector3(x, y, z).sub(globeWorldPos);
    setMarkers([...markers, markerPos]);
    setCityMarkers(cityData)
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
      <Model url={"./good_earth/scene.gltf"} />
      <OrbitControls
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
        // maxDistance={2000}
        // minDistance={800}
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.x, marker.y, marker.z]}
          globePosition={[modelRef.current!.position.x, modelRef.current!.position.y, modelRef.current!.position.x]}
          onClick={() => console.log(`Marker ${index} clicked!`)}
        />
      ))}
      {cityMarkers.map(({name, position}) => {
        console.log(position)
        return (
          <Marker
            key={name}
            position={position}
            globePosition={[modelRef.current!.position.x, modelRef.current!.position.y, modelRef.current!.position.x]}
            onClick={() => console.log(`Marker ${name} clicked!`)}
            name={name}
          />
        )})}
    </group>
  );
});

Globe.displayName = 'Globe';

export { Globe };

import { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Vector3 } from 'three';

interface MarkerProps {
    name: string;
    position: [number, number, number],
    onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export const Marker = ({ name, position, onClick }: MarkerProps) => {  
    const [hover, setHover] = useState(false);

    const projection = new Vector3().setFromSphericalCoords(
        0.96, // Globe radius
        Math.PI / 2 - (position[1] * Math.PI) / 180, // Latitude
        (position[0] * Math.PI) / 180 // Longitude
    );

    return (
        <mesh
            position={projection}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {name}
            <sphereGeometry args={[0.008, 32, 16]} />
            <meshStandardMaterial color={hover ? "#ffd910" : '#ff3d3d'}/>
        </mesh>
    );
}

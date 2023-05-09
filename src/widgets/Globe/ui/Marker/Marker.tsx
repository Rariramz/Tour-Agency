    import { useState } from 'react';
    import { ThreeEvent } from '@react-three/fiber';
    import { Vector3 } from 'three';

    interface MarkerProps {
        name?: string;
        position: [number, number, number],
        globePosition: [number, number, number],
        onClick: (e: ThreeEvent<MouseEvent>) => void;
    }

    export const Marker = ({ name, position, globePosition, onClick }: MarkerProps) => {  
        const [hover, setHover] = useState(false);

        // Calculate the marker's position relative to the globe
        const markerPosition: [number, number, number] = [
            position[0] - globePosition[0],
            position[1] - globePosition[1],
            position[2] - globePosition[2],
        ];
        const projection = new Vector3().setFromSphericalCoords(
            1, // Globe radius
            Math.PI / 2 - (position[1] * Math.PI) / 180, // Latitude
            (position[0] * Math.PI) / 180 // Longitude
        );
    
        return name ? (
            <mesh
                position={projection}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {name}
                <sphereGeometry args={[0.01,0.01,0.01]} />
                <meshStandardMaterial color={hover ? "#dadada" : "#010"} />
            </mesh>
        ) : (
        <mesh
            position={markerPosition}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <sphereGeometry args={[0.05,0.05,0.05]} />
            <meshStandardMaterial color={hover ? "#0f0" : "#00f"} />
        </mesh>
        );
    }
    import { useState } from 'react';
    import { ThreeEvent, } from '@react-three/fiber';

    interface MarkerProps {
        position: [number, number, number],
        globePosition: [number, number, number],
        onClick: (e: ThreeEvent<MouseEvent>) => void;
    }

    export const Marker = ({ position, globePosition, onClick }: MarkerProps) => {  
        const [hover, setHover] = useState(false);

        // Calculate the marker's position relative to the globe
        const markerPosition: [number, number, number] = [
            position[0] - globePosition[0],
            position[1] - globePosition[1],
            position[2] - globePosition[2],
        ];
    
        return (
        <mesh
            position={markerPosition}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <sphereBufferGeometry args={[10,10,10]} />
            <meshStandardMaterial color={hover ? "#0f0" : "#00f"} />
        </mesh>
        );
    }
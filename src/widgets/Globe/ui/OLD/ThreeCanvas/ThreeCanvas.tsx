import { memo } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';

const ThreeCanvas = memo(({ children }: ThreeElements['mesh']) => {
  return (
      <Canvas camera={{fov: 75, near: 0.1, far: 100000, position: [0, 0, 1.5]}}>
        {children}
      </Canvas>
  );
});

ThreeCanvas.displayName = 'ThreeCanvas';

export { ThreeCanvas };

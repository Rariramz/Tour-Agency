import { memo } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './ThreeCanvas.module.scss';

const ThreeCanvas = memo(({ children }: ThreeElements['mesh']) => {
  return (
    <div className={classNames(cls.CanvasContainer)}>
      <Canvas camera={{fov: 75, near: 0.1, far: 100000, position: [0, 0, 1.5]}}>{children}</Canvas>
    </div>
  );
});

ThreeCanvas.displayName = 'ThreeCanvas';

export { ThreeCanvas };

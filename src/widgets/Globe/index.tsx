import { Globe } from './ui/Globe/Globe';
import { ThreeCanvas } from './ui/ThreeCanvas/ThreeCanvas';

const ThreeGlobe = () => {
  return (
    <ThreeCanvas>
        <Globe />
    </ThreeCanvas>
  );
};

export { ThreeGlobe as Globe };

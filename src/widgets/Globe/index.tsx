import { Globe } from './ui/Globe/Globe';
import { ReactGlobe } from './ui/ReactGlobe/ReactGlobe';
import { ThreeCanvas } from './ui/ThreeCanvas/ThreeCanvas';

const ThreeGlobe = () => {
  return (
    <ThreeCanvas>
        {/* <Globe /> */}
        <ReactGlobe />
    </ThreeCanvas>
  );
};

export { ThreeGlobe as Globe };

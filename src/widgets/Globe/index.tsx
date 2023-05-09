import { classNames } from '../../shared/lib/classNames/classNames';
import cls from './index.module.scss';
import { ReactGlobe } from './ui/ReactGlobe/ReactGlobe';

const ThreeGlobe = () => {
  return (
    <div className={classNames(cls.GlobeContainer)}>
        <ReactGlobe />
    </div>
  );
};

export { ThreeGlobe as Globe };

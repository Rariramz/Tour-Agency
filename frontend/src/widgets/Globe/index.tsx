import { ReactGlobe } from './ui/ReactGlobe/ReactGlobe';

const Globe = ({
  onTourSelect
}: {
  onTourSelect: (tourId: number) => void;
}) => <ReactGlobe onTourSelect={onTourSelect} />;

export { Globe };

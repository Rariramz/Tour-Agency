import { TourMarkerType } from '../types/tourMarker';

export const getTourMarkers = () => {
  const tourMarkersList: TourMarkerType[] = [
    { name: 'New York City', position: [-74.00597, 40.71427, 0] },
    { name: 'London', position: [-0.118092, 51.509865, 0] },
    { name: 'Tokyo', position: [139.691711, 35.689487, 0] }
  ];
  return tourMarkersList;
};

import { TourMarkerType, TourMarkerTypeOld } from '../types/tourMarker';

export const getTourMarkersOld = () => {
  const tourMarkersListOld: TourMarkerTypeOld[] = [
    { name: 'New York City', position: [-74.00597, 40.71427, 0] },
    { name: 'London', position: [-0.118092, 51.509865, 0] },
    { name: 'Tokyo', position: [139.691711, 35.689487, 0] }
  ];
  return tourMarkersListOld;
};

export const getTourMarkers = () => {
  const tourMarkersList: TourMarkerType[] = [
    { lng: -74.00597, lat: 40.71427, size: 40, color: '#ffd910' },
    { lng: -0.118092, lat: 51.509865, size: 40, color: '#ffd910' },
    { lng: 139.691711, lat: 35.689487, size: 40, color: '#ffd910' }
  ];
  return tourMarkersList;
};

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
    { lng: 33.996939, lat: 34.986732, size: 40, color: '#ff3d3d' }, // Aya Napa
    // { lng: 31.369942, lat: 36.774290, size: 40, color: '#ffd910' }, // Orensehir, Side
    { lng: 31.091777, lat: 36.849623, size: 40, color: '#ffd910' }  // Belek
  ];
  return tourMarkersList;
};

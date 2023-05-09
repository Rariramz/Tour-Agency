export interface TourMarkerTypeOld {
  name: string;
  position: [number, number, number];
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export interface TourMarkerType {
  lng: number;
  lat: number;
  size: number;
  color: RGB | RGBA | HEX;
}

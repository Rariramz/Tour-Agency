import React from 'react';

export interface TourType {
  id: number;
  cityDeparture: string;
  cityArrival: string;
  hotel: string;
  dateDeparture: string;
  dateArrival: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  guests: number;
  rating: number;
}

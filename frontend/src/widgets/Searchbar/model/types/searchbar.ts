import React from 'react';

export interface TourType {
  id: number;
  name: string;
  cityDeparture: string;
  cityArrival: string;
  hotel: string;
  datesDeparture: string[];
  nightsAmounts: number[];
  price: number;
  currency: string;
  description: string;
  image: string;
  guests: number;
  rating: number;
}

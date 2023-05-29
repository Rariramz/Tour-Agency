export const mapToCreateTourDto = (tourData: any) => {
  const {
    cityDeparture,
    cityArrival,
    countryDeparture,
    countryArrival,
    hotelId,
    nightsAmount,
    price,
    currency,
    guests,
    description,
    rating,
    imageId,
    datesDeparture
  } = tourData;

  return {
    city_departure_id: cityDeparture,
    city_arrival_id: cityArrival,
    country_departure_id: countryDeparture,
    country_arrival_id: countryArrival,
    hotel_id: hotelId,
    dates_departure: datesDeparture,
    nights_amount: Number(nightsAmount),
    price: Number(price),
    currency,
    guests: Number(guests),
    description,
    rating: Number(rating),
    image_id: imageId
  };
}
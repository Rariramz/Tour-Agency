export type Tour = {
    city_departure_id: string;
    city_arrival_id: string;
    country_departure_id: string;
    country_arrival_id: string;
    hotel_id: string;
    dates_departure: string[];
    nights_amount: number;
    price: number;
    currency: string;
    guests: number;
    description: string;
    rating: number;
    image_id: string;
}

export class CreateTourDto {
    city_departure_id: string;
    city_arrival_id: string;
    country_departure_id: string;
    country_arrival_id: string;
    hotel_id: string;
    dates_departure: string[];
    nights_amounts: number[];
    price: number;
    currency: string;
    guests: number;
    description: string;
    rating: number;
    image_id: string;
}

import { Injectable } from '@nestjs/common';
import { ICountry } from './interfaces/country.interface';
import { ICity } from './interfaces/city.interface';
import { countries } from './json/countries';
import { cities } from './json/cities';

@Injectable()
export class CountriesService {
  private readonly countries: ICountry[] = countries;
  private readonly cities: ICity[] = cities;

  findAllCountries(): ICountry[] {
    return this.countries;
  }

  findCountryById(id: number): ICountry {
    return this.countries.find((country: ICountry) => country.id === id);
  }

  findCitiesByCountry(countryId: number): ICity[] {
    return this.cities.filter((city: ICity) => city.country_id === countryId);
  }

  findCityById(id: number): ICity {
    return this.cities.find((city: ICity) => city.id === id);
  }
}
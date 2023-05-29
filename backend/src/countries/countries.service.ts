import { Injectable } from '@nestjs/common';
import { City, Country } from './interfaces/country.interface';
import { countries } from './json/countries';
import { cities } from './json/cities';

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', countries)
@Injectable()
export class CountriesService {
  private readonly countries: Country[] = countries;
  private readonly cities: City[] = cities;

  findAllCountries(): Country[] {
    return this.countries;
  }

  findCountryById(id: number): Country {
    return this.countries.find((country: Country) => country.id === id);
  }

  findCitiesByCountry(countryId: number): City[] {
    return this.cities.filter((city: City) => city.country_id === countryId);
  }
}
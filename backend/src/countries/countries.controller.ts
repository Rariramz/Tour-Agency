import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './interfaces/country.interface';
import { City } from './interfaces/city.interface';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countriesService.findAllCountries();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findCountryById(+id);
  }

  @Get(':id/cities')
  async findCities(@Param('id') id: string): Promise<City[]> {
    return this.countriesService.findCitiesByCountry(+id);
  }
}
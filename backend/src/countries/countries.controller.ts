import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country, ICountry } from './interfaces/country.interface';
import { City, ICity } from './interfaces/city.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Getting all countries' })
  @ApiResponse( { status: 200, type: [Country] })
  @Get()
  async findAll(): Promise<ICountry[]> {
    return this.countriesService.findAllCountries();
  }

  @ApiOperation({ summary: 'Getting one country' })
  @ApiResponse( { status: 200, type: Country })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ICountry> {
    return this.countriesService.findCountryById(+id);
  }

  @ApiOperation({ summary: 'Getting all cities of country' })
  @ApiResponse( { status: 200, type: [City] })
  @Get(':id/cities')
  async findCities(@Param('id') id: string): Promise<ICity[]> {
    return this.countriesService.findCitiesByCountry(+id);
  }
}
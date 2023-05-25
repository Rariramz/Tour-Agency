import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto, UpdateTourDto, ListAllEntities } from 'src/tours/dto/tours.dto';
import { Tour } from './interfaces/tour.interface';

@Controller('tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @Post()
  async create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

  @Get()
  async findAll(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.delete(id);
  }
}


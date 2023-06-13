import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @Post()
  async create(@Body() createTourDto: CreateTourDto): Promise<Tour> {
    return this.tourService.create(createTourDto);
  }

  @Get()
  async findAll(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.delete(id);
  }
}

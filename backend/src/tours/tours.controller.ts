import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @ApiOperation({ summary: 'Tour creation' })
  @ApiResponse( { status: 200, type: Tour })
  @Post()
  async create(@Body() createTourDto: CreateTourDto): Promise<Tour> {
    return this.tourService.create(createTourDto);
  }

  @ApiOperation({ summary: 'Getting all tours' })
  @ApiResponse( { status: 200, type: [Tour] })
  @Get()
  async findAll(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @ApiOperation({ summary: 'Getting one tour' })
  @ApiResponse( { status: 200, type: Tour })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tourService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Tour updating' })
  @ApiResponse( { status: 200, type: Tour })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(Number(id), updateTourDto);
  }

  @ApiOperation({ summary: 'Tour deleting' })
  @ApiResponse( { status: 200, type: Tour })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.delete(Number(id));
  }
}

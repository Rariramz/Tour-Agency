import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookTourDto } from './dto/book-tour.dto';
import { UserTour } from './user-tours.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ADMIN_ROLE, CLIENT_ROLE } from 'src/constants';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @ApiOperation({ summary: 'Tour creation' })
  @ApiResponse( { status: 200, type: Tour })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createTourDto: CreateTourDto,
    @UploadedFile() image: any): Promise<Tour> {
      // TODO: fix form data
    return this.toursService.createTour({...createTourDto, datesDeparture: ['12.06.2023, 14.06.2023']}, image);
  }

  @ApiOperation({ summary: 'Getting all tours' })
  @ApiResponse( { status: 200, type: [Tour] })
  @Get()
  findAll(): Promise<Tour[]> {
    return this.toursService.findAllTours();
  }

  @ApiOperation({ summary: 'Getting one tour' })
  @ApiResponse( { status: 200, type: Tour })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOneTour(Number(id));
  }

  @ApiOperation({ summary: 'Tour updating' })
  @ApiResponse( { status: 200, type: Tour })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.updateTour(Number(id), updateTourDto);
  }

  @ApiOperation({ summary: 'Tour deleting' })
  @ApiResponse( { status: 200, type: Tour })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.deleteTour(Number(id));
  }

  @ApiOperation({ summary: 'Booking tour' })
  @ApiResponse( { status: 200, type: UserTour })
  @Roles(CLIENT_ROLE)
  @UseGuards(RolesGuard)
  @Post(':tourId')
  book(@Param('tourId') tourId: string, @Body() bookTourDto: BookTourDto): Promise<UserTour> {
    return this.toursService.bookTour(Number(tourId), bookTourDto);
  }
}

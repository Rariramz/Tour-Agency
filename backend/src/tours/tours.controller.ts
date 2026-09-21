import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UploadedFile, UseGuards, UseInterceptors, ValidationPipe, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
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
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 5 * 1024 * 1024 } }))
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) createTourDto: CreateTourDto,
    @UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({ fileType: /image\/jpeg/ }).addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }).build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) image: any) {
    return this.toursService.toResponse(await this.toursService.createTour(createTourDto, image));
  }

  @ApiOperation({ summary: 'Getting all tours' })
  @ApiResponse( { status: 200, type: [Tour] })
  @Get()
  async findAll() {
    return (await this.toursService.findAllTours()).map((tour) => this.toursService.toResponse(tour));
  }

  @ApiOperation({ summary: 'Getting one tour' })
  @ApiResponse( { status: 200, type: Tour })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.toursService.toResponse(await this.toursService.findOneTour(id));
  }

  @ApiOperation({ summary: 'Tour updating' })
  @ApiResponse( { status: 200, type: Tour })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) updateTourDto: UpdateTourDto) {
    return this.toursService.toResponse(await this.toursService.updateTour(id, updateTourDto));
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

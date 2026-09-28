import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CLIENT_ROLE } from 'src/constants';
import { BookTourDto } from './dto/book-tour.dto';
import { ToursService } from './tours.service';

type AuthenticatedRequest = Request & { user: { id: number } };

@ApiTags('Reservations')
@Controller('reservations')
@Roles(CLIENT_ROLE)
@UseGuards(RolesGuard)
export class ReservationsController {
  constructor(private readonly toursService: ToursService) {}

  @ApiOperation({ summary: 'Book a tour for the current user' })
  @Post(':tourId')
  create(
    @Req() request: AuthenticatedRequest,
    @Param('tourId', ParseIntPipe) tourId: number,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    bookTourDto: BookTourDto,
  ) {
    return this.toursService.bookTour(request.user.id, tourId, bookTourDto);
  }

  @ApiOperation({ summary: 'List reservations for the current user' })
  @Get()
  findMine(@Req() request: AuthenticatedRequest) {
    return this.toursService.findUserReservations(request.user.id);
  }

  @ApiOperation({ summary: 'Cancel one of the current user reservations' })
  @Delete(':id')
  cancel(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) reservationId: number,
  ) {
    return this.toursService.cancelReservation(request.user.id, reservationId);
  }
}

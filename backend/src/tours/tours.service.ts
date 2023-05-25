import { Injectable } from '@nestjs/common';
import { CreateTourDto, UpdateTourDto, ListAllEntities } from './dto/tours.dto';
import { Tour } from './interfaces/tour.interface';

@Injectable()
export class ToursService {
  private readonly tours: Tour[] = [
    { id: '1', name: 'first' },
    { id: '2', name: 'second' }
  ];

  findAll(): Tour[] {
    return this.tours;
  }

  findOne(id: string): Tour {
    return this.tours.find(t => t.id === id);
  }

  create(tour: Tour) {
    this.tours.push(tour);
  }

  update(updateTourDto: UpdateTourDto): boolean {
    const tourToUpdate = this.tours.find(t => t.id === updateTourDto.id);
    if (tourToUpdate) {
      tourToUpdate.name = updateTourDto.name;
      return true;
    } else {
      return false;
    }
  }

  delete(id: string): boolean {
    let tourToDeleteIndex = this.tours.findIndex((t) => t.id === id);
    if (tourToDeleteIndex > -1) {
      this.tours.splice(tourToDeleteIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}

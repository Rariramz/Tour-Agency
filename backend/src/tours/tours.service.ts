import { Injectable, Inject } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { TOURS_REPOSITORY } from '../constants';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Op } from 'sequelize';

@Injectable()
export class ToursService {
  constructor(
    @Inject(TOURS_REPOSITORY)
    private toursRepository: typeof Tour
  ) {}

  async findAll(): Promise<Tour[]> {
    return this.toursRepository.findAll<Tour>();
  }

  async findOne(id: number): Promise<Tour> {
    return this.toursRepository.findOne({
      where: { id }
    })
  }

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    return this.toursRepository.create<Tour>(createTourDto);
  }

  async update(id: number, updateTourDto: UpdateTourDto): Promise<[affectedCount: number]> {
    return this.toursRepository.update(updateTourDto, {
      where: { id }
    })
  };

  async delete(id: number): Promise<number> {
    return this.toursRepository.destroy({
      where: { id }
    })
  }
}
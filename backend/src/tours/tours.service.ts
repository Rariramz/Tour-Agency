import { Injectable, Inject } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { TOURS_REPOSITORY } from '../constants';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class ToursService {
  constructor(
    @Inject(TOURS_REPOSITORY)
    private toursRepository: typeof Tour
  ) {}

  async findAll(): Promise<Tour[]> {
    return this.toursRepository.findAll<Tour>();
  }

  async findOne(id: string): Promise<Tour> {
    return this.toursRepository.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  }

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const id = uuidv4();
    return this.toursRepository.create<Tour>({id, ...createTourDto} as any);
  }

  async update(updateTourDto: UpdateTourDto): Promise<[affectedCount: number]> {
    return this.toursRepository.update(updateTourDto, {
      where: {
        id: {
          [Op.eq]: updateTourDto.id
        }
      }
    })
  };

  async delete(id: string): Promise<number> {
    return this.toursRepository.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  }
}
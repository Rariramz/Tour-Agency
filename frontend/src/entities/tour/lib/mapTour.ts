import { TourDto } from '../api/types';
import { Tour } from '../model/types/types';
export function mapTour(dto: TourDto): Tour {
  return {
    ...dto,
    image: dto.image ? `/media/${encodeURIComponent(dto.image)}` : ''
  };
}

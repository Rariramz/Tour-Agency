import { ApiProperty } from "@nestjs/swagger";

export type ICity = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
};

export class City implements ICity {
  @ApiProperty({ example: 15989, description: 'Unique identifier'})
  id: number;

  @ApiProperty({ example: "Minsk", description: 'City name'})
  name: string;

  @ApiProperty({ example: 2958, description: 'City state id'})
  state_id: number;

  @ApiProperty({ example: "HM", description: 'City state code'})
  state_code: string;

  @ApiProperty({ example: "Minsk", description: 'City state name'})
  state_name: string;

  @ApiProperty({ example: 21, description: 'City country id'})
  country_id: number;

  @ApiProperty({ example: "BY", description: 'City country code'})
  country_code: string;

  @ApiProperty({ example: "Belarus", description: 'City country name'})
  country_name: string;

  @ApiProperty({ example: "53.90000000", description: 'City latitude'})
  latitude: string;

  @ApiProperty({ example: "27.56667000", description: 'City longitude'})
  longitude: string;

  @ApiProperty({ example: "Q21579751", description: 'City wiki data id'})
  wikiDataId: string;
}
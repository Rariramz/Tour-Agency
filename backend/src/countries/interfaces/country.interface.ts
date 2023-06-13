import { ApiProperty } from "@nestjs/swagger";

export type ICountry = {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    timezones: {
      zoneName: string;
      gmtOffset: number;
      gmtOffsetName: string;
      abbreviation: string;
      tzName: string;
    }[];
    translations: {
      [key: string]: string;
    };
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
};

export class Country implements ICountry {
  @ApiProperty({ example: 21, description: 'Unique identifier'})
  id: number;

  @ApiProperty({ example: "Belarus", description: 'Country name'})
  name: string;

  @ApiProperty({ example: "BLR", description: 'Country iso3'})
  iso3: string;

  @ApiProperty({ example: "BY", description: 'Country iso2'})
  iso2: string;

  @ApiProperty({ example: "112", description: 'Country numeric code'})
  numeric_code: string;

  @ApiProperty({ example: "375", description: 'Country phone code'})
  phone_code: string;

  @ApiProperty({ example: "Minsk", description: 'Country capital'})
  capital: string;

  @ApiProperty({ example: "BYN", description: 'Country currency'})
  currency: string;

  @ApiProperty({ example: "Belarusian ruble", description: 'Country currency name'})
  currency_name: string;

  @ApiProperty({ example: "Br", description: 'Country currency symbol'})
  currency_symbol: string;

  @ApiProperty({ example: ".by", description: 'Country tld'})
  tld: string;

  @ApiProperty({ example: "Белару́сь", description: 'Country native name'})
  native: string;

  @ApiProperty({ example: "Europe", description: 'Country region'})
  region: string;

  @ApiProperty({ example: "Eastern Europe", description: 'Country subregion'})
  subregion: string;

  @ApiProperty({ example: [
    {
        "zoneName": "Europe\/Minsk",
        "gmtOffset": 10800,
        "gmtOffsetName": "UTC+03:00",
        "abbreviation": "MSK",
        "tzName": "Moscow Time"
    }
  ], description: 'Country timezones'})
  timezones: {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }[];

  @ApiProperty({ example: {
    "kr": "벨라루스",
    "pt-BR": "Bielorrússia",
    "pt": "Bielorrússia",
    "nl": "Wit-Rusland",
    "hr": "Bjelorusija",
    "fa": "بلاروس",
    "de": "Weißrussland",
    "es": "Bielorrusia",
    "fr": "Biélorussie",
    "ja": "ベラルーシ",
    "it": "Bielorussia",
    "cn": "白俄罗斯",
    "tr": "Belarus"
  }, description: 'Country translations'})
  translations: {
    [key: string]: string;
  };

  @ApiProperty({ example: "53.00000000", description: 'Country latitude'})
  latitude: string;

  @ApiProperty({ example: "28.00000000", description: 'Country longitude'})
  longitude: string;

  @ApiProperty({ example: "🇧🇾", description: 'Country emoji'})
  emoji: string;

  @ApiProperty({ example: "U+1F1E7 U+1F1FE", description: 'Country emojiU'})
  emojiU: string;
}

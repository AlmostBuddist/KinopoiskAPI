import { ApiProperty } from "@nestjs/swagger";

export class IGenreShort {
  @ApiProperty({ type: String })
  readonly genre: string;
}

export class IGenre extends IGenreShort {
  @ApiProperty({ type: Number })
  readonly id: number;
}

export class ICountriesShort {
  @ApiProperty({ type: String })
  readonly country: string;
}

export class ICountries extends ICountriesShort {
  @ApiProperty({ type: Number })
  readonly id: number;
}

export class IFilm {
  @ApiProperty({ type: Number })
  readonly kinopoiskId: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  readonly imdbId?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  readonly nameRu?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  readonly nameEn?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  readonly nameOriginal?: string | null;

  @ApiProperty({ type: [ICountriesShort] })
  readonly countries: ICountriesShort[];

  @ApiProperty({ type: [IGenreShort] })
  readonly genres: IGenreShort[];

  @ApiProperty({ type: Number })
  readonly ratingKinopoisk: number;

  @ApiProperty({ type: Number, required: false, nullable: true })
  readonly ratingImdb?: number | null;

  @ApiProperty({ type: Number })
  readonly year: number;

  @ApiProperty({ type: String })
  readonly type: string;

  @ApiProperty({ type: String })
  readonly posterUrl: string;

  @ApiProperty({ type: String })
  readonly posterUrlPreview: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class GenreShort {
  @ApiProperty({ type: String })
  public readonly genre: string;
}

export class Genre extends GenreShort {
  @ApiProperty({ type: Number })
  public readonly id: number;
}

export class CountriesShort {
  @ApiProperty({ type: String })
  public readonly country: string;
}

export class Countries extends CountriesShort {
  @ApiProperty({ type: Number })
  public readonly id: number;
}

export class Film {
  @ApiProperty({ type: Number })
  public readonly kinopoiskId: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
  })
  public readonly imdbId?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  public readonly nameRu?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  public readonly nameEn?: string | null;

  @ApiProperty({ type: String, required: false, nullable: true })
  public readonly nameOriginal?: string | null;

  @ApiProperty({ type: [CountriesShort] })
  public readonly countries: CountriesShort[];

  @ApiProperty({ type: [GenreShort] })
  public readonly genres: GenreShort[];

  @ApiProperty({ type: Number })
  public readonly ratingKinopoisk: number;

  @ApiProperty({ type: Number, required: false, nullable: true })
  public readonly ratingImdb?: number | null;

  @ApiProperty({ type: Number })
  public readonly year: number;

  @ApiProperty({ type: String })
  public readonly type: string;

  @ApiProperty({ type: String })
  public readonly posterUrl: string;

  @ApiProperty({ type: String })
  public readonly posterUrlPreview: string;
}

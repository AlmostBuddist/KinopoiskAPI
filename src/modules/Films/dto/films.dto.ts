import { ApiProperty } from "@nestjs/swagger";

import { FilmOrderEnum, FilmTypeEnum } from "../../../constants";
import { Film, Genre } from "../../../types";
import { Countries } from "../../../types/film";

export class GetAllFilmsDto {
  @ApiProperty({ type: Number })
  public readonly total: number;

  @ApiProperty({ type: Number })
  public readonly totalPages: number;

  @ApiProperty({
    type: [Film],
  })
  public readonly items: Film[];
}

export class GetAllFilmsQueriesDto {
  @ApiProperty({
    required: false,
    isArray: true,
    type: Number,
    description:
      "Список id стран разделенные запятой. Например countries=1,2,3. На данный момент можно указать не более одной страны",
  })
  public readonly countries?: string | undefined;

  @ApiProperty({
    required: false,
    isArray: true,
    type: Number,
    description:
      "Список id жанров разделенные запятой. Например genres=1,2,3. На данный момент можно указать не более одного жанра",
  })
  public readonly genres?: string | undefined;

  @ApiProperty({
    required: false,
    enum: FilmOrderEnum,
    default: FilmOrderEnum.RATING,
    description: "Сортировка",
  })
  public readonly order?: keyof typeof FilmOrderEnum | undefined;

  @ApiProperty({
    required: false,
    enum: FilmTypeEnum,
    default: FilmTypeEnum.ALL,
    description: "Тип фильма",
  })
  public readonly type?: keyof typeof FilmTypeEnum | undefined;

  @ApiProperty({
    required: false,
    default: 0,
    type: Number,
    description: "Минимальный рейтинг",
  })
  public readonly ratingFrom?: string | undefined;

  @ApiProperty({
    required: false,
    default: 10,
    type: Number,
    description: "Максимальный рейтинг",
  })
  public readonly ratingTo?: string | undefined;

  @ApiProperty({
    required: false,
    default: 1000,
    type: Number,
    description: "Минимальный год",
  })
  public readonly yearFrom?: string | undefined;

  @ApiProperty({
    required: false,
    default: 3000,
    type: Number,
    description: "Максимальный год",
  })
  public readonly yearTo?: string | undefined;

  @ApiProperty({
    required: false,
  })
  public readonly imdbId?: string | undefined;

  @ApiProperty({
    required: false,
    description: "Ключевое слово, которое встречается в названии фильма",
  })
  public readonly keyword?: string | undefined;

  @ApiProperty({
    required: false,
    default: "1",
    type: Number,
    description: "Номер страницы",
  })
  public readonly page?: string | undefined;
}

export class GetAllFilmsQueriesParamsDto {
  public readonly countries?: string | undefined;

  public readonly genres?: string | undefined;

  public readonly order?: keyof typeof FilmOrderEnum | undefined;

  public readonly type?: keyof typeof FilmTypeEnum | undefined;

  public readonly ratingFrom?: number | undefined;

  public readonly ratingTo?: number | undefined;

  public readonly yearFrom?: number | undefined;

  public readonly yearTo?: number | undefined;

  public readonly imdbId?: string | undefined;

  public readonly keyword?: string | undefined;

  public readonly page?: number | undefined;
}

export class GetAllFiltersDto {
  public readonly genres: Genre[];

  public readonly countries: Countries[];
}

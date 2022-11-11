import { ApiProperty } from '@nestjs/swagger';
import { FilmOrderEnum, FilmTypeEnum } from '../../../constants';
import { IFilm } from '../../../types';

export class GetAllFilmsDto {
  @ApiProperty({ type: Number })
  readonly total: number;

  @ApiProperty({ type: Number })
  readonly totalPages: number;

  @ApiProperty({
    type: [IFilm],
  })
  readonly items: IFilm[];
}

export class GetAllFilmsQueriesDto {
  @ApiProperty({
    required: false,
    isArray: true,
    type: Number,
    description:
      'Список id стран разделенные запятой. Например countries=1,2,3. На данный момент можно указать не более одной страны',
  })
  readonly countries?: string | undefined;

  @ApiProperty({
    required: false,
    isArray: true,
    type: Number,
    description:
      'Список id жанров разделенные запятой. Например genres=1,2,3. На данный момент можно указать не более одного жанра',
  })
  readonly genres?: string | undefined;

  @ApiProperty({
    required: false,
    enum: FilmOrderEnum,
    default: FilmOrderEnum.RATING,
    description: 'Сортировка',
  })
  readonly order?: keyof typeof FilmOrderEnum | undefined;

  @ApiProperty({
    required: false,
    enum: FilmTypeEnum,
    default: FilmTypeEnum.ALL,
    description: 'Тип фильма',
  })
  readonly type?: keyof typeof FilmTypeEnum | undefined;

  @ApiProperty({
    required: false,
    default: 0,
    type: Number,
    description: 'Минимальный рейтинг',
  })
  readonly ratingFrom?: string | undefined;

  @ApiProperty({
    required: false,
    default: 10,
    type: Number,
    description: 'Максимальный рейтинг',
  })
  readonly ratingTo?: string | undefined;

  @ApiProperty({
    required: false,
    default: 1000,
    type: Number,
    description: 'Минимальный год',
  })
  readonly yearFrom?: string | undefined;

  @ApiProperty({
    required: false,
    default: 3000,
    type: Number,
    description: 'Максимальный год',
  })
  readonly yearTo?: string | undefined;

  @ApiProperty({
    required: false,
  })
  readonly imdbId?: string | undefined;

  @ApiProperty({
    required: false,
    description: 'Ключевое слово, которое встречается в названии фильма',
  })
  readonly keyword?: string | undefined;

  @ApiProperty({
    required: false,
    default: '1',
    type: Number,
    description: 'Номер страницы',
  })
  readonly page?: string | undefined;
}

export class GetAllFilmsQueriesParamsDto {
  readonly countries?: string | undefined;
  readonly genres?: string | undefined;
  readonly order?: keyof typeof FilmOrderEnum | undefined;
  readonly type?: keyof typeof FilmTypeEnum | undefined;
  readonly ratingFrom?: number | undefined;
  readonly ratingTo?: number | undefined;
  readonly yearFrom?: number | undefined;
  readonly yearTo?: number | undefined;
  readonly imdbId?: string | undefined;
  readonly keyword?: string | undefined;
  readonly page?: number | undefined;
}

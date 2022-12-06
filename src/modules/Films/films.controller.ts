import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { getIdsFromString, queryNumberCheck } from '../../utility';
import { GetAllFilmsDto, GetAllFilmsQueriesDto } from './dto/films.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Success get films',
    type: GetAllFilmsDto,
  })
  @ApiBadRequestResponse({
    description: 'Wrong filter format',
  })
  getAll(
    @Query()
    {
      countries,
      genres,
      order,
      type,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
      imdbId,
      keyword,
      page,
    }: GetAllFilmsQueriesDto,
  ) {
    const queryParams = {
      countries: countries
        ? getIdsFromString(countries, 'countries')
        : undefined,
      genres: genres ? getIdsFromString(genres, 'genres') : undefined,
      order: order || undefined,
      type: type || undefined,
      ratingFrom: ratingFrom
        ? queryNumberCheck(ratingFrom, 'ratingFrom')
        : undefined,
      ratingTo: ratingTo ? queryNumberCheck(ratingTo, 'ratingTo') : undefined,
      yearFrom: yearFrom ? queryNumberCheck(yearFrom, 'yearFrom') : undefined,
      yearTo: yearTo ? queryNumberCheck(yearTo, 'yearTo') : undefined,
      imdbId: imdbId || undefined,
      keyword: keyword || undefined,
      page: page ? queryNumberCheck(page, 'page') : undefined,
    };

    return this.filmsService.findAll(queryParams);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('filters')
  @CacheTTL(60 * 60) // 1 hour
  @Get('/filters')
  gitFilters() {
    return this.filmsService.getFilters();
  }
}

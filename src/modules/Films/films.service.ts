import { HttpService } from '@nestjs/axios';
import {
  Dependencies,
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { CACHE_KEYS_ENUM, KINOPOISK_API_ENUM } from '../../constants';
import {
  GetAllFilmsDto,
  GetAllFilmsQueriesParamsDto,
  GetAllFiltersDto,
} from './dto/films.dto';
import * as config from 'config';
import { Cache } from 'cache-manager';

@Injectable()
@Dependencies(HttpService)
export class FilmsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async findAll(
    queryParams: GetAllFilmsQueriesParamsDto,
  ): Promise<GetAllFilmsDto> {
    const url = `${config.get('urls.kinopoisk.base')}/${
      KINOPOISK_API_ENUM.FILMS
    }`;
    const { data } = await this.httpService.axiosRef.get<GetAllFilmsDto>(url, {
      headers: {
        'X-API-KEY': process.env.KINOPOISK_APIKEY,
        'Content-Type': 'application/json',
      },
      params: queryParams,
    });

    return await data;
  }

  async getFilters(): Promise<GetAllFiltersDto> {
    const url = `${config.get('urls.kinopoisk.base')}/${
      KINOPOISK_API_ENUM.FILTERS
    }`;

    try {
      const cachedData = await this.cacheService.get<GetAllFiltersDto>(
        CACHE_KEYS_ENUM.FILTERS,
      );

      if (cachedData) {
        return cachedData;
      }

      const { data } = await this.httpService.axiosRef.get<GetAllFiltersDto>(
        url,
        {
          headers: {
            'X-API-KEY': process.env.KINOPOISK_APIKEY,
            'Content-Type': 'application/json',
          },
        },
      );

      await this.cacheService.set(CACHE_KEYS_ENUM.FILTERS, data);

      return await data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

import { HttpService } from "@nestjs/axios";
import {
  CACHE_MANAGER,
  Dependencies,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import * as config from "config";

import { CacheKeysEnum, KinopoiskApiEnum } from "../../constants";
import {
  GetAllFilmsDto,
  GetAllFilmsQueriesParamsDto,
  GetAllFiltersDto,
} from "./dto/films.dto";

@Injectable()
@Dependencies(HttpService)
export default class FilmsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  public async findAll(
    queryParams?: GetAllFilmsQueriesParamsDto,
  ): Promise<GetAllFilmsDto> {
    try {
      const url = `${config.get("urls.kinopoisk.base")}/${
        KinopoiskApiEnum.FILMS
      }`;
      const { data } = await this.httpService.axiosRef.get<GetAllFilmsDto>(
        url,
        {
          headers: {
            "X-API-KEY": config.get("kinopoiskKey"),
            "Content-Type": "application/json",
          },
          params: queryParams,
        },
      );

      return await data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getFilters(): Promise<GetAllFiltersDto> {
    const url = `${config.get("urls.kinopoisk.base")}/${
      KinopoiskApiEnum.FILTERS
    }`;

    try {
      const cachedData = await this.cacheService.get<GetAllFiltersDto>(
        CacheKeysEnum.FILTERS,
      );

      if (cachedData) {
        return cachedData;
      }

      const { data } = await this.httpService.axiosRef.get<GetAllFiltersDto>(
        url,
        {
          headers: {
            "X-API-KEY": config.get("kinopoiskKey"),
            "Content-Type": "application/json",
          },
        },
      );

      await this.cacheService.set(CacheKeysEnum.FILTERS, data);

      return await data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

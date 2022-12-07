import { HttpService } from "@nestjs/axios";
import {
  Dependencies,
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import * as config from "config";
import { Cache } from "cache-manager";
import { CACHE_KEYS_ENUM, KINOPOISK_API_ENUM } from "../../constants";
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

  async findAll(
    queryParams?: GetAllFilmsQueriesParamsDto,
  ): Promise<GetAllFilmsDto> {
    try {
      const url = `${config.get("urls.kinopoisk.base")}/${
        KINOPOISK_API_ENUM.FILMS
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

  async getFilters(): Promise<GetAllFiltersDto> {
    const url = `${config.get("urls.kinopoisk.base")}/${
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
            "X-API-KEY": config.get("kinopoiskKey"),
            "Content-Type": "application/json",
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

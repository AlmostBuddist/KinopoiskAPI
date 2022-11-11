import { HttpService } from '@nestjs/axios';
import {
  Dependencies,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { KinopoiskAPI } from '../../constants';
import { GetAllFilmsDto, GetAllFilmsQueriesParamsDto } from './dto/films.dto';
import * as config from 'config';

@Injectable()
@Dependencies(HttpService)
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(
    queryParams: GetAllFilmsQueriesParamsDto,
  ): Promise<GetAllFilmsDto> {
    const url = `${config.get('urls.kinopoisk.base')}/${KinopoiskAPI.films}`;
    const { data } = await firstValueFrom(
      this.httpService
        .get<GetAllFilmsDto>(url, {
          headers: {
            'X-API-KEY': process.env.KINOPOISK_APIKEY,
            'Content-Type': 'application/json',
          },
          params: queryParams,
        })
        .pipe(
          catchError((error: AxiosError<{ message: string }>) => {
            throw new HttpException(
              error.response.data.message,
              HttpStatus.BAD_GATEWAY,
            );
          }),
        ),
    );

    return data;
  }
}

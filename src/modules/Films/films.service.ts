import { HttpService } from '@nestjs/axios';
import { Dependencies, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { KinopoiskAPI } from '../../constants';
import { GetAllFilms, GetAllFilmsQueriesParamsDto } from './dto/films.dto';

@Injectable()
@Dependencies(HttpService)
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(
    queryParams: GetAllFilmsQueriesParamsDto,
  ): Promise<GetAllFilms> {
    const url = `${process.env.KINOPOISK_BASE_URL}/${KinopoiskAPI.films}`;
    const { data } = await firstValueFrom(
      this.httpService
        .get<GetAllFilms>(url, {
          headers: {
            'X-API-KEY': process.env.KINOPOISK_APIKEY,
            'Content-Type': 'application/json',
          },
          params: queryParams,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened! ' + error;
          }),
        ),
    );

    return data;
  }
}

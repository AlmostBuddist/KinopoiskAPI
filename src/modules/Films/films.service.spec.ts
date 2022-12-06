import { FilmsService } from './films.service';
import { films } from './testData';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('Films Service', () => {
  let filmsService: FilmsService;
  let httpService: HttpService;

  beforeEach(async () => {
    httpService = new HttpService();

    const HttpServiceProvider = {
      provide: HttpService,
      useFactory: () => ({
        get: jest.fn(() => of({ data: films })),
      }),
    };

    const filmsModule: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, HttpServiceProvider],
    }).compile();

    filmsService = filmsModule.get<FilmsService>(FilmsService);
    httpService = filmsModule.get<HttpService>(HttpService);
  });

  describe('Defined', () => {
    it('should be defined', async () => {
      expect(filmsService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be called', async () => {
      filmsService.findAll({});

      expect(httpService.get).toBeCalled();
    });

    it('should be called httpService', async () => {
      filmsService.findAll({}).then((res) => expect(res).toBe(films));
    });
  });
});

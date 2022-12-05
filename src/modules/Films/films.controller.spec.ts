import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { HttpModule } from '@nestjs/axios';
import { films } from './testData';

describe('Films Controller', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const FilmsServiceProvider = {
      provide: FilmsService,
      useFactory: () => ({
        findAll: jest.fn(() => films),
      }),
    };

    const filmsModule: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FilmsController],
      providers: [FilmsServiceProvider],
    }).compile();

    filmsController = filmsModule.get<FilmsController>(FilmsController);
    filmsService = filmsModule.get<FilmsService>(FilmsService);
  });

  describe('Defined', () => {
    it('should be defined', async () => {
      expect(filmsController).toBeDefined();
    });
  });

  describe('Get all films', () => {
    it('Should be called', async () => {
      filmsController.getAll({});

      expect(filmsService.findAll).toHaveBeenCalled();
    });

    it('Should return a list of films', async () => {
      expect(filmsService.findAll({})).toBe(films);
    });
  });
});

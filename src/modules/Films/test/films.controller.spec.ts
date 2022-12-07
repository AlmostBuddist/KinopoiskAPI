import { HttpModule } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import FilmsController from "../films.controller";
import FilmsService from "../films.service";
import {
  FILMS_REPOSITORY_MOCK,
  FILMS_REPOSITORY_MOCK_GET_ALL_CONTROLLER,
  FILMS_REPOSITORY_MOCK_GET_FILTERS_CONTROLLER,
  FILMS_TEST_DATA,
  FILTER_TEST_DATA,
} from "./films.mock";

describe("Films Controller", () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const FilmsServiceProvider = {
      provide: FilmsService,
      useValue: FILMS_REPOSITORY_MOCK,
    };

    const CacheManagerProvider = {
      provide: CACHE_MANAGER,
      useValue: {},
    };

    const filmsModule: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FilmsController],
      providers: [FilmsServiceProvider, CacheManagerProvider],
    }).compile();

    filmsController = filmsModule.get<FilmsController>(FilmsController);
    filmsService = filmsModule.get<FilmsService>(FilmsService);
  });

  describe("Defined", () => {
    it("should be defined", async () => {
      expect(filmsController).toBeDefined();
    });
  });

  describe("Get all films", () => {
    beforeAll(() => {
      FILMS_REPOSITORY_MOCK.findAll = FILMS_REPOSITORY_MOCK_GET_ALL_CONTROLLER;
    });

    it("filmsService.findAll method should be called", async () => {
      filmsController.getAll({});

      expect(filmsService.findAll).toBeCalled();
    });

    it("Should return a list of films", async () => {
      const data = await filmsService.findAll();

      expect(data).toBe(FILMS_TEST_DATA);
    });
  });

  describe("Get all filters", () => {
    beforeAll(() => {
      FILMS_REPOSITORY_MOCK.getFilters =
        FILMS_REPOSITORY_MOCK_GET_FILTERS_CONTROLLER;
    });
    it("filmsService.getFilters method should be called", async () => {
      filmsController.gitFilters();

      expect(filmsService.getFilters).toBeCalled();
    });

    it("Should return a list of filters", async () => {
      const data = await filmsService.getFilters();

      expect(data).toBe(FILTER_TEST_DATA);
    });
  });
});

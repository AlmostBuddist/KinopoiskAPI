import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
import {
  CACHE_MANAGER_REPOSITORY_MOCK,
  CACHE_MANAGER_REPOSITORY_MOCK_HAVE_CACHE,
  CACHE_MANAGER_REPOSITORY_MOCK_NO_CACHE,
  FILMS_REPOSITORY_MOCK,
  FILMS_REPOSITORY_MOCK_GET_ALL,
  FILMS_REPOSITORY_MOCK_GET_FILTERS,
  FILMS_TEST_DATA,
  FILTER_TEST_DATA,
  HTTP_REPOSITORY_MOCK,
  HTTP_REPOSITORY_MOCK_GET_ALL,
  HTTP_REPOSITORY_MOCK_GET_FILTERS,
} from "./films.mock";
import FilmsService from "../films.service";

describe("Films Service", () => {
  let filmsService: FilmsService;
  let httpService: HttpService;
  let cacheService: Cache;

  beforeEach(async () => {
    const FilmsServiceProvider = {
      provide: FilmsService,
      useValue: FILMS_REPOSITORY_MOCK,
    };

    const HttpServiceProvider = {
      provide: HttpService,
      useValue: HTTP_REPOSITORY_MOCK,
    };

    const CacheManagerProvider = {
      provide: CACHE_MANAGER,
      useValue: CACHE_MANAGER_REPOSITORY_MOCK,
    };

    const filmsModule: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsServiceProvider,
        HttpServiceProvider,
        CacheManagerProvider,
      ],
    }).compile();

    filmsService = filmsModule.get<FilmsService>(FilmsService);
    httpService = filmsModule.get<HttpService>(HttpService);
    cacheService = filmsModule.get<Cache>(CACHE_MANAGER);
  });

  describe("findAll", () => {
    beforeAll(() => {
      HTTP_REPOSITORY_MOCK.axiosRef.get = HTTP_REPOSITORY_MOCK_GET_ALL;
      FILMS_REPOSITORY_MOCK.findAll = FILMS_REPOSITORY_MOCK_GET_ALL;
    });

    it("httpService should be called", async () => {
      filmsService.findAll();

      expect(httpService.axiosRef.get).toBeCalled();
    });

    it("should be returns list of films", async () => {
      const data = await filmsService.findAll();

      expect(data).toBe(FILMS_TEST_DATA);
    });
  });

  describe("Get Filters", () => {
    beforeAll(() => {
      HTTP_REPOSITORY_MOCK.axiosRef.get = HTTP_REPOSITORY_MOCK_GET_FILTERS;

      FILMS_REPOSITORY_MOCK.getFilters = FILMS_REPOSITORY_MOCK_GET_FILTERS;
    });

    describe("No cache", () => {
      beforeAll(() => {
        CACHE_MANAGER_REPOSITORY_MOCK.get =
          CACHE_MANAGER_REPOSITORY_MOCK_NO_CACHE;
      });

      it("httpService and cacheService should be called", async () => {
        await filmsService.getFilters();

        expect(cacheService.get).toBeCalled();
        expect(httpService.axiosRef.get).toBeCalled();
      });

      it("Filter should be returned", async () => {
        const data = await filmsService.getFilters();

        expect(data).toBe(FILTER_TEST_DATA);
      });
    });

    describe("Have cache", () => {
      beforeAll(() => {
        CACHE_MANAGER_REPOSITORY_MOCK.get =
          CACHE_MANAGER_REPOSITORY_MOCK_HAVE_CACHE;
      });

      it("cacheService should be called", async () => {
        await filmsService.getFilters();

        expect(cacheService.get).toBeCalled();
      });

      it("Filter should be returned", async () => {
        const data = await filmsService.getFilters();

        expect(data).toBe(FILTER_TEST_DATA);
      });
    });
  });
});

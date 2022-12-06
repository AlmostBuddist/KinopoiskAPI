import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { CACHE_MANAGER } from "@nestjs/common";
import { films, filters } from "./testData";
import FilmsService from "./films.service";

describe("Films Service", () => {
  let filmsService: FilmsService;
  let httpService: HttpService;

  beforeEach(async () => {
    httpService = new HttpService();

    const HttpServiceProvider = {
      provide: HttpService,
      useFactory: () => ({
        axiosRef: jest.fn(() => {}),
      }),
    };

    const CacheManagerProvider = {
      provide: CACHE_MANAGER,
      useFactory: () => ({
        get: jest.fn(() => filters),
      }),
    };

    const filmsModule: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, HttpServiceProvider, CacheManagerProvider],
    }).compile();

    filmsService = filmsModule.get<FilmsService>(FilmsService);
    httpService = filmsModule.get<HttpService>(HttpService);
  });

  describe("Defined", () => {
    it("should be defined", async () => {
      expect(filmsService).toBeDefined();
    });
  });

  describe("findAll", () => {
    beforeEach(() => {
      httpService.axiosRef.get = jest
        .fn()
        .mockImplementation(() => of({ data: films }));
    });

    it("httpService should be called", async () => {
      filmsService.findAll();

      expect(httpService.axiosRef.get).toBeCalled();
    });

    it("should be returns list of films", async () => {
      const data = await filmsService.findAll();
      expect(data).toBe(films);
    });
  });

  describe("getFilters", () => {
    beforeEach(() => {
      httpService.axiosRef.get = jest.fn().mockImplementation(() => filters);
    });
    describe("No cache", () => {
      test("httpService should be called", () => {
        filmsService.getFilters();

        expect(httpService.axiosRef.get).toBeCalled();
      });

      test("Filter should be returned", () => {
        expect(filmsService.getFilters()).toBe(filters);
      });
    });
  });
});

import { GetAllFilmsDto, GetAllFiltersDto } from "../dto/films.dto";

/* <---------------------- mock_data ----------------------> */

export const FILMS_TEST_DATA: GetAllFilmsDto = {
  total: 100,
  totalPages: 5,
  items: [
    {
      kinopoiskId: 1252447,
      imdbId: "tt9257638",
      nameRu: "Лорды раздевалки",
      nameEn: null,
      nameOriginal: "Lords of the Lockerroom",
      countries: [
        {
          country: "США",
        },
      ],
      genres: [
        {
          genre: "спорт",
        },
        {
          genre: "для взрослых",
        },
      ],
      ratingKinopoisk: 9.4,
      ratingImdb: 9.3,
      year: 1999,
      type: "FILM",
      posterUrl:
        "https://kinopoiskapiunofficial.tech/images/posters/kp/1252447.jpg",
      posterUrlPreview:
        "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1252447.jpg",
    },
    {
      kinopoiskId: 962472,
      imdbId: "tt5396486",
      nameRu: "Hot Wheels. За гранью воображения",
      nameEn: null,
      nameOriginal: "Team Hot Wheels: The Skills to Thrill",
      countries: [
        {
          country: "США",
        },
      ],
      genres: [
        {
          genre: "мультфильм",
        },
      ],
      ratingKinopoisk: 9.3,
      ratingImdb: 7.1,
      year: 2015,
      type: "FILM",
      posterUrl:
        "https://kinopoiskapiunofficial.tech/images/posters/kp/962472.jpg",
      posterUrlPreview:
        "https://kinopoiskapiunofficial.tech/images/posters/kp_small/962472.jpg",
    },
  ],
};

export const FILTER_TEST_DATA: GetAllFiltersDto = {
  genres: [{ id: 1, genre: "triller" }],
  countries: [{ id: 1, country: "USA" }],
};

/* <---------------------- http ----------------------> */

export const HTTP_REPOSITORY_MOCK = {
  axiosRef: {
    get: jest.fn(),
  },
};

export const HTTP_REPOSITORY_MOCK_GET_ALL = jest
  .fn()
  .mockImplementation(async () => FILMS_TEST_DATA);

export const HTTP_REPOSITORY_MOCK_GET_FILTERS = jest
  .fn()
  .mockImplementation(async () => FILTER_TEST_DATA);

/* <---------------------- cache ----------------------> */

export const CACHE_MANAGER_REPOSITORY_MOCK = {
  get: jest.fn(),
};

export const CACHE_MANAGER_REPOSITORY_MOCK_NO_CACHE = jest
  .fn()
  .mockImplementation(async () => undefined);

export const CACHE_MANAGER_REPOSITORY_MOCK_HAVE_CACHE = jest
  .fn()
  .mockImplementation(async () => FILTER_TEST_DATA);

/* <---------------------- filmsService ----------------------> */

export const FILMS_REPOSITORY_MOCK = {
  findAll: jest.fn(),
  getFilters: jest.fn(),
};

export const FILMS_REPOSITORY_MOCK_GET_ALL = jest
  .fn()
  .mockImplementation(async () => {
    const response = await HTTP_REPOSITORY_MOCK.axiosRef.get();

    return response;
  });

export const FILMS_REPOSITORY_MOCK_GET_FILTERS = jest
  .fn()
  .mockImplementation(async () => {
    const cache = await CACHE_MANAGER_REPOSITORY_MOCK.get("filters");
    if (cache) {
      return FILTER_TEST_DATA;
    }

    const response = await HTTP_REPOSITORY_MOCK.axiosRef.get("http://some_url");

    return response;
  });

export const FILMS_REPOSITORY_MOCK_GET_ALL_CONTROLLER = jest
  .fn()
  .mockImplementation(async () => {
    return FILMS_TEST_DATA;
  });

export const FILMS_REPOSITORY_MOCK_GET_FILTERS_CONTROLLER = jest
  .fn()
  .mockImplementation(async () => {
    return FILTER_TEST_DATA;
  });

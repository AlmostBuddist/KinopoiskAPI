/* eslint-disable */

module.exports = {
  redis: {
    socket: {
      host: 'localhost',
      port: 6379,
    },
    ttl: 60 * 60, // 1 hour
  },
  App: {
    port: '8000',
  },

  urls: {
    kinopoisk: {
      base: 'https://kinopoiskapiunofficial.tech',
    },
  },
};

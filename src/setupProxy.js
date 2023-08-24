/* eslint-disable no-undef */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/movies?tmdb_id?", {
      target: "https://api.kinocheck.de/",
      changeOrigin: true,
    })
  );
};

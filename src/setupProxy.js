const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Địa chỉ của server Express.js (backend)
      changeOrigin: true,
    })
  );
};

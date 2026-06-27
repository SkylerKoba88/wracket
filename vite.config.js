import { defineConfig } from 'vite';
import { resolve } from 'path';

const pageRoutes = {
  '/shop': '/pages/shop.html',
  '/gallery': '/pages/gallery.html',
  '/maintenance': '/pages/maintenance.html',
  '/comingsoon': '/pages/comingsoon.html',
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'pages/shop.html'),
        gallery: resolve(__dirname, 'pages/gallery.html'),
        maintenance: resolve(__dirname, 'pages/maintenance.html'),
        comingsoon: resolve(__dirname, 'pages/comingsoon.html'),
      },
    },
  },
  plugins: [
    {
      name: 'vite-multi-page-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' || !req.headers.accept?.includes('text/html')) {
            return next();
          }

          const url = req.url?.split('?')[0].split('#')[0];
          if (url && pageRoutes[url]) {
            req.url = pageRoutes[url];
          }

          next();
        });
      },
    },
  ],
});

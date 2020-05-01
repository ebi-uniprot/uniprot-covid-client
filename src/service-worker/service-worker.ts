import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Refer to https://developers.google.com/web/tools/workbox/reference-docs/latest/
// for documentation about this whole file's use of workbox

const MINUTE = 60; // seconds
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

cleanupOutdatedCaches();
// eslint-disable-next-line
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST); // eslint-disable-line

/* routes: */

// respond to all navigation requests with this document
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));

// routing recipes
// ORDER MATTERS!
// see: https://developers.google.com/web/tools/workbox/guides/common-recipes

// https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/A1L3X0?page_size=100&type=family
// external APIs - Stale While Revalidate
registerRoute(
  /^https?:\/\/((www|api)\.rhea-db\.org|api\.geneontology\.org|www\.ebi\.ac\.uk\/interpro\/api)\//,
  new StaleWhileRevalidate({
    cacheName: 'external-APIs',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 4 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// images - Cache First
registerRoute(
  /\.(?:png|gif|jpe?g|webp|svg|ico)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 5 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// external images - Cache First
registerRoute(
  /^https?:\/\/.*?\.(?:png|gif|jpe?g|webp|svg)$/,
  new CacheFirst({
    cacheName: 'external-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 3 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Google fonts stylesheets - Stale While Revalidate
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
);

// fonts - Cache First
registerRoute(
  /^https?:\/\/.*?\.(?:woff2?|ttf|eot)$/,
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 3 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 'X-UniProt-Release' header not available here, right? 🤔
// UniProt API - Stale While Revalidate
registerRoute(
  /^https?:\/\/www(dev)?.ebi\.ac\.uk\/uniprot\/api\//,
  new StaleWhileRevalidate({
    cacheName: 'API',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 8 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// stale while revalidate until we find a way to read and process the
// 'X-UniProt-Release' header and dump the cache when that changes
// Proteins API - Stale While Revalidate
registerRoute(
  /^https?:\/\/www(dev)?.ebi\.ac\.uk\/proteins\/api\//,
  new StaleWhileRevalidate({
    cacheName: 'API',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 8 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

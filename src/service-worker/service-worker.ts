import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

import * as patterns from './url-patterns';

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
  patterns.externalAPIs,
  new StaleWhileRevalidate({
    cacheName: 'external-APIs',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200, 204] }),
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 4 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// images - Cache First
registerRoute(
  patterns.sameOriginImagesAndFonts,
  new CacheFirst({
    cacheName: 'images-and-fonts',
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
  patterns.externalImages,
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
  patterns.googleFontsStylesheets,
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
);

// fonts - Cache First
registerRoute(
  patterns.googleFontsStylesheets,
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

// stale while revalidate until we find a way to read and process the
// 'X-UniProt-Release' header and dump the cache when that changes
// UniProt API - Stale While Revalidate
registerRoute(
  patterns.uniprotAPIs,
  new StaleWhileRevalidate({
    cacheName: 'APIs',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 750,
        maxAgeSeconds: 8 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

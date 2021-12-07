import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from 'redux-bundler';

import createAuthBundle from './create-keycloak-auth-bundle';
import createJwtApiBundle from './create-jwt-api-bundle';

import routeBundle from './route-bundle';

import cache from '../cache';

// App Bundles
import modalBundle from './modal-bundle';
import officeBundle from './office-bundle';

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  // Application Bundles
  modalBundle,
  routeBundle,
  officeBundle,
  createAuthBundle({
    name: 'auth',
    host: process.env.REACT_APP_AUTH_HOST,
    realm: 'workforce',
    client: 'workforce',
    redirectUrl: process.env.REACT_APP_AUTH_REDIRECT_URL,
    refreshInterval: 120,
    sessionEndWarning: 600,
  }),
  createJwtApiBundle({
    skipTokenConfig: {
      custom: ({ method, url }) => {
        // Skip including JWT Bearer Token on all GET requests UNLESS URL pathaname starts with /my_
        if (method === 'GET') {
          const urlObj = new URL(url);
          if (urlObj.pathname && urlObj.pathname.slice(0, 4) === '/my_') {
            return false;
          }
          return true;
        }
        // Include JWT Bearer Token on all other requests
        return false;
      },
    },
  })
);

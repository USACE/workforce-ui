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
import breadcrumbBundle from './breadcrumb-bundle';
import expertiseBundle from './expertise-bundle';
import redirectBundle from './redirect-bundle';
import modalBundle from './modal-bundle';
import officeBundle from './office-bundle';
import groupBundle from './group-bundle';
import positionBundle from './position-bundle';
import occupationBundle from './occupation-bundle';
import payPlanBundle from './pay-plan-bundle';
import occupancyBundle from './occupancy-bundle';
import seriesMetricsBundle from './series-metrics-bundle';
import credentialBundle from './credential-bundle';
import roleRequestBundle from './role-request-bundle';
import statsBundle from './stats-bundle';

//Admin
import roleApprovalBundle from './role-approval-bundle';

const mockTokens = {
  ADMIN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJZYVZSTS0xVmp1LWR2N2NEZ0k5ZnJkNVRtZFl1RU5QbWRoV0NaZU1TWmMifQ.eyJleHAiOjE4Mzk1MDU1MzUsImlhdCI6MTYzOTUwNTIzNSwianRpIjoiOTBmN2YzYmYtZTkzNC00NWM2LTg1OGUtNzVjMGM2NDdkZTNkIiwiaXNzIjoiaHR0cHM6Ly9tb2NrLXNlcnZlciIsImF1ZCI6WyJjdW11bHVzIiwid29ya2ZvcmNlIiwiYWNjb3VudCJdLCJzdWIiOiI5MmUxMGQ5My1iNDU0LTQ0Y2ItOWM3Zi01ZGVhZjBkMTZmMTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3b3JrZm9yY2UiLCJzZXNzaW9uX3N0YXRlIjoiYzI4YTMzZmUtNzM4MC00OTI4LWFkNDYtN2JmZTFiY2M2OTVkIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXdhdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Indvcmtmb3JjZSI6eyJyb2xlcyI6WyJhcHBsaWNhdGlvbi5hZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsInByZWZlcnJlZF91c2VybmFtZSI6Indvcmtmb3JjZS5hZG1pbiIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.Aip3doJZ13paloCD-tNY88zuMpkWbKYTASrTXITcvTg',
  USER: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJZYVZSTS0xVmp1LWR2N2NEZ0k5ZnJkNVRtZFl1RU5QbWRoV0NaZU1TWmMifQ.eyJleHAiOjE4Mzg1NTU5ODgsImlhdCI6MTYzODU1NTY4OCwianRpIjoiY2YxMWIzMGEtZDg3Zi00OTU2LWEwNjctMTE0OTJjMTZkYjk2IiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wLWF1dGguY29ycHMuY2xvdWQvYXV0aC9yZWFsbXMvd2F0ZXIiLCJhdWQiOlsiYTJ3IiwiYWNjb3VudCJdLCJzdWIiOiIzMmUxYjgzMi1hOGVhLTRiOWMtYWIwNC1hNzI0NmNlNzMyMWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjdW11bHVzIiwic2Vzc2lvbl9zdGF0ZSI6IjVhNTgyZjNlLWIyYWItNDA2OS05N2I1LTIwZWM0NmQ1MmFmZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy13YXRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJjdW11bHVzIjp7InJvbGVzIjpbXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b2tlbi5tb2NrLnVzZXIiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.E5v4rF4xnGVNOkRJPt5HUsIFzYbo7KUJtoiqgR_5XaE',
};
const mockUser = import.meta.env.VITE_AUTH_MOCK_USER
  ? import.meta.env.VITE_AUTH_MOCK_USER.toUpperCase()
  : null;

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  // Application Bundles
  breadcrumbBundle,
  expertiseBundle,
  redirectBundle,
  groupBundle,
  modalBundle,
  routeBundle,
  officeBundle,
  positionBundle,
  occupationBundle,
  payPlanBundle,
  occupancyBundle,
  seriesMetricsBundle,
  credentialBundle,
  roleRequestBundle,
  roleApprovalBundle,
  statsBundle,
  createAuthBundle({
    name: 'auth',
    host: import.meta.env.VITE_AUTH_HOST,
    realm: 'water',
    client: 'workforce',
    redirectUrl: import.meta.env.VITE_AUTH_REDIRECT_URL,
    refreshInterval: 120,
    sessionEndWarning: 600,
    mock:
      import.meta.env.VITE_NODE_ENV === 'development' && mockUser && mockTokens[mockUser]
        ? true
        : false,
    mockToken: mockUser ? mockTokens[mockUser] : null,
  }),
  createJwtApiBundle({
    skipTokenConfig: {
      custom: ({ method, url }) => {
        // Skip including JWT Bearer Token on all GET requests UNLESS URL pathaname starts with /my_
        // or it's defined in token_routes array
        if (method === 'GET') {
          const urlObj = new URL(url);
          const token_routes = {
            '/role_requests': true,
            '/my_role_requests': true,
          };
          if (urlObj.pathname && token_routes[urlObj.pathname]) {
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

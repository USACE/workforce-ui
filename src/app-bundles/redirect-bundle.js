import { createSelector } from 'redux-bundler';

// Inspired by: https://reduxbundler.com/#what-about-async-stuff
const redirectBundle = {
  name: 'redirect',
  reactRedirect: createSelector('selectRouteInfo', (routeInfo) => {
    if (routeInfo.pattern === '/offices/:office_symbol/groups') {
      return {
        actionCreator: 'doUpdateUrl',
        args: [`/offices/${routeInfo.params.office_symbol}`.toLowerCase()],
      };
    }
    // remove trailing slash
    if (routeInfo.url !== '/' && routeInfo.url.endsWith('/')) {
      return {
        actionCreator: 'doReplaceUrl',
        args: [routeInfo.url.slice(0, -1)],
      };
    }
  }),
};

export default redirectBundle;

import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'office',
  uid: 'symbol',
  prefetch: true,
  staleAfter: 0, //milliseconds; 1Hour
  persist: true,
  routeParam: 'office_symbol',
  getTemplate: `${apiUrl}/offices`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: ['selectRouteParams'],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectOfficeBySymbol: createSelector(
      'selectOfficeItemsArray',
      (offices) => {
        const obj = {};
        offices.forEach((f) => {
          obj[f.symbol] = f;
        });

        return obj;
      }
    ),
    selectOfficeActive: createSelector(
      'selectOfficeBySymbol',
      'selectRouteParams',
      (officeBySymbol, routeParams) => {
        if (!routeParams['office_symbol']) {
          return null;
        }

        return officeBySymbol[routeParams['office_symbol'].toUpperCase()];
      }
    ),
  },
});

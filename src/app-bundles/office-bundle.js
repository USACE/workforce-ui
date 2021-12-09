import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'office',
  uid: 'symbol',
  prefetch: true,
  staleAfter: 0,
  persist: false,
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
    selectOfficeActive: createSelector(
      'selectOfficeItemsObject',
      'selectRouteParams',
      (officeItemsObject, routeParams) => {
        if (!routeParams['office_symbol']) {
          return null;
        }

        return officeItemsObject[routeParams['office_symbol'].toUpperCase()];
      }
    ),
  },
});

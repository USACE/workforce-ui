import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'office',
  uid: 'symbol',
  prefetch: true,
  staleAfter: 900000, // 900000 milliseconds = 15min
  persist: true,
  routeParam: 'office_symbol',
  getTemplate: `${apiUrl}/offices`,
  putTemplate: ':/',
  postTemplate: ':/',
  deleteTemplate: ':/',
  fetchActions: [],
  urlParamSelectors: ['selectRouteParams'],
  forceFetchActions: [],
  sortBy: 'name',
  sortAsc: true,
  mergeItems: false,
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'OFFICE_FETCH_ONE_STARTED':
      case 'OFFICE_FETCH_ONE_FINISHED':
      case 'OFFICE_FETCH_ONE_ERROR':
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
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
    doOfficeFetchOne:
      (officeSymbol) =>
      ({ dispatch, store, apiGet }) => {
        dispatch({ type: 'OFFICE_FETCH_ONE_STARTED' });
        apiGet(`${apiUrl}/offices/${officeSymbol}`, (err, respObj) => {
          if (!err) {
            dispatch({
              type: 'OFFICE_FETCH_ONE_FINISHED',
              payload: {
                [respObj.symbol]: respObj,
              },
            });
          } else {
            dispatch({ type: 'OFFICE_FETCH_ONE_ERROR', payload: {} });
          }
        });
      },
  },
  persistFurther: ['OFFICE_FETCH_ONE_STARTED', 'OFFICE_FETCH_ONE_FINISHED'],
});

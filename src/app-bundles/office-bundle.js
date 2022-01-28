import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'office',
  uid: 'symbol',
  prefetch: true,
  staleAfter: 300000, // 300000 milliseconds = 5min
  persist: true,
  routeParam: 'office_symbol',
  getTemplate: `${apiUrl}/offices/:office_symbol`,
  putTemplate: ':/',
  postTemplate: ':/',
  deleteTemplate: ':/',
  fetchActions: [],
  urlParamSelectors: ['selectRouteParams'],
  forceFetchActions: [
    'POSITION_SAVE_FINISHED',
    'POSITION_DELETE_FINISHED',
    'OCCUPANCY_SAVE_FINISHED',
    'GROUP_VERIFY_FINISHED',
  ],
  sortBy: 'name',
  sortAsc: true,
  mergeItems: true,
  state: {
    _shouldFetchAll: true,
    _isLoadingAll: false,
    _errLoadingAll: null,
  },
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'OFFICE_SHOULD_FETCHALL':
        return { ...state, _shouldFetchAll: true };
      case 'OFFICE_FETCHALL_STARTED':
      case 'OFFICE_FETCHALL_FINISHED':
      case 'OFFICE_FETCHALL_ERROR':
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
    selectOfficeShouldFetchAll: (state) => state.office._shouldFetchAll,
    doOfficeFetchAll:
      () =>
      ({ dispatch, store, apiGet }) => {
        dispatch({
          type: 'OFFICE_FETCHALL_STARTED',
          payload: { _shouldFetchAll: false, _isLoadingAll: true },
        });
        apiGet(`${apiUrl}/offices`, (err, respObj) => {
          if (!err) {
            let _obj = {};
            respObj.forEach((item) => {
              _obj[item.symbol] = item;
            });
            dispatch({
              type: 'OFFICE_FETCHALL_FINISHED',
              payload: { _isLoadingAll: false, ..._obj },
            });
          } else {
            dispatch({
              type: 'OFFICE_FETCHALL_ERROR',
              payload: { _isLoadingAll: false, _errLoadingAll: err },
            });
          }
        });
      },
    doOfficeShouldFetchAll:
      () =>
      ({ dispatch, store }) => {
        dispatch({ type: 'OFFICE_SHOULD_FETCHALL' });
      },
    reactOfficeShouldFetchAll: (state) =>
      state.office._shouldFetchAll
        ? { actionCreator: 'doOfficeFetchAll' }
        : null,
  },

  persistFurther: ['OFFICE_FETCHALL_STARTED', 'OFFICE_FETCHALL_FINISHED'],
});

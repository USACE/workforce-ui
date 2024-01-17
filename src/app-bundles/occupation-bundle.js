import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = import.meta.env.VITE_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'occupation',
  uid: 'code',
  prefetch: true,
  staleAfter: 3600000, // 3600000 milliseconds = 1Hour
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/occupation_codes`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'code',
  mergeItems: false,
  sortAsc: true,
  addons: {
    selectOccupationSelected: createSelector(
      'selectQueryObject',
      'selectOccupationItemsObject',
      (queryObj, occupationObj) => {
        if (!queryObj.occupation) {
          return null;
        }
        return occupationObj[queryObj.occupation] || null;
      }
    ),
  },
});

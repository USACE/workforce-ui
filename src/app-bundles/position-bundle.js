import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'position',
  uid: 'id',
  prefetch: false,
  staleAfter: 0, //milliseconds; 1Hour
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/offices/:symbol/positions`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: [
    'URL_UPDATED',
    'OFFICE_FETCH_FINISHED',
    'OCCUPANCY_SAVE_FINISHED',
  ],
  urlParamSelectors: ['selectOfficeActive', 'selectGroupSelected'],
  forceFetchActions: [],
  sortBy: 'grade',
  mergeItems: false,
  sortAsc: false,
  addons: {
    selectPositionItemsActive: createSelector(
      'selectGroupSelected',
      'selectPositionItems',
      (group, positions) => {
        if (!group || !positions || !positions.length) {
          return [];
        }
        return positions.filter((p) => p.group_slug === group.slug);
      }
    ),
    selectPositionCountsByGroup: createSelector(
      'selectPositionItems',
      (positions) => {
        const obj = {};
        positions.forEach((p) => {
          if (!obj[p.group_slug]) {
            obj[p.group_slug] = { positions: 0, employees: 0, vacancies: 0 };
          }
          obj[p.group_slug].positions += 1;
          if (!p.current_occupancy) {
            obj[p.group_slug].vacancies += 1;
          } else {
            obj[p.group_slug].employees += 1;
          }
        });
        return obj;
      }
    ),
  },
});

import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiUrl = import.meta.env.VITE_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'position',
  uid: 'id',
  prefetch: true,
  staleAfter: 300000, // 300000 milliseconds = 5min
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/offices/:office_symbol/positions`,
  putTemplate: `${apiUrl}/offices/:office_symbol/positions/:item.id`,
  postTemplate: `${apiUrl}/offices/:office_symbol/positions`,
  deleteTemplate: `${apiUrl}/offices/:office_symbol/positions/:item.id`,
  fetchActions: ['URL_UPDATED'],
  urlParamSelectors: ['selectRouteParams'],
  forceFetchActions: [
    'POSITION_SAVE_FINISHED',
    'POSITION_DELETE_FINISHED',
    'OCCUPANCY_SAVE_FINISHED',
  ],
  sortBy: 'target_grade',
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

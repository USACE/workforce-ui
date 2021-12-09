import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiURL = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'group',
  uid: 'slug',
  prefetch: true,
  staleAfter: 0,
  persist: false,
  routeParam: 'group_id',
  getTemplate: `${apiURL}/offices/:symbol/groups`,
  putTemplate: `${apiURL}/offices/:symbol/groups/:item.slug`,
  postTemplate: `${apiURL}/offices/:symbol/groups`,
  deleteTemplate: `${apiURL}/offices/:symbol/groups/:item.slug`,
  fetchActions: ['URL_UPDATED', 'OFFICE_FETCH_FINISHED'],
  urlParamSelectors: ['selectOfficeActive'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  mergeItems: false,
  addons: {
    selectGroupSelected: createSelector(
      'selectOfficeActive',
      'selectGroupItems',
      'selectRouteParams',
      (office, groups, params) => {
        const groupSlug = params.group_slug;
        if (!groupSlug || !office) {
          return null;
        }
        return groups.find(
          (g) =>
            office.symbol === g.symbol && groupSlug.toLowerCase() === g.slug
        );
      }
    ),
    selectGroupActiveArray: createSelector(
      'selectGroupItemsArray',
      'selectOfficeActive',
      (groups, office) => {
        // If Office is not active or no groups: return []
        if (!office || !groups || !groups.length) {
          return [];
        }
        // Otherwise, return array of groups that have group.office_symbol = activeOffice.symbol
        return groups.filter((g) => g.symbol === office.symbol);
      }
    ),
    selectGroupIdByRoute: createSelector('selectGroupByRoute', (group) => {
      if (group && group.id) return { group_id: group.id };
      return null;
    }),
  },
});

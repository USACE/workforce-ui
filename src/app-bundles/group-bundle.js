import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';
const apiURL = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'group',
  uid: 'uid',
  prefetch: true,
  staleAfter: 0, //5min
  persist: true,
  routeParam: 'group_id',
  getTemplate: `${apiURL}/offices/:symbol/groups`,
  putTemplate: `${apiURL}/offices/:symbol/groups/:item.id`,
  postTemplate: `${apiURL}/offices/:symbol/groups`,
  deleteTemplate: `${apiURL}/offices/:symbol/groups/:item.id`,
  fetchActions: ['URL_UPDATED', 'OFFICE_FETCH_FINISHED'],
  urlParamSelectors: ['selectOfficeActive'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
  mergeItems: false,
  addons: {
    selectGroupItemsMocked: (state) => [
      {
        office_symbol: 'LRN',
        name: 'Water Resources',
        slug: 'water-resources',
        last_modified: null,
      },
      {
        office_symbol: 'LRH',
        name: 'Water Management',
        slug: 'water-management',
        last_modified: null,
      },
    ],
    // @todo selectGroupItemsMocked ==> selectGroupItems
    selectGroupSelected: createSelector(
      'selectOfficeActive',
      'selectGroupItemsArray',
      'selectRouteParams',
      (office, groups, params) => {
        const groupSlug = params.group_slug;
        if (!groupSlug || !office) {
          return null;
        }
        return groups.find(
          (g) =>
            office.symbol === g.office_symbol &&
            groupSlug.toLowerCase() === g.slug
        );
      }
    ),
    // @todo selectGroupItemsMocked ==> selectGroupItems
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

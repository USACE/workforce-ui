import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';
const apiURL = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'group',
  uid: 'id',
  prefetch: false,
  staleAfter: 30000, //5min
  persist: true,
  routeParam: 'group_id',
  getTemplate: `${apiURL}/offices/:office_symbol/groups`,
  putTemplate: `${apiURL}/offices/:office_symbol/groups/:item.id`,
  postTemplate: `${apiURL}/offices/:office_symbol/groups`,
  deleteTemplate: `${apiURL}/offices/:office_symbol/groups/:item.id`,
  fetchActions: [],
  urlParamSelectors: ['selectGroupIdByRoute'],
  forceFetchActions: [],
  sortBy: '',
  sortAsc: false,
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
      'selectGroupItemsMocked',
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
      'selectGroupItemsMocked',
      'selectOfficeActive',
      (groups, office) => {
        // If Office is not active or no groups: return []
        if (!office || !groups || !groups.length) {
          return [];
        }
        // Otherwise, return array of groups that have group.office_symbol = activeOffice.symbol
        return groups.filter((g) => g.office_symbol === office.symbol);
      }
    ),
    selectGroupIdByRoute: createSelector('selectGroupByRoute', (group) => {
      if (group && group.id) return { group_id: group.id };
      return null;
    }),
  },
});

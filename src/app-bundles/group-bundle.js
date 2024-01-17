import { createSelector } from 'redux-bundler';
import createRestBundle from './create-rest-bundle';

const apiURL = import.meta.env.VITE_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'group',
  uid: 'slug',
  prefetch: true,
  staleAfter: 15000, //15s
  persist: false,
  routeParam: '',
  getTemplate: `${apiURL}/offices/:symbol/groups`,
  putTemplate: `${apiURL}/offices/:symbol/groups/:item.slug`,
  postTemplate: `${apiURL}/offices/:symbol/groups`,
  deleteTemplate: `${apiURL}/offices/:symbol/groups/:item.slug`,
  fetchActions: ['URL_UPDATED', 'OFFICE_FETCH_FINISHED'],
  urlParamSelectors: ['selectOfficeActive'],
  forceFetchActions: [
    'POSITION_SAVE_FINISHED',
    'POSITION_DELETE_FINISHED',
    'OCCUPANCY_SAVE_FINISHED',
  ],
  sortBy: 'name',
  sortAsc: true,
  mergeItems: false,
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case 'GROUP_VERIFY_STARTED':
      case 'GROUP_VERIFY_FINISHED':
      case 'GROUP_VERIFY_ERROR':
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  addons: {
    selectGroupSelected: createSelector(
      'selectOfficeActive',
      'selectGroupActiveArray',
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
    selectGroupActiveArray: createSelector(
      'selectGroupItems',
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
    selectGroupActiveObject: createSelector(
      'selectGroupActiveArray',
      (groups) => {
        const obj = {};
        groups.forEach((g) => {
          obj[g.slug] = g;
        });
        return obj;
      }
    ),
    selectGroupIdByRoute: createSelector('selectGroupByRoute', (group) => {
      if (group && group.id) return { group_id: group.id };
      return null;
    }),
    doGroupVerify:
      (officeSymbol, groupSlug) =>
      ({ dispatch, store, apiPost }) => {
        dispatch({ type: 'GROUP_VERIFY_STARTED' });
        apiPost(
          `${apiURL}/offices/${officeSymbol}/groups/${groupSlug}/verify`,
          {},
          (err, respObj) => {
            if (!err) {
              dispatch({
                type: 'GROUP_VERIFY_FINISHED',
                payload: {
                  [respObj.slug]: respObj,
                },
              });
            } else {
              dispatch({ type: 'GROUP_VERIFY_ERROR', payload: {} });
            }
          }
        );
      },
  },
});

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
    selectGroupIdByRoute: createSelector(
        'selectGroupByRoute',
        (group) => {
        if (group && group.id) return { group_id: group.id };
        return null;
        },
},
});

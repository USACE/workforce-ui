import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'roleRequest',
  uid: 'office_symbol',
  prefetch: true,
  staleAfter: 0, // 3600000 milliseconds = 1Hour
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/my_role_requests`,
  putTemplate: ``,
  postTemplate: `${apiUrl}/role_requests/:item.office_symbol`,
  deleteTemplate: '',
  fetchActions: ['AUTH_UPDATED', 'ROLEREQUEST_SAVE_FINISHED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'request_date',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

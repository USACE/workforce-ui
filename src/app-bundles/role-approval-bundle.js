import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'roleApproval',
  uid: 'id',
  allowRoles: ['application.admin'],
  prefetch: true,
  staleAfter: 0, // 3600000 milliseconds = 1Hour
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/role_requests`,
  putTemplate: ``,
  postTemplate: `${apiUrl}/role_requests/:item.id/:item.action`,
  deleteTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: ['ROLEAPPROVAL_SAVE_FINISHED'],
  sortBy: 'request_date',
  mergeItems: false,
  sortAsc: false,
  addons: {},
});

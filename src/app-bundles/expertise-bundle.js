import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'expertise',
  uid: 'id',
  prefetch: false,
  staleAfter: 3600000, // 3600000 milliseconds = 1Hour
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/expertise`,
  putTemplate: ``,
  postTemplate: ``,
  deleteTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'name',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

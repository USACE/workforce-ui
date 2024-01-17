import createRestBundle from './create-rest-bundle';

const apiUrl = import.meta.env.VITE_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'payplan',
  uid: 'id',
  prefetch: true,
  staleAfter: 3600000, // 3600000 milliseconds = 1Hour
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/pay_plans`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'code',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

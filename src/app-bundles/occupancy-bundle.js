import createRestBundle from './create-rest-bundle';

const apiUrl = import.meta.env.VITE_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'occupancy',
  uid: 'id',
  prefetch: false,
  staleAfter: 0, // 3600000 milliseconds = 1Hour
  persist: false,
  routeParam: '',
  getTemplate: `${apiUrl}/offices/:office_symbol/occupancy`,
  putTemplate: `${apiUrl}/offices/:office_symbol/occupancy/:item.id`,
  postTemplate: `${apiUrl}/offices/:office_symbol/occupancy`,
  deleteTemplate: '',
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'code',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

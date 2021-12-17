import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'occupancy',
  uid: 'id',
  prefetch: false,
  staleAfter: 0, // 3600000 milliseconds = 1Hour
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/offices/:office_symbol/occupancy`,
  putTemplate: `${apiUrl}/occupancy/:id`,
  postTemplate: `${apiUrl}/offices/:office_symbol/occupancy`,
  deleteTemplate: '',
  fetchActions: ['OFFICE_FETCH_FINISHED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'code',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

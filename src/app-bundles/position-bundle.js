import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'position',
  uid: 'id',
  prefetch: false,
  staleAfter: 0, //milliseconds; 1Hour
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/offices/:symbol/positions`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: ['URL_UPDATED', 'OFFICE_FETCH_FINISHED'],
  urlParamSelectors: ['selectOfficeActive', 'selectGroupSelected'],
  forceFetchActions: [],
  sortBy: 'position_title',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

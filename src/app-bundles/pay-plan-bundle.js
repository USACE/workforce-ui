import createRestBundle from './create-rest-bundle';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

export default createRestBundle({
  name: 'payplan',
  uid: 'id',
  prefetch: false,
  staleAfter: 0, //milliseconds; 1Hour
  persist: true,
  routeParam: '',
  getTemplate: `${apiUrl}/pay_plans`,
  putTemplate: '',
  postTemplate: '',
  deleteTemplate: '',
  fetchActions: ['OFFICE_FETCH_FINISHED'],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: 'code',
  mergeItems: false,
  sortAsc: true,
  addons: {},
});

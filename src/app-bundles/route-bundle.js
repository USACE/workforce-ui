import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home';
import OfficeSummary from '../app-pages/offices/office-summary';
import OfficeList from '../app-pages/offices/office-list';
import OfficeGroups from '../app-pages/office-groups/office-groups';

export default createRouteBundle({
  '/': Home,
  '/offices': OfficeList,
  '/offices/:office_symbol': OfficeSummary,
  '/offices/:office_symbol/groups': OfficeGroups,
  '*': () => <div>Not Found; 404</div>,
  // '/admin': AdminDashboard,
});

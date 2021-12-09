import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home';

import OfficeDetail from '../app-pages/office-detail';
import GroupDetail from '../app-pages/group-detail';

export default createRouteBundle({
  '/': Home,
  '/offices/:office_symbol': OfficeDetail,
  '/offices/:office_symbol/groups': OfficeDetail,
  '/offices/:office_symbol/groups/:group_slug': GroupDetail,
  '*': () => <div>Not Found; 404</div>,
  // '/admin': AdminDashboard,
});

import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home';

import OfficeDetail from '../app-pages/office-detail';
import GroupDetail from '../app-pages/group-detail';
import Help from '../app-pages/help';
import OfficeAdminRequsts from '../app-pages/admin/admin-requests';
import Rollup from '../app-pages/rollup';

export default createRouteBundle({
  '/': Home,
  '/help': Help,
  '/offices/:office_symbol': OfficeDetail,
  '/offices/:office_symbol/groups': OfficeDetail,
  '/offices/:office_symbol/groups/:group_slug': GroupDetail,
  '/admin/requests': OfficeAdminRequsts,
  '/rollup': Rollup,
  '*': () => <div>Not Found; 404</div>,
  // '/admin': AdminDashboard,
});

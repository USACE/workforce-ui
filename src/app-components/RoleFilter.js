import { connect } from 'redux-bundler-react';

const RoleFilter = connect(
  'selectAuthRolesObj',
  ({ allow = [], authRolesObj: rolesObj, children }) => {
    let show = false;
    allow.forEach((a) => {
      if (rolesObj[a]) {
        show = true;
      }
    });
    return show ? <>{children}</> : null;
  }
);

export default RoleFilter;

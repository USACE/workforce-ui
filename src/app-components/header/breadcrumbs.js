import React from 'react';
import { connect } from 'redux-bundler-react';

const PageBreadCrumbs = connect('selectBreadcrumb', ({ breadcrumb: b }) => {
  return (
    <div>
      {/* {JSON.stringify(b[0])} */}
      {b.map((t, idx) => (
        <span className="bg-gray-500">{t.name}</span>
      ))}
    </div>
  );
});

export default PageBreadCrumbs;

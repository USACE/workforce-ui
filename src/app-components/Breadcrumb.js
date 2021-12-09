import { ChevronRightIcon, HomeIcon } from '@heroicons/react/outline';
import React from 'react';
import { connect } from 'redux-bundler-react';

const Breadcrumb = connect(
  'selectBreadcrumb',
  'doUpdateUrl',
  ({ breadcrumb: items, doUpdateUrl }) => {
    return (
      <div className="flex h-4">
        {/* HOME ICON */}
        {!items.length ? null : (
          <>
            <HomeIcon
              className="cursor-pointer text-blue-500 mr-2"
              onClick={(e) => {
                doUpdateUrl('/');
              }}
            />
            <ChevronRightIcon />
          </>
        )}
        {/* REST OF CRUMBS */}
        {items.slice(1).map((t, idx) => (
          <>
            <div
              className={`mx-2 ${
                t.href ? 'text-blue-500 cursor-pointer' : 'text-gray-500'
              }`}
              onClick={(e) => {
                if (t.href) {
                  doUpdateUrl(t.href);
                }
              }}
            >
              {t.name}
            </div>
            {idx !== items.length - 2 ? <ChevronRightIcon /> : null}
          </>
        ))}
      </div>
    );
  }
);

export default Breadcrumb;

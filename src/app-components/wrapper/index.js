import React from 'react';
import Breadcrumb from '../Breadcrumb';

import Header from '../header';

export default function Wrapper({ children, title }) {
  return (
    <>
      <div className="absolute bg-gray-200 w-full h-full">
        <Header />

        {/* Page title starts */}
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="text-2xl font-bold leading-tight text-gray-800">
              {title || 'DEFAULT TITLE'}
            </h4>
            <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
              <li className="flex items-center mr-3 mt-3 md:mt-0">
                <span>
                  <Breadcrumb />
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Page title ends */}
        <div className="container mx-auto px-6">{children}</div>
      </div>
    </>
  );
}

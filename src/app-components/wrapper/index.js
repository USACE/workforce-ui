import React from 'react';

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
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-paperclip"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                  </svg>
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

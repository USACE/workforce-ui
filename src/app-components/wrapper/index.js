import React from 'react';
import { connect } from 'redux-bundler-react';
import Breadcrumb from '../Breadcrumb';

import Header from '../header';

const Statistics = connect(
  'selectSeriesMetricsTotals',
  'selectSeriesMetricsIsLoading',
  ({ seriesMetricsTotals: totals, seriesMetricsIsLoading: isLoading }) => {
    const { positions, employees, vacancies } = totals;
    return (
      <div className="flex text-center justify-center space-x-12 w-full py-4 lg:mr-12 lg:justify-end">
        <div className="p-4">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {isLoading ? '-' : employees}
          </h2>
          <p className="leading-relaxed">Employees</p>
        </div>
        <div className="p-4">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {isLoading ? '-' : positions}
          </h2>
          <p className="leading-relaxed">Positions</p>
        </div>
        <div className="p-4">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {isLoading ? '-' : vacancies}
          </h2>
          <p className="leading-relaxed">Vacancies</p>
        </div>
      </div>
    );
  }
);
export default function Wrapper({ children, title }) {
  return (
    <>
      <div className="absolute bg-gray-200 w-full h-full">
        <Header />

        {/* Page title starts */}
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
          <div className="flex w-full md:justify-between">
            {/* Page Title and Breadcrumb */}
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
          {/* Statistic Numbers */}
          <Statistics />
        </div>

        {/* Page title ends */}
        <div className="container mx-auto px-6">{children}</div>
      </div>
    </>
  );
}

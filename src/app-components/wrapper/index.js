import React from 'react';
import { connect } from 'redux-bundler-react';
import Breadcrumb from '../Breadcrumb';

import Header from '../header';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Statistics = connect(
  'selectSeriesMetricsTotals',
  'selectSeriesMetricsIsLoading',
  ({ seriesMetricsTotals: totals, seriesMetricsIsLoading: isLoading }) => {
    const { positions, employees, vacancies, target, position_need } = totals;
    return (
      <>
        <ReactTooltip />
        <div className="flex text-center justify-center space-x-12 w-full py-4 lg:mr-12 lg:justify-end">
          <div className="space-y-2 p-4 bg-white rounded shadow-md">
            <div className="font-semibold text-gray-400 text-md uppercase">
              Positions Filled
            </div>
            <div className="flex title-font font-medium sm:text-4xl text-3xl justify-center">
              <div className="text-gray-900">{isLoading ? '-' : employees}</div>
              <div className="mx-2 text-gray-300">/</div>
              <div
                data-tip="Allocated Position"
                className="text-gray-300 border-b-2 border-dashed cursor-default"
              >
                {isLoading ? '-' : positions}
              </div>
            </div>
            <div className="leading-relaxed text-gray-600">
              <span className="block text-gray-400 text-sm font-semibold">
                {isLoading ? '-' : vacancies} Vacancies
              </span>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-white rounded shadow-md">
            <div className="font-semibold text-gray-400 text-md uppercase">
              Positions Target
            </div>
            <div className="flex title-font font-medium sm:text-4xl text-3xl justify-center">
              <div
                data-tip="All Positions - Includes Allocated and UnAllocated Positions"
                className="text-green-500 border-b-2 border-dashed cursor-default"
              >
                {isLoading ? '-' : target}
              </div>
            </div>
            <div className="leading-relaxed text-gray-600">
              <span className="block text-gray-400 text-sm font-semibold">
                {isLoading ? '-' : position_need} over allocation
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default function Wrapper({ children, title }) {
  return (
    <>
      <div className="bg-gray-200 w-full h-full bg-gradient-to-b from-gray-200 to-white pb-10">
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
        <div className="container mx-auto px-6 h-full">{children}</div>
      </div>
    </>
  );
}

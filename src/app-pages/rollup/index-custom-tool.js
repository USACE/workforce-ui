import { useState } from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import { connect } from 'redux-bundler-react';
import Wrapper from '../../app-components/wrapper';
const apiUrl = import.meta.env.VITE_WORKFORCE_API_URL;
/**
 * This is a total hack job to get something out...  Just FYI
 */

export default connect(
  'selectStatsChartData',
  'selectStatsGroupByFields',
  'selectStatsSplitByFields',
  'selectStatsGroupBy',
  'selectStatsSplitBy',
  'selectStatsFilterOfficeSymbol',
  'selectStatsFilterParentOfficeSymbol',
  'selectStatsKeys',
  'selectOfficeItems',
  'doStatsSetGroupBy',
  'doStatsSetSplitBy',
  'doStatsSetFilterOfficeSymbol',
  'doStatsSetFilterParentOfficeSymbol',
  ({
    statsChartData,
    statsGroupByFields,
    statsSplitByFields,
    statsGroupBy: groupBy,
    statsSplitBy: splitBy,
    statsFilterOfficeSymbol: officeSymbol,
    statsFilterParentOfficeSymbol: parentOfficeSymbol,
    statsKeys,
    officeItems: offices,
    doStatsSetGroupBy,
    doStatsSetSplitBy,
    doStatsSetFilterOfficeSymbol,
    doStatsSetFilterParentOfficeSymbol,
  }) => {
    const [stacked, setStacked] = useState(true);
    const parentOfficeId = offices
      .filter((office) => {
        return office.symbol === parentOfficeSymbol;
      })
      .map((office) => office.id)[0];
    return (
      <Wrapper title={'Workforce Rollup'}>
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-4">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Parent Office Symbol {}
              </label>
              <select
                value={parentOfficeSymbol}
                onChange={(e) => {
                  doStatsSetFilterParentOfficeSymbol(e.target.value);
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={''}>All Offices</option>;
                {offices
                  .filter((office) => {
                    return !office.parent_id;
                  })
                  .map((office) => {
                    return (
                      <option key={office.id} value={office.symbol}>
                        {office.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Office Symbol
              </label>
              <select
                value={officeSymbol}
                onChange={(e) => {
                  doStatsSetFilterOfficeSymbol(e.target.value);
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={''}>All Offices</option>;
                {offices
                  .filter((office) => {
                    if (parentOfficeSymbol) {
                      return office.parent_id === parentOfficeId;
                    } else {
                      return !!office.parent_id;
                    }
                  })
                  .map((office) => {
                    return (
                      <option key={office.id} value={office.symbol}>
                        {office.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Group By
              </label>
              <select
                value={groupBy}
                onChange={(e) => {
                  doStatsSetGroupBy(e.target.value);
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {Object.keys(statsGroupByFields).map((key) => {
                  return (
                    <option
                      key={key}
                      title={statsGroupByFields[key]}
                      value={key}
                    >
                      {statsGroupByFields[key]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Split By
              </label>
              <select
                value={splitBy}
                onChange={(e) => {
                  doStatsSetSplitBy(e.target.value);
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={''}>Do Not Split</option>;
                {Object.keys(statsSplitByFields).map((key) => {
                  return (
                    <option
                      key={key}
                      title={statsSplitByFields[key]}
                      value={key}
                    >
                      {statsSplitByFields[key]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Stack Splits
              </label>
              <input
                disabled={!splitBy}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                checked={stacked}
                onChange={(e) => {
                  setStacked(e.target.checked);
                }}
              />
            </div>
            <div>
              <a
                className="underline text-indigo-600"
                href={`${apiUrl}/report/csv`}
              >
                Download Raw Data
              </a>
            </div>
          </div>
          <div className="col-span-8" style={{ height: '800px' }}>
            <div className="space-y-2 p-4 bg-white rounded shadow-md h-full">
              <ResponsiveBarCanvas
                animate={false}
                data={statsChartData}
                keys={statsKeys}
                indexBy="group"
                groupMode={stacked ? 'stacked' : 'grouped'}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                margin={{ top: 50, right: 230, bottom: 150, left: 60 }}
                padding={0.3}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -50,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Count',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 200,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 170,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              ></ResponsiveBarCanvas>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
);

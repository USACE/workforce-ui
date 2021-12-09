import React from 'react';
import { connect } from 'redux-bundler-react';

import USACE_Logo from '../../images/USACE_logo.png';

const PositionTable = ({ title, items }) => {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">-</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Occupation/Series
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Pay Plan/Grade</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {items.map((t) => (
                <tr key={t.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={USACE_Logo}
                          width="40"
                          height="40"
                          alt={t.position_title}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {t.occupation_code} - {t.occupation_name}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {t.position_title}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium">
                      {t.code}-{t.position_grade}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium text-red-400">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit Occupant
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const GroupPositionTable = connect(
  'selectPositionItemsArray',
  ({ positionItemsArray: positions }) => {
    return <PositionTable title="Positions" items={positions} />;
  }
);

// const GroupAllocationTable = connect(
//   'selectGroupActiveArray',
//   ({ groupActiveArray: groups }) => {
//     const items = groups.map((g) => ({
//       ...g,
//       href: `/offices/${g.symbol}/groups/${g.slug}`,
//     }));

//     return <AllocationTable title="Groups" items={items} />;
//   }
// );

export { GroupPositionTable };

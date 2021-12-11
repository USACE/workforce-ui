import React from 'react';
import { connect } from 'redux-bundler-react';
import EditPositionModal from './EditPositionModal';

import { UserCircleIcon, PencilAltIcon } from '@heroicons/react/outline';

const PositionTable = connect(
  'doModalOpen',
  ({ title, items, doModalOpen }) => {
    return (
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <button
            onClick={(e) => {
              console.log('CLICKED NEW POSITION');
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + New Position
          </button>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Title</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Series-Occupation
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Pay Plan-Grade
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {items.map((t) => {
                  const {
                    id,
                    occupation_code,
                    occupation_name,
                    title,
                    pay_plan,
                    grade,
                    current_occupancy,
                  } = t;
                  const isVacant = !current_occupancy;
                  return (
                    <tr key={id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`rounded-full w-11 h-11 flex justify-around items-center ${
                              isVacant ? 'bg-gray-200' : 'bg-green-300'
                            }`}
                          >
                            {!isVacant && (
                              <UserCircleIcon className="text-green-800" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{title}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {occupation_code} - {occupation_name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium">
                          {pay_plan}-{grade}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center space-x-2 font-medium text-red-400">
                          {/* <button
                            disabled={!isVacant}
                            onClick={(e) => {
                              console.log('Add User to Position Clicked');
                            }}
                            className={`font-bold py-2 px-4 rounded ${
                              isVacant
                                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <UserAddIcon className="w-6 h-6" />
                          </button>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <UserRemoveIcon className="w-6 h-6" />
                          </button> */}
                          <button
                            onClick={(e) => {
                              doModalOpen(EditPositionModal, {
                                position: t,
                              });
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            <PencilAltIcon className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

const GroupPositionTable = connect(
  'selectPositionItemsActive',
  ({ positionItemsActive: positions }) => {
    return <PositionTable title="Positions" items={positions} />;
  }
);

export { GroupPositionTable };
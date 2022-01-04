import React from 'react';
import { connect } from 'redux-bundler-react';
import EditPositionModal from './EditPositionModal';
import EditOccupancyModal from './EditOccupancyModal';
import RoleFilter from '../RoleFilter';

import {
  UserCircleIcon,
  UserIcon,
  PencilAltIcon,
  DuplicateIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

import ReactTooltip from 'react-tooltip';

const PositionTable = connect(
  'doModalOpen',
  ({ title, items, doModalOpen }) => {
    return (
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            {title} ({items && items.length})
          </h2>
          {/* Get Office Symbol from First Position in the Table; Table only contains positions for single office */}
          <RoleFilter
            allow={[
              'application.admin',
              items && items.length && `${items[0].office_symbol}.admin`,
            ]}
          >
            <button
              onClick={(e) => {
                doModalOpen(EditPositionModal);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              + New Position
            </button>
          </RoleFilter>
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
                    is_active,
                    is_allocated,
                    is_supervisor,
                  } = t;
                  const isVacant = !current_occupancy;
                  return (
                    <tr
                      key={id}
                      className={`${
                        !is_active ? 'opacity-40 bg-gray-100' : ''
                      }`}
                    >
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <ReactTooltip />
                          <div
                            data-tip={
                              isVacant ? 'Position Vacant' : 'Position Filled'
                            }
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
                        <div className="font-medium text-gray-800">
                          <span className="block">
                            {title}
                            {is_supervisor && (
                              <StarIcon
                                data-tip="Supervisor"
                                className="w-4 inline ml-1 mb-1 text-yellow-400"
                              />
                            )}
                          </span>
                          <span className="block text-gray-400">
                            {current_occupancy && current_occupancy.title}
                          </span>
                          <span className="block text-red-400">
                            {!is_active && 'Position Inactive'}
                          </span>
                          <span className="block text-red-400">
                            {isVacant && is_active && 'Vacant'}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {occupation_code} - {occupation_name}
                            <span className="block text-red-400">
                              {!is_allocated && is_active && 'Over-Allocation'}
                            </span>
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
                          <RoleFilter
                            allow={[
                              'application.admin',
                              items &&
                                items.length &&
                                `${items[0].office_symbol}.admin`,
                            ]}
                          >
                            <>
                              <button
                                data-tip="Edit Position"
                                onClick={(e) => {
                                  doModalOpen(EditPositionModal, {
                                    position: t,
                                  });
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                <PencilAltIcon className="w-6 h-6" />
                              </button>

                              <button
                                data-tip="Edit Occupant"
                                onClick={(e) => {
                                  doModalOpen(EditOccupancyModal, {
                                    position: t,
                                  });
                                }}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              >
                                <UserIcon className="w-6 h-6" />
                              </button>

                              <button
                                data-tip="Duplicate Position"
                                onClick={(e) => {
                                  doModalOpen(EditPositionModal, {
                                    position: {
                                      ...t,
                                      id: null,
                                      duplicate: true,
                                    },
                                  });
                                }}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                              >
                                <DuplicateIcon className="w-6 h-6" />
                              </button>
                            </>
                          </RoleFilter>
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

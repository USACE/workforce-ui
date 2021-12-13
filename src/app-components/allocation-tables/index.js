import React from 'react';
import { connect } from 'redux-bundler-react';
import MyResponsiveBulletHorizontal from '../../app-components/charts/bullet-horizontal';
import EditGroupModal from './EditGroupModal';

import { PencilAltIcon } from '@heroicons/react/outline';

import USACE_Logo from '../../images/USACE_logo.png';

const AllocationTable = ({ title, items, doModalOpen }) => {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">
          {title} ({items.length})
        </h2>
        {/* Only show button on groups table */}
        {title && title === 'Groups' && (
          <button
            onClick={(e) => {
              doModalOpen(EditGroupModal, {});
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            + New Group
          </button>
        )}
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Positions <br />
                    (Filled, Allowed, Target)
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left"># Employees</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    # Vacant Positions
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {items.map((t, idx) => (
                <tr key={idx}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={USACE_Logo}
                          width="40"
                          height="40"
                          alt={t.name}
                        />
                      </div>
                      <a href={t.href}>
                        <div className="font-medium text-gray-800">
                          {t.name}
                        </div>
                      </a>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="">
                      <span className="inline-block w-40 h-10">
                        <MyResponsiveBulletHorizontal />
                      </span>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium text-green-500">
                      {t.count_employees}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {t.count_positions && t.count_vacancies && (
                      <div className="text-center font-medium ">
                        <span className="text-red-400">
                          {t.count_vacancies}
                        </span>
                        <span className="ml-2 text-gray-300">
                          / {t.count_positions} total
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {title && title === 'Groups' && (
                      <button
                        onClick={(e) => {
                          doModalOpen(EditGroupModal, { group: t });
                        }}
                        className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <PencilAltIcon className="w-6 h-6" />
                      </button>
                    )}
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

const OfficeAllocationTable = connect(
  'selectOfficeItems',
  ({ officeItems: offices }) => {
    const items = offices.map((f) => ({
      ...f,
      href: `/offices/${f.symbol.toLowerCase()}`,
    }));

    return <AllocationTable title="Offices" items={items} />;
  }
);

const GroupAllocationTable = connect(
  'selectGroupActiveArray',
  'selectPositionCountsByGroup',
  'doModalOpen',
  ({
    groupActiveArray: groups,
    positionCountsByGroup: positionCounts,
    doModalOpen,
  }) => {
    const items = groups.map((g) => ({
      ...g,
      count_positions:
        positionCounts[g.slug] && positionCounts[g.slug].positions,
      count_employees:
        positionCounts[g.slug] && positionCounts[g.slug].employees,
      count_vacancies:
        positionCounts[g.slug] && positionCounts[g.slug].vacancies,
      href: `/offices/${g.office_symbol.toLowerCase()}/groups/${g.slug}`,
    }));

    return (
      <AllocationTable title="Groups" items={items} doModalOpen={doModalOpen} />
    );
  }
);

export { OfficeAllocationTable, GroupAllocationTable };

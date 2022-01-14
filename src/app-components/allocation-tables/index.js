import React from 'react';
import { connect } from 'redux-bundler-react';
import EditGroupModal from './EditGroupModal';
import VerifyGroupModal from './VerifyGroupModal';
import { RoleFilterCaseInsensitive } from '../RoleFilter';

import {
  PencilAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';

import USACE_Logo from '../../images/USACE_logo.png';
import PositionSummaryBullet from '../charts/PositionSummaryBullet';

const RequestAccessButton = connect(
  'selectOfficeActive',
  'selectAuthIsLoggedIn',
  'selectAuthRolesObj',
  'selectRoleRequestItemsObject',
  'doRoleRequestSave',
  ({
    officeActive: office,
    authIsLoggedIn: isLoggedIn,
    authRolesObj: rolesObj,
    roleRequestItemsObject: myRequestsObj,
    doRoleRequestSave,
  }) => {
    if (!isLoggedIn) {
      return null;
    }
    // If have role "application.admin" or have role <officeSymbol>.admin
    // do not show the button
    if (
      rolesObj['application.admin'] ||
      (office && rolesObj[`${office.symbol.toLowerCase()}.admin`])
    ) {
      return null;
    }
    // If have submitted a request with status = 'RECEIVED'
    if (
      isLoggedIn &&
      office &&
      myRequestsObj[office.symbol] &&
      myRequestsObj[office.symbol].status === 'RECEIVED'
    ) {
      return (
        <button className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
          Access Request Pending
        </button>
      );
    }

    return (
      <button
        onClick={(e) => {
          doRoleRequestSave({ office_symbol: office.symbol }, null, null, true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Request Edit Permissions
      </button>
    );
  }
);

const AllocationTable = ({
  authIsLoggedIn,
  doRoleRequestSave,
  title,
  items,
  office,
  maxBulletSize,
  doModalOpen,
}) => {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">
          {title} ({items.length})
        </h2>
        {/* Only show button on groups table */}
        {title && title === 'Groups' && (
          <RoleFilterCaseInsensitive
            allow={['application.admin', office && `${office.symbol}.admin`]}
          >
            <button
              onClick={(e) => {
                doModalOpen(EditGroupModal, {});
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              + New Group
            </button>
          </RoleFilterCaseInsensitive>
        )}
        {/* User must be on the group page, logged in and does not have application.admin or {office.symbol}.admin */}
        {title && title === 'Groups' ? <RequestAccessButton /> : null}
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-100">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Positions <br />
                    <div className="flex space-x-1 normal-case font-normal">
                      <div className="text-white px-2 py-1 rounded-xl bg-gray-900">
                        Filled
                      </div>
                      <div className="text-gray-900 px-2 py-1 rounded-xl bg-gray-300">
                        Allocated
                      </div>
                      <div className="text-white px-2 py-1 rounded-xl bg-green-500">
                        Target
                      </div>
                    </div>
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    Positions Filled
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Vacancies</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Last Verified</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {items.map((t, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        {title && title === 'Groups' ? (
                          <UserGroupIcon className="w-8 text-gray-500" />
                        ) : (
                          <img
                            className="rounded-lg opacity-80 pt-1 grayscale"
                            src={USACE_Logo}
                            width="40"
                            alt={t.name}
                          />
                        )}
                      </div>
                      <a href={t.href}>
                        <div className="font-medium text-blue-500 hover:text-blue-800">
                          {t.name}
                        </div>
                      </a>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="h-6 w-56">
                      {t.allocated === 0 ? null : (
                        <PositionSummaryBullet
                          id={t.slug}
                          key={t.slug}
                          maxValue={maxBulletSize || 0}
                          employees={t.employees || 0}
                          allocated={t.allocated || 0}
                          target={t.target || 0}
                          maxBulletSize={maxBulletSize || 0}
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex text-center title-font font-medium justify-center">
                      <div className="text-gray-900">{t.employees}</div>
                      <div className="mx-2 text-gray-300">/</div>
                      <div className="text-gray-300">{t.allocated}</div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium">
                      <span className="text-gray-300">
                        {t.allocated - t.employees}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium">
                      <span className="text-gray-400">01-Jan-2022</span>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap text-center">
                    {title && title === 'Groups' && (
                      <RoleFilterCaseInsensitive
                        allow={[
                          'application.admin',
                          `${t.office_symbol}.admin`,
                        ]}
                      >
                        <button
                          onClick={(e) => {
                            doModalOpen(EditGroupModal, { group: t });
                          }}
                          className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <PencilAltIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => {
                            doModalOpen(VerifyGroupModal, { group: t });
                          }}
                          className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        >
                          <ShieldCheckIcon className="w-6 h-6" />
                        </button>
                      </RoleFilterCaseInsensitive>
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
  'selectQueryString',
  ({ officeItems: offices, queryString }) => {
    const qs = queryString && '?' + queryString;
    const items = offices.map((f) => ({
      ...f,
      href: `/offices/${f.symbol.toLowerCase()}${qs}`,
    }));

    return (
      <AllocationTable
        title="Offices"
        items={items}
        // Largest target or allocated size among all offices
        maxBulletSize={items.reduce(
          (a, b) => Math.max(a, b.target, b.allocated),
          0
        )}
      />
    );
  }
);

const GroupAllocationTable = connect(
  'selectGroupActiveArray',
  'doModalOpen',
  'selectQueryString',
  'selectOfficeActive',
  'doRoleRequestSave',
  ({
    groupActiveArray: groups,
    positionCountsByGroup: positionCounts,
    doModalOpen,
    queryString,
    officeActive,
    doRoleRequestSave,
  }) => {
    const qs = queryString && `?${queryString}`;
    const items = groups.map((g) => ({
      ...g,
      count_positions: g.allocated,
      count_employees: g.employees,
      count_vacancies: g.allocated - g.employees,
      href: `/offices/${g.office_symbol.toLowerCase()}/groups/${g.slug}${qs}`,
    }));

    return (
      <AllocationTable
        title="Groups"
        items={items}
        office={officeActive}
        doModalOpen={doModalOpen}
        doRoleRequestSave={doRoleRequestSave}
        // Largest target or allocated size among all offices
        maxBulletSize={
          items.reduce((a, b) => Math.max(a, b.target, b.allocated), 0) || 0
        }
      />
    );
  }
);

export { OfficeAllocationTable, GroupAllocationTable };

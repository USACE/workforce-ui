import React from 'react';
import { connect } from 'redux-bundler-react';
import MyResponsiveBulletHorizontal from '../../app-components/charts/bullet-horizontal';

import USACE_Logo from '../../images/USACE_logo.png';

const AllocationTable = ({ title, items }) => {
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
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Position Allocation vs Actual
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">% Filled</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Need</div>
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
                    <div className="text-left font-medium text-green-500">
                      {t.perc_filled}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium text-red-400">
                      {t.need}
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
  ({ groupActiveArray: groups }) => {
    const items = groups.map((g) => ({
      ...g,
      href: `/offices/${g.office_symbol.toLowerCase()}/groups/${g.slug}`,
    }));

    return <AllocationTable title="Groups" items={items} />;
  }
);

export { OfficeAllocationTable, GroupAllocationTable };

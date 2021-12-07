import React from 'react';
import MyResponsiveBulletHorizontal from '../../app-components/charts/bullet-horizontal';

import Image01 from '../../images/USACE_logo.png';
import Image02 from '../../images/USACE_logo.png';
import Image03 from '../../images/USACE_logo.png';
import Image04 from '../../images/USACE_logo.png';
import Image05 from '../../images/USACE_logo.png';

function OfficeTable() {
  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Lakes and River Division (LRD)',
      need: 1,
      perc_filled: '98',
    },
    {
      id: '1',
      image: Image02,
      name: 'Huntington District (LRH',
      need: 0,
      perc_filled: '100',
    },
    {
      id: '2',
      image: Image03,
      name: 'Nashville District (LRN)',
      need: 2,
      perc_filled: '90',
    },
    {
      id: '3',
      image: Image04,
      name: 'Chicago District (LRC)',
      need: 1,
      perc_filled: '98',
    },
    {
      id: '4',
      image: Image05,
      name: 'Buffalo District (LRB)',
      need: 1,
      perc_filled: '92',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Offices</h2>
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
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            src={customer.image}
                            width="40"
                            height="40"
                            alt={customer.name}
                          />
                        </div>
                        <div className="font-medium text-gray-800">
                          {customer.name}
                        </div>
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
                        {customer.perc_filled}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center font-medium text-red-400">
                        {customer.need}
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

export default OfficeTable;

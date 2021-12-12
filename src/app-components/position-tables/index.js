import React from 'react';
import { connect } from 'redux-bundler-react';
import ReactTooltip from 'react-tooltip';

// import USACE_Logo from '../../images/USACE_logo.png';
// import { UserIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
// import { EditIcon, DeleteIcon } from '../icons';
import { EditButton, UserAddButton } from '../forms/buttons';
import EditPositionModal from '../modals/edit-position-modal';

const PositionTable = ({ doModalOpen, title, items }) => {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          {title} ({items.length})
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">&nbsp;</div>
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
                      <div className="w-8 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <ReactTooltip />
                        {t.current_occupancy ? (
                          <span title="Supervisor">
                            <UserCircleIcon
                              data-tip="Filled Position"
                              className="w-8 text-green-500"
                            />
                          </span>
                        ) : (
                          <UserCircleIcon
                            data-tip="Vacant Position"
                            className="w-8 text-gray-200"
                          />
                        )}
                        {/* <img
                          className="rounded-full"
                          src={USACE_Logo}
                          width="40"
                          height="40"
                          alt={t.position_title}
                        /> */}
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
                    <div className="font-medium text-gray-800">{t.title}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium">
                      {t.pay_plan}-{t.grade}
                    </div>
                  </td>

                  <td className="p-2 whitespace-nowrap">
                    <div className="flex text-center font-medium text-red-400">
                      {/* {JSON.stringify(t.current_occupancy)} */}

                      <EditButton
                        label=""
                        onClick={() => doModalOpen(EditPositionModal, t)}
                      />

                      {!t.current_occupancy && (
                        <UserAddButton label="" onClick={null} />
                      )}

                      {/* <CancelButton
                        label="Delete"
                        className="ml-2"
                        onClick={null}
                      /> */}
                      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit Occupant
                      </button> */}
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
  'doModalOpen',
  'selectPositionItems',
  ({ doModalOpen, positionItems: positions }) => {
    return (
      <PositionTable
        title="Positions"
        items={positions}
        doModalOpen={doModalOpen}
      />
    );
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

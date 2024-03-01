import React from 'react';
import { connect } from 'redux-bundler-react';
import { RoleFilterCaseInsensitive } from '../../../app-components/RoleFilter';
import {
  CheckCircleIcon,
  XCircleIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  ClockIcon,
} from '@heroicons/react/outline';
import { formatDistance, format, parseISO } from 'date-fns';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const OfficeAdminRequestTable = connect(
  'selectOfficeActive',
  'selectRoleApprovalItems',
  'doRoleApprovalSave',
  ({ officeActive: office, roleApprovalItems: items, doRoleApprovalSave }) => {
    const handleUpdateStatus = (id, action) => {
      switch (action) {
        case 'approve':
        case 'deny':
          doRoleApprovalSave({ id: id, action: action }, null, null, true);
          break;
        default:
          console.log(action);
          console.log(action === 'deny');
          console.error(`ACTION NOT ALLOWED: ${action}`);
      }
    };

    return (
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            Requests ({items && items.length})
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
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">User</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Requested</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Processed</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Reponse Time</div>
                  </th>

                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {items.map((t, idx) => {
                  const {
                    id,
                    sub,
                    request_date,
                    response_date,
                    office_symbol,
                    status,
                  } = t;
                  const isApproved =
                    status && status === 'APPROVED' ? true : false;
                  const isDenied = status && status === 'DENIED' ? true : false;
                  const isReceived =
                    status && status === 'RECEIVED' ? true : false;

                  return (
                    <tr key={idx}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <ReactTooltip id="tt" />
                          <div
                            data-tooltip-id="tt"
                            data-tooltip-content={
                              isApproved
                                ? 'Approved'
                                : isDenied
                                ? 'Denied'
                                : 'Pending'
                            }
                            className={`rounded-full w-11 h-11 flex justify-around items-center ${
                              isApproved
                                ? 'bg-green-200'
                                : isReceived
                                ? 'bg-yellow-300'
                                : isDenied
                                ? 'bg-red-300'
                                : 'bg-gray-300'
                            }`}
                          >
                            {isApproved && (
                              <CheckCircleIcon className="text-green-800" />
                            )}
                            {isReceived && (
                              <ClockIcon className="text-yellow-800" />
                            )}
                            {isDenied && (
                              <XCircleIcon className="text-red-800" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800">
                          <span className="block">{sub}</span>
                          <span className="block text-gray-400">
                            {office_symbol}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {request_date &&
                              format(parseISO(request_date), 'PP')}
                            <span className="block text-gray-400">
                              {request_date &&
                                format(parseISO(request_date), 'p')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {response_date &&
                              format(parseISO(response_date), 'PP')}
                            <span className="block text-gray-400">
                              {response_date &&
                                format(parseISO(response_date), 'p')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {response_date &&
                              formatDistance(
                                parseISO(request_date),
                                parseISO(response_date)
                              )}
                          </div>
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center space-x-2 font-medium text-red-400">
                          <RoleFilterCaseInsensitive
                            allow={[
                              'application.admin',
                              items &&
                                items.length &&
                                `${items[0].office_symbol}.admin`,
                            ]}
                          >
                            <>
                              <button
                                data-tooltip-id="tt"
                                data-tooltip-content="Approve"
                                disabled={isApproved}
                                onClick={(e) =>
                                  handleUpdateStatus(id, 'approve')
                                }
                                className={`${
                                  !isApproved
                                    ? 'bg-green-500 hover:bg-green-700'
                                    : 'bg-gray-200'
                                } text-white font-bold py-2 px-4 rounded`}
                              >
                                <ThumbUpIcon className="w-6 h-6" />
                              </button>

                              <button
                                data-tooltip-id="tt"
                                data-tooltip-content="Deny"
                                disabled={isDenied}
                                onClick={(e) => {
                                  handleUpdateStatus(id, 'deny');
                                }}
                                className={`${
                                  !isDenied
                                    ? 'bg-red-500 hover:bg-red-700'
                                    : 'bg-gray-200'
                                } text-white font-bold py-2 px-4 rounded`}
                              >
                                <ThumbDownIcon className="w-6 h-6" />
                              </button>
                            </>
                          </RoleFilterCaseInsensitive>
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

export default OfficeAdminRequestTable;

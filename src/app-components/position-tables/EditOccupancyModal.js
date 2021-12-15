/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';
// import Select from 'react-select';
import { parseISO, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditOccupancyModal = connect(
  'doModalClose',
  // 'selectGroupActiveArray',
  'doOccupancySave',
  'doOccupancyFetch',
  ({
    doModalClose,
    // groupActiveArray: groups,
    doOccupancySave,
    doOccupancyFetch,
    position: p,
  }) => {
    const occupant = p.current_occupancy;
    const [payload, setPayload] = useState({
      id: (occupant && occupant.id) || null,
      position_id: (p && p.id) || null,
      title: (occupant && occupant.title) || null,
      service_start_date:
        (occupant &&
          occupant.service_start_date &&
          parseISO(occupant.service_start_date)) ||
        null,
      service_end_date:
        (occupant &&
          occupant.service_end_date &&
          parseISO(occupant.service_end_date)) ||
        null,
      start_date:
        (occupant && occupant.start_date && parseISO(occupant.start_date)) ||
        null,
      end_date:
        (occupant && occupant.end_date && parseISO(occupant.end_date)) || null,
      dob: (occupant && occupant.dob && parseISO(occupant.dob)) || null,
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      if (
        !payload ||
        (!payload.id && occupant) ||
        !payload.service_start_date ||
        !payload.start_date ||
        !payload.dob
      ) {
        console.log('Missing one or more required fields for product');
        return;
      }
      doOccupancySave(payload);
      doOccupancyFetch();
      doModalClose();
    };

    return (
      <Transition
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
            <div className="sm:flex sm:items-start bg-gray-100 p-2">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-200 sm:mx-0 sm:h-10 sm:w-10">
                <PencilAltIcon
                  className="h-6 w-6 text-purple-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900 pt-2"
                >
                  Edit {p && p.title} Occupancy
                </Dialog.Title>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Additional Title/Role:{' '}
                      <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="block w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    defaultValue={payload.title}
                    maxLength={40}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Service Start Date:{' '}
                      {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                    </span>
                  </label>
                  <DatePicker
                    id="serviceStartDate"
                    name="serviceStartDate"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.service_start_date}
                    todayButton="Today"
                    dateFormat="dd-MMM-yyyy"
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        service_start_date: addDays(date, 1),
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Service End Date:{' '}
                      {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                    </span>
                  </label>
                  <DatePicker
                    id="serviceEndDate"
                    name="serviceEndDate"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.service_end_date}
                    todayButton="Today"
                    dateFormat="dd-MMM-yyyy"
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        service_end_date: addDays(date, 1),
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Employee's Position Start Date:{' '}
                      {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                    </span>
                  </label>
                  <DatePicker
                    id="startDate"
                    name="startDate"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.start_date}
                    todayButton="Today"
                    dateFormat="dd-MMM-yyyy"
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        start_date: addDays(date, 1),
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Employee's Position End Date:{' '}
                      {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                    </span>
                  </label>
                  <DatePicker
                    id="endDate"
                    name="endDate"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.end_date}
                    todayButton="Today"
                    dateFormat="dd-MMM-yyyy"
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        end_date: addDays(date, 1),
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Employee's Date of Birth:{' '}
                      <span className="text-sm text-gray-400">
                        (month and year only)
                      </span>
                    </span>
                  </label>
                  <DatePicker
                    id="dob"
                    name="dob"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.dob}
                    dateFormat="MMM-yyyy"
                    showMonthYearPicker
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        dob: addDays(date, 1),
                      })
                    }
                  />
                </div>

                <div className="mt-4">
                  <textarea
                    cols={40}
                    rows={4}
                    value={JSON.stringify(payload)}
                    readOnly
                  ></textarea>
                </div>
                {/* <form>
                  <input
                    className="mt-4 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </form> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                doModalClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Transition>
    );
  }
);

export { EditOccupancyModal, EditOccupancyModal as default };

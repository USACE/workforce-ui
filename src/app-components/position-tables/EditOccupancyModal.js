/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';
// import Select from 'react-select';
import { addDays, isValid, subDays, formatDistanceToNow } from 'date-fns';
import { utcToZonedTime, toDate } from 'date-fns-tz';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SaveButton, CancelButton } from '../forms/buttons';
import Select from 'react-select';

const EditOccupancyModal = connect(
  'doModalClose',
  'selectCredentialItems',
  'selectCredentialItemsObject',
  'doOccupancySave',
  'doPositionFetch',
  'doCredentialFetch',
  ({
    doModalClose,
    credentialItems: allCredentials,
    credentialItemsObject: allCredentialsObj,
    doOccupancySave,
    doPositionFetch,
    doCredentialFetch,
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
          utcToZonedTime(toDate(occupant.service_start_date), 'UTC')) ||
        null,
      // service_end_date:
      //   (occupant &&
      //     occupant.service_end_date &&
      //     utcToZonedTime(toDate(occupant.service_end_date), 'UTC')) ||
      //   null,
      start_date:
        (occupant &&
          occupant.start_date &&
          utcToZonedTime(toDate(occupant.start_date), 'UTC')) ||
        null,
      end_date:
        (occupant &&
          occupant.end_date &&
          utcToZonedTime(toDate(occupant.end_date), 'UTC')) ||
        null,
      credentials: (occupant && occupant.credentials) || null,
      dob:
        (occupant &&
          occupant.dob &&
          utcToZonedTime(toDate(occupant.dob), 'UTC')) ||
        null,
    });

    const [error, setError] = useState({
      msg: null,
    });

    // Load credentials on modal load
    useEffect(() => {
      doCredentialFetch();
    }, [doCredentialFetch]);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (
        !payload ||
        (!payload.id && occupant) ||
        !payload.service_start_date ||
        !payload.start_date ||
        !payload.dob
      ) {
        console.log('Missing one or more required fields.');
        setError({
          ...error,
          msg: 'Please fill out all required (*) fields.',
        });
        return;
      }
      doOccupancySave(payload);
      // doPositionFetch();
      // ^^^ NOTE doPositionFetch() is called implicitly in app-bundles/position-bundle.js
      //     this happens because `forceFetchActions:` includes action 'OCCUPANCY_SAVE_FINISHED'
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg lg:max-w-xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
            <div className="sm:flex sm:items-start bg-gray-50 p-2">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
                <PencilAltIcon
                  className="h-6 w-6 text-blue-600"
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

                {error && error.msg && (
                  <div className="bg-red-100 border-2 border-red-300 mt-2 p-2 text-red-800 rounded">
                    {error.msg}
                  </div>
                )}

                <div className="w-full block p-2 text-left">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      Additional Title/Role:{' '}
                      <span className="text-sm text-gray-400 block">
                        (ex: Team Lead, Regional RTS, Section Chief)
                      </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="block w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    defaultValue={payload.title}
                    maxLength={80}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="text-left mt-3">
                  <div className="p-1 text-gray-400 border-b-2 border-gray-300 uppercase text-sm font-semibold mt-5">
                    Employee's Federal Service Dates:
                  </div>

                  <div className="w-full block lg:w-1/2 lg:inline-block p-2">
                    <label
                      className="block mt-2 mb-2 w-full"
                      forhtml="serviceStartDate"
                    >
                      <span className="text-gray-600">
                        <span className="text-lg text-red-700 mr-1">*</span>
                        Service Start:{' '}
                      </span>
                    </label>
                    <DatePicker
                      id="serviceStartDate"
                      autoComplete="off"
                      name="serviceStartDate"
                      className="w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                      selected={payload.service_start_date}
                      todayButton="Today"
                      dateFormat="dd-MMM-yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      strictParsing
                      minDate={subDays(new Date(), 25570)}
                      maxDate={addDays(new Date(), 5)}
                      onChange={(date) =>
                        setPayload({
                          ...payload,
                          service_start_date: date,
                        })
                      }
                    />
                  </div>

                  {/* <div className="w-full lg:w-1/2 inline-block p-2">
                    <label
                      className="block mt-2 mb-2 w-full"
                      forhtml="serviceEndDate"
                    >
                      <span className="text-gray-600">Service End: </span>
                    </label>
                    <DatePicker
                      id="serviceEndDate"
                      autoComplete="off"
                      name="serviceEndDate"
                      className="w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                      selected={payload.service_end_date}
                      todayButton="Today"
                      dateFormat="dd-MMM-yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      strictParsing
                      disabled={!payload.service_start_date}
                      minDate={
                        payload.service_start_date || subDays(new Date(), 25570)
                      }
                      maxDate={addDays(new Date(), 5)}
                      placeholderText="departure date"
                      onChange={(date) =>
                        setPayload({
                          ...payload,
                          service_end_date: isValid(date)
                            ? addDays(date, 1)
                            : null,
                        })
                      }
                    />
                  </div> */}
                </div>

                <div className="text-left mt-3">
                  <div className="p-1 text-gray-400 border-b-2 border-gray-300 uppercase text-sm font-semibold mt-5">
                    Employee's Position Occupancy Dates:
                  </div>

                  <div className="w-full lg:w-1/2 inline-block p-2">
                    <label
                      className="block mt-2 mb-2 w-full text-left"
                      forhtml="title"
                    >
                      <span className="text-gray-600">
                        <span className="text-lg text-red-700 mr-1">*</span>
                        Position Start:{' '}
                        {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                      </span>
                    </label>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      popperPlacement="top"
                      autoComplete="off"
                      className="w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                      selected={payload.start_date}
                      todayButton="Today"
                      dateFormat="dd-MMM-yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      strictParsing
                      minDate={subDays(new Date(), 25570)}
                      maxDate={addDays(new Date(), 5)}
                      onChange={(date) =>
                        setPayload({
                          ...payload,
                          start_date: date,
                        })
                      }
                    />
                  </div>

                  <div className="w-full lg:w-1/2 inline-block p-2">
                    <label className="block mt-2 mb-2 w-full" forhtml="title">
                      <span className="text-gray-600">
                        Position End:{' '}
                        {/* <span className="text-sm text-gray-400">
                        (ex: Team Lead, Regional RTS)
                      </span> */}
                      </span>
                    </label>
                    <DatePicker
                      id="endDate"
                      name="endDate"
                      popperPlacement="top"
                      autoComplete="off"
                      className="w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                      selected={payload.end_date}
                      todayButton="Today"
                      dateFormat="dd-MMM-yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      strictParsing
                      disabled={!payload.start_date}
                      minDate={payload.start_date}
                      maxDate={addDays(new Date(), 5)}
                      onChange={(date) =>
                        setPayload({
                          ...payload,
                          end_date: date,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="p-1 text-gray-400 border-b-2 border-gray-300 uppercase text-sm font-semibold mt-5">
                  Additional Employee Details:
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">Employee Credentials</span>
                  </label>
                  <Select
                    placeholder={null}
                    value={
                      payload.credentials &&
                      allCredentialsObj &&
                      payload.credentials.map((c) => ({
                        value: c.abbrev,
                        label: c.name,
                        abbrev: c.abbrev,
                        name: c.name,
                      }))
                    }
                    closeMenuOnSelect={false}
                    isMulti
                    menuPlacement="top"
                    options={
                      allCredentials &&
                      allCredentials.map((c, idx) => ({
                        value: c.abbrev,
                        label: `${c.name}`,
                        abbrev: c.abbrev,
                        name: c.name,
                      }))
                    }
                    onChange={(selectedOption) => {
                      setPayload({
                        ...payload,
                        // credentials: selectedOption.map(({ value }) => value),
                        credentials: selectedOption.map((c) => c),
                      });
                    }}
                  ></Select>
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1">*</span>
                      Employee's Year of Birth:{' '}
                      <span className="text-sm text-gray-400">(year only)</span>
                    </span>
                  </label>
                  <DatePicker
                    id="dob"
                    name="dob"
                    popperPlacement="top"
                    autoComplete="off"
                    className="w-56 border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    selected={payload.dob}
                    dateFormat="yyyy"
                    showYearPicker
                    yearItemNumber={12}
                    minDate={subDays(new Date(), 33000)}
                    maxDate={subDays(new Date(), 6575)}
                    onChange={(date) =>
                      setPayload({
                        ...payload,
                        dob: date,
                      })
                    }
                  />
                  <span className="text-gray-500 text-xs">
                    {payload.dob && formatDistanceToNow(payload.dob)}
                  </span>
                </div>

                {/* <div className="mt-4">
                  <textarea
                    cols={50}
                    rows={8}
                    value={JSON.stringify(payload)}
                    readOnly
                  ></textarea>
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <SaveButton label="Save" onClick={handleSubmit} />

            <CancelButton
              label="Cancel"
              onClick={() => {
                doModalClose();
              }}
            />
          </div>
        </div>
      </Transition>
    );
  }
);

export { EditOccupancyModal, EditOccupancyModal as default };

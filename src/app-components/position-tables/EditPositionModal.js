/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';
import Select from 'react-select';

const EditPositionModal = connect(
  'doModalClose',
  'selectOccupationItems',
  'selectPayplanItems',
  ({
    doModalClose,
    occupationItems: occupations,
    payplanItems: pay_plans,
    position: p,
  }) => {
    const [payload, setPayload] = useState({
      id: (p && p.id) || null,
      occupation_code: (p && p.occupation_code) || null,
      occupation_name: (p && p.occupation_name) || null,
      pay_plan: (p && p.pay_plan) || null,
      grade: (p && p.grade) || 0,
      title: (p && p.title) || null,
      is_active: (p && p.is_active) || false,
      is_supervisor: (p && p.is_supervisor) || false,
    });
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
                  Edit Position
                </Dialog.Title>
                {/* <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    EDIT POSITION INFORMATION SECTION
                  </p>
                  <p>Title, Series/Occupation, PayPlan, Etc.</p>
                </div> */}
                <div className="w-full mt-3 p-2">
                  <label className="block mt-6 mb-2 w-full" forhtml="unit">
                    <span className="text-gray-600">Occupation - Series</span>
                  </label>
                  <Select
                    placeholder={
                      payload.occupation_code + ' - ' + payload.occupation_name
                    }
                    options={occupations.map((s, idx) => ({
                      value: s.code,
                      label: s.code + ' - ' + s.name,
                    }))}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        occupation_code: e.value,
                        occupation_name: e.label,
                      })
                    }
                  />
                </div>
                <div className="w-full lg:w-1/2 inline-block p-2">
                  <label className="block mt-4 mb-2 w-full" forhtml="payplan">
                    <span className="text-gray-600">Pay Plan</span>
                  </label>
                  <Select
                    placeholder={payload.pay_plan}
                    options={pay_plans.map((pp, index) => ({
                      value: pp.code,
                      label: pp.code + ' - ' + pp.name,
                    }))}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        pay_plan: e.value,
                      })
                    }
                  />
                </div>

                <div className="w-full lg:w-1/2 inline-block p-2">
                  <label className="block mt-4 mb-2 w-full" forhtml="grade">
                    <span className="text-gray-600">Grade</span>
                  </label>
                  <input
                    type="number"
                    className="block w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    defaultValue={payload.grade}
                    maxLength={2}
                    min={1}
                    max={15}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        grade: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-4 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">Position Title</span>
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

                <div className="w-full lg:w-1/2 inline-block p-2">
                  {/* <label
                    className="block mt-4 mb-2 w-full"
                    forhtml="supervisor"
                  >
                    <span className="text-gray-600">Supervisor?</span>
                  </label> */}
                  <div className="py-4">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch.Label className="mr-4 text-left w-24 lg:w-24">
                          Supervisor?
                        </Switch.Label>
                        <Switch
                          checked={payload.is_supervisor}
                          onChange={(e) =>
                            setPayload({
                              ...payload,
                              is_supervisor: !payload.is_supervisor,
                            })
                          }
                          className={`${
                            payload.is_supervisor
                              ? 'bg-blue-600'
                              : 'bg-gray-200'
                          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              payload.is_supervisor
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                      </div>
                    </Switch.Group>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 inline-block p-2">
                  {/* <label
                    className="block mt-4 mb-2 w-full"
                    forhtml="supervisor"
                  >
                    <span className="text-gray-600">Supervisor?</span>
                  </label> */}
                  <div className="py-8">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch.Label className="mr-4 text-left w-24 lg:w-16">
                          Active?
                        </Switch.Label>
                        <Switch
                          checked={payload.is_active}
                          onChange={(e) =>
                            setPayload({
                              ...payload,
                              is_active: !payload.is_active,
                            })
                          }
                          className={`${
                            payload.is_active ? 'bg-blue-600' : 'bg-gray-200'
                          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              payload.is_active
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                      </div>
                    </Switch.Group>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    Employee Section Showing 1 of 2 Button Alternatives
                  </p>
                  <p>
                    (1) If Vacant, "Add Employee" <br /> (2) If Position
                    Currently Filled, "Vacate Position" button or allow editing
                    select details about employee
                  </p>
                </div>
                <div className="mt-4">
                  INFO:{' '}
                  <textarea defaultValue={JSON.stringify(payload)}></textarea>
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
              onClick={() => {
                console.log(p);
                doModalClose();
              }}
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

export { EditPositionModal, EditPositionModal as default };

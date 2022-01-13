/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { PencilAltIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';
import Select from 'react-select';
import { DeleteButton, SaveButton, CancelButton } from '../forms/buttons';

const EditPositionModal = connect(
  'doModalClose',
  'selectOccupationItems',
  'selectPayplanItems',
  'selectGroupActiveArray',
  'selectGroupActiveObject',
  'selectGroupSelected',
  'doPositionSave',
  'doPositionDelete',
  'doPositionsFetch',
  ({
    doModalClose,
    occupationItems: occupations,
    payplanItems: pay_plans,
    groupActiveArray: groups,
    groupActiveObject: groupsObj,
    groupSelected: defaultGroup,
    doPositionSave,
    doPositionDelete,
    position: p,
  }) => {
    const [payload, setPayload] = useState({
      id: (p && p.id) || null,
      occupation_code: (p && p.occupation_code) || null,
      occupation_name: (p && p.occupation_name) || null,
      pay_plan: (p && p.pay_plan) || null,
      target_grade: (p && parseInt(p.target_grade)) || 0,
      title: (p && p.title) || null,
      is_active: (p && p.is_active) || false,
      is_supervisor: (p && p.is_supervisor) || false,
      is_allocated: (p && p.is_allocated) || false,
      group_slug: (p && p.group_slug) || defaultGroup.slug,
      current_occupant: (p && p.current_occupancy) || null,
    });

    const [error, setError] = useState({
      msg: null,
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      if (
        !payload ||
        (!payload.id && p && !p.duplicate) ||
        !payload.title ||
        !payload.occupation_code ||
        !payload.pay_plan ||
        !parseInt(payload.target_grade) ||
        !payload.group_slug
      ) {
        console.log('Missing one or more required fields for product');
        setError({
          ...error,
          msg: 'Please fill out all required (*) fields.',
        });
        return;
      }
      doPositionSave(payload);
      doModalClose();
    };

    const handleDelete = (e) => {
      if (!payload || !payload.id) {
        console.log('Payload or payload.id not set.');
        return;
      }
      doPositionDelete(payload);
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
            <div className="sm:flex sm:items-start bg-gray-50 p-2 rounded-xl">
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
                  {p && !p.duplicate
                    ? 'Edit'
                    : p && p.duplicate
                    ? 'Duplicate'
                    : 'New'}{' '}
                  Position
                </Dialog.Title>

                {error && error.msg && (
                  <div className="bg-red-100 border-2 border-red-300 mt-2 p-2 text-red-800 rounded">
                    {error.msg}
                  </div>
                )}

                <div className="w-full mt-3 p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="unit">
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1">*</span>Group
                    </span>
                  </label>
                  <Select
                    placeholder={
                      // (p && p.group_slug && groupsObj[p.group_slug].name) ||
                      groupsObj[payload.group_slug].name
                    }
                    options={groups.map((s, idx) => ({
                      value: s.slug,
                      label: s.name,
                    }))}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        group_slug: e.value,
                      })
                    }
                  />
                </div>
                <div className="w-full mt-3 p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="unit">
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1">*</span>
                      Occupation - Series
                    </span>
                  </label>
                  <Select
                    placeholder={
                      p &&
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
                  <label className="block mt-2 mb-2 w-full" forhtml="payplan">
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1">*</span>Pay
                      Plan
                    </span>
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
                  <label
                    className="block mt-2 mb-2 w-full"
                    forhtml="target_grade"
                  >
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1 ">*</span>
                      <span
                        data-tip="For career ladder positions like 7/9/11 use 11"
                        className="border-b-2 border-dashed border-gray-400"
                      >
                        Target Grade
                      </span>
                    </span>
                  </label>
                  <input
                    type="number"
                    pattern="\d*"
                    className="block w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-1 pt-2"
                    defaultValue={payload.target_grade}
                    maxLength={2}
                    min={1}
                    max={15}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        target_grade: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="w-full block p-2">
                  <label className="block mt-2 mb-2 w-full" forhtml="title">
                    <span className="text-gray-600">
                      <span className="text-lg text-red-700 mr-1">*</span>
                      Position Title
                      <span className="ml-2 text-sm text-gray-400">
                        (as shown on PD)
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

                <div className="w-full lg:w-1/2 inline-block p-2">
                  {/* <label
                    className="block mt-4 mb-2 w-full"
                    forhtml="supervisor"
                  >
                    <span className="text-gray-600">Supervisor?</span>
                  </label> */}
                  <div className="py-2">
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
                  <div className="py-2">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch.Label className="mr-4 text-left w-24 lg:w-16">
                          <span
                            data-place="top"
                            data-html="true"
                            data-tip="Setting to 'Inactive' will exclude it from all calculations."
                            className="border-b-2 border-dashed border-gray-400"
                          >
                            Active?
                          </span>
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

                <div className="w-full inline-block p-2">
                  <div className="py-2">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch.Label className="mr-4 text-left w-24 lg:w-24">
                          <span
                            data-place="right"
                            data-html="true"
                            data-tip="Is this position included in your <br />office's manning document?"
                            className="border-b-2 border-dashed border-gray-400"
                          >
                            Position Allocated?
                          </span>
                        </Switch.Label>
                        <Switch
                          checked={payload.is_allocated}
                          onChange={(e) =>
                            setPayload({
                              ...payload,
                              is_allocated: !payload.is_allocated,
                            })
                          }
                          className={`${
                            payload.is_allocated ? 'bg-blue-600' : 'bg-gray-200'
                          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              payload.is_allocated
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                      </div>
                    </Switch.Group>
                  </div>
                </div>
                {p && p.duplicate && (
                  <div className="bg-yellow-100 text-gray-500 p-2">
                    <InformationCircleIcon className="w-5 mb-1 mr-2 inline-block text-blue-700" />
                    Occupant information will not be copied.
                  </div>
                )}

                {/* <div className="mt-4">
                  <textarea
                    cols={40}
                    rows={9}
                    readOnly={1}
                    value={JSON.stringify(payload)}
                  ></textarea>
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <SaveButton
              label={p && p.duplicate ? 'Save as New Position' : 'Save'}
              onClick={handleSubmit}
            />

            <CancelButton
              label="Cancel"
              onClick={() => {
                doModalClose();
              }}
            />

            <div className="flex-auto">
              {p && !p.current_occupancy && (
                <DeleteButton label="Delete" onClick={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
);

export { EditPositionModal, EditPositionModal as default };

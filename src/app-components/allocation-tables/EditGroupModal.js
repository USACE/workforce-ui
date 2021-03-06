/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';
import { SaveButton, CancelButton, DeleteButton } from '../forms/buttons';

// TODO; Confirm title of component
const EditPositionModal = connect(
  'doModalClose',
  'selectOfficeActive',
  'doGroupSave',
  'doGroupDelete',
  ({
    doModalClose,
    officeActive: office,
    doGroupSave,
    doGroupDelete,
    group: g,
  }) => {
    const [name, setName] = useState((g && g.name) || null);
    const [deleteIsConfirming, setDeleteIsConfirming] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || name === '') {
        console.log('Missing one or more required fields for group');
        return;
      }
      doGroupSave({
        ...g,
        name: name,
      });
      doModalClose();
    };

    const handleDelete = (e) => {
      if (!g || !g.slug) {
        console.log('Payload or payload.slug not set.');
        return;
      }
      doGroupDelete(g);
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <PencilAltIcon
                  className="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  {g && g.uid
                    ? 'Edit ' + office.symbol + ' Group'
                    : 'New ' + office.symbol + ' Group'}
                </Dialog.Title>
                <div className="mt-8">
                  <label className="block mt-4 w-full" forhtml="label">
                    <span className="text-gray-600">Name</span>
                  </label>
                  <input
                    className="w-full border-2 rounded border-gray-200 focus:ring-0 focus:border-black p-2"
                    defaultValue={name}
                    maxLength={40}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {!deleteIsConfirming && (
              <SaveButton label="Save" onClick={handleSubmit} />
            )}

            {!deleteIsConfirming && (
              <CancelButton
                label="Cancel"
                onClick={() => {
                  doModalClose();
                }}
              />
            )}

            <div className="flex-auto">
              {g && !g.count_positions && (
                <DeleteButton
                  isConfirming={deleteIsConfirming}
                  setIsConfirming={setDeleteIsConfirming}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
);

export { EditPositionModal, EditPositionModal as default };

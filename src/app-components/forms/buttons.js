import React from 'react';
import { UserAddIcon } from '@heroicons/react/solid';

const UserAddButton = (props) => (
  <button
    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
    onClick={props.onClick}
  >
    <UserAddIcon className="h-5 w-5" />
    {props.label}
  </button>
);

const NewButton = (props) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    onClick={props.onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 inline mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    {props.label}
  </button>
);

const SaveButton = (props) => (
  <button
    type="button"
    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
    onClick={props.onClick}
  >
    {props.label}
  </button>
);

const DeleteButton = ({ onDelete, isConfirming, setIsConfirming }) => {
  return (
    <div className="w-full py-2 sm:py-0">
      <button
        type="button"
        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
          isConfirming
            ? 'bg-gray-400'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-2 focus:ring-offset-2'
        } text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-24 sm:text-sm`}
        onClick={(e) => setIsConfirming(!isConfirming)}
      >
        {isConfirming ? '< Cancel' : 'Delete'}
      </button>
      {isConfirming && (
        <button
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onDelete}
        >
          Confirm Delete
        </button>
      )}
    </div>
  );
};

// const SaveButton = (props) => (
//   <button
//     className="bg-blue-500 hover:bg-blue-700 text-white py-2 pl-2 pr-4 text-lg rounded"
//     onClick={props.onClick}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6 inline"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M5 13l4 4L19 7"
//       />
//     </svg>
//     {props.label}
//   </button>
// );

const EditButton = (props) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 pl-2 pr-4 text-lg rounded"
    onClick={props.onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 inline"
      fill="none"
      viewBox="0 0 26 26"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
    {props.label}
  </button>
);

const CancelButton = (props) => (
  <button
    type="button"
    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    onClick={props.onClick}
  >
    {props.label}
  </button>
);

// const CancelButton = (props) => (
//   <button
//     className={
//       'bg-red-300 hover:bg-red-500 text-white py-2 pl-3 pr-4 text-lg rounded ' +
//       props.className
//     }
//     onClick={props.onClick}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6 mr-1 inline"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
//       />
//     </svg>
//     {props.label}
//   </button>
// );

export {
  NewButton,
  SaveButton,
  CancelButton,
  DeleteButton,
  EditButton,
  UserAddButton,
};

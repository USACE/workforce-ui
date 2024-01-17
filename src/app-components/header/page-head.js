import React from 'react';
export default function PageHead(props) {
  return (
    <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
      <div>
        <h4 className="text-2xl font-bold leading-tight text-gray-800">
          {props.title}
        </h4>
      </div>
    </div>
  );
}

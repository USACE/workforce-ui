import React from 'react';

import Wrapper from '../../app-components/wrapper';
import LoginButtonImage from '../../images/login_button.png';
import LoggedInAvatarImage from '../../images/logged_in_avatar.png';
import OfficeListImage from '../../images/office_list.png';
import PositionsListImage from '../../images/positions_list.png';
import RequestAccessImage from '../../images/request_access.png';
import RequestGrantedImage from '../../images/request_granted.png';
import VerifyGroupImage from '../../images/verify_group.png';
import IsAllocatedToggleImage from '../../images/is_allocated_toggle.png';
import EditOccupancyImage from '../../images/edit_occupancy.png';

export default function Help() {
  // const [show, setShow] = useState(false);
  // const [product, setProduct] = useState(false);
  // const [deliverables, setDeliverables] = useState(false);
  // const [profile, setProfile] = useState(false);
  return (
    <Wrapper title="Workforce Help">
      {/* different colors for screen size breakpoints only enabled when NODE_ENV === 'development' */}
      <div className="container max-auto p-2">
        <h2 className="text-2xl font-semibold text-gray-500 mb-5">
          Getting Started
        </h2>
        <ol className="list-inside p-5">
          <li className="list-decimal bg-white p-5 shadow-md">
            Create an account by logging in for the first time.
            <div className="">
              <img
                src={LoginButtonImage}
                className="border-0 m-4 inline"
                alt="Login Button"
              />
              <img
                src={LoggedInAvatarImage}
                className="border-0 m-4 inline"
                alt="Logged In User"
              />
              <p className="text-gray-500 text-sm ml-5">
                Successful login will result in your initials appearing (example
                above).
              </p>
            </div>
          </li>

          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            Select your office from the list on the home page.
            <img
              src={OfficeListImage}
              className="border-0 m-4"
              alt="Office List"
            />
          </li>
          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            <span className="text-red-600 font-bold p-2">
              If this is your first time using the workforce application, you
              may not have the required permissions to modify data for your
              office.
            </span>
            <p className="text-gray-500 text-lg ml-5 mt-5">
              To request access click the{' '}
              <strong>Request Edit Permissions</strong> button as shown below:
            </p>
            <img
              src={RequestAccessImage}
              className="border-0 m-4"
              alt="Request Access"
            />
            <span className="text-green-600 font-bold p-2">
              Once access is granted, you will see buttons like "+New Group"
            </span>

            <img
              src={RequestGrantedImage}
              className="border-0 m-4"
              alt="Request Granted"
            />
          </li>
          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            Add new groups
            <p className="text-gray-500 text-sm ml-5">
              Think of groups like branches/sections/teams. While we don't
              support nesting of groups, you can name them whatever you want.
            </p>
          </li>
          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            Add all positions from your office's IDM or "manning document",
            whether filled or vacant.
            <br />
            <span className="italic text-sm">
              All positions will initially be created "Vacant". Showing a
              position as "Filled" by adding demographic information is covered
              in the following step.
            </span>
            <img
              src={PositionsListImage}
              className="border-0 m-4"
              alt="Positions List"
            />
            <div className="sm:flex mt-8">
              <img
                src={IsAllocatedToggleImage}
                className="border-0 ml-4"
                alt="position data entry form"
                width={360}
              />
              {/* New Position / Edit Position Modal Instructions */}
              <div className="sm:ml-4 sm:flex sm:flex-col justify-between space-y-8">
                <div className="text-lg">
                  The position data-entry form in the adjacent image is accessed
                  by clicking the blue edit button (pencil icon) in the
                  positions table.
                </div>
                <div className="flex-grow flex flex-col justify-around">
                  <div>
                    <span className="font-bold">
                      To show a position that is within your approved manning
                      document - whether filled or vacant,{' '}
                    </span>
                    toggle the "Active" switch ON and the “Position Allocated in
                    Manning Document” switch ON. These will be ON by default
                    when creating a new position.
                  </div>
                  {/* Showing Additional Need */}
                  <div>
                    <span className="font-bold">
                      To show a position is an additional need beyond your
                      approved roster (so it will not be filled and not on your
                      manning document),{' '}
                    </span>
                    leave "Active" toggled ON and toggle “Position Allocated in
                    Manning Document” to OFF.
                  </div>
                  <div className="mt-4 italic">
                    Note: The "Active" toggle is used to remove a position from
                    totals and metrics, while retaining the position occupancy
                    history. This would apply in the case that a position was at
                    one time part of an approved manning document and had past
                    occupants, but is not currently part of the manning document
                    and should not be counted in an office's totals.
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* EDIT OCCUPANCY INFORMATION */}
          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            Add occupancy (employee) demographic information for each currently
            filled position.
            <br />
            <span className="italic text-sm">
              To show a newly-created position as "Vacant", do not add occupancy
              information.
            </span>
            <img
              src={PositionsListImage}
              className="border-0 m-4"
              alt="Positions List"
            />
            <div className="sm:flex mt-8">
              <img
                src={EditOccupancyImage}
                className="border-0 ml-4"
                alt="Occupancy Data Entry Form"
                width={360}
              />
              <div className="sm:ml-4 sm:flex sm:flex-col justify-between space-y-8">
                <div className="text-lg">
                  The occupancy data-entry form in the adjacent image is
                  accessed by clicking the green "person" button in the
                  positions table for a given position. Mandatory fields are
                  designated with a <span className="text-red-700">*</span>
                  {' .'}
                </div>
                <div className="flex-grow flex flex-col justify-around">
                  <div>
                    <span className="font-bold">Position Start </span>
                    should reflect the date the employee started in the
                    position. This field is used to calculate position-specific
                    experience.
                  </div>
                  <div>
                    <span className="font-bold">Service Start </span>
                    should reflect the date the employee started with the
                    government. This field is used to calculate total government
                    experience.
                  </div>
                  {/* Showing Additional Need */}
                  <div>
                    <span className="font-bold">
                      If an employee leaves a position,{' '}
                    </span>{' '}
                    set the Occupancy End Date in the data entry form for the
                    leaving employee. This will set the position "Vacant".
                    <span className="italic">
                      Note: If this same position is filled by a new occupant, a
                      new "Occupancy" should be entered, rather than editing the
                      previous occupancy information.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-decimal mt-8 bg-white p-5 shadow-md">
            To acknowledge that position and occupancy data has been reviewed
            and is up-to-date for a group, click the "Verify Group" button,
            located on the office groups screen.
            <img
              src={VerifyGroupImage}
              className="border-0 m-4 inline"
              alt="Verify Group"
            />
          </li>
        </ol>
      </div>

      <div className="container mx-auto  mt-8 p-0"></div>
    </Wrapper>
  );
}

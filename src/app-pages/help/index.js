import React from 'react';

import Wrapper from '../../app-components/wrapper';
import LoginButtonImage from '../../images/login_button.png';
import LoggedInAvatarImage from '../../images/logged_in_avatar.png';
import OfficeListImage from '../../images/office_list.png';
import PositionsListImage from '../../images/positions_list.png';
import RequestAccessImage from '../../images/request_access.png';
import RequestGrantedImage from '../../images/request_granted.png';
import VerifyGroupImage from '../../images/verify_group.png';

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

          <li className="list-decimal mt-5 bg-white p-5 shadow-md">
            Select your office from the list on the home page.
            <img
              src={OfficeListImage}
              className="border-0 m-4"
              alt="Office List"
            />
          </li>
          <li className="list-decimal mt-5 bg-white p-5 shadow-md">
            <span className="text-red-600 font-bold p-2">
              If this is your first time using the workforce application, you
              may not have the required permissions for your office.
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
          <li className="list-decimal mt-5 bg-white p-5 shadow-md">
            Add new groups
            <p className="text-gray-500 text-sm ml-5">
              Think of groups like branches/sections/teams. While we don't
              support nesting of groups, you can name them whatever you want.
            </p>
          </li>
          <li className="list-decimal mt-5 bg-white p-5 shadow-md">
            Add positions and employee occupancy details to each new group
            <img
              src={PositionsListImage}
              className="border-0 m-4"
              alt="Positions List"
            />
          </li>
          <li className="list-decimal mt-5 bg-white p-5 shadow-md">
            Once all of the position and occupancy data is complete for a group,
            click the "Verify Group" button on the office group to acknowledge
            that it has been reviewed and is up-to-date.
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

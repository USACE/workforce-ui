import React from 'react';
import { connect } from 'redux-bundler-react';
import Wrapper from '../../app-components/wrapper';

// const MyFunction = ({ officeActive: active, authIsLoggedIn }) => {
//   return (
//     <div>
//       <div>Group Detail Page</div>
//       {/* <div>{JSON.stringify(props)}</div> */}
//       <div>Active Office Symbol is {active && active.symbol}</div>
//       <div>Is logged in? {authIsLoggedIn || 'NO SIR'}</div>
//     </div>
//   );
// };

// const GroupDetail = connect(
//   'selectOfficeActive',
//   'selectAuthIsLoggedIn',
//   MyFunction
// );

// OR ...
const GroupDetail = connect(
  'selectOfficeActive',
  'selectGroupSelected',
  ({ officeActive: office, groupSelected: group }) => {
    return (
      office &&
      group && (
        <Wrapper title={`Group Details | ${group.name}`}>
          <div>
            <h1>Group Detail Page</h1>
            <div className="mt-4">Office</div>
            <div className="mt-4">{JSON.stringify(office)}</div>
            <div className="mt-4">Group</div>
            <div className="mt-4">{JSON.stringify(group)}</div>
          </div>
        </Wrapper>
      )
    );
  }
);

export default GroupDetail;

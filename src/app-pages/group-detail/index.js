import React from 'react';
import { connect } from 'redux-bundler-react';
import Wrapper from '../../app-components/wrapper';
import { GroupPositionTable } from '../../app-components/position-tables';

const GroupDetail = connect(
  'selectOfficeActive',
  'selectOfficeIsLoading',
  'selectGroupSelected',
  'selectGroupIsLoading',
  'selectRouteParams',
  ({
    officeActive: office,
    officeIsLoading,
    groupSelected: group,
    groupIsLoading,
    routeParams,
  }) => {
    let title = 'Loading';
    if (office && group) {
      title = `${office && office.symbol}  |  ${group && group.name} Group`;
    }

    return (
      <>
        <Wrapper title={title}>
          <GroupPositionTable />
        </Wrapper>
      </>
    );
    // return officeIsLoading || groupIsLoading ? (
    //   <>Loading...</>
    // ) : !office || !group ? (
    //   <>{`Group '${routeParams['group_slug']}' for office '${routeParams['office_symbol']}' does not exist`}</>
    // ) : (
    //   <Wrapper title={`${office.symbol}  |  ${group.name} Group`}>
    //     <GroupPositionTable />
    //   </Wrapper>
    // );
  }
);

export default GroupDetail;

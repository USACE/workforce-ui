import React from 'react';
import { connect } from 'redux-bundler-react';
import { GroupAllocationTable } from '../../app-components/allocation-tables';
import Wrapper from '../../app-components/wrapper';

const OfficeDetail = connect(
  'selectOfficeActive',
  'selectGroupActiveArray',
  'doUpdateUrl',
  ({ officeActive: office, groupActiveArray: groups, doUpdateUrl }) => {
    let title = 'Loading';
    if (office) {
      title = `${office.name} Office (${office.symbol})`;
    }

    return (
      <Wrapper title={title}>
        <GroupAllocationTable />
      </Wrapper>
    );

    // return !office ? (
    //   <>Office does not exist</>
    // ) : (
    //   <Wrapper title={`${office.name} Office (${office.symbol})`}>
    //     <GroupAllocationTable />
    //   </Wrapper>
    // );
  }
);

export default OfficeDetail;

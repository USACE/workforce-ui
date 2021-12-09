import React from 'react';
import { connect } from 'redux-bundler-react';
import { GroupAllocationTable } from '../../app-components/allocation-tables';
import Wrapper from '../../app-components/wrapper';

const OfficeDetail = connect(
  'selectOfficeActive',
  'selectGroupActiveArray',
  'doUpdateUrl',
  ({ officeActive: office, groupActiveArray: groups, doUpdateUrl }) => {
    return !office ? (
      <>Office does not exist</>
    ) : (
      <Wrapper title={`HOME | ${office.name} (${office.symbol})`}>
        <GroupAllocationTable />
      </Wrapper>
    );
  }
);

export default OfficeDetail;

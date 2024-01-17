import React from 'react';
import { connect } from 'redux-bundler-react';
import Wrapper from '../../../app-components/wrapper';
import OfficeAdminRequestTable from '../admin-requests/request-table';
// import { HorizontalSeriesMetricsCard } from '../../app-components/charts/SeriesMetricsResponsiveBullet';

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
    return (
      <>
        <Wrapper title="Office Admin Requests">
          <div className="container justify-between inline-flex shadow-md">
            {/* <HorizontalSeriesMetricsCard /> */}
          </div>
          <div className="mt-12">
            <OfficeAdminRequestTable />
          </div>
        </Wrapper>
      </>
    );
  }
);

export default GroupDetail;

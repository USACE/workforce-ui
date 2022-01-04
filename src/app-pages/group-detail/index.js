import React from 'react';
import { connect } from 'redux-bundler-react';
import Wrapper from '../../app-components/wrapper';
import { GroupPositionTable } from '../../app-components/position-tables';
import { HorizontalSeriesMetricsCard } from '../../app-components/charts/SeriesMetricsResponsiveBullet';

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
          <div
            className={`container justify-between inline-flex shadow-md ${
              process.env.NODE_ENV === 'development' &&
              'border-0 md:border-green-200 sm:border-blue-200 lg:border-red-900'
            }`}
          >
            <HorizontalSeriesMetricsCard />
          </div>
          <div className="mt-12">
            <GroupPositionTable />
          </div>
        </Wrapper>
      </>
    );
  }
);

export default GroupDetail;

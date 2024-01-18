import React from 'react';
import { connect } from 'redux-bundler-react';
import { GroupAllocationTable } from '../../app-components/allocation-tables';
import { HorizontalSeriesMetricsCard } from '../../app-components/charts/SeriesMetricsResponsiveBullet';
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
        <div
          className={`container justify-between inline-flex shadow-md ${
            import.meta.env.MODE === 'development' &&
            'border-0 md:border-green-200 sm:border-blue-200 lg:border-red-900'
          }`}
        >
          <HorizontalSeriesMetricsCard />
        </div>
        <div className="mt-12">
          <GroupAllocationTable />
        </div>
      </Wrapper>
    );
  }
);

export default OfficeDetail;

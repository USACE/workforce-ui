import React from 'react';
// import MyResponsiveBar from '../../app-components/charts/bar';
// import MyResponsivePie from '../../app-components/charts/pie';
import { HorizontalSeriesMetricsCard } from '../../app-components/charts/SeriesMetricsResponsiveBullet';
import { OfficeAllocationTable } from '../../app-components/allocation-tables';
import Wrapper from '../../app-components/wrapper';

export default function Home() {
  // const [show, setShow] = useState(false);
  // const [product, setProduct] = useState(false);
  // const [deliverables, setDeliverables] = useState(false);
  // const [profile, setProfile] = useState(false);
  return (
    <Wrapper title="Hydraulics, Hydrology, Coastal Community of Practice">
      {/* different colors for screen size breakpoints only enabled when NODE_ENV === 'development' */}
      <div
        className={`container justify-between inline-flex p-2 ${
          process.env.NODE_ENV === 'development' &&
          'md:bg-green-200 sm:bg-blue-200 lg:bg-red-900'
        }`}
      >
        <HorizontalSeriesMetricsCard />
      </div>

      <div className="container mx-auto md:bg-green-200 sm:bg-blue-200 lg:bg-red-900 mt-8 p-0">
        <OfficeAllocationTable />
      </div>
    </Wrapper>
  );
}

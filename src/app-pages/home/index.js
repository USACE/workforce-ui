import React from 'react';
import MyResponsiveBar from '../../app-components/charts/bar';
import MyResponsivePie from '../../app-components/charts/pie';
import MyResponsiveBullet from '../../app-components/charts/bullet';
import ChartTitle from '../../app-components/charts/chart-title';
import { OfficeAllocationTable } from '../../app-components/allocation-tables';
import Wrapper from '../../app-components/wrapper';

export default function Home() {
  // const [show, setShow] = useState(false);
  // const [product, setProduct] = useState(false);
  // const [deliverables, setDeliverables] = useState(false);
  // const [profile, setProfile] = useState(false);
  return (
    <Wrapper title="Overview Dashboard">
      {/* Remove class [ h-64 ] when adding a card block */}
      {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
      <div className="container justify-between mx-auto lg:inline-flex gap-1 md:bg-green-200 sm:bg-blue-200 lg:bg-red-900 mt-2 lg:h-80 p-2">
        <div className="w-full lg:w-1/4 inline-block pb-10 rounded border-dashed border-2 border-gray-300 bg-gray-50">
          <ChartTitle title="Positions Filled" />
          <MyResponsiveBullet />
        </div>
        <div className="w-full lg:w-1/3 inline-block rounded border-dashed border-2 border-gray-300 bg-gray-50 pb-10">
          <ChartTitle title="Positions by Job Series" />
          <MyResponsiveBar />
        </div>
        <div className="w-full lg:w-1/4 inline-block pb-10 rounded border-dashed border-2 border-gray-300 bg-gray-50">
          <ChartTitle title="Years of Service" />
          <MyResponsivePie />
        </div>
      </div>
      <div className="container mx-auto md:bg-green-200 sm:bg-blue-200 lg:bg-red-900 mt-8 p-0">
        <OfficeAllocationTable />
      </div>
    </Wrapper>
  );
}

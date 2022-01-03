// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bullet
import { ResponsiveBullet } from '@nivo/bullet';
import { connect } from 'redux-bundler-react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const VerticalSeriesMetricsResponsiveBullet = connect(
  'selectSeriesMetricsBulletInfo',
  ({ seriesMetricsBulletInfo: info }) => {
    const { maxValue, data } = info;
    return (
      <div className="w-full h-full flex space-x-3 justify-center p-4">
        {data.map((d, idx) => (
          <div key={idx} style={{ width: idx === 0 ? 64 : 32 }}>
            <ResponsiveBullet
              animate={false}
              data={[d]}
              //   First item needs left margin to show axis
              margin={{
                top: 0,
                right: 0,
                bottom: 32,
                left: idx === 0 ? 32 : 0,
              }}
              layout="vertical"
              titleAlign="start"
              //   start, middle, end
              titleOffsetX={0}
              titleOffsetY={400}
              titleRotation={270}
              //   titlePosition = before || after
              titlePosition="after"
              measureSize={0.5}
              maxValue={maxValue}
              spacing={0}
              rangeColors={['#bdbdbd', '#f9fafb']}
              markerColors={['#4ade80']}
              measureColors={['#636363']}
              axisPosition="before"
              onRangeClick={(range, e) => {
                console.log(range);
              }}
              onMeasureClick={(measure, e) => {
                console.log(measure);
              }}
              onMarkerClick={(marker, e) => {
                console.log(marker);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
);

const HorizontalSeriesMetricsResponsiveBullet = connect(
  'selectSeriesMetricsBulletInfo',
  ({ seriesMetricsBulletInfo: info }) => {
    const { maxValue, data } = info;
    return (
      <div className="w-full h-full flex flex-col space-y-1 justify-center px-12 py-8">
        {data.map((d, idx) => (
          <div key={idx} style={{ height: idx === 0 ? 36 : 18 }}>
            <ResponsiveBullet
              animate={false}
              data={[d]}
              margin={{
                top: idx === 0 ? 18 : 0,
                right: 12,
                bottom: 0,
                left: 280,
              }}
              layout="horizontal"
              titleAlign="end"
              titleOffsetX={-8}
              titleOffsetY={0}
              titleRotation={0}
              measureSize={0.6}
              maxValue={maxValue}
              spacing={0}
              rangeColors={['#d1d5db', '#f9fafb']}
              markerColors={['#4ade80']}
              measureColors={['#111827']}
              axisPosition="before"
              onRangeClick={(range, e) => {
                console.log(range);
              }}
              onMeasureClick={(measure, e) => {
                console.log(measure);
              }}
              onMarkerClick={(marker, e) => {
                console.log(marker);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
);

const HorizontalSeriesMetricsCard = (props) => (
  <div className="w-full inline-block pb-10 rounded bg-gray-50">
    {/* Card Title */}
    <div className="flex flex-wrap bg-white w-full justify-between p-3 border-b-2">
      {/* Title */}
      <h2 className="flex-grow px-3 py-1 font-semibold text-gray-800">
        Filled Positions
      </h2>
      <div className="flex space-x-2 text-xs items-center">
        <div className="text-white bg-gray-900 px-3 py-1 rounded-xl">
          Filled
        </div>
        <div className="bg-gray-300 px-3 py-1 rounded-xl ">Allocated</div>
        <div className="bg-green-400 px-3 py-1 rounded-xl">
          Target (includes extra need)
        </div>
      </div>
    </div>
    <HorizontalSeriesMetricsResponsiveBullet />
  </div>
);

export {
  HorizontalSeriesMetricsResponsiveBullet,
  VerticalSeriesMetricsResponsiveBullet,
  HorizontalSeriesMetricsCard,
};

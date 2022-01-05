// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bullet
import { ResponsiveBullet } from '@nivo/bullet';

const PositionSummaryBullet = ({
  id,
  maxValue,
  employees,
  allocated,
  target,
}) => {
  return (
    <ResponsiveBullet
      animate={false}
      data={[
        {
          id: id,
          markers: [target],
          measures: [employees],
          ranges: [allocated],
        },
      ]}
      margin={{
        top: 0,
        right: 4,
        bottom: 0,
        left: 0,
      }}
      layout="horizontal"
      titleAlign="end"
      titleOffsetX={0}
      titleOffsetY={0}
      titleRotation={0}
      measureSize={0.6}
      maxValue={maxValue}
      spacing={0}
      rangeColors={['#d1d5db', 'white']}
      markerColors={['#4ade80']}
      measureColors={['#111827']}
      axisPosition="after"
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
  );
};

export { PositionSummaryBullet, PositionSummaryBullet as default };

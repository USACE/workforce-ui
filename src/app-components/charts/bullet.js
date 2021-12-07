// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bullet
import { ResponsiveBullet } from '@nivo/bullet';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsiveBullet() {
  const data = [
    {
      id: 'temp.',
      ranges: [0, 150],
      measures: [80],
      markers: [85],
    },
    {
      id: 'temp1.',
      ranges: [0, 150],
      measures: [80],
      markers: [79],
    },
    {
      id: 'temp2.',
      ranges: [0, 150],
      measures: [80],
      markers: [85],
    },
    {
      id: 'temp3.',
      ranges: [0, 150],
      measures: [70],
      markers: [85],
    },
  ];
  return (
    <ResponsiveBullet
      data={data}
      margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
      layout="vertical"
      titleAlign="start"
      titleOffsetX={-20}
      titleOffsetY={-15}
      measureSize={0.2}
      maxValue={200}
      spacing={50}
      rangeColors="paired"
      markerColors="blues"
      measureColors="blues"
    />
  );
}

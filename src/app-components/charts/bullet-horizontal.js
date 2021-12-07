// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bullet
import { ResponsiveBullet } from '@nivo/bullet';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsiveBulletHorizontal() {
  const data = [
    {
      id: 'LRH',
      ranges: [0, 30],
      measures: [20],
      markers: [22],
    },
  ];
  return (
    <ResponsiveBullet
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      spacing={46}
      titleAlign="start"
      titleOffsetX={-70}
      measureSize={0.2}
      rangeColors="paired"
      markerColors="green"
      measureColors="blues"
    />
  );
}

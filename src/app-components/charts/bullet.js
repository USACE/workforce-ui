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
      id: '0810',
      title: 'Engineer',
      ranges: [140, 160],
      measures: [120],
      markers: [160],
    },
    {
      id: 'Biologist',
      ranges: [80],
      measures: [40],
      markers: [80],
    },
    {
      id: 'Scientist',
      ranges: [60],
      measures: [40],
      markers: [25],
    },
    {
      id: 'IT Specialist',
      ranges: [140, 160],
      measures: [120],
      markers: [160],
    },
    {
      id: 'Mathematics',
      ranges: [80],
      measures: [40],
      markers: [80],
    },
    {
      id: 'Economist',
      ranges: [60],
      measures: [40],
      markers: [25],
    },
    {
      id: 'Other',
      title: 'Other Title',
      ranges: [35],
      measures: [100],
      markers: [80],
    },
  ];
  return (
    <ResponsiveBullet
      animate={false}
      data={data}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      layout="vertical"
      titleAlign="middle"
      titleOffsetX={0}
      titleOffsetY={175}
      measureSize={0.5}
      maxValue={160}
      spacing={60}
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

    // INDIVIDUAL CHARTS IDEA
    //   <div className="flex h-full justify-around">
    //   {data.map((d, idx) => (
    //     <div key={idx} className="w-24 space-x-3">
    //       <ResponsiveBullet
    //         animate={false}
    //         data={[d]}
    //         margin={{ top: 50, right: 0, bottom: 50, left: 30 }}
    //         layout="vertical"
    //         titleAlign="middle"
    //         titleOffsetX={0}
    //         titleOffsetY={175}
    //         measureSize={0.5}
    //         maxValue={160}
    //         spacing={0}
    //         rangeColors={['lightblue', '#FFFFFF']}
    //         markerColors={['green']}
    //         measureColors={['darkblue']}
    //         axisPosition="before"
    //         onRangeClick={(range, e) => {
    //           console.log(range);
    //         }}
    //       />
    //     </div>
    //   ))}
    // </div>
  );
}

import { ResponsiveBarCanvas } from '@nivo/bar';
import { connect } from 'redux-bundler-react';

export default connect('selectStatsChart8', ({ statsChart8: data }) => {
  return (
    <div
      className="space-y-2 p-4 bg-white rounded shadow-md h-full mb-5 ml-2 mr-2"
      style={{ height: '800px' }}
    >
      <div className="text-center w-full bold text-2xl">
        CoP Membership Advanced Degrees Held
      </div>
      <ResponsiveBarCanvas
        animate={false}
        theme={{ fontSize: 16 }}
        data={data}
        keys={['No Advanced Degree', 'Masters', 'PhD']}
        indexBy="group"
        groupMode={'stacked'}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        margin={{ top: 50, right: 220, bottom: 150, left: 60 }}
        padding={0.3}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 15,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 200,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 170,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
});

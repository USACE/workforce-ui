import { ResponsivePieCanvas } from '@nivo/pie';
import { connect } from 'redux-bundler-react';

export default connect('selectStatsChart3', ({ statsChart3: data }) => {
  return (
    <div
      className="space-y-2 p-4 bg-white rounded shadow-md h-full mb-5 ml-2 mr-2"
      style={{ height: '800px' }}
    >
      <div className="text-center w-full bold text-2xl">
        CoP Membership by Years of Service
      </div>
      <ResponsivePieCanvas
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=">-"
        theme={{ fontSize: 16 }}
        innerRadius={0.05}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
      />
    </div>
  );
});

import React from 'react';
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function MyResponsiveBar() {
  const data = [
    {
      division: 'ERDC',
      allocated: 165,
      allocatedColor: 'hsl(202, 70%, 50%)',
      actual: 155,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 10,
    },
    {
      division: 'LRD',
      allocated: 90,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 83,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 7,
    },
    {
      division: 'MVD',
      allocated: 95,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 90,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 5,
    },
    {
      division: 'NWD',
      allocated: 87,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 80,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 7,
    },
    {
      division: 'NAD',
      allocated: 81,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 79,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 2,
    },
    {
      division: 'POD',
      allocated: 80,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 65,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 15,
      needColor: 'hsl(144, 100%, 32%)',
    },
    {
      division: 'SAD',
      allocated: 88,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 80,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 8,
      needColor: 'hsl(144, 100%, 32%)',
    },
    {
      division: 'SPD',
      allocated: 75,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 75,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 0,
      needColor: 'hsl(144, 100%, 32%)',
    },
    {
      division: 'SWD',
      allocated: 95,
      allocatedColor: 'hsl(90, 70%, 50%)',
      actual: 85,
      actualColor: 'hsl(144, 100%, 32%)',
      need: 10,
      needColor: 'hsl(144, 100%, 32%)',
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      keys={['allocated', 'actual', 'need']}
      indexBy="division"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      groupMode="grouped"
      colors={{ scheme: 'accent' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'division',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number Of People',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
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
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in division: ' + e.indexValue;
      }}
    />
  );
}

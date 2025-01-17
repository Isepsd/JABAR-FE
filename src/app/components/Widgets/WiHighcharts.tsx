import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from "react-redux";

import { HighchartTheme } from '@app/configs/highcharts-theme.config'

function WiHighcharts() {
  const { themeMode } = useSelector((state: any) => state.ui);
  const chartRef: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(chartRef?.current){
      const { chart } = chartRef.current
      chart.update(HighchartTheme(themeMode || 'light'))
    }
  }, [themeMode, chartRef]);

  const chartOptions: any = {
    title: { text: '' },
    credits: { enabled: false },
    chart: { backgroundColor: 'transparent' },
    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
      },
    ],
  };

  return (
    <HighchartsReact
      containerProps={{ style: { height: '100%' } }}
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
}

export default WiHighcharts;

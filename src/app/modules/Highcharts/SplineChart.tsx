import NoData from '@app/components/Error/NoData';
import React, { useEffect, useState } from 'react';
import ContainerHighcharts from './ContainerHighcharts';

interface IAreaSpline {
  series?: any;
  categories?: any;
  legend?: any;
  title?: string;
  subtitle?: string;
  loading?: any;
  height?: string;
  titleY?: string;
  pathServiceName?: any;
}

function SplineChart({
  categories,
  series,
  loading,
  legend = {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  },
  title = "",
  subtitle = "",
  titleY = ""
}: IAreaSpline) {
  const [seriesDataLength, setSeriesDataLength] = useState<number>();
  const chartOptions: any = {
    title: { text: `<b>${title}</b>`, useHTML: true },
    subtitle: { 
      text: subtitle,
      style: {
        color: '#4f4f4f', // Set the text color to a dark gray
        fontSize: '11px', // Adjust the font size if needed
      }
    },
    credits: { enabled: false },
    chart: { backgroundColor: 'transparent', type: 'spline' },
    yAxis: {
      title: {
        text: titleY,
      },
    },
    
    xAxis: {
      categories: categories,
    },
    legend: legend,
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: series,
  };

  useEffect(() => {
    let totalDataLength = 0;
    series?.forEach((item: any) => {
      totalDataLength += item?.data?.length;
    });
    setSeriesDataLength(totalDataLength);
  }, [series]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories?.length > 0 && (
            <ContainerHighcharts chartOptions={chartOptions} />
          )}
          {(!loading && (categories?.length === 0 || seriesDataLength === 0)) && (
            <div className='w-100' style={{ position: 'absolute', top: '8rem' }}>
              <NoData></NoData>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SplineChart;

import React from 'react';
import ContainerHighchartsUp2dbanten from './ContainerHighchartsUp2dbanten';
import NoData from '@app/components/Error/NoData';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import Highcharts from 'highcharts';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);

function PieChartUP2DBANTEN({
  loading,
  series,
  legend = {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  },
  titleY = '',
  title = '',
}: IPieChart) {
  const chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          y: -10,
          menuItems: ['printChart', 'downloadJPEG', 'downloadPDF', 'downloadCSV'],
          align: 'right',
          verticalAlign: 'top',
        },
      },
    },
    title: { text: title },
    yAxis: {
      title: {
        text: titleY,
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.2f}</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    legend: legend,
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} ',
          distance: -50, // Adjust the position of the labels inside the pie chart slices
          style: {
            color: 'white', // Set the color of the text to white
            textOutline: 'none', // Remove the text outline
            fontWeight: 'bold', // Make the text bold
          },
        },
        showInLegend: true,
        size: '100%', // Ensure the pie chart size is consistent
        center: ['50%', '50%'], // Center the pie chart
      },
    },
    series: series,
    colors: ['#1E90FF', '#20B2AA', '#32CD32', '#3CB371', '#66CDAA'], // Blue and green tones
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {series && series.length > 0 ? (
            <div className='chart-item' style={{ maxWidth: '300px', margin: '0 auto' }}>
              <ContainerHighchartsUp2dbanten chartOptions={chartOptions} />
            </div>
          ) : (
            <div className='w-100' style={{ position: 'absolute', top: '8rem' }}>
              <NoData />
            </div>
          )}
        </>
      )}
    </>
  );
}

interface IPieChart {
  loading?: boolean;
  title?: string;
  titleY?: string;
  legend?: any;
  series?: any[];
}

export default PieChartUP2DBANTEN;

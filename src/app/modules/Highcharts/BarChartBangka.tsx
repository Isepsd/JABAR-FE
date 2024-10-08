import React from 'react';
import ContainerHighcharts from './ContainerHighcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more'; // For more advanced features
import NoData from '@app/components/Error/NoData';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
highchartsMore(Highcharts); // If using highcharts-more features

function BarChartBangka({
  series = [],
  categories = [],
  loading,
  type = 'bar',
  titleY = 'Jumlah Point',
  title = 'Kinerja Point',
  secondaryYAxisTitle = 'Persentase', // Dinamis untuk secondary y-axis
}: BarChartBangka) {
  const chartOptions: any = {
     exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          y: -10,
          menuItems: ['printChart', 'downloadJPEG', 'downloadPDF', 'downloadXLS', 'downloadCSV'],
          align: 'right',
          verticalAlign: 'top',
        },
      },
    },
    chart: {
      type: type,
      zoomType: 'x',
      height: 630, // Ubah sesuai kebutuhan, dalam piksel
    },
    title: { text: title },
    xAxis: {
      categories: categories,
      title: {
        text: 'Point',
      },
      scrollbar: {
        enabled: true,
      },
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: titleY,
        },
        stackLabels: {
          enabled: true,
        },
      },
      {
        title: {
          text: secondaryYAxisTitle,
          style: {
            color: '#82ca9d',
          },
        },
        opposite: true,
        labels: {
          format: '{value}%',
        },
        stackLabels: {
          enabled: true,
        },
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function (this: any) {
        let tooltip = `<strong>${this.x}</strong><br/>`;
  
        if (this.points) {
          this.points.forEach((point: any) => {
            tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: ${point.y}<br/>`;
          });
        } else {
          tooltip += `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: ${this.y}<br/>`;
        }
  
        return tooltip;
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: series,
  };
  

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories?.length > 0 && (
        <div className="chart-container" style={{ height: 'auto', minHeight: '53rem', overflow: 'auto' }}>
        <ContainerHighcharts chartOptions={chartOptions} />
      </div>
      
         
          )}
          {categories?.length === 0 && (
            <div className='position-relative'>
              <NoData />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BarChartBangka;

interface BarChartBangka {
  series?: any;
  categories?: string[];
  loading?: boolean;
  type?: string;
  titleY?: string;
  title?: string;
  secondaryYAxisTitle?: string; // Dinamis untuk secondary y-axis title
}

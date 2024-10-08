import React, { useEffect, useState } from 'react';
import ContainerHighcharts from './ContainerHighcharts';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import NoData from '@app/components/Error/NoData';
import CardWidget from '@app/components/Card/CardWidget';
import { Col } from 'react-bootstrap';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);

interface IAreaSpline {
  series?: any;
  categories?: any;
  legend?: any;
  title?: string;
  loading?: any;
  exporting?: any;
  height?: string;
  titleY?: string;
  pathServiceName?: any;
}

function SplineChart({
  categories,
  series,
  loading,
  legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  title = '',
  titleY = '',
}: IAreaSpline) {

  const [seriesDataLength, setSeriesDataLength] = useState<number>();

  useEffect(() => {
    let totalDataLength = 0;
    if (series) {
      series.forEach((item: any) => {
        if (item && item.data) {
          totalDataLength += item.data.length;
        }
      });
    }
    setSeriesDataLength(totalDataLength);
  }, [series]);

  if (!categories || !series) {
    return null;
  }

  const uniqueSeriesColors = ['#CC462A', '#297ACC', '#2ACC4B', '#CC29C6', '#29CCC8', '#CCC429'];

  const coloredSeries = series.map((item: any, index: number) => ({
    ...item,
    color: uniqueSeriesColors[index],
  }));

  const chartOptions: Highcharts.Options = {
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
    title: { text: title },
    credits: { enabled: false },
    chart: { backgroundColor: 'transparent', type: 'spline' },
    yAxis: {
      title: {
        text: titleY,
      },
      scrollbar: {
        enabled: true, // Enable scrollbar
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
    series: coloredSeries,
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {categories.length > 0 && (
            <>
              <ContainerHighcharts chartOptions={chartOptions}  />
            <br></br>
            <br></br>
            <Col md={12} className='mb-4'>
              <CardWidget title='Table Data' >
               
              <div style={{ width: '100%', maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd' }}>
                <table style={{ width: '100%', minWidth: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', position: 'sticky', top: 0, backgroundColor: '#f1f1f1' }}>Category</th>
                      {series.map((s: any, index: number) => (
                        <th key={index} style={{ border: '1px solid #ddd', padding: '8px', position: 'sticky', top: 0, backgroundColor: '#f1f1f1' }}>{s.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category: string, catIndex: number) => (
                      <tr key={catIndex}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{category}</td>
                        {series.map((s: any, serIndex: number) => (
                          <td key={serIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {s.data[catIndex] !== undefined ? s.data[catIndex] : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

               
              </CardWidget>
              </Col>
            </>
          )}
          {(!loading && (categories.length === 0 || seriesDataLength === 0)) && (
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

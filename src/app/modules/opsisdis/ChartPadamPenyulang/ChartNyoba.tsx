import React, { useState, useEffect } from 'react';
import BarChart from '@app/modules/Highcharts/BarChart';

export default function ChartlaporanNyoba({
  // page = "",
  // path,
  // format,
  // tabActive
}: IChartlaporanBeban) {
  const [seriesChart, setSeriesChart] = useState<any>([]);
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();

  /** DATA DUMMY */
  const dummyCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const dummySeries = [{
    name: 'Jumlah Gangguan',
    data: [29, 71, 106, 129, 144, 176],
    color: 'blue'
  }];

  useEffect(() => {
    // Set dummy data
    setCategoryChart(dummyCategories);
    setSeriesChart(dummySeries);
    setLoading(false);
  }, []);

  return (
    <div className='px-4'>
      {/* Tambahkan judul di sini dengan class text-center */}
      <h2 className='mb-4 text-center'>Jumlah Gangguan Penyulang</h2>
      <div className='mb-4 position-relative' style={{ height: '30vh' }}>
        <BarChart
          series={seriesChart}
          categories={categoryChart}
          loading={loading}
        />
      </div>
    </div>
  );
}

interface IChartlaporanBeban {
  path?: any
  page?: any
  format: any
  tabActive: string
}

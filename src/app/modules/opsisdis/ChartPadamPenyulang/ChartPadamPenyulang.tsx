import React, { useState, useEffect } from 'react';
import moment from 'moment';
moment.locale('id');

import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import BarChart from '@app/modules/Highcharts/BarChart';

const mappingBarChart = (data: any) => {
  let res: any = {
    jumlah_ggn: []
  };
  let cat: any = [];
  data.forEach((item: any) => {
    res.jumlah_ggn.push(item.jumlah_ggn);
    // cat.push(moment(item.bulan, "YYYY-MM").format(format)); // pastikan format bulan sesuai

    cat.push(item.bulan); // pastikan format bulan sesuai
  });
  return { res, cat };
};

export default function ChartlaporanBeban({
  // page = "",
  path,
  // format,
  tabActive
}: IChartlaporanBeban) {
  const [seriesChart, setSeriesChart] = useState<any>([]);
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const { activeFilters } = useSelector((state: any) => state.ui);
  const [loading, setLoading] = useState<boolean>(false);

  const source = axios.CancelToken.source();

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    try {
      const params = {
        page: -1,
        limit: -1,
        keyword: null,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before ? activeFilters?.filters?.year_before + "-01-01" : undefined,
        year_after: activeFilters?.filters?.year_after ? activeFilters?.filters?.year_after + "-01-01" : undefined,
        month_before: activeFilters?.filters?.month_before ? activeFilters?.filters?.month_before + "-01" : undefined,
        month_after: activeFilters?.filters?.month_after ? activeFilters?.filters?.month_after + "-01" : undefined,
        sort_by: "datum"
      };

      delete params.datum_befores;
      delete params.datum_afters;

      switch (tabActive) {
        case "beban_perjam":
          delete params.month_after;
          delete params.month_before;
          delete params.day_after;
          delete params.day_before;
          break;
        case "beban_harian":
          delete params.month_after;
          delete params.month_before;
          delete params.datum_after;
          delete params.datum_before;
          break;
        case "beban_bulanan":
          delete params.day_after;
          delete params.day_before;
          delete params.datum_after;
          delete params.datum_before;
          break;
        case "beban_tahunan":
          delete params.day_before;
          delete params.day_after;
          delete params.month_after;
          delete params.month_before;
          delete params.datum_after;
          delete params.datum_before;
          break;
        default:
          break;
      }

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any) => {
          return d;
        });
        setSeriesChartResult(data);

      } else {
        setSeriesChartResult([]);
      }
      setLoading(false);

    } catch (err: any) {
      setLoading(false);
    }
  };

  const setSeriesChartResult = (data: any) => {
    let result: any = [];
    // result = mappingBarChart(data, moment, format);
    result = mappingBarChart(data);

    // Ensure data structure for series
    const seriesData = [
      {
        name: 'Jumlah Gangguan',
        data: result.res.jumlah_ggn
      }
    ];

    setSeriesChart(seriesData);
    setCategoryChart(result.cat);
  }

  useEffect(() => {
    getAllData();
    return () => {
      source.cancel();
    }
  }, [activeFilters, path]);

  return (
    // <div className='px-4'>
    //   <div className='mb-4 position-relative' style={{ height: '30vh' }}>
    <BarChart
      series={seriesChart}
      categories={categoryChart}
      loading={loading}
    />
    //   </div>
    // </div>
  );
}

interface IChartlaporanBeban {
  path?: any
  page?: any
  format: any
  tabActive: string
}

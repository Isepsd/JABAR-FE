import React, { useState, useEffect } from 'react';
import moment from 'moment';
moment.locale('id');

/** SERVICE */
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import { mappingLineChart, mappingLineChartPerjam } from '@app/helper/mappingChart.helper';
import BarChart from '@app/modules/Highcharts/BarChart';
// import qs from "query-string";

export default function ChartlaporanBeban({
  page = "",
  path,
  format,
  tabActive,
  // optionCurrentUser,
}: IChartlaporanBeban) {
  const [seriesChart, setSeriesChart] = useState<any>([]);
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const { activeFilters } = useSelector((state: any) => state.ui);
  const [loading, setLoading] = useState<boolean>(false);

  const source = axios.CancelToken.source();
  // const queryParams = qs.parse(location.search);

  /** COLUMN SHOW HIDE EVENT HANDLE */
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
        sort_by: "tgl_awal",

        // id_pusat:
        //   optionCurrentUser?.level == "PUSAT"
        //     ? optionCurrentUser?.id_unit_lokasi
        //     : queryParams?.__pusat,
        // id_regional:
        //   optionCurrentUser?.level == "REGIONAL"
        //     ? optionCurrentUser?.id_unit_lokasi
        //     : queryParams?.__regional,
        // id_pemilik:
        //   optionCurrentUser?.level == "UNIT_INDUK"
        //     ? optionCurrentUser?.id_unit_lokasi
        //     : queryParams?.__pemilik,
        // id_pengelola:
        //   optionCurrentUser?.level == "UP2D" ||
        //     optionCurrentUser?.level == "UP3"
        //     ? optionCurrentUser?.id_unit_lokasi
        //     : queryParams?.__pengelola,
        // id_sub_pengelola:
        //   optionCurrentUser?.level == "ULP"
        //     ? optionCurrentUser?.id_unit_lokasi
        //     : queryParams?.__subpengelola,
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
        let data = results.map((d: any,) => {
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
    let result: any = []
    if (tabActive === 'beban_perjam') {
      result = mappingLineChartPerjam(data, moment);
    } else {
      result = mappingLineChart(data, moment, format);
    }

    let columnChart: any = "mw";
    switch (page) {
      case "laporan-beban-subsistem":
      case "laporan-beban-up3":
      case "laporan-beban-uid":
      case "laporan-beban-up2b":
        columnChart = "mw";
        break;
      case "opsis-tegangan-gi":
        columnChart = "v";
        break;
    }
    setSeriesChart(result?.res[columnChart]);
    setCategoryChart(result?.cat);
  }

  useEffect(() => {
    getAllData();
    return () => {
      source.cancel();
    }
  }, [activeFilters, path]);

  return (
    <div className='px-4'>
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
  optionCurrentUser?: any
  path?: any
  page?: any
  format: any
  tabActive: string
}

import React, { useState, useEffect } from 'react';
import BarChart from '@app/modules/Highcharts/BarChart';
import moment from 'moment';
moment.locale('id');

import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
// import qs from "query-string";

// Fungsi untuk mengkonversi format waktu HH:MM:SS:MS menjadi total menit
const convertToMinutes = (timeString: string) => {
  const [hours, minutes, seconds, milliseconds] = timeString.split(':').map(Number);
  return (hours * 60) + minutes + (seconds / 60) + (milliseconds / 60000);
};

const mappingBarChart = (data: any) => {
  let res: any = {
    lama_padam: []
  };
  let cat: any = [];
  data.forEach((item: any) => {
    // res.lama_padam.push(convertToMinutes(item.lama_padam));
    res.lama_padam.push({
      y: convertToMinutes(item.lama_padam),
      tgl_gangguan: item.tgl_gangguan,
      tgl_nyala_gangguan: item.tgl_nyala_gangguan,
    });


    cat.push(item.nama_penyulang); // pastikan format nama_penyulang sesuai
  });
  return { res, cat };
};

export default function ChartNyobaPadamPenyulang({
  // page = "",
  path,
  // format,
  tabActive,
  // optionCurrentUser,
}: IChartlaporanBeban) {
  const [seriesChart, setSeriesChart] = useState<any>([]);
  const [categoryChart, setCategoryChart] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();
  const { activeFilters } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();
  // const queryParams = qs.parse(location.search);

  /** DATA DUMMY */
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
        sort_by: "datum",
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
        case "beban_nama_penyulangan":
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
        name: 'Lama Padam',
        data: result.res.lama_padam
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

  const plotOptions = {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function (event: any) {
            const tglGangguan = event.point.options.tgl_gangguan;
            const tglNyalaGangguan = event.point.options.tgl_nyala_gangguan;
            const menitPadam = Math.round(event.point.y); // Membulatkan menit padam
            // alert(`Waktu Gangguan ${event.point.category}: ${event.point.options.tgl_gangguan} Waktu Gangguan ${event.point.category}: ${event.point.options.tgl_nyala_gangguan} Menit Padam:${event.point.y}`);
            alert(
              `Waktu Gangguan ${event.point.category}: ${tglGangguan}\n` +
              `Waktu Gangguan ${event.point.category}: ${tglNyalaGangguan}\n` +
              `Menit Padam: ${menitPadam}`
            );
          }
        }
      }
    }
  };

  return (
    <div className='px-4'>
      {/* Tambahkan judul di sini dengan class text-center */}
      <h2 className='mb-4 text-center'>Lama Padam Penyulang (menit)</h2>
      <div className='mb-4 position-relative' style={{ height: '30vh' }}>
        <BarChart
          series={seriesChart}
          categories={categoryChart}
          loading={loading}
          plotOptions={plotOptions}
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

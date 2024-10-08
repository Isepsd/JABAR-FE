import React, { useState, useEffect } from 'react';
import BarChart from '@app/modules/Highcharts/BarChart';
import moment from 'moment';
moment.locale('id');

import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
// import qs from "query-string";

import { API_PATH } from '@app/services/_path.service';
import { TOTAL_LAMA_PADAM_PENYULANG_COLUMN_JQWidget } from '@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column';
import DynamicBebanAreaTable from '@app/modules/opsisdis/PadamPenyulang/DynamicBebanAreaTable';
import { Modal, Button, Form } from "react-bootstrap";

const mappingBarChart = (data: any) => {
  let res: any = {
    jumlah_ggn: []
  };
  let cat: any = [];
  data.forEach((item: any) => {
    // res.jumlah_ggn.push(item.jumlah_ggn);
    res.jumlah_ggn.push({
      y: item.jumlah_ggn,
      tahun: item.tahun  // Tambahkan penyulang_id di sini
    });

    cat.push(item.bulan); // pastikan format bulan sesuai
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
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedFilterParams, setSelectedFilterParams] = useState({});


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
        sort_by: "tahun",
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

  const plotOptions = {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function (event: any) {
            const tahun = event.point.options.tahun;
            // const bulan = event.point.category;

            // const bulanMapping = {
            //   Januari: { tgl_awal: `${tahun}-01-01`, tgl_akhir: `${tahun}-01-31` },
            //   Februari: { tgl_awal: `${tahun}-02-01`, tgl_akhir: `${tahun}-02-29` },
            //   Maret: { tgl_awal: `${tahun}-03-01`, tgl_akhir: `${tahun}-03-31` },
            //   April: { tgl_awal: `${tahun}-04-01`, tgl_akhir: `${tahun}-04-30` },
            //   Mei: { tgl_awal: `${tahun}-05-01`, tgl_akhir: `${tahun}-05-31` },
            //   Juni: { tgl_awal: `${tahun}-06-01`, tgl_akhir: `${tahun}-06-30` },
            //   Juli: { tgl_awal: `${tahun}-07-01`, tgl_akhir: `${tahun}-07-31` },
            //   Agustus: { tgl_awal: `${tahun}-08-01`, tgl_akhir: `${tahun}-08-31` },
            //   September: { tgl_awal: `${tahun}-09-01`, tgl_akhir: `${tahun}-09-30` },
            //   Oktober: { tgl_awal: `${tahun}-10-01`, tgl_akhir: `${tahun}-10-31` },
            //   November: { tgl_awal: `${tahun}-11-01`, tgl_akhir: `${tahun}-11-30` },
            //   Desember: { tgl_awal: `${tahun}-12-01`, tgl_akhir: `${tahun}-12-31` },
            // };

            // const { tgl_awal, tgl_akhir } = bulanMapping[bulan];

            const bulan = event.point.category as keyof typeof bulanMapping;
            const bulanMapping: Record<string, { tgl_awal: string; tgl_akhir: string; }> = {
              Januari: { tgl_awal: `${tahun}-01-01`, tgl_akhir: `${tahun}-01-31` },
              Februari: { tgl_awal: `${tahun}-02-01`, tgl_akhir: `${tahun}-02-29` },
              Maret: { tgl_awal: `${tahun}-03-01`, tgl_akhir: `${tahun}-03-31` },
              April: { tgl_awal: `${tahun}-04-01`, tgl_akhir: `${tahun}-04-30` },
              Mei: { tgl_awal: `${tahun}-05-01`, tgl_akhir: `${tahun}-05-31` },
              Juni: { tgl_awal: `${tahun}-06-01`, tgl_akhir: `${tahun}-06-30` },
              Juli: { tgl_awal: `${tahun}-07-01`, tgl_akhir: `${tahun}-07-31` },
              Agustus: { tgl_awal: `${tahun}-08-01`, tgl_akhir: `${tahun}-08-31` },
              September: { tgl_awal: `${tahun}-09-01`, tgl_akhir: `${tahun}-09-30` },
              Oktober: { tgl_awal: `${tahun}-10-01`, tgl_akhir: `${tahun}-10-31` },
              November: { tgl_awal: `${tahun}-11-01`, tgl_akhir: `${tahun}-11-30` },
              Desember: { tgl_awal: `${tahun}-12-01`, tgl_akhir: `${tahun}-12-31` },
            };

            const { tgl_awal, tgl_akhir } = bulanMapping[bulan];
            handleOpenModal(); // membuka modal

            setSelectedFilterParams((prevParams: any) => ({
              ...prevParams,
              tgl_awal,
              tgl_akhir,
            }));
          }
        }
      }
    }
  };

  return (
    <div className='px-4'>
      {/* Tambahkan judul di sini dengan class text-center */}
      <h2 className='mb-4 text-center'>Jumlah Gangguan Penyulang</h2>
      <div className='mb-4 position-relative' style={{ height: '30vh' }}>
        <BarChart
          series={seriesChart}
          categories={categoryChart}
          loading={loading}
          plotOptions={plotOptions}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <DynamicBebanAreaTable pathService={API_PATH().opsisdis.padam_penyulang.total_lama_padam_penyulang} columnsConfig={TOTAL_LAMA_PADAM_PENYULANG_COLUMN_JQWidget()} primaryKey={'id'} tabActive={'beban_perjam'} label="laporan beban pembangkit" columnsGroupConfig={null} filterParams={{
                ...selectedFilterParams,
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
              }} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Tutup
            </Button>
            {/* <Button variant="primary" onClick={handleCloseModal}>
            Simpan
          </Button> */}
          </Modal.Footer>
        </Modal>
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

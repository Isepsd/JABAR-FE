import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import fileDownload from 'js-file-download';
// import { useSearchParams } from 'react-router-dom';
// import { Column } from 'devextreme-react/data-grid';
/** COMPONENTS */
// import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { getAllDownload } from '@app/services/main.service';
import { dateTimeFormat, monthTimeFormat, timeFormatAlt, yearTimeFormat } from '@app/helper/time.helper';
import TableDevExpress from '@app/modules/Table/TableDevExpress';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';
// import TableDevExpress from '@app/modules/Table/TableDevExpress';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { formatPercentage } from '@app/helper/number.helper';

type Props = {
  pathService?: any,
  columnsConfig: any,
  primaryKey?: string,
  configParams?: any,
  tabActive?: any,
  label?: any,
  handleAPIChart?: any,
  filterParams?: any
};

function DynamicBebanAreaTable({
  pathService,
  columnsConfig,
  primaryKey,
  // configParams = [],
  tabActive,
  filterParams = {},
  label
}: Props) {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(columnsConfig);
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [path, setPath] = useState<string>()
  // let [searchParams, setSearchParams] = useSearchParams();

  const { activeFilters } = useSelector((state: any) => state.ui);
  const { exportData } = useSelector((state: any) => state.app);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    // handleAPIChart(data);

    // console.log("data api ", data);
    // console.log("data tabActive ", tabActive);

    const suffix = activeFilters?.filters?.beban_puncak;
    dataTableValue = data.map((item: any, index: number) => {
      item.i = item?.i ? formatPercentage(item?.i) : item?.i
      item.f = item?.f ? formatPercentage(item?.f) : item?.f
      item.v = item?.v ? formatPercentage(item?.v) : item?.v
      item.p = item?.p ? formatPercentage(item?.p) : item?.p
      item.load_faktor = item?.load_faktor ? formatPercentage(item?.load_faktor) : item?.load_faktor
      item.i_avg = item?.i_avg ? formatPercentage(item?.i_avg) : item?.i_avg
      item.i_avg_malam = item?.i_avg_malam ? formatPercentage(item?.p_avg_malam) : item?.i_avg_malam
      item.i_avg_siang = item?.i_avg_siang ? formatPercentage(item?.i_avg_siang) : item?.i_avg_siang
      item.i_max = item?.i_max ? formatPercentage(item?.i_max) : item?.i_max
      item.i_max_malam = item?.i_max_malam ? formatPercentage(item?.i_max_malam) : item?.i_max_malam
      item.i_max_siang = item?.i_max_siang ? formatPercentage(item?.i_max_siang) : item?.i_max_siang
      item.i_min = item?.i_min ? formatPercentage(item?.i_min) : item?.i_min
      item.i_min_malam = item?.i_min_malam ? formatPercentage(item?.i_min_malam) : item?.i_min_malam
      item.i_min_siang = item?.i_min_siang ? formatPercentage(item?.i_min_siang) : item?.i_min_siang     
      item.p_avg = item?.p_avg ? formatPercentage(item?.p_avg) : item?.p_avg
      item.p_avg_malam = item?.p_avg_malam ? formatPercentage(item?.p_avg_malam) : item?.p_avg_malam
      item.p_avg_siang = item?.p_avg_siang ? formatPercentage(item?.p_avg_siang) : item?.p_avg_siang
      item.p_max = item?.p_max ? formatPercentage(item?.p_max) : item?.p_max
      item.p_max_malam = item?.p_max_malam ? formatPercentage(item?.p_max_malam) : item?.p_max_malam
      item.p_max_siang = item?.p_max_siang ? formatPercentage(item?.p_max_siang) : item?.p_max_siang
      item.p_min = item?.p_min ? formatPercentage(item?.p_min) : item?.p_min
      item.p_min_malam = item?.p_min_malam ? formatPercentage(item?.p_min_malam) : item?.p_min_malam
      item.p_min_siang = item?.p_min_siang ? formatPercentage(item?.p_min_siang) : item?.p_min_siang

      item.number = (index + 1);
      item.id = index
      item.number = item?.number
      item.datum = dateTimeFormat(item?.datum)
      item.date = timeFormatAlt(item?.date_hari)
      item.month_year = monthTimeFormat(item?.datum)
      item.year = yearTimeFormat(item?.datum)
      item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
      item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
      item.p_value = item['p_' + (suffix === undefined ? 'max' : suffix)]
      item.i_value = item['i_' + (suffix === undefined ? 'max' : suffix)]
      return item;
    });

    // switch (tabActive) {
    //   case "beban_perjam":
    //     const suffix = activeFilters?.filters?.beban_puncak;
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.number = item?.number
    //       item.datum = dateTimeFormat(item?.datum)
    //       item.date = timeFormatAlt(item?.datum)
    //       item.month_year = monthTimeFormat(item?.datum)
    //       item.year = yearTimeFormat(item?.datum)
    //       item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
    //       item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
    //       item.p_value = item['p_' + (suffix === undefined ? 'max' : suffix)]
    //       item.i_value = item['i_' + (suffix === undefined ? 'max' : suffix)]
    //       return item;
    //     });

    //     break;

    //   case "beban_harian":
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
    //       item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
    //       item.number = item?.number
    //       item.datum = timeFormatAlt(item?.datum)
    //       const suffix = activeFilters?.filters?.beban_puncak;
    //       item.p_value = item['p_' + (suffix === undefined ? 'max' : suffix)]
    //       item.i_value = item['i_' + (suffix === undefined ? 'max' : suffix)]
    //       return item;
    //     });
    //     break;

    //   case "puncak_bulanan":
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
    //       item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
    //       item.number = item?.number
    //       item.datum = monthTimeFormat(item?.datum)
    //       return item;
    //     });
    //     break;
    //   case "beban_bulanan":
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
    //       item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
    //       item.number = item?.number
    //       item.datum = monthTimeFormat(item?.datum)
    //       const suffix = activeFilters?.filters?.beban_puncak;
    //       item.p_value = item['p_' + (suffix === undefined ? 'max' : suffix)]
    //       item.i_value = item['i_' + (suffix === undefined ? 'max' : suffix)]
    //       return item;
    //     });
    //     break;
    //   case "puncak_tahunan":
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.tgl_v_max = dateTimeFormat(item?.v_tgl_max)
    //       item.tgl_v_min = dateTimeFormat(item?.v_tgl_min)
    //       item.number = item?.number
    //       item.datum = yearTimeFormat(item?.datum)

    //       return item;
    //     });
    //     break;
    //   case "beban_tahunan":
    //     dataTableValue = data.map((item: any, index: number) => {
    //       item.id = index
    //       item.number = item?.number
    //       item.datum = yearTimeFormat(item?.datum)

    //       const suffix = activeFilters?.filters?.beban_puncak;
    //       item.p_value = item['p_' + (suffix === undefined ? 'max' : suffix)]
    //       item.i_value = item['i_' + (suffix === undefined ? 'max' : suffix)]
    //       return item;
    //     });
    //     break;

    //   default:
    //     break;
    // }

    // console.log('dataTableValue', dataTableValue);

    setDataRows(dataTableValue)
  }

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // setLoading(true);
    let params: any = {
      page: -1,
      limit: -1,
      export_type: exportData?.type,
      export: true,
      // keyword: searchValue,
      ...activeFilters?.filters,
      // id_parent_lokasi: activeFilters?.filters?.id_ref_lokasi_gi,
      // year_before: activeFilters?.filters?.year_before ? activeFilters?.filters?.year_before + "-01-01" : undefined,
      // year_after: activeFilters?.filters?.year_after ? activeFilters?.filters?.year_after + "-01-01" : undefined,
      // month_before: activeFilters?.filters?.month_before ? activeFilters?.filters?.month_before + "-01" : undefined,
      // month_after: activeFilters?.filters?.month_after ? activeFilters?.filters?.month_after + "-01" : undefined,
      sort_by: "datum"
    };

    // delete params.datum_befores
    // delete params.datum_afters

    if (activeFilters?.filters?.id_ref_lokasi_trafo_gi) {
      params.id_lokasi = activeFilters?.filters?.id_ref_lokasi_trafo_gi
    } else if (activeFilters?.filters?.id_ref_lokasi_penyulang) {
      params.id_lokasi = activeFilters?.filters?.id_ref_lokasi_penyulang
    }

    // console.log("repot tabActive", tabActive);


    switch (tabActive) {
      case "beban_perjam":
        params.datum_before = activeFilters?.filters?.datum_befores + ' 23:59';
        params.datum_after = activeFilters?.filters?.datum_afters + " 00:00";
        // delete params.year_before
        // delete params.year_after

        // delete params.month_after
        // delete params.month_before
        // delete params.day_after
        // delete params.day_before
        break;
      case "beban_harian":
        params.day_before = activeFilters?.filters?.day_before;
        params.day_after = activeFilters?.filters?.day_after;

        // delete params.year_before
        // delete params.year_after

        // delete params.month_after
        // delete params.month_before
        // delete params.datum_after
        // delete params.datum_before
        break;
      case "beban_bulanan":
      case "puncak_bulanan":

        params.month_before = moment(activeFilters?.filters?.month_before).format("YYYY-MM-DD");

        params.month_after = moment(activeFilters?.filters?.month_after).format("YYYY-MM-DD")

        break;
      case "beban_tahunan":
      case "puncak_tahunan":
        params.year_before = activeFilters?.filters?.year_before ? activeFilters?.filters?.year_before + "-01-01" : undefined;
        params.year_after = activeFilters?.filters?.year_after ? activeFilters?.filters?.year_after + "-01-01" : undefined;
        // delete params.day_before
        // delete params.day_after

        // delete params.month_after
        // delete params.month_before
        // delete params.datum_after
        // delete params.datum_before
        break;

      default:
        break;
    }

    const path_export: any = pathService;

    try {
      let req: any = await getAllDownload(
        path_export,
        params,
        source.token
      );

      /** RESET EXPORT */
      // dispatch(exportingData(null));

      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers['content-disposition'];
      dispatch(exportingData(null))
      const filename = content
        .replace('attachment; filename=', '')
        .replaceAll('"', '');
      fileDownload(
        dataBlob,
        `${label}_${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(exportData?.type) ? filename : `${filename}.${exportData?.type}`}`
      );
      // setLoading(false)

    } catch (err: any) {
      // console.log("err", err?.response?.data?.message);

      dispatchNotification(`Gagal export / download data`, 'danger');
      // setLoading(false);
      dispatch(exportingData(null));
    }
  };


  useEffect(() => {
    setColumns(columnsConfig)
  }, [columnsConfig])

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (exportData && exportData?.table == label) {
      getAllDataExport();
    }
  }, [exportData]);

  useEffect(() => {
    // searchParams.delete("page")
    // setSearchParams(searchParams)
    setPath(pathService)
  }, [pathService, tabActive])

  // console.log("pathService", pathService);

  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
        module={label}
        exportOptions={[
          // { label: 'CSV', type: 'csv' },
          { label: 'EXCEL', type: 'xlsx' },
        ]}
      />

      {/* <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={primaryKey}
        deleteConfirmation
        filterParams={{ sort_by: "+datum", ...filterParams }}
        validExport={false}
      /> */}
      <TableDevExpress
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={primaryKey}
        deleteConfirmation
        filterParams={{ sort_by: 'datum', ...filterParams }}
        validExport={false}
        paging={{ show: true }}
      />
    </>
  );
}

export default DynamicBebanAreaTable
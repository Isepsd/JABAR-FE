import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import fileDownload from "js-file-download";
// import { useSearchParams } from 'react-router-dom';
// import { Column } from 'devextreme-react/data-grid';
/** COMPONENTS */
// import TableData from '@app/modules/Table/TableData';
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { getAllDownload } from "@app/services/main.service";
// import {
//   dateTimeFormat,
//   monthTimeFormat,
//   timeFormatAlt,
//   yearTimeFormat,
// } from "@app/helper/time.helper";
import { exportingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";
// import TableDevExpress from '@app/modules/Table/TableDevExpress';
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
// import { formatPercentage } from "@app/helper/number.helper";
import TableDataJQWidget from "@app/modules/Table/TableDataJQWidget";

type Props = {
  pathService?: any;
  columnsConfig: any;
  primaryKey?: string;
  configParams?: any;
  tabActive?: any;
  label?: any;
  handleAPIChart?: any;
  filterParams?: any;
  columnsGroupConfig?: any;
};

function DynamicBebanAreaTable({
  pathService,
  columnsConfig,
  primaryKey,
  // configParams = [],
  tabActive,
  filterParams = {},
  label,
  columnsGroupConfig = null,
}: Props) {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(columnsConfig);
  // const [dataColumns, setDataColumns] = useState<any>([]);
  const [path, setPath] = useState<string>();
  // let [searchParams, setSearchParams] = useSearchParams();

  const { activeFilters } = useSelector((state: any) => state.ui);
  const { exportData } = useSelector((state: any) => state.app);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        nama_kontak: item?.kontak?.nama,
        no_kontak: item?.kontak?.no_kontak,
        msg: item?.msg,
        status_sent: item?.status_sent,
        datum_created: item?.datum_created,
        pesan_error: item?.pesan_error,
      });
    });
    setDataRows(dataTableValue);
  };

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // setLoading(true);
    let params: any = {
      page: -1,
      limit: -1,
      export_type: exportData?.type,
      export: true,
      ...activeFilters?.filters,
      sort_by: "datum",
    };

    if (activeFilters?.filters?.id_ref_lokasi_trafo_gi) {
      params.id_lokasi = activeFilters?.filters?.id_ref_lokasi_trafo_gi;
    } else if (activeFilters?.filters?.id_ref_lokasi_penyulang) {
      params.id_lokasi = activeFilters?.filters?.id_ref_lokasi_penyulang;
    }

    switch (tabActive) {
      case "beban_perjam":
        params.datum_before = activeFilters?.filters?.datum_befores + " 23:59";
        params.datum_after = activeFilters?.filters?.datum_afters + " 00:00";

        break;
      case "beban_harian":
        params.day_before = activeFilters?.filters?.day_before;
        params.day_after = activeFilters?.filters?.day_after;
        break;
      case "beban_bulanan":
      case "puncak_bulanan":
        params.month_before = moment(
          activeFilters?.filters?.month_before
        ).format("YYYY-MM-DD");

        params.month_after = moment(activeFilters?.filters?.month_after).format(
          "YYYY-MM-DD"
        );

        break;
      case "beban_tahunan":
      case "puncak_tahunan":
        params.year_before = activeFilters?.filters?.year_before
          ? activeFilters?.filters?.year_before + "-01-01"
          : undefined;
        params.year_after = activeFilters?.filters?.year_after
          ? activeFilters?.filters?.year_after + "-01-01"
          : undefined;
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
      let req: any = await getAllDownload(path_export, params, source.token);

      /** RESET EXPORT */
      // dispatch(exportingData(null));

      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers["content-disposition"];
      dispatch(exportingData(null));
      const filename = content
        .replace("attachment; filename=", "")
        .replaceAll('"', "");
      fileDownload(
        dataBlob,
        `${label}_${moment().format("YYYY-MM-DD HH_mm_ss")}_${
          filename.includes(exportData?.type)
            ? filename
            : `${filename}.${exportData?.type}`
        }`
      );
      // setLoading(false)
    } catch (err: any) {
      // console.log("err", err?.response?.data?.message);

      dispatchNotification(`Gagal export / download data`, "danger");
      // setLoading(false);
      dispatch(exportingData(null));
    }
  };

  useEffect(() => {
    setColumns(columnsConfig);
  }, [columnsConfig]);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  // useEffect(() => {
  //   const cols = columns?.filter(({ show }: any) => show === true);
  //   setDataColumns(cols);
  // }, [columns]);

  useEffect(() => {
    if (exportData && exportData?.table == label) {
      getAllDataExport();
    }
  }, [exportData]);

  useEffect(() => {
    // searchParams.delete("page")
    // setSearchParams(searchParams)
    setPath(pathService);
  }, [pathService, tabActive]);

  // console.log("pathService", pathService);

  return (
    <>
      <TableDataListAction
        add={false}
        columns={false}
        setColumns={setColumns}
        spaceTop={0}
        module={label}
        exportOptions={[
          // { label: 'CSV', type: 'csv' },
          { label: "EXCEL", type: "xlsx" },
        ]}
      />
      {/* <TableDevExpress
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={primaryKey}
        deleteConfirmation
        filterParams={{ sort_by: 'datum', ...filterParams }}
        validExport={false}
        paging={{ show: true }}
      /> */}

      <TableDataJQWidget
        columnsConfig={columns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={primaryKey}
        deleteConfirmation
        filterParams={{ sort_by: "datum", ...filterParams }}
        validExport={false}
        paging={{ show: true }}
        columnsGroupConfig={columnsGroupConfig}
      />
    </>
  );
}

export default DynamicBebanAreaTable;

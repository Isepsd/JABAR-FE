import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "whatwg-fetch";
import axios from "axios";
import {
  getAllByPath,
  putByPath,
  postByPath,
  getAllDownload,
} from "@app/services/main.service";
import qs from "query-string";
import fileDownload from "js-file-download";
import {
  exportingData,
  reloadingData,
  generatingData,
} from "@app/store/reducers/app";
import moment from "moment";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import { customParamsService } from "@app/helper/browser.helper";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import Pagination from "@app/components/Pagination/Pagination";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
/** COMPONENTS */

type Props = {
  pathServiceCountNull?: any;
  pathService: any;
  primaryKey: string;
  children?: any;
  label: string;
  module: string;
  parentField?: string;
  callBackCount?: any;
  roleActions?: any;
  customFilter?: any;
  customParams?: any;
  allowAdding?: boolean;
  allowDeleting?: boolean;
  allowUpdating?: boolean;
  ChangeColorRow?: boolean;
  columnsGroupConfig?: any;
  columnsConfig?: any;
  respDataApi?: any;
  rowData?: any;
};

function TablePengukuranBeban({
  roleActions,
  pathService,
  callBackCount,
  label,
  module,
  allowUpdating = true,
  customFilter = [],
  customParams = {},
  columnsGroupConfig,
  columnsConfig,
  respDataApi,
  rowData,
}: // primaryKey
// ChangeColorRow = false
Props) {
  /** DATA RESP */
  const { exportData, reloadData, generateData } = useSelector(
    (state: any) => state.app
  );
  const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  const [themeJqx] = useState<any>("light");
  const { currentUser } = useSelector((state: any) => state.auth);
  const [data, setData] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
    info: null,
  });

  const [sourcesData, setSourcesData] = useState<any>({
    // datafields: columnsConfig?.datafield,
    datatype: "array",
    id: "m\\:properties>d\\:OrderID",
    pagenum: 3,
    // pager: (pagenum: any, pagesize: any, oldpagenum: any): void => {
    // callback called when a page or page size is changed.
    // },
    pagesize: pagination,
    localdata: [],
  });
  const [loading, setLoading] = useState<boolean>();
  const dispatch = useDispatch();

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    let filter = customParamsService(customFilter, queryParams);
    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        limit: pagination.perPage,
        id_pusat: queryParams?.__pusat ? queryParams?.__pusat : null,
        id_regional: queryParams?.__regional ? queryParams?.__regional : null,
        id_pemilik:
          currentUser?.level == "UNIT_INDUK"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__pemilik,
        id_pengelola:
          currentUser?.level == "UP2D" || currentUser?.level == "UP3"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__pengelola,
        id_sub_pengelola:
          currentUser?.level == "ULP"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__subpengelola,
        id_parent_lokasi: queryParams?.__parent_lokasi
          ? queryParams?.__parent_lokasi
          : null,

        ...filter,
        ...customParams,
        sort_by: "datum,no_urut_cell,nama_lokasi,kode_lokasi",
        // sort_by: "datum,no_urut_cell",
      };

      if (queryParams?.time) {
        params.datum_date = queryParams?.time
          ? `${queryParams?.date} ${queryParams?.time}`
          : null;
      } else if (queryParams?.date) {
        // params.datum_date = queryParams?.date
        //   ? queryParams?.date
        //   : moment().format("YYYY-MM-DD");
        params.datum = queryParams?.date
          ? queryParams?.date
          : moment().format("YYYY-MM-DD");
      }

      const req: any = await getAllByPath(pathService, params, source.token);
      // console.log("req")
      // console.log(req)
      const { results, total } = req;

      if (callBackCount && roleActions?.generate) {
        callBackCount(total < 1, params);
      }

      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(total / pagination?.perPage),
        totalData: total,
      }));
      let data = results.map((item: any, index: number) => {
        item.number = pagination.currentPage * pagination.perPage + (index + 1);
        return item;
      });
      setLoading(false);
      setData(data);
      // return data;
    } catch (err: any) {
      setLoading(false);
      setData(null);
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filter = customParamsService(customFilter, queryParams);

    const params = {
      page: -1,
      limit: -1,
      id_pusat: queryParams?.__pusat ? queryParams?.__pusat : null,
      id_regional: queryParams?.__regional ? queryParams?.__regional : null,
      id_pemilik:
        currentUser?.level == "UNIT_INDUK"
          ? currentUser?.id_unit_lokasi
          : queryParams?.__pemilik,
      id_pengelola:
        currentUser?.level == "UP2D" || currentUser?.level == "UP3"
          ? currentUser?.id_unit_lokasi
          : queryParams?.__pengelola,
      id_sub_pengelola:
        currentUser?.level == "ULP"
          ? currentUser?.id_unit_lokasi
          : queryParams?.__subpengelola,
      id_parent_lokasi: queryParams?.__parent_lokasi
        ? queryParams?.__parent_lokasi
        : null,

      // datum_date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
      // datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
      export: true,
      export_type: exportData?.type,
      ...filter,
      ...customParams,
      sort_by: "datum,no_urut_cell",
    };
    // if (queryParams?.time) {
    //   params.datum = queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null;
    // } else if (queryParams?.date) {
    params.datum = queryParams?.date
      ? queryParams?.date
      : moment().format("YYYY-MM-DD");
    // }

    try {
      let req: any = await getAllDownload(pathService, params, source.token);

      /** RESET EXPORT */
      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers["content-disposition"];
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
      dispatch(exportingData(null));
    } catch (err: any) {
      let message: string = err?.response
        ? `, ${err?.response?.data?.message}`
        : err?.response?.data?.config?.statusText;
      // console.log("message", message);
      message;

      dispatchNotification(
        `Gagal export / download data/ Data kosong`,
        "danger"
      );

      dispatch(exportingData(null));
    }
  };

  const getGenerate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filter = customParamsService(customFilter, queryParams);

    setLoading(true);
    try {
      const params = {
        id_user_entri: currentUser.id_user,
        id_pusat: queryParams?.__pusat ? queryParams?.__pusat : null,
        id_regional: queryParams?.__regional ? queryParams?.__regional : null,
        id_pemilik:
          currentUser?.level == "UNIT_INDUK"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__pemilik,
        id_pengelola:
          currentUser?.level == "UP2D" || currentUser?.level == "UP3"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__pengelola,
        id_sub_pengelola:
          currentUser?.level == "ULP"
            ? currentUser?.id_unit_lokasi
            : queryParams?.__subpengelola,
        id_parent_lokasi: queryParams?.__parent_lokasi
          ? queryParams?.__parent_lokasi
          : null,
        datum: queryParams?.date,
        ...filter,
        ...customParams,
      };

      const req: any = await postByPath(
        `${pathService}/generate`,
        params,
        source.token
      );

      if (generateData) {
        dispatch(generatingData(null));
        dispatch(reloadingData(moment().valueOf()));
      }
      if (req?.status === 404 || req?.status === 400) {
        dispatchNotification(`Gagal Generate data ${req?.message}`, "danger");
      }
      return req.results;
    } catch (err: any) {
      let message: string = err?.response
        ? `, ${err?.response?.data?.message}`
        : err?.response?.data?.config?.statusText;

      dispatchNotification(`Gagal Generate data ${message}`, "danger");
      // dispatchNotification(`Gagal Generate data`, 'danger');
      setLoading(false);
      if (generateData) {
        dispatch(generatingData(null));
      }
    }
  };

  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, source.token);
      // console.log('updateData')
      // console.log(req)
      if (req?.status === 404) {
        dispatchNotification(`${req?.message}`, "danger");
      }
      // if (req?.status === 200) {
      //   dispatchNotification(`${req?.message}`, "success");
      // }
      getAllData();
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;

      dispatchNotification(`${message}`, "danger");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();

    return () => {
      source.cancel();
      setData(null);
    };
  }, [
    queryParams.page,
    pagination.perPage,
    queryParams?.date,
    queryParams?.time,
    queryParams?.__parent_lokasi,
    queryParams?.__pembangkit,
    queryParams?.__gardu_induk,
    queryParams?.__trafo_gi,
    queryParams?.__penyulang,
    queryParams?.__pusat,
    queryParams?.__regional,
    queryParams?.__pemilik,
    queryParams?.__pengelola,
    queryParams?.__subpengelola,
    reloadData,
  ]);

  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };

  useEffect(() => {
    if (data) respDataApi(data);
    return () => {
      source.cancel();
    };
  }, [data]);

  useEffect(() => {
    if (rowData) {
      setSourcesData((prev: any) => {
        return {
          ...prev,
          localdata: rowData || [],
        };
      });
    }
    return () => {
      source.cancel();
    };
  }, [rowData]);

  useEffect(() => {
    if (exportData && exportData?.table == module) {
      getAllDataExport();
    }
  }, [exportData]);

  useEffect(() => {
    // console.log('useEffect')
    // console.log(generateData)
    // console.log(generateData?.table)
    // console.log(module)
    if (generateData && generateData?.table == module) {
      console.log("getGenerate");
      getGenerate();
    }
  }, [generateData]);

  const columngroups = [
    { text: "Arus (A)", align: "center", name: "arus" },
    { text: "Tegangan (kV)", align: "center", name: "tegangan" },
    { text: "00:00", align: "center", name: "0000" },
    { text: "00:30", align: "center", name: "0030" },
    { text: "01:00", align: "center", name: "0100" },
    { text: "01:30", align: "center", name: "0130" },
    { text: "02:00", align: "center", name: "0200" },
    { text: "02:30", align: "center", name: "0230" },
    { text: "03:00", align: "center", name: "0300" },
    { text: "03:30", align: "center", name: "0330" },
    { text: "04:00", align: "center", name: "0400" },
    { text: "04:30", align: "center", name: "0430" },
    { text: "05:00", align: "center", name: "0500" },
    { text: "05:30", align: "center", name: "0530" },
    { text: "06:00", align: "center", name: "0600" },
    { text: "06:30", align: "center", name: "0630" },
    { text: "07:00", align: "center", name: "0700" },
    { text: "07:30", align: "center", name: "0730" },
    { text: "08:00", align: "center", name: "0800" },
    { text: "08:30", align: "center", name: "0830" },
    { text: "09:00", align: "center", name: "0900" },
    { text: "09:30", align: "center", name: "0930" },
    { text: "10:00", align: "center", name: "1000" },
    { text: "10:30", align: "center", name: "1030" },
    { text: "11:00", align: "center", name: "1100" },
    { text: "11:30", align: "center", name: "1130" },
    { text: "12:00", align: "center", name: "1200" },
    { text: "12:30", align: "center", name: "1230" },
    { text: "13:00", align: "center", name: "1300" },
    { text: "13:30", align: "center", name: "1330" },
    { text: "14:00", align: "center", name: "1400" },
    { text: "14:30", align: "center", name: "1430" },
    { text: "15:00", align: "center", name: "1500" },
    { text: "15:30", align: "center", name: "1530" },
    { text: "16:00", align: "center", name: "1600" },
    { text: "16:30", align: "center", name: "1630" },
    { text: "17:00", align: "center", name: "1700" },
    { text: "17:30", align: "center", name: "1730" },
    { text: "18:00", align: "center", name: "1800" },
    { text: "18:30", align: "center", name: "1830" },
    { text: "19:00", align: "center", name: "1900" },
    { text: "19:30", align: "center", name: "1930" },
    { text: "20:00", align: "center", name: "2000" },
    { text: "20:30", align: "center", name: "2030" },
    { text: "21:00", align: "center", name: "2100" },
    { text: "21:30", align: "center", name: "2130" },
    { text: "22:00", align: "center", name: "2200" },
    { text: "22:30", align: "center", name: "2230" },
    { text: "23:00", align: "center", name: "2300" },
    { text: "23:30", align: "center", name: "2330" },
  ];
  const sources = new jqx.dataAdapter(sourcesData);
  const onCellendedit = (item: any) => {
    const { args } = item;
    const datum = queryParams?.date
      ? queryParams?.date
      : moment().format("YYYY-MM-DD");
    if (args?.oldvalue != args?.value) {
      // console.log("args?");
      // console.log(args);
      // console.log("args?.row");
      // console.log(args?.row);
      // console.log(args?.row.id);

      updateData(
        pathService,
        {
          [args?.datafield]: args?.value,
          id_user_update: currentUser?.id_user,
          id_parent_lokasi: args?.row.id_parent_lokasi,
          id_ref_lokasi: args?.row.id_ref_lokasi,
          datum: datum,
        },
        // args?.row[primaryKey]
        args?.row.id
      );
    }
  };
  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className="mb-3 mt-2">
        <JqxGrid
          // ref={Grid}
          // pageable={true}
          // pagesizeoptions={["10", "25", "50", "100"]}
          theme={themeJqx}
          editable={allowUpdating}
          width={"100%"}
          autoheight={true}
          autorowheight={true}
          source={sources}
          columns={columnsConfig?.columns}
          altrows={true}
          selectionmode={"singlecell"}
          columnsresize={true}
          columngroups={columnsGroupConfig ? columnsGroupConfig : columngroups}
          onCellendedit={onCellendedit}
        />
      </div>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
        forced={true}
        onChangeItemPerPage={onChangeItemPerPage}
      />
    </>
  );
}

export default TablePengukuranBeban;

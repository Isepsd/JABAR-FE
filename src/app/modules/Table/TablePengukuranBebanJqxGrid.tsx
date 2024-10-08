import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom/client";
// Jqwidgets
import JqxGrid, {
  IGridProps,
  jqx,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import JqxButton from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import {
  getAllByPath,
  putByPath,
  getAllDownload,
} from "@app/services/main.service";
import fileDownload from "js-file-download";
import axios from "axios";
// import { customParamsService } from "@app/helper/browser.helper";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import moment from "moment";
import qs from "query-string";

interface ITablePengukuranBebanJqxGrid {
  dataFieldsColsConfig: any;
  path: any;
  dataSources?: any;
  filterParams?: any;
  customFilter?: any;
  customParams?: any;
  primaryKey: any;
  selectionmode?: any;
  respDataApi: any;
  serachBar?: boolean;
  showtoolbar?: boolean;
  onRowSelected?: any;
  editable?: any;
  pageable?: any;
  filterable?: any;
  showfilterrow?: any;
  showHideCol?: any;
  ids?: any;
  callBackCount?: any;
  // ACTIONS BUTTON
  addbtn?: any; // memunculkan tombol add
  onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
  updatebtn?: any; // memunculkan tombol edit
  onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page

  roleActions?: any;
  deletebtn?: any; // memunculkan tombol delete
  reloadbtn?: any; // memunculkan tombol reload
  uploadbtn?: any; // memunculkan tombol upload
  onClickUpload?: any; // event ketika upload ex: mumunculkan modal atau reedirect ke form page
  exportbtn?: any; // memunculkan tombol export
  // roleActions?: any; // memunculkan tombol export
}

export default function TablePengukuranBebanJqxGrid({
  dataFieldsColsConfig = [],
  path,
  callBackCount,
  dataSources,
  // customFilter = [],
  customParams = {},
  primaryKey,
  selectionmode = "singlecell",
  respDataApi,
  pageable = true,
  editable = false,
  filterable = false,
  showfilterrow = true,
  showtoolbar = true,
  //   addbtn = false,
  //   onClickAdd,
  exportbtn = true,
  reloadbtn = true,
  roleActions,
  onRowSelected,
}: //   ids = "id", // call virtual id for modals edit or something
ITablePengukuranBebanJqxGrid) {
  //   const navigate = useNavigate();
  const sc = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [themeJqx] = useState<any>("light");
  const Grid = useRef<JqxGrid>(null);
  const toolbarRendered = useRef(false);
  const [columns] = useState<IGridProps["columns"]>(
    dataFieldsColsConfig.columns
  );
  const [columngroups] = useState<IGridProps["columngroups"]>(
    dataFieldsColsConfig.columngroups
  );
  const rowsSelected = useRef<any>([]);
  const queryParams = qs.parse(location.search);

  //   let [searchParams, setSearchParams] = useSearchParams();
  let filtersRowParams: any = {};
  const { currentUser } = useSelector((state: any) => state.auth);

  const [source] = useState<any>(() => {
    const sourceObj: any = {
      dataFields: dataFieldsColsConfig?.dataFields,
      id: primaryKey,
      datatype: "json",
      // async: true,
      root: "results",
      cache: false,
      totalrecords: 0,
      beforeprocessing: (data: any) => {
        sourceObj.totalrecords = data.total;
      },
    };

    if (dataSources) {
      sourceObj.localData = dataSources;
    } else {
      sourceObj.url = path;
    }

    return sourceObj;
  });

  /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const dataAdapter = new jqx.dataAdapter(source, {
    loadServerData: (serverdata: any, source: any, callback: any) => {
      try {
        const params = {
          page: serverdata.pagenum + 1,
          limit: serverdata.pagesize,
          sort_by: "datum,no_urut_cell",
          ...customParams,
          ...filtersRowParams,
        };

        if (queryParams?.time) {
          params.datum = queryParams?.time
            ? `${queryParams?.date} ${queryParams?.time}`
            : null;
        } else if (queryParams?.date) {
          params.datum_date = queryParams?.date
            ? queryParams?.date
            : moment().format("YYYY-MM-DD");
        }
        console.log("loadServerData");
        console.log(params);

        getAllByPath(path, params, sc.token)
          .then((response: any) => {
            const { results, total } = response;
            if (callBackCount && roleActions?.generate) {
              callBackCount(total < 1, params);
            }
            // Add number and incrementing numbers to results
            const modifiedResults = results.map(
              (result: any, index: number) => ({
                ...result,
                number: index + serverdata.recordstartindex + 1,
              })
            );

            callback({
              records: respDataApi(modifiedResults),
              totalrecords: total,
            });
            //   setLoading(false);
            // handleBindingComplete();
          })
          .catch((error: any) => {
            //   setLoading(false);
            let message: string = error?.response
              ? `, ${error?.response?.data?.message}`
              : error?.response?.data?.config?.statusText;

            dispatchNotification(`${message}`, "danger");
            // callback({ records: [], totalrecords: 0 });
            // handleBindingComplete();
          });
      } catch (error: any) {
        let message: string = error?.response
          ? `, ${error?.response?.data?.message}`
          : error?.response?.data?.config?.statusText;
        dispatchNotification(`${message}`, "danger");
        // callback({ records: [], totalrecords: 0 });
        // handleBindingComplete();
      }
    },
  });

  const rendergridrows = (params: any): any => {
    console.log("rendergridrows");
    return params.data;
  };
  // const handleBindingComplete = () => setLoading(false);

  const handleOnSort = (event: any) => {
    console.log("handleOnSort");
    const sortinformation = event?.args?.sortinformation;
    let sortdirection = sortinformation?.sortdirection?.ascending ? "" : "-";
    if (
      !sortinformation.sortdirection.ascending &&
      !sortinformation.sortdirection.descending
    )
      sortdirection = "null";
    if (sortdirection !== "null") {
      customParams = {
        ...customParams,
        sort_by: sortdirection + sortinformation?.sortcolumn,
      };
    } else {
      delete customParams.sort_by;
    }
    handleReloadData();
  };

  const handleRowSelectionsChange = () => {
    console.log("handleRowSelectionsChange");
    const selectedRowIndexes = Grid.current?.getselectedrowindexes();
    const rowCount: any = Grid.current?.getdatainformation().rowscount || 0;
    const checkedRows: any[] = [];
    const uncheckedRows: any[] = [];

    for (let i = 0; i < rowCount; i++) {
      const row: any = Grid.current?.getrowdata(i);
      if (row !== undefined) {
        if (selectedRowIndexes?.includes(i)) {
          checkedRows.push(row);
        } else {
          uncheckedRows.push(row);
        }
      }
    }

    checkedRows.forEach((row: any) => {
      if (
        !rowsSelected.current.some(
          (checkedRow: any) => checkedRow[primaryKey] === row[primaryKey]
        )
      ) {
        rowsSelected.current.push(row);
      }
    });

    uncheckedRows.forEach((row: any) => {
      const index = rowsSelected.current.findIndex(
        (checkedRow: any) => checkedRow[primaryKey] === row[primaryKey]
      );
      if (index !== -1) {
        rowsSelected.current.splice(index, 1);
      }
    });
    onRowSelected(rowsSelected);
  };

  const handleSingleRowSelect = (event: any) => {
    if (event) rowsSelected.current = event;
    onRowSelected(rowsSelected);
  };

  const handleRowsSelected = (event: any) => {
    if (selectionmode === "checkbox") {
      handleRowSelectionsChange();
    } else {
      handleSingleRowSelect(event?.args.row);
    }
  };

  const handleRowUnselect = () => {
    if (selectionmode === "checkbox") {
      handleRowSelectionsChange();
    } else {
      Grid.current?.clearselection();
    }
  };

  const handleOnCellendedit = (item: any) => {
    const { args } = item;
    if (args?.oldvalue != args?.value) {
      updateData(
        path,
        {
          [args?.datafield]: args?.value,
          id_user_update: currentUser?.id_user,
        },
        args?.row[primaryKey]
      );
    }
  };

  const handleOnFilter = () => {
    const filterGroups = Grid.current?.getfilterinformation();
    let queryParam = {};
    for (let i = 0; i < filterGroups.length; i++) {
      const filterGroup = filterGroups[i];
      const filters = filterGroup.filter.getfilters();

      for (let j = 0; j < filters.length; j++) {
        if (filterGroup.filtercolumn) {
          let filterValue = filters[j].value;

          if (typeof filterValue === "boolean") {
            filterValue = filterValue ? 1 : 0;
          }
          queryParam = {
            ...queryParam,
            [filterGroup.filtercolumn]: filterValue,
          };
        }
      }
    }

    filtersRowParams = { ...filtersRowParams, ...queryParam };
    Object.entries(filtersRowParams).forEach(([key]) => {
      // Remove properties from customParams that don't exist in queryParam
      if (!(key in queryParam)) {
        delete filtersRowParams[key];
      }
    });

    handleReloadData();
  };

  // const handleSearch = (event: any) => {
  //   console.log("handleSearch");
  //   customParams = {
  //     ...customParams,
  //     page: 1,
  //     limit: 10,
  //     sort_by: "datum,no_urut_cell",
  //     keyword: event.target.value,
  //   };
  //   handleReloadData();
  // };

  /** EDIT DATA ON TABLE */
  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, sc.token);
      if (req?.status === 404)
        dispatchNotification(`${req?.message}`, "danger");
      if (req?.status === 200)
        dispatchNotification(`${req?.message}`, "success");
      handleReloadData();
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;
      dispatchNotification(`${message}`, "danger");
      setLoading(false);
    }
  };

  //   const listOnSelect = (event: any): void => {
  //     if (event.args) {
  //       const selectedItem = event.args.item;
  //       if (selectedItem.checked) {
  //         Grid.current?.showcolumn(selectedItem.value);
  //       } else {
  //         Grid.current?.hidecolumn(selectedItem.value);
  //       }
  //     }
  //   };
  const handleReloadData = (): void => {
    console.log("handleReloadData");
    Grid.current?.updatebounddata();
  };
  /** MENU HANDLER & PRIVILAGES BY ACCES USER */
  const rendertoolbar = (toolbar: any) => {
    if (!toolbarRendered.current) {
      const style: React.CSSProperties = {
        display: "inline-block",
        marginLeft: "5px",
      };
      const buttonsContainer = (
        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
            float: "right",
          }}
        >
          {/* {addbtn && (
            <JqxButton
              onClick={handleAddClick}
              theme={themeJqx}
              width={110}
              height={20}
              style={style}
            >
              {" "}
              <i className="fa-solid fa-plus"></i> Tambah Data{" "}
            </JqxButton>
          )} */}

          {exportbtn && (
            <JqxButton
              onClick={() => getAllDataExport("xlsx")}
              theme={themeJqx}
              width={120}
              height={20}
              style={style}
            >
              {" "}
              <i className="fa-solid fa-file-excel"></i> Export to Excel{" "}
            </JqxButton>
          )}

          {reloadbtn && (
            <JqxButton
              onClick={handleReloadData}
              theme={themeJqx}
              width={80}
              height={20}
              style={style}
            >
              {" "}
              <i className="fa-solid fa-rotate"></i> Reload{" "}
            </JqxButton>
          )}

          {/* <JqxButton onClick={undefined} theme={themeJqx} width={80} height={20} style={style}> <i className="fa-solid fa-circle-question"></i> Help</span> </JqxButton> */}
        </div>
      );
      ReactDOM.createRoot(toolbar[0]).render(buttonsContainer);
      toolbarRendered.current = true;
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async (export_type: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("getAllDataExport");

    const params = {
      page: -1,
      limit: -1,
      export: true,
      export_type: export_type,
      ...customParams,
    };
    if (queryParams?.time) {
      params.datum = queryParams?.time
        ? `${queryParams?.date} ${queryParams?.time}`
        : null;
    } else if (queryParams?.date) {
      params.datum_date = queryParams?.date
        ? queryParams?.date
        : moment().format("YYYY-MM-DD");
    }

    // jqxLoader.current?.open();
    console.log(params);
    try {
      let req: any = await getAllDownload(path, params, source.token);
      /** RESET EXPORT */
      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers["content-disposition"];
      const filename = content
        .replace("attachment; filename=", "")
        .replaceAll('"', "");
      fileDownload(
        dataBlob,
        `${moment().format("YYYY-MM-DD HH_mm_ss")}_${
          filename.includes(export_type)
            ? filename
            : `${filename}.${export_type}`
        }`
      );
      // jqxLoader.current?.close();
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;
      dispatchNotification(
        `Gagal export / download data : ${message}`,
        "danger"
      );
      // jqxLoader.current?.close();
    }
  };

  const columngroupsx = [
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

  const stylex: React.CSSProperties = {
    display: "inline-block",
    marginTop: "5px",
  };

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className="p-1">
        {/* <JqxLoader ref={jqxLoader} width={60} height={60} theme={themeJqx} /> */}

        <JqxGrid
          style={stylex}
          ref={Grid}
          theme={themeJqx}
          width={"100%"}
          autoheight={true}
          autorowheight={true}
          columnsresize={true}
          columnsreorder={true}
          columns={columns}
          columngroups={columngroups ? columngroups : columngroupsx}
          source={queryParams?.date ? dataAdapter : false}
          // Toolbar options
          {...(showtoolbar && {
            showtoolbar: true,
            rendertoolbar: rendertoolbar,
          })}
          // Filtering options
          {...(filterable && {
            filterable: true,
            showfilterrow: showfilterrow,
            onFilter: handleOnFilter,
          })}
          // Paging Options
          pageable={pageable}
          // pagesizeoptions={['10', '25', '50', '100', '1000']}
          virtualmode={true}
          rendergridrows={rendergridrows}
          // Sorting event
          sortable={true}
          onSort={handleOnSort}
          /** selectionmode options
           * [rows] none, checkbox, single row, multiplerows, multiplerowsextended
           * [cells] singlecell, multiplecells, multiplecellsextended, multiplecellsadvanced */
          selectionmode={selectionmode}
          onRowselect={handleRowsSelected}
          onRowunselect={handleRowUnselect}
          // edit data event
          {...(editable && {
            editable: true,
            onCellendedit: handleOnCellendedit,
          })}
        />
      </div>
    </>
  );
}

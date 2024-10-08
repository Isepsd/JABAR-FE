import React, { useState, useRef, useMemo } from "react";
import { Grid } from "smart-webcomponents-react/grid";
import { Button } from "smart-webcomponents-react/button";
import axios from "axios";
import {
  getAllByPath,
  putByPath,
  getAllDownload,
  deleteByPath,
} from "@app/services/main.service";
window.Smart.License = "8414516F-15A2-4D84-A7AF-A9A72400DB02";
import ReactDOM from "react-dom/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "lodash";
import CustomDialog from "./CustomDialog"; // Import the custom dialog component
import CustomDialogDelete from "./CustomDialogDelete"; // Import the custom dialog component
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import fileDownload from "js-file-download";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import { customParamsService } from "@app/helper/browser.helper";
import qs from "query-string";

interface ISmartGridPBProps {
  generatebtn?: any;
  dataFieldsColsConfig: any;
  path: string;
  filterParams?: any;
  primaryKey: any;
  selectionmode?: any; // Allow empty string for no selection
  respDataApi: (data: any) => any;
  paging?: boolean;
  editable?: boolean;
  dataSources?: any[];
  onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
  addbtn?: any;
  updatebtn?: any; // memunculkan tombol edit
  deletebtn?: any;
  exportbtn?: any;
  onClickUpload?: any;
  uploadbtn?: any;
  className?: any;
  onClick?: any;
  icon?: any;
  label?: any;
  onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  ids?: any;
  onRowSelected?: any;
  initialApiEndpoint?: any;
  customFilter?: any;
}

const SmartGridPB: React.FC<ISmartGridPBProps> = ({
  dataFieldsColsConfig = [],
  path,
  filterParams = {},
  primaryKey,
  selectionmode,
  respDataApi,
  // paging = true,
  editable = false,
  dataSources,
  onClickAdd,
  generatebtn = false,
  addbtn = false,
  updatebtn = false,
  deletebtn = false,
  uploadbtn = false,
  exportbtn = true,
  onClickUpload,
  onClickUpdate,
  ids = "id",
  onRowSelected,
  customFilter = [],
}) => {
  /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  const { currentUser } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const queryParams = qs.parse(location.search);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isVisible] = useState(true); // State to manage toolbar visibility
  const selection = useRef<any>([]);
  const gridRef = useRef<Grid>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [dialogMessageDelete, setDialogMessageDelete] = useState("");

  const navigate = useNavigate();
  const [source] = useState<any>(() => {
    const sourceObj: any = {
      dataFields: dataFieldsColsConfig?.dataFields,
      id: primaryKey,
      datatype: "json",
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
  const [filteringOptions] = useState({
    enabled: false,
    filterRow: {
      visible: false,
    },
  });
  const [page, setPage] = useState(0); // Default page 0
  const [limit, setLimit] = useState(10); // Default limit 10

  const GettAllData = async (page: number, limit: number, cancelToken: any) => {
    //console.log("GettAllData");
    let filter = customParamsService(customFilter, queryParams);
    const params = {
      page: page + 1, // Adjusting for backend expectation
      limit: limit,
      ...filter,
      ...filterParams,
      sort_by: "datum,nama_parent_lokasi,nama_lokasi,3",
    };
    if (queryParams?.time) {
      params.datum = queryParams?.time
        ? `${queryParams?.date} ${queryParams?.time}`
        : null;
    } else if (queryParams?.datum_date) {
      params.datum_date = queryParams?.datum_date
        ? queryParams?.datum_date
        : moment().format("YYYY-MM-DD");
    } else if (queryParams?.date) {
      params.datum = queryParams?.date
        ? queryParams?.date
        : moment().format("YYYY-MM-DD");
    }
    //console.log(params);
    try {
      const data: any = await getAllByPath(path, params, cancelToken);
      const modifiedData = respDataApi(data);
      //console.log(modifiedData);
      const totalRecords = data.total || modifiedData.length;

      const modifiedResults = modifiedData.map((result: any, index: any) => ({
        ...result,
        number: index + page * limit + 1,
      }));

      return {
        dataSource: modifiedResults,
        totalRecords: totalRecords,
      };
    } catch (error) {
      //console.error("Error fetching data:", error);
      return {
        dataSource: [],
        totalRecords: 0,
      };
    }
  };
  const handlePageChange = async (event: any) => {
    //console.log("Event Detail:", event.detail);

    // Extract necessary information from event.detail
    const { data } = event.detail;

    // Determine the new page and limit based on data properties
    let newPage = page;
    let newLimit = limit;
    if (data) {
      if (typeof data.first === "number" && typeof data.size === "number") {
        newPage = Math.floor(data.first / data.size); // Calculate new page
        newLimit = data.size; // Update limit
      } else {
        //console.warn("Unknown page change data format:", data);
      }
    } else {
      //console.warn("Unknown page change action:", event.detail);
    }

    // Update page and limit
    setPage(newPage);
    setLimit(newLimit);

    //console.log(`New Page: ${newPage}`);
    //console.log(`New Limit: ${newLimit}`);
  };

  const dataAdapter = useMemo(() => {
    return new window.Smart.DataAdapter({
      virtualDataSourceCache: true,
      virtualDataSource: async (resultCallbackFunction: any) => {
        let pageIndex = page;
        let pageSize = limit; // Default page size

        pageIndex = Math.max(0, pageIndex);

        const { dataSource, totalRecords } = await GettAllData(
          pageIndex,
          pageSize,
          axios.CancelToken.source().token
        );

        const currentPage = pageIndex + 1;
        const totalPageCount = Math.ceil(totalRecords / pageSize);
        const pageInfo = `${currentPage} of ${totalPageCount}`;

        if (typeof resultCallbackFunction === "function") {
          resultCallbackFunction({
            dataSource: dataSource,
            lastPage: totalPageCount - 1,
            virtualDataSourceLength: totalRecords,
            pageInfo: pageInfo,
          });
        }
      },
      id: "primaryKey",
      dataFields: source.dataFields,
      localData: source.localData,
      url: source.url,
      cache: source.cache,
      totalrecords: source.totalrecords,
      beforeprocessing: source.beforeprocessing,
    });
  }, [path, filterParams, page, limit]); // Added 'page' and 'limit' to dependencies

  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof addbtn == "boolean" ? "add" : addbtn;
      navigate(target);
    }
  };
  const deleteData = async (primaryKey: any) => {
    if (selection.current && selection.current[primaryKey]) {
      setLoading(true);
      try {
        let req: any = await deleteByPath(
          path,
          selection.current[primaryKey],
          source.token
        );
        setLoading(false);
        dispatchNotification(`${req?.message}`, "success");
        setIsDialogOpenDelete(false);
        setIsDialogOpen(false);
        handleReloadData();
      } catch (error: any) {
        setLoading(false);
        let message = error?.response
          ? error?.response?.data?.message
          : error?.response?.config?.statusText;
        dispatchNotification(`${message}`, "danger");
      }
    }
  };

  const handleDelete = () => {
    //console.log("handleDelete called");
    //console.log("Current selection:", selection.current); // Log the current selection
    //console.log("Primary key:", primaryKey); // Log the primary key

    const rowData = selection.current; // Use selectionRef.current to access the selected row data
    //console.log("Row data from selection:", rowData); // Log the row data

    if (rowData && rowData[primaryKey]) {
      const selectedId = rowData[primaryKey]; // Retrieve the primary key value from the row data
      console.log("Selected ID for deletion:", selectedId); // Log the selected ID for debugging

      // Set the delete confirmation message
      setDialogMessageDelete("Apakah Anda yakin ingin menghapus data ini?");

      // Show confirmation dialog before deletion
      setIsDialogOpenDelete(true); // Open the delete confirmation dialog
    } else {
      //console.warn("Tidak ada data di selection atau primary key tidak valid"); // Warn if no data in selection or primary key is invalid
      setDialogMessage(
        "Tidak ada data yang dipilih, Silahkan Pilih Data terlebih dahulu!"
      );
      setIsDialogOpen(true);
    }
  };

  const handleEdit = (e: any) => {
    //console.log("handleEdit called");
    //console.log("Current selection:", selection.current); // Log the current selection
    //console.log("Primary key:", primaryKey); // Log the primary key

    const rowData = selection.current; // Use selection.current to access the selected row data
    //console.log("Row data from selection:", rowData); // Log the row data

    if (rowData && rowData[primaryKey]) {
      const selectedId = rowData[primaryKey]; // Retrieve the primary key value from the row data
      console.log("Selected ID for edit:", selectedId); // Log the selected ID for debugging

      if (onClickUpdate) {
        onClickUpdate(e); // Call the onClickUpdate function if provided
        searchParams.delete(ids); // Remove any existing IDs in the search parameters
        searchParams.append(ids, selectedId); // Append the selected ID to the search parameters
        setSearchParams(searchParams); // Update the search parameters in the URL
      } else {
        navigate(`edit/${selectedId}`); // Navigate to the edit page with the selected ID
      }

      // After editing is completed, unselect the row
      selection.current = null;
    } else {
      //console.warn("Tidak ada data di selection atau primary key tidak valid"); // Warn if no data in selection or primary key is invalid
      setDialogMessage(
        "Tidak ada data yang dipilih,Silahkan Pilih Data terlebih dahulu!"
      );
      setIsDialogOpen(true);
    }
  };

  const handleExport = async (export_type: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const params = {
      page: -1,
      limit: -1,
      export: true,
      export_type: export_type,
      ...filterParams,
    };
    // jqxLoader.current?.open();

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

  const handleUpload = (e: any) => {
    if (onClickUpload) {
      onClickUpload(e);
    }
  };

  //   const handleClearFilter = (): void => {
  //     gridRef.current?.clearFilter();
  //   };

  const handleReloadData = async () => {
    setLoading(true); // Set loading to true when request is sent

    try {
      const params = {
        page: page, // Use pageNum variable instead of hardcoding to 1
        limit: limit, // Use pageSize variable
        ...customFilter,
        ...filterParams,
      };
      const cancelTokenSource = axios.CancelToken.source();
      const response = await getAllByPath(
        path,
        params,
        cancelTokenSource.token
      );
      const newData = respDataApi(response.data);

      if (gridRef.current) {
        gridRef.current.dataSource = new window.Smart.DataAdapter({
          dataSource: newData,
          id: primaryKey,
          dataFields: source.dataFields,
          localData: source.localData,
          url: source.url,
          cache: source.cache,
          totalrecords: source.totalrecords,
          beforeprocessing: source.beforeprocessing,
        });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        //console.error("Error fetching data:", error);
        setLoading(false);
      }
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };

  const header = {
    visible: true,
    buttons: [],
    template: (headerElement: any) => {
      // Clear previous toolbar elements
      while (headerElement.firstChild) {
        headerElement.removeChild(headerElement.firstChild);
      }

      const toolbar = document.createElement("div");
      toolbar.className = "custom-toolbar";

      if (generatebtn) {
        const addButton = document.createElement("div");
        addButton.className = "toolbar-button";
        const addButtonRoot = ReactDOM.createRoot(addButton);
        addButtonRoot.render(
          <Button onClick={handleAddClick} className="button-concept">
            <a className="button-primary" role="button">
              <span>Generate Data</span>
              <div className="icon">
                <i className="fa fa-plus"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(addButton);
      }

      if (addbtn) {
        const addButton = document.createElement("div");
        addButton.className = "toolbar-button";
        const addButtonRoot = ReactDOM.createRoot(addButton);
        addButtonRoot.render(
          <Button onClick={handleAddClick} className="button-concept">
            <a className="button-primary" role="button">
              <span>Tambah Data</span>
              <div className="icon">
                <i className="fa fa-plus"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(addButton);
      }

      if (updatebtn) {
        const editButton = document.createElement("div");
        editButton.className = "toolbar-button";
        const editButtonRoot = ReactDOM.createRoot(editButton);
        editButtonRoot.render(
          <Button onClick={handleEdit} className="button-concept">
            <a className="button-primary-edit" role="button">
              <span>Edit Data</span>
              <div className="icon">
                <i className="fa fa-edit"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(editButton);
      }

      if (deletebtn) {
        const deleteButton = document.createElement("div");
        deleteButton.className = "toolbar-button";
        const deleteButtonRoot = ReactDOM.createRoot(deleteButton);
        deleteButtonRoot.render(
          <Button onClick={handleDelete} className="button-concept">
            <a className="button-primary-delete" role="button">
              <span>Delete Data</span>
              <div className="icon">
                <i className="fa fa-remove"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(deleteButton);
      }

      if (exportbtn) {
        const exportButton = document.createElement("div");
        exportButton.className = "toolbar-button";
        const exportButtonRoot = ReactDOM.createRoot(exportButton);
        exportButtonRoot.render(
          <Button
            onClick={() => handleExport("xlsx")}
            className="button-concept"
          >
            <a className="button-primary-export" role="button">
              <span>Export To Excel</span>
              <div className="icon">
                <i className="fa fa-download"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(exportButton);

        // const exportButtonCsv = document.createElement("div");
        // exportButtonCsv.className = "toolbar-button";
        // exportButtonCsv.style.marginRight = "10px";
        // const exportButtonCsvRoot = ReactDOM.createRoot(exportButtonCsv);
        // exportButtonCsvRoot.render(
        //   <Button
        //     onClick={() => handleExport("csv")}
        //     className="button-concept"
        //   >
        //     <a className="button-primary-export" role="button">
        //       <span>Export To Csv</span>
        //       <div className="icon">
        //         <i className="fa fa-download"></i>
        //         <i className="fa fa-check"></i>
        //       </div>
        //     </a>
        //   </Button>
        // );
        // toolbar.appendChild(exportButtonCsv);
      }

      if (uploadbtn) {
        const uploadButton = document.createElement("div");
        uploadButton.className = "toolbar-button";
        uploadButton.style.marginRight = "10px";
        const uploadButtonRoot = ReactDOM.createRoot(uploadButton);
        uploadButtonRoot.render(
          <Button onClick={handleUpload} className="button-concept">
            <a className="button-clear button" role="button">
              <span>Upload From Excel</span>
              <div className="icon">
                <i className="fa fa-upload"></i>
                <i className="fa fa-check"></i>
              </div>
            </a>
          </Button>
        );
        toolbar.appendChild(uploadButton);
      }

      //   const filterButton = document.createElement("div");
      //   filterButton.className = "toolbar-button";
      //   filterButton.style.marginRight = "10px";
      //   const filterButtonRoot = ReactDOM.createRoot(filterButton);
      //   filterButtonRoot.render(
      //     <Button onClick={handleClearFilter} className="button-concept">
      //       <a className="button-clear button" role="button">
      //         <span>Clear Filter Data</span>
      //         <div className="icon">
      //           <i className="fa fa-filter"></i>
      //           <i className="fa fa-check"></i>
      //         </div>
      //       </a>
      //     </Button>
      //   );

      //   const refreshButton = document.createElement("div");
      //   refreshButton.className = "toolbar-button";
      //   const refreshButtonRoot = ReactDOM.createRoot(refreshButton);
      //   refreshButtonRoot.render(
      //     <Button onClick={() => handleReloadData()} className="button-concept">
      //       <a className="button-refresh button" role="button">
      //         <span>Refresh data</span>
      //         <div className="icon">
      //           <i className="fa fa-refresh"></i>
      //           <i className="fa fa-check"></i>
      //         </div>
      //       </a>
      //     </Button>
      //   );

      //   toolbar.appendChild(filterButton);
      //   toolbar.appendChild(refreshButton);

      headerElement.appendChild(toolbar);
    },
  };

  const onCellUpdate = (
    cells: any,
    oldValues: any,
    values: any,
    confirm: any
  ) => {
    // cells: GridCell[], oldValues: any[], values: any[], confirm: (commit: boolean) => void

    // console.log("onCellUpdate");
    // console.log("cells[0].row.data.id");
    // console.log(cells[0].row.data.id);
    // console.log("cells[0].row.data");
    // console.log(cells[0].row.data);

    if (values[0] != oldValues[0]) {
      updateData(
        path,
        {
          [cells[0].column.dataField]: values[0],
          id_user_update: currentUser?.id_user,
        },
        // args?.row[primaryKey]
        cells[0].row.data.id
      );
    }

    setTimeout(() => {
      confirm(true);
    }, 500);
  };

  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, source.token);
      console.log("updateData");
      // //console.log(req)
      if (req?.status === 404) {
        dispatchNotification(`${req?.message}`, "danger");
      }
      // if (req?.status === 200) {
      //   dispatchNotification(`${req?.message}`, "success");
      // }

      // dataAdapter();
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;

      dispatchNotification(`${message}`, "danger");
      setLoading(false);
    }
  };

  const handleRowClick = (event: any) => {
    //console.log("Row click event:", event);
    const rowData = event.detail?.data || event.detail?.row; // Access the data from the event
    //console.log("Row data:", rowData);
    //console.log("Primary key:", primaryKey);

    if (rowData) {
      const selectedId = get(rowData, primaryKey); // Use lodash's get to retrieve the primary key
      //console.log("Selected ID:", selectedId);

      if (selection.current && selection.current[primaryKey] === selectedId) {
        // Clear selection if the same row is clicked twice
        selection.current = {};
        //console.log("Selection cleared");
      } else {
        // Set selection.current to the row data
        selection.current = rowData;
      }

      if (onRowSelected) {
        onRowSelected(selection.current);
      }
    } else {
      //console.warn("Row data is undefined");
    }
  };

  const handleRowsSelected = (event: any) => {
    //console.log("Rows selected event:", event);

    if (selectionmode === "checkbox") {
      const selectedRows = event.detail?.rows || event.detail?.selection;
      console.log("Selected rows:", selectedRows);

      if (selectedRows) {
        const selectedIds = selectedRows.map((row: any) =>
          get(row, primaryKey)
        );
        console.log("Selected IDs:", selectedIds);

        // Filter out unselected rows
        const unselectedRows = selection.current.filter(
          (row: any) => !selectedIds.includes(row[primaryKey])
        );

        // Update selection.current with selected rows
        selection.current = [...selectedRows, ...unselectedRows];

        if (onRowSelected) {
          onRowSelected(selection.current);
        }
      } else {
        //console.warn("Selected rows data is undefined");
      }
    } else {
      handleRowClick(event);
    }
  };

  const getSelectionConfig = () => {
    switch (selectionmode) {
      case "checkbox":
        return {
          enabled: true,
          checkBoxes: {
            enabled: true,
          },
          onRowSelected: handleRowsSelected, // Menambahkan handler ketika row dipilih
        };
      case "many":
        return {
          enabled: true,
          mode: "many",
          onRowSelected: handleRowsSelected, // Menambahkan handler ketika row dipilih
        };

      case "singlerow":
        return {
          enabled: true,
          action: "click",
          onRowSelected: handleRowsSelected, // Menambahkan handler untuk seleksi satu baris
        };
      default:
        return {
          enabled: false,
        };
    }
  };
  const columns = dataFieldsColsConfig.columns;
  const columngroups = dataFieldsColsConfig.columnGroups;

  const columngroupsx = [
    { label: "Arus (A)", align: "center", name: "arus" },
    { label: "Tegangan (kV)", align: "center", name: "tegangan" },
    { label: "00:00", align: "center", name: "0000" },
    { label: "00:30", align: "center", name: "0030" },
    { label: "01:00", align: "center", name: "0100" },
    { label: "01:30", align: "center", name: "0130" },
    { label: "02:00", align: "center", name: "0200" },
    { label: "02:30", align: "center", name: "0230" },
    { label: "03:00", align: "center", name: "0300" },
    { label: "03:30", align: "center", name: "0330" },
    { label: "04:00", align: "center", name: "0400" },
    { label: "04:30", align: "center", name: "0430" },
    { label: "05:00", align: "center", name: "0500" },
    { label: "05:30", align: "center", name: "0530" },
    { label: "06:00", align: "center", name: "0600" },
    { label: "06:30", align: "center", name: "0630" },
    { label: "07:00", align: "center", name: "0700" },
    { label: "07:30", align: "center", name: "0730" },
    { label: "08:00", align: "center", name: "0800" },
    { label: "08:30", align: "center", name: "0830" },
    { label: "09:00", align: "center", name: "0900" },
    { label: "09:30", align: "center", name: "0930" },
    { label: "10:00", align: "center", name: "1000" },
    { label: "10:30", align: "center", name: "1030" },
    { label: "11:00", align: "center", name: "1100" },
    { label: "11:30", align: "center", name: "1130" },
    { label: "12:00", align: "center", name: "1200" },
    { label: "12:30", align: "center", name: "1230" },
    { label: "13:00", align: "center", name: "1300" },
    { label: "13:30", align: "center", name: "1330" },
    { label: "14:00", align: "center", name: "1400" },
    { label: "14:30", align: "center", name: "1430" },
    { label: "15:00", align: "center", name: "1500" },
    { label: "15:30", align: "center", name: "1530" },
    { label: "16:00", align: "center", name: "1600" },
    { label: "16:30", align: "center", name: "1630" },
    { label: "17:00", align: "center", name: "1700" },
    { label: "17:30", align: "center", name: "1730" },
    { label: "18:00", align: "center", name: "1800" },
    { label: "18:30", align: "center", name: "1830" },
    { label: "19:00", align: "center", name: "1900" },
    { label: "19:30", align: "center", name: "1930" },
    { label: "20:00", align: "center", name: "2000" },
    { label: "20:30", align: "center", name: "2030" },
    { label: "21:00", align: "center", name: "2100" },
    { label: "21:30", align: "center", name: "2130" },
    { label: "22:00", align: "center", name: "2200" },
    { label: "22:30", align: "center", name: "2230" },
    { label: "23:00", align: "center", name: "2300" },
    { label: "23:30", align: "center", name: "2330" },
  ];

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div>
        <style>
          {`
             .custom-toolbar {
                        display: flex;
                        justify-content: flex-start;
                        padding: 10px;
                        background-color: #f1f1f1;
                        margin-bottom: 10px;
                        width: calc(101% -20px); /* Set the width */
                        height: 50px; /* Set the height */
                        margin: 0 auto; /* Center align */
                          margin-left: 0px; /* Adjust this value to shift right */
                          
                    }

                    .toolbar-button {
                        margin-right: 10px;
                    }
                    .toolbar-button:last-child {
                        margin-right: 0;
                    }
                  
                   
                        .ok,
                    .cancel {
                        margin-top: 10px;
                        display: inline-block;
                        padding: 0px 10px;
                        font-size: 10px;
                    }

                `}
        </style>

        {isVisible && <div ref={(el) => el && header.template(el)}></div>}
        {/* {toolbar} */}
        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          message={dialogMessage}
        />
        <CustomDialogDelete
          isOpen={isDialogOpenDelete}
          onClose={() => setIsDialogOpenDelete(false)}
          message={dialogMessageDelete}
          onDelete={() => deleteData(primaryKey)} // Pass primaryKey to deleteData
        />

        <Grid
          dataSource={dataAdapter}
          // onFilter={handleFiltering}
          filtering={filteringOptions}
          ref={gridRef}
          columns={columns}
          columnGroups={columngroups ? columngroups : columngroupsx}
          appearance={{
            alternationCount: 2,
            showRowHeader: true,
            showRowHeaderSelectIcon: true,
            showRowHeaderFocusIcon: true,
            autoShowColumnFilterButton: false,
          }}
          behavior={{ columnResizeMode: "growAndShrink" }}
          selection={getSelectionConfig()}
          // onSort={handleOnSort}
          onPage={handlePageChange}
          paging={{
            enabled: true,
            pageSize: limit,
            pageIndex: page,
          }}
          pager={{
            template: "Pages: {first} {previous} {pages} {next} {last}",
            visible: true,
            pageSizeSelector: {
              visible: true,
              dataSource: [10, 20, 50, 100, 1000],
            },
            summary: {
              visible: true,
            },
            navigationInput: {
              visible: true,
            },
            pageIndexSelectors: {
              dataSource: 3,
            },
            navigationButtons: {
              position: "far",
            },
          }}
          // onRowClick={handleRowsSelected}
          // onCellUpdate={onCellendedit}
          onCellUpdate={onCellUpdate}
          // onCellBeginEdit={}
          sorting={{ enabled: true }}
          editing={{ enabled: editable, mode: "cell" }}
          style={{ width: "100%", height: "600px" }} // Example: Width 100%, Height 600px
        />
      </div>
    </>
  );
};

export default SmartGridPB;

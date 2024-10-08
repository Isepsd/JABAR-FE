import React, { useState, useRef,useMemo,useCallback} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactDOM from "react-dom/client";
// import * as ReactDOM from 'react-dom/client';
import { FormControl, InputGroup } from 'react-bootstrap';
// Jqwidgets
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxDropDownList from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';
// import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { get,debounce } from 'lodash';
import { getAllByPath, putByPath, deleteByPath, getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import axios from 'axios';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import moment from 'moment';


interface TableDataJqxGridNewButton {
  dataFieldsColsConfig: any;
  path: any;
  dataSources?: any;
  filterParams?: any;
  primaryKey: any;
  selectionmode?: any;
  respDataApi: any;
  serachBar?: boolean;
  showtoolbar?: boolean;
  onRowSelected?: any;
  editable?: any;
  pageable?: any;
  filterable?: any;
  showHideCol?: any;
  ids?: any;
  onShowModal?: any;
  // ACTIONS BUTTON
  addbtn?: any; // memunculkan tombol add
  onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
  updatebtn?: any; // memunculkan tombol edit
  onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  updaterekonbtn?: any; // memunculkan tombol edit
  onClickUpdateRekon?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  btnJenisLap?: any; // memunculkan tombol edit
  onClickJenisLap?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  btnNoApkt?: any
  onClickNoApkt?: any;
  btnStatus?: any
  onClickStatus?: any
  addlaporan?: any; // memunculkan tombol add
  onClickAddlaporan?: any;
  deletebtn?: any; // memunculkan tombol delete
  reloadbtn?: any; // memunculkan tombol reload
  uploadbtn?: boolean; // memunculkan tombol upload
  onClickUpload?: any; // event ketika upload ex: mumunculkan modal atau reedirect ke form page
  exportbtn?: any; // memunculkan tombol export
  // roleActions?: any; // memunculkan tombol export
  autoheight?: any
  autorowheight?: any
  SetPrivilegesbtn?: any; // memunculkan tombol edit
  onClickSetPrivileges?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPassword?: any; // memunculkan tombol edit
  onClickSetPassword?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetView?: any; // memunculkan tombol edit
  onClickSetView?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPosting?: any; // memunculkan tombol edit
  onClickSetPosting?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPelaksanaan?: any; // memunculkan tombol edit
  onClickSetPelaksanaan?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetUpload?: any; // memunculkan tombol edit
  onClickSetUpload?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetApprove?: any; // memunculkan tombol edit
  onClickSetApprove?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetVerivikasi?: any; // memunculkan tombol edit
  onClickSetVerivikasi?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPrint?: any; // memunculkan tombol edit
  onClickSetPrint?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  minWidth?: any; // Set a minimum width to ensure buttons are visible
    maxWidth?: any; // Set a maximum width to avoid excessive space
}

const TableDataJqxGridNewButton: React.FC<TableDataJqxGridNewButton> = React.memo(({
  dataFieldsColsConfig = [], path, showHideCol = false,
  dataSources, filterParams = {}, primaryKey,
  selectionmode = 'singlerow', respDataApi,
  serachBar = false, onRowSelected, pageable = true,
  editable = false, filterable = false, showtoolbar = true,
  addbtn = false, onClickAdd,
  updatebtn,
  SetPelaksanaan,
  SetPosting,
  SetView,
  deletebtn,
  SetApprove,
  btnJenisLap = false, onClickJenisLap,
  btnNoApkt = false, onClickNoApkt,
  btnStatus = false, onClickStatus,
  addlaporan = false, onClickAddlaporan,

 onClickUpdate,
 onClickSetPosting,
 onClickSetView,
 onClickSetPelaksanaan,
 onClickSetApprove,
 minWidth= 370, // Set a minimum width to ensure buttons are visible
 maxWidth= 600, // Set a maximum width to avoid excessive space
  exportbtn = true,
  uploadbtn = false, onShowModal,
  autoheight = true,
  autorowheight = true,
  SetVerivikasi,
  onClickSetVerivikasi,
  SetPrint,
  onClickSetPrint,
  updaterekonbtn,
  onClickUpdateRekon,

  reloadbtn = true, ids = 'id', // call virtual id for modals edit or something
}) => {
  const navigate = useNavigate();
  const sc = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [themeJqx] = useState<any>('light');
  const Grid = useRef<JqxGrid>(null);
  const toolbarRendered = useRef(false);
  const myWindow = useRef<JqxWindow>(null);
  const alertWindow = useRef<JqxWindow>(null);
  const dropDownList = useRef<JqxDropDownList>(null);
  // const ActionButtons = React.memo(({ rowData, onActionClick, isLoading }: any) => (
  //   <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
  //     <button
  //       className="action-btn edit-btn"
  //       title="Edit Item"
  //       onClick={() => onActionClick('update', rowData)}
  //       disabled={isLoading}  // Disable button while loading
  //     >
  //       <i className="fas fa-edit"></i>
  //     </button>
  //     <button
  //       className="action-btn posting-btn"
  //       title="Post Item"
  //       onClick={() => onActionClick('posting', rowData)}
  //       disabled={isLoading}  // Disable button while loading
  //     >
  //       Posting <i className="fas fa-check-circle"></i>
  //     </button>
  //     <button
  //       className="action-btn view-btn"
  //       title="View Item"
  //       onClick={() => onActionClick('view', rowData)}
  //       disabled={isLoading}  // Disable button while loading
  //     >
  //       View <i className="fas fa-eye"></i>
  //     </button>
  //     <button
  //       className="action-btn delete-btn"
  //       title="Delete Item"
  //       onClick={() => onActionClick('delete', rowData)}
  //       disabled={isLoading}  // Disable button while loading
  //     >
  //       <i className="fas fa-trash-alt"></i>
  //     </button>
  //   </div>
  // ));
  
  const [isLoading, setIsLoading] = useState(false);
  
 // Handle add button click
const handleAddClickColumn = useCallback((row: any) => {
  if (onClickAdd) {
    onClickAdd(row);
  } else {
    const target = typeof addbtn === 'boolean' ? 'add' : addbtn;
    navigate(target);
  }
}, [onClickAdd, addbtn, navigate]);

 // Handle addlaporan button click
 const handleAddLaporanColumn = useCallback((row: any) => {
  if (onClickAddlaporan) {
    onClickAddlaporan(row);
  } else {
    const target = typeof addlaporan === 'boolean' ? 'add' : addlaporan;
    navigate(target);
  }
}, [onClickAddlaporan, addlaporan, navigate]);

// Handle edit button click
const handleEditClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickUpdate) {
        onClickUpdate(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`edit/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickUpdate, ids, navigate]);
// Handle edit button click
const handleEditRekonClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickUpdateRekon) {
        onClickUpdateRekon(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`rekon/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickUpdateRekon, ids, navigate]);

// Handle posting button click
const handlePostingClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetPosting) {
        onClickSetPosting(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`posting/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetPosting, ids, navigate]);
const handleApproveClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetApprove) {
        onClickSetApprove(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`approve/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetApprove, ids, navigate]);

const handleVerivikasiClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetVerivikasi) {
        onClickSetVerivikasi(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`verivikasi/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetVerivikasi, ids, navigate]);
const handlePrintClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetPrint) {
        onClickSetPrint(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`print/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetPrint, ids, navigate]);

// Handle view button click
const handleViewClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetView) {
        onClickSetView(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`view/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetView, ids, navigate]);
// Handle view button click
const handlePelaksanaanClickColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickSetPelaksanaan) {
        onClickSetPelaksanaan(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`pelaksanaan/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickSetPelaksanaan, ids, navigate]);

// Handle delete button click
const handleDeleteDataColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      ShowConfirmDelete();
      // Add your delete logic here, e.g., API request
    } catch (error) {
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [ ]);

const handleUpdateJenisLapColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickJenisLap) {
        onClickJenisLap(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`edit/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickJenisLap, ids, navigate]);

// const handleUpdateNoApktColumn = useCallback(async (primaryKeyColumn: string) => {
//   if (primaryKeyColumn) {
//     setIsLoading(true); // Disable buttons
//     try {
//       if (onClickNoApkt) {
//         onClickNoApkt(primaryKeyColumn);
//         searchParams.delete(ids);
//         searchParams.append(ids, primaryKeyColumn);
//         setSearchParams(searchParams);
//       } else {
//         navigate(`no_apkt/${primaryKeyColumn}`);
//       }
//     } catch (error) {
//       console.error(error);
//       ShowAlert();
//     } finally {
//       setIsLoading(false); // Re-enable buttons
//     }
//   } else {
//     ShowAlert();
//   }
// }, [onClickNoApkt, ids, navigate]);

const handleUpdateNoApktColumn = (e: any) => {
  if (rowsSelected.current[primaryKey] !== null && rowsSelected.current[primaryKey] !== '') {
    if (onClickNoApkt) {
      onClickNoApkt(e);
      searchParams.delete(ids);
      searchParams.append(ids, get(rowsSelected.current, primaryKey));
      setSearchParams(searchParams);
    } else {
      navigate(`no_apkt/${rowsSelected.current[primaryKey]}`);
    }
  } else {
    ShowAlert();
  }
};

const handleUpdateStatusColumn = useCallback(async (primaryKeyColumn: string) => {
  if (primaryKeyColumn) {
    setIsLoading(true); // Disable buttons
    try {
      if (onClickStatus) {
        onClickStatus(primaryKeyColumn);
        searchParams.delete(ids);
        searchParams.append(ids, primaryKeyColumn);
        setSearchParams(searchParams);
      } else {
        navigate(`edit/${primaryKeyColumn}`);
      }
    } catch (error) {
      console.error(error);
      ShowAlert();
    } finally {
      setIsLoading(false); // Re-enable buttons
    }
  } else {
    ShowAlert();
  }
}, [onClickStatus, ids, navigate]);

// Ensure `handleAction` is available globally
(window as any).handleAction = (action: string, primaryKeyColumn: string) => {
  switch (action) {
    case 'add':
      handleAddClickColumn(primaryKeyColumn);
      break;
    case 'update':
      handleEditClickColumn(primaryKeyColumn);
      // handleUpdateJenisLapColumn(primaryKeyColumn);
      // handleUpdateNoApktColumn(primaryKeyColumn);
      // handleUpdateStatusColumn(primaryKeyColumn);
      // handleAddLaporanColumn(primaryKeyColumn);
      break;
    case 'posting':
      handlePostingClickColumn(primaryKeyColumn);
      break;
    case 'updaterekon':
      handleEditRekonClickColumn(primaryKeyColumn);
      break;
    case 'view':
      handleViewClickColumn(primaryKeyColumn);
      break;
    case 'pelaksanaan':
      handlePelaksanaanClickColumn(primaryKeyColumn);
      break;
    case 'approve':
      handleApproveClickColumn(primaryKeyColumn);
      break;
    case 'verivikasi':
      handleVerivikasiClickColumn(primaryKeyColumn);
      break;
    case 'print':
      handlePrintClickColumn(primaryKeyColumn);
      break;
    case 'delete':
      handleDeleteDataColumn(primaryKeyColumn);
      break;
    case 'update_jenis':
      handleUpdateJenisLapColumn(primaryKeyColumn);
    break;  
    case 'update_apkt':
      handleUpdateNoApktColumn(primaryKeyColumn);
    break;  
    case 'update_status':
      handleUpdateStatusColumn(primaryKeyColumn);
    break;    
    case 'add_laporan':
      handleAddLaporanColumn(primaryKeyColumn);
    break; 

    default:
      break;
  }
};

const columns = useMemo(() => [
  ...dataFieldsColsConfig.columns,
  {
    text: 'Actions',
    datafield: 'actions',
    pinned: true,
    cellsAlign: 'center',
    minWidth: minWidth, // Set a minimum width to ensure buttons are visible
    maxWidth: maxWidth, // Set a maximum width to avoid excessive space
    editable: false,
    sortable: false,
    filterable: false,
    cellsrenderer: (row: any, column: any, value: any, defaultHtml: any, columnProperties: any, rowData: any) => {
      const id = `action-buttons-${row}`;
      
      // Get the primary key from the row
      const primaryKeyColumn = rowData[primaryKey];
      
      // Create buttons as a string of HTML, passing the primary key instead of the full row
      const buttonsHtml = `
        ${updatebtn ? `
          <button class="action-btn edit-btn" title="Edit Item" onclick="handleAction('update', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Edit <i class="fas fa-edit"></i>
          </button>
        ` : ''}
        ${updaterekonbtn ? `
          <button class="action-btn edit-btn" title="Edit Item" onclick="handleAction('updaterekon', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Edit Rekon <i class="fas fa-edit"></i>
          </button>
        ` : ''}
          ${SetPelaksanaan ? `
          <button class="action-btn view-btn" title="Pelaksanaan Item" onclick="handleAction('pelaksanaan', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Pelaksanaan <i class="fas fa-check-circle"></i>
          </button>
        ` : ''}
          ${SetApprove ? `
          <button class="action-btn view-btn" title="approve Item" onclick="handleAction('approve', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Approve <i class="fas fa-check-circle"></i>
          </button>
        ` : ''}
          ${SetVerivikasi ? `
          <button class="action-btn view-btn" title="Verivikasi Data" onclick="handleAction('verivikasi', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Verifikasi  <i class="fas fa-check-circle"></i>
          </button>
        ` : ''}
          ${SetPrint ? `
          <button class="action-btn view-btn" title="print Data" onclick="handleAction('print', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Print  <i class="fas fa-check-circle"></i>
          </button>
        ` : ''}
        ${SetPosting ? `
          <button class="action-btn posting-btn" title="Post Item" onclick="handleAction('posting', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Posting <i class="fas fa-check-circle"></i>
          </button>
        ` : ''}
        ${SetView ? `
          <button class="action-btn view-btn" title="View Item" onclick="handleAction('view', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            View <i class="fas fa-eye"></i>
          </button>
        ` : ''}
      
        ${deletebtn ? `
          <button class="action-btn delete-btn" title="Delete Item" onclick="handleAction('delete', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Delete <i class="fas fa-trash-alt"></i>
          </button>
        ` : ''}
        ${btnJenisLap ? `
          <button class="action-btn edit-btn" title="Jenis Item" onclick="handleAction('update', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Jenis Laporan <i class="fas fa-edit"></i>
          </button>
        ` : ''}
        ${btnNoApkt ? `
          <button class="action-btn edit-btn" title="NO APKT Item" onclick="handleAction('update_apkt', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            No APKT <i class="fas fa-edit"></i>
          </button>
        ` : ''}
        ${btnStatus ? `
          <button class="action-btn edit-btn" title="Status Item" onclick="handleAction('update_status', '${primaryKeyColumn}')" ${isLoading ? 'disabled' : ''}>
            Status <i class="fas fa-edit"></i>
          </button>
        ` : ''}
      `;
    
      // Return the buttons as HTML
      return `<div id="${id}" class="action-buttons">${buttonsHtml}</div>`;
    }
  }
], [updatebtn, SetPosting, SetView, SetPelaksanaan, deletebtn, btnJenisLap, btnNoApkt, btnStatus,isLoading, primaryKey]);



  const [columngroups] = useState<IGridProps["columngroups"]>(dataFieldsColsConfig.columngroups);
  const rowsSelected = useRef<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let filtersRowParams: any = {}

  // const [source] = useState<any>({
  //   url: path,
  //   dataFields: dataFieldsColsConfig?.dataFields,
  //   id: primaryKey,
  //   datatype: 'json',
  //   root: 'results',
  //   cache: false,
  //   ...(dataSources ? dataSources : null),
  //   totalrecords: 0,
  //   beforeprocessing: (data: any) => {
  //     source.totalrecords = data.total;
  //   }
  // });


  const [source] = useState<any>(() => {
    const sourceObj: any = {
      dataFields: dataFieldsColsConfig?.dataFields,
      id: primaryKey,
      datatype: 'json',
      root: 'results',
      cache: false,
      totalrecords: 0,
      beforeprocessing: (data: any) => {
        sourceObj.totalrecords = data.total;
      }
    };

    if (dataSources) {
      sourceObj.localData = dataSources;
    } else {
      sourceObj.url = path;
    }

    return sourceObj;
  });

  const debouncedLoadServerData = debounce((serverdata, source, callback) => {
    const params = {
      page: serverdata.pagenum + 1,
      limit: serverdata.pagesize,
      sort_by: 'nama',
      ...filterParams,
      ...filtersRowParams
    };
    getAllByPath(path, params, sc.token)
      .then((response: any) => {
        const { results, total } = response;
        const modifiedResults = results.map((result: any, index: number) => ({
          ...result, number: index + serverdata.recordstartindex + 1
        }));

        callback({ records: respDataApi(modifiedResults), totalrecords: total });
      })
      .catch((error: any) => {
        let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
        dispatchNotification(`${message}`, 'danger');
        callback({ records: [], totalrecords: 0 });
      });
  }, 300); // 300ms debounce

  const dataAdapter:any = new jqx.dataAdapter(source, {
    loadServerData: (serverdata: any, source: any, callback: any) => {
      debouncedLoadServerData(serverdata, source, callback);
    },
  });

  const rendergridrows = (params: any): any => { return params.data; };
  // const handleBindingComplete = () => setLoading(false);

  const handleOnSort = (event: any) => {
    const sortinformation = event?.args?.sortinformation;
    let sortdirection = sortinformation?.sortdirection?.ascending ? "" : "-";
    if (!sortinformation.sortdirection.ascending && !sortinformation.sortdirection.descending) sortdirection = "null";
    if (sortdirection !== "null") {
      filterParams = { ...filterParams, sort_by: sortdirection + sortinformation?.sortcolumn };
    } else {
      delete filterParams.sort_by;
    }
    handleReloadData();
  };

  const handleRowSelectionsChange = () => {
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
      if (!rowsSelected.current.some((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey])) {
        rowsSelected.current.push(row);
      }
    });

    uncheckedRows.forEach((row: any) => {
      const index = rowsSelected.current.findIndex((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey]);
      if (index !== -1) {
        rowsSelected.current.splice(index, 1);
      }
    });
    onRowSelected(rowsSelected);
  };

  const handleSingleRowSelect = (event: any) => {
    if (event) rowsSelected.current = event;
    onRowSelected(rowsSelected);
  }

  const handleRowsSelected = (event: any) => {
    if (selectionmode === 'checkbox') {
      handleRowSelectionsChange();
    } else {
      handleSingleRowSelect(event?.args.row);
    }
  }
  // const handleRowUnselect = (event: any) => {
  const handleRowUnselect = () => {
    if (selectionmode === 'checkbox') {
      handleRowSelectionsChange();
    } else {
      Grid.current?.clearselection();
    }
  }

  const handleOnCellendedit = (item: any) => {
    const { args } = item;
    if (args?.oldvalue != args?.value) {
      updateData(path, { [args?.datafield]: args?.value }, args?.row[primaryKey]);
    }
  }

  const handleOnFilter = () => {
    const filterGroups = Grid.current?.getfilterinformation();
    let queryParam = {};

    if (filterGroups) {
      console.log("Filter Groups:", filterGroups); // Log filter groups

      for (let i = 0; i < filterGroups.length; i++) {
        const filterGroup = filterGroups[i];
        console.log(`Filter Group ${i}:`, filterGroup); // Log each filter group

        const filters = filterGroup.filter.getfilters();
        console.log(`Filters for Group ${i}:`, filters); // Log filters in each group

        for (let j = 0; j < filters.length; j++) {
          const filter = filters[j];
          console.log(`Filter ${j} in Group ${i}:`, filter); // Log each filter

          if (filterGroup.filtercolumn) {
            let filterValue = filter.value;
            console.log(`Filter Value for Filter ${j} in Group ${i}:`, filterValue); // Log filter value

            if (typeof filterValue === 'boolean') {
              filterValue = filterValue ? 1 : 0;
            }
            queryParam = { ...queryParam, [filterGroup.filtercolumn]: filterValue };
          }
        }
      }
    }

    filtersRowParams = { ...filtersRowParams, ...queryParam };
    console.log("Updated filtersRowParams:", filtersRowParams); // Log updated filtersRowParams

    Object.keys(filtersRowParams).forEach((key) => {
      if (!(key in queryParam)) {
        delete filtersRowParams[key];
      }
    });

    console.log("Final filtersRowParams:", filtersRowParams); // Log final filtersRowParams after cleanup

    handleReloadData();
  };


  const handleSearch = (event: any) => {
    filterParams = { ...filterParams, page: 1, limit: 10, sort_by: 'nama', keyword: event.target.value };
    handleReloadData();
  };

  /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** EDIT DATA ON TABLE */
  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, sc.token);
      if (req?.status === 500) dispatchNotification(`${req?.message}`, 'danger');
      if (req?.status === 201) dispatchNotification(`${req?.message}`, 'success');
      // handleReloadData(); aktifkan jika akn refresh data setelah edit
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`${message}`, 'danger');
      setLoading(false);
    }
  }

  const listOnSelect = (event: any): void => {
    if (event.args) {
      const selectedItem = event.args.item;
      if (selectedItem.checked) {
        Grid.current?.showcolumn(selectedItem.value);
      } else {
        Grid.current?.hidecolumn(selectedItem.value);
      }
    }
  };

  /** MENU HANDLER & PRIVILAGES BY ACCES USER */
  const rendertoolbar = (toolbar: any) => {
    if (!toolbarRendered.current) {
      const buttonStyle: React.CSSProperties = {
        display: 'inline-block',
        marginLeft: '5px',
        // backgroundColor: '#0484cc', // #fff Warna dasar tombol #ff0e0e
        // color: '#fff', // Warna teks tombol
        border: 'none',
        borderRadius: '4px', // Membuat sudut tombol membulat
        cursor: 'pointer',
        transition: 'background-color 0.3s', // Transisi saat hover
      };

      const buttonsContainer = (
        <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', position: 'relative', margin: '5px' }}>
          {addbtn && (
            <JqxButton
              onClick={handleAddClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Tambah Data</span>
              <i className="fa-solid fa-plus"></i>
            </JqxButton>
          )}
          {addlaporan && (
            <JqxButton
              onClick={handleAddLaporanColumn}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#eef205', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Input Laporan</span>
              <i className="fa-solid fa-plus"></i>
            </JqxButton>
          )}
          {exportbtn && (
            <JqxButton
              onClick={() => getAllDataExport('xlsx')}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#5cb85c', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Export to Excel</span>
              <i className="fa-solid fa-file-excel"></i>
            </JqxButton>
          )}
          {exportbtn && (
            <JqxButton
              onClick={() => getAllDataExport('csv')}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#5cb85c', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Export to Csv</span>
              <i className="fa-solid fa-file-csv"></i>
            </JqxButton>
          )}
          {uploadbtn && (
            <JqxButton
              onClick={onShowModal}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Upload from Excel</span>
              <i className="fa-solid fa-upload"></i>
            </JqxButton>
          )}
          {filterable && (
            <JqxButton
              onClick={handleClearFilter}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Clear Filter</span>
              <i className="fa-solid fa-filter-circle-xmark"></i>
            </JqxButton>
          )}
          {reloadbtn && (
            <JqxButton
              onClick={handleReloadData}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Reload</span>
              <i className="fa-solid fa-rotate"></i>
            </JqxButton>
          )}
          {showHideCol && (
            <JqxDropDownList
              ref={dropDownList}
              theme={themeJqx}
              style={buttonStyle}
              onSelect={listOnSelect}
              width={200}
              height={30}
              source={dataFieldsColsConfig.columns}
              checkboxes={true}
              filterable={true}
              displayMember={'text'}
              valueMember={'datafield'}
              placeHolder='Show/Hide Columns'
            />
          )}
        </div>
      );

      ReactDOM.createRoot(toolbar[0]).render(buttonsContainer);
      toolbarRendered.current = true;
    }
  };

  /** AKSI REQUEST HANDLER */
  const deleteData = async () => {
    try {
      let req: any = await deleteByPath(path, rowsSelected.current[primaryKey], source.token);
      setLoading(false);
      dispatchNotification(`${req?.message}`, 'success');
      HideConfirmDelete();
      handleReloadData();
    } catch (error: any) {
      setLoading(false);
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`${message}`, 'danger');
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async (export_type: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const filterParamUrl = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filterParams, ...filterParamUrl }
    // jqxLoader.current?.open();

    try {
      let req: any = await getAllDownload(path, params, source.token);
      /** RESET EXPORT */
      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers['content-disposition'];
      const filename = content.replace('attachment; filename=', '').replaceAll('"', '');
      fileDownload(
        dataBlob,
        `${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(export_type) ? filename : `${filename}.${export_type}`
        }`
      );
      // jqxLoader.current?.close();
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`Gagal export / download data : ${message}`, 'danger');
      // jqxLoader.current?.close();
    }
  };

  /** HANDLE TAMBAH DATA */
  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof addbtn == 'boolean' ? 'add' : addbtn;
      navigate(target);
    }
  };


  /** HANDLE UPLOAD DATA */
  // const handleUploadClick = (e: any) => {
  //   if (onClickUpload) {
  //     onClickUpload(e);
  //   }
  // };

  const ShowConfirmDelete = (): void => {
    myWindow.current?.open();
  };
  const HideConfirmDelete = (): void => {
    myWindow.current?.hide();
  };

  const ShowAlert = (): void => {
    alertWindow.current?.open();
  };

  const handleReloadData = (): void => {
    Grid.current?.updatebounddata();
  };
  const handleClearFilter = (): void => {
    Grid.current?.clearfilters();
  };

  console.log('component TableDataJqxGridNew has rendered');



  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className='p-1'>
        {serachBar &&
          <InputGroup className='mb-2'>
            <InputGroup.Text id='search-wsp' style={{ background: 'var(--black-5)' }} >
              <i className='fa fa-search fa-fw'></i>
            </InputGroup.Text>
            <FormControl
              className='search ps-0'
              placeholder=' Cari...'
              aria-label=' Cari...'
              aria-describedby='search-wsp'
              onChange={handleSearch}
              style={{ background: 'var(--black-5)', borderLeft: 0 }}
            />
          </InputGroup>
        }

        {/* <JqxLoader ref={jqxLoader} width={60} height={60} theme={themeJqx} /> */}

        <JqxGrid
          ref={Grid}
          theme={themeJqx}
          width={"100%"}
          autoheight={autoheight}
          autorowheight={autorowheight}
          columnsresize={true}
          columnsreorder={true}
          columns={columns}
          columngroups={columngroups}
          source={dataAdapter}

          // Toolbar options
          {...(showtoolbar && {
            showtoolbar: true,
            rendertoolbar: rendertoolbar,
          })}

          // Filtering options
          {...(filterable && {
            filterable: true,
            showfilterrow: true,
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

        <JqxWindow
          ref={myWindow}
          width={350} minWidth={300} maxWidth={400}
          height={130} minHeight={100} maxHeight={180}
          animationType='fade' autoOpen={false} cancelButton={'.cancel'}
          okButton={'.ok'} resizable={true} isModal={true} modalOpacity={0.3}
          position={{ x: '40%', y: '40%' }} draggable={true} theme={themeJqx}
        >
          <div> <i className="fa-regular fa-circle-question me-2"></i> Konfirmasi delete </div>
          <div>
            <div> Apakah anda yakin ingin menghapus data ? <br /> Data yang dihapus tidak dapat dikembalikan! </div>
            <div style={{ float: 'right', marginTop: 15 }}>
              <div>
                <JqxButton className={'ok'} style={{ display: 'inline-block', marginRight: 10 }} width={80} value={'OK'} onClick={deleteData} theme={themeJqx} />
                <JqxButton className={'cancel'} style={{ display: 'inline-block' }} width={80} onClick={() => myWindow.current?.close()} value={'Cancel'} theme={themeJqx} />
              </div>
            </div>
          </div>
        </JqxWindow>

        <JqxWindow
          ref={alertWindow}
          width={350} minWidth={300} maxWidth={400}
          height={130} minHeight={100} maxHeight={180}
          animationType='fade' autoOpen={false} cancelButton={'.cancel'}
          okButton={'.ok'} resizable={true} isModal={true} modalOpacity={0.3}
          position={{ x: '40%', y: '40%' }} draggable={true} theme={themeJqx}
        >
          <div> <i className="fa-solid fa-triangle-exclamation"></i> Peringatan ! </div>
          <div>
            <div> Anda belum pilih data. <br /> Silahkan pilih data dulu pada table !. </div>
            <div style={{ float: 'right', marginTop: 15 }}>
              <div>
                <JqxButton className={'cancel'} style={{ display: 'inline-block' }} width={100} height={25} onClick={() => alertWindow.current?.close()} value={'OK. Mengerti'} theme={themeJqx} />
              </div>
            </div>
          </div>
        </JqxWindow>

      </div>
    </>
  );
});

export default TableDataJqxGridNewButton;
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import * as RC from 'react-dom/client';
import ReactDOM from 'react-dom';
import { FormControl, InputGroup } from 'react-bootstrap';
// Jqwidgets
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { getAllByPath, putByPath, deleteByPath, getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import axios from 'axios';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import moment from 'moment';


interface ITableDataJqxGrid {
  dataFieldsColsConfig: any;
  path: any;
  dataSources?: any;
  filterParams?: any;
  primaryKey: any;
  selectionmode?: any;
  respDataApi: any;
  serachBar?: boolean;
  onRowSelected?: any;
  editable?: any;
  filterable?: any;

  // ACTIONS BUTTON
  addbtn?: any; // memunculkan tombol add
  onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau di form page
  updatebtn?: any; // memunculkan tombol edit
  deletebtn?: any; // memunculkan tombol delete
  reloadbtn?: any; // memunculkan tombol reload
  uploadbtn?: any; // memunculkan tombol upload
  onClickUpload?: any; // event ketika upload ex: mumunculkan modal atau di form page
  exportbtn?: any; // memunculkan tombol export
}

export default function TableDataJqxGrid({
  dataFieldsColsConfig = [], path,
  dataSources, filterParams = {}, primaryKey,
  selectionmode = 'singlerow', respDataApi,
  serachBar = false, onRowSelected,
  editable = false,
  filterable = false,
  addbtn = false, onClickAdd,
  updatebtn = false,
  deletebtn = false,
  reloadbtn = true,
  uploadbtn = false,
  exportbtn = true,
}: ITableDataJqxGrid) {
  const navigate = useNavigate();
  const sc = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [themeJqx] = useState<any>('light');
  const Grid = useRef<JqxGrid>(null);
  const myWindow = useRef<JqxWindow>(null);
  const [columns] = useState<IGridProps["columns"]>(dataFieldsColsConfig.columns);
  const rowsSelected = useRef<any>([]);
  const [textMessage, setTextMessage] = useState<any>();


  const [source] = useState<any>({
    url: path,
    dataFields: dataFieldsColsConfig?.dataFields,
    id: primaryKey,
    datatype: 'json',
    root: 'results',
    cache: false,
    ...(dataSources ? dataSources : null),
    totalrecords: 0,
    beforeprocessing: (data: any) => {
      source.totalrecords = data.total;
    }
  });

  const dataAdapter = new jqx.dataAdapter(source, {
    loadServerData: (serverdata: any, source: any, callback: any) => {
      // console.log('source', source);
      const params = {
        page: serverdata.pagenum + 1,
        limit: serverdata.pagesize,
        ...filterParams
      };
      getAllByPath(path, params, sc.token)
        .then((response: any) => {
          const { results, total } = response;
          callback({ records: respDataApi(results), totalrecords: total });
        })
        .catch((error: any) => {
          let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
          dispatchNotification(`${message}`, 'danger');
          callback({ records: [], totalrecords: 0 });
        });
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
    for (let i = 0; i < filterGroups.length; i++) {
      const filterGroup = filterGroups[i];
      const filters = filterGroup.filter.getfilters();

      for (let j = 0; j < filters.length; j++) {
        if (filterGroup.filtercolumn) {
          let filterValue = filters[j].value;

          if (typeof filterValue === 'boolean') {
            filterValue = filterValue ? 1 : 0;
          }
          queryParam = { ...queryParam, [filterGroup.filtercolumn]: filterValue };
        }
      }
    }

    filterParams = { ...filterParams, ...queryParam };
    Object.entries(filterParams).forEach(([key]) => { // Remove properties from filterParams that don't exist in queryParam
      if (!(key in queryParam)) {
        delete filterParams[key];
      }
    });

    handleReloadData();
  };

  const handleSearch = (event: any) => {
    filterParams = { ...filterParams, page: 1, limit: 10, keyword: event.target.value };
    handleReloadData();
  };

  /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** TAMBAH DATA */
  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof addbtn == 'boolean' ? 'add' : addbtn;
      navigate(target);
    }
  };

  /** EDIT DATA */
  const handleEditClick = () => {
    if (rowsSelected.current) {
      navigate(`edit/${rowsSelected.current[primaryKey]}`);
    } else {
      setTextMessage('Anda belum pilih data !');
      ShowNotif();
    }
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

  /** MENU HANDLER & PRIVILAGES BY ACCES USER */
  const rendertoolbar = (toolbar: any): void => {
    const style: React.CSSProperties = { float: 'left', marginLeft: '5px' };
    const buttonsContainer = (
      <div style={{ overflow: 'hidden', position: 'relative', margin: '5px' }}>
        {addbtn &&
          <JqxButton onClick={handleAddClick} theme={themeJqx} width={110} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-plus"></i> Tambah Data</span>
          </JqxButton>
        }
        {updatebtn &&
          <JqxButton onClick={handleEditClick} theme={themeJqx} width={80} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-edit"></i> Edit</span>
          </JqxButton>
        }
        {deletebtn &&
          <JqxButton onClick={handleDeleteData} theme={themeJqx} width={80} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-trash-can"></i> Delete</span>
          </JqxButton>
        }
        {exportbtn &&
          <JqxButton onClick={() => getAllDataExport('xlsx')} theme={themeJqx} width={120} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-file-excel"></i> Export to Excel</span>
          </JqxButton>
        }
        {exportbtn &&
          <JqxButton onClick={() => getAllDataExport('csv')} theme={themeJqx} width={120} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-file-csv"></i> Export to Csv</span>
          </JqxButton>
        }
        {uploadbtn &&
          <JqxButton onClick={undefined} theme={themeJqx} width={150} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-upload"></i> Upload from Excel</span>
          </JqxButton>
        }
        {filterable &&
          <JqxButton onClick={handleClearFilter} theme={themeJqx} width={100} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-filter-circle-xmark"></i> Clear Filter</span>
          </JqxButton>
        }
        {reloadbtn &&
          <JqxButton onClick={handleReloadData} theme={themeJqx} width={80} height={20} style={style}>
            <span className='text-muted'><i className="fa-solid fa-rotate"></i> Reload</span>
          </JqxButton>
        }
        {/* <JqxButton onClick={undefined} theme={themeJqx} width={80} height={20} style={style}>
          <span className='text-muted'><i className="fa-solid fa-circle-question"></i> Help</span>
        </JqxButton> */}
      </div>
    );
    ReactDOM.render(buttonsContainer, toolbar[0]);
  };

  /** AKSI REQUEST HANDLER */
  const deleteData = async () => {
    try {
      let req: any = await deleteByPath(path, rowsSelected.current[primaryKey], source.token);
      setLoading(false);
      dispatchNotification(`${req?.message}`, 'success');
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
    const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filterParams }

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
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`Gagal export / download data : ${message}`, 'danger');
    }
  };

  const handleDeleteData = (): void => {
    if (rowsSelected.current) {
      // textMessage = 'Apakah anda yakin ?. Data yang dihapus tidak dapat dikembalikan!';
      setTextMessage('Apakah anda yakin ?. Data yang dihapus tidak dapat dikembalikan!');
      ShowNotif();
    } else {
      // textMessage = 'Anda belum pilih data !';
      setTextMessage('Anda belum pilih data !');
      ShowNotif();
    }
  };

  const ShowNotif = (): void => {
    myWindow.current?.open();
  };
  const handleReloadData = (): void => {
    Grid.current?.updatebounddata();
  };
  const handleClearFilter = (): void => {
    Grid.current?.clearfilters();
  };


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

        <JqxGrid
          ref={Grid}
          theme={themeJqx}
          width={"100%"}
          autoheight={true}
          autorowheight={true}
          columnsresize={true}
          columns={columns}
          source={dataAdapter}
          showtoolbar={true}
          rendertoolbar={rendertoolbar}

          // Filtering options
          {...(filterable && {
            filterable: true,
            showfilterrow: true,
            onFilter: handleOnFilter,
          })}


          // Paging Options
          pageable={true}
          // pagesizeoptions={['10', '25', '50', '100', '1000']}
          virtualmode={true}
          rendergridrows={rendergridrows}

          // Sorting event
          sortable={true}
          onSort={handleOnSort}

          // select options
          // {...(selectionmode && { selectionmode: selectionmode })} // none, checkbox, single row, multiplerows, multiplerowsextended
          selectionmode={selectionmode}  // none, checkbox, single row, multiplerows, multiplerowsextended
          onRowselect={handleRowsSelected}
          onRowunselect={handleRowUnselect}
          // {...(onRowSelected && { onRowselect: handleRowsSelected })}
          // {...(onRowSelected && { onRowunselect: handleRowUnselect })}

          // edit data event
          editable={editable}
          onCellendedit={handleOnCellendedit}
        />

        <JqxWindow
          ref={myWindow}
          width={350}
          minWidth={300}
          maxWidth={400}
          height={130}
          minHeight={100}
          maxHeight={180}
          animationType='fade'
          autoOpen={false}
          cancelButton={'.cancel'}
          okButton={'.ok'}
          resizable={true}
          isModal={true}
          modalOpacity={0.3}
          position={{ x: '40%', y: '40%' }}
          draggable={true}
          theme='light'
        >
          <div> <i className="fa-regular fa-circle-question me-2"></i> Konfirmasi </div>
          <div>
            <div> {textMessage} </div>
            <div style={{ float: 'right', marginTop: 15 }}>
              <div>
                <JqxButton className={'ok'} style={{ display: 'inline-block', marginRight: 10 }} width={80} value={'OK'} onClick={deleteData} theme='light' />
                <JqxButton className={'cancel'} style={{ display: 'inline-block' }} width={80} onClick={() => myWindow.current?.close()} value={'Cancel'} theme='light' />
              </div>
            </div>
          </div>
        </JqxWindow>

      </div>
    </>
  );
}
import React, { useState ,useRef,useEffect,useCallback } from 'react';
import {  Grid  } from 'smart-webcomponents-react/grid';
import { Button } from 'smart-webcomponents-react/button';
import axios from 'axios';
import { getAllByPath ,getAllDownload,deleteByPath} from '@app/services/main.service';
window.Smart.License = "8414516F-15A2-4D84-A7AF-A9A72400DB02";
import ReactDOM from "react-dom/client";
import { useNavigate,useSearchParams } from 'react-router-dom';
import { get } from 'lodash';
import CustomDialog from './CustomDialog'; // Import the custom dialog component
import CustomDialogDelete from './CustomDialogDelete'; // Import the custom dialog component
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import fileDownload from 'js-file-download';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';



interface ISmartGridComponentProps {

    dataFieldsColsConfig: any;
    path: string;
    primaryKey: any;
    selectionmode?: 'singlerow' | 'many' | 'checkbox' | ''; // Allow empty string for no selection
    respDataApi: (data: any) => any;
    paging?: boolean;
    editable?: boolean;
    dataSources?: any[];
    onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
    addbtn?: any; 
    updatebtn?: any; // memunculkan tombol edit
    deletebtn?: any
    exportbtn?: any
    onClickUpload?: any
    uploadbtn?: any
    reloadbtn?: any
    className?:any;
    onClick?:any; 
    icon?:any;
    label?:any;
    onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
    ids?:any;
    onRowSelected?:any;
    initialApiEndpoint?:any;
    filterParams?: any;
    width?: any;
    clearbtn?: any;
    height?: any;
    isDarkMode?:any
    pager?:any
    isFilter?:any
}

export default function SmartGridComponent({
    dataFieldsColsConfig = [],
    path,
    filterParams = {},
    primaryKey,
    selectionmode = 'singlerow',
    respDataApi,
    // paging = true,
    isFilter = true,
    isDarkMode,
    dataSources,
    editable=false,
    pager=true,
    onClickAdd,
    addbtn = false,
    updatebtn = false, 
    deletebtn = false, 
    uploadbtn = false, 
    clearbtn = false, 
    reloadbtn = true, 
    exportbtn = true, 
    onClickUpload,
    onClickUpdate,
    width,
    height,
    ids='id',
    onRowSelected,
  
    
  }: ISmartGridComponentProps) {
    /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

    const [loading, setLoading] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();

    const selection = useRef<any>([]);
    const gridRef = useRef<any>(null);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
    const [dialogMessageDelete, setDialogMessageDelete] = useState('');
    const navigate = useNavigate();
    const columns = dataFieldsColsConfig.columns;
    const columnGroup = dataFieldsColsConfig.columnGroups;
    const [filtersRowParams, setFiltersRowParams] = useState({});

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
 
   
    




const [page, setPage] = useState(0); // Default page 0
const [limit, setLimit] = useState(20); // Default limit 10

const filtering = {
  enabled: isFilter,
  filterRow: {
    visible: isFilter,
  },
};

useEffect(() => {
  // Update filtering settings or grid component if necessary
}, [isFilter]);

const handlePageChange = async (event: any) => {
  const { data } = event.detail;

  let newPage = page;
  let newLimit = limit;
  if (data) {
    if (typeof data.first === 'number' && typeof data.size === 'number') {
      newPage = Math.floor(data.first / data.size); // Hitung halaman baru
      newLimit = data.size; // Perbarui limit
    } 
  } 

  // Perbarui state page dan limit hanya jika berubah
  if (newPage !== page || newLimit !== limit) {
    setPage(newPage);
    setLimit(newLimit);
  }
};
const handleFilter = async (event: any) => {
  const { detail } = event;
  const { expressions = [] } = detail || {};

  let updatedFiltersRowParams: any = { ...filtersRowParams };
  let hasValidFilter = false;

  if (expressions.length > 0) {
    expressions.forEach(([columnName, value]: any) => {
      let filterValue = value;
      if (typeof value === 'string' && value.startsWith('"CONTAINS"')) {
        filterValue = value.substring('"CONTAINS" "'.length, value.length - 1);
      }

      if (filterValue !== "") {
        hasValidFilter = true;
        updatedFiltersRowParams[columnName] = filterValue;
      } else {
        delete updatedFiltersRowParams[columnName];
      }
    });

    const hasFiltersChanged = JSON.stringify(filtersRowParams) !== JSON.stringify(updatedFiltersRowParams);
    if (hasFiltersChanged || !hasValidFilter) {
      setFiltersRowParams(updatedFiltersRowParams);
      handleRefreshView({
        page: 1,
        limit: limit,
        ...filterParams,
        ...updatedFiltersRowParams,
      });
    }
  } else {
    if (JSON.stringify(filtersRowParams) !== JSON.stringify({})) {
      setFiltersRowParams({});
      handleRefreshView({
        page: 1,
        limit: limit,
        ...filterParams,
      });
    }
  }
};


let sortInfo: any = {
  sorting: {}, // Initialize as an empty object to store sorting information
};

const handleOnSort = (event: any) => {
  const detail = event?.detail;
  if (!detail) {
    return;
  }

  const { sortDataFields, sortOrders } = detail;

  sortDataFields.forEach((field: string, index: number) => {
    const order = sortOrders[index];
    sortInfo.sorting[field] = order;
  });

  updateSortBy();
};

const updateSortBy = async () => {
  const { sorting } = sortInfo;

  const sortFields = Object.keys(sorting).map((field) => {
    const order = sorting[field] === 'asc' ? '' : '-';
    return `${order}${field}`;
  });

  filterParams.sort_by = sortFields.join(',');

  console.log('Updated sort_by:', filterParams.sort_by);

  handleReloadData();
};


  
    const handleRowClick = (event: any) => {
      
      const rowData = event.detail?.data || event.detail?.row; // Access the data from the event
     
  
      if (rowData) {
          const selectedId = get(rowData, primaryKey); // Use lodash's get to retrieve the primary key
        
  
          if (selection.current && selection.current[primaryKey] === selectedId) {
              // Clear selection if the same row is clicked twice
              selection.current = {};
           
          } else {
              // Set selection.current to the row data
              selection.current = rowData;
          }
  
          if (onRowSelected) {
              onRowSelected(selection.current);
          }
           if (onRowSelected) {
          onRowSelected({ data: rowData });
      }
      } 
  };
  
  
  const handleRowsSelected = (event: any) => {
     
  
      if (selectionmode === 'checkbox') {
          const selectedRows = event.detail?.rows || event.detail?.selection;
         
  
          if (selectedRows) {
              const selectedIds = selectedRows.map((row: any) => get(row, primaryKey));
             
  
              // Filter out unselected rows
              const unselectedRows = selection.current.filter((row: any) => !selectedIds.includes(row[primaryKey]));
  
              // Update selection.current with selected rows
              selection.current = [...selectedRows, ...unselectedRows];
  
              if (onRowSelected) {
                  onRowSelected(selection.current);
              }
          } 
      } else {
          handleRowClick(event);
      }
  };
  
      const headerTemplate = (headerElement:any) => {
        while (headerElement.firstChild) {
            headerElement.removeChild(headerElement.firstChild);
        }

        const toolbar = document.createElement('div');
        toolbar.className = `custom-toolbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`;

        if (addbtn) {
            const addButton = document.createElement('div');
            addButton.className = 'toolbar-button';
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
            const editButton = document.createElement('div');
            editButton.className = 'toolbar-button';
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
            const deleteButton = document.createElement('div');
            deleteButton.className = 'toolbar-button';
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
            const exportButton = document.createElement('div');
            exportButton.className = 'toolbar-button';
            const exportButtonRoot = ReactDOM.createRoot(exportButton);
            exportButtonRoot.render(
                <Button onClick={() => handleExport('xlsx')} className="button-concept">
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

            const exportButtonCsv = document.createElement('div');
            exportButtonCsv.className = 'toolbar-button';
            exportButtonCsv.style.marginRight = '10px';
            const exportButtonCsvRoot = ReactDOM.createRoot(exportButtonCsv);
            exportButtonCsvRoot.render(
                <Button onClick={() => handleExport('csv')} className="button-concept">
                    <a className="button-primary-export" role="button">
                        <span>Export To Csv</span>
                        <div className="icon">
                            <i className="fa fa-download"></i>
                            <i className="fa fa-check"></i>
                        </div>
                    </a>
                </Button>
            );
            toolbar.appendChild(exportButtonCsv);
        }

        if (uploadbtn) {
            const uploadButton = document.createElement('div');
            uploadButton.className = 'toolbar-button';
            uploadButton.style.marginRight = '10px';
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
        if (clearbtn) {
        const filterButton = document.createElement('div');
        filterButton.className = 'toolbar-button';
        filterButton.style.marginRight = '10px';
        const filterButtonRoot = ReactDOM.createRoot(filterButton);
        filterButtonRoot.render(
            <Button onClick={handleClearFilter} className="button-concept">
                <a className="button-clear button" role="button">
                    <span>Clear Filter Data</span>
                    <div className="icon">
                        <i className="fa fa-filter"></i>
                        <i className="fa fa-check"></i>
                    </div>
                </a>
            </Button>
        );
        toolbar.appendChild(filterButton);
      }
        if (reloadbtn) {
        const refreshButton = document.createElement('div');
        refreshButton.className = 'toolbar-button';
        const refreshButtonRoot = ReactDOM.createRoot(refreshButton);
        refreshButtonRoot.render(
            <Button onClick={() => handleRefreshView(filterParams)} className="button-concept">
                <a className="button-refresh button" role="button">
                    <span>Refresh data</span>
                    <div className="icon">
                        <i className="fa fa-refresh"></i>
                        <i className="fa fa-check"></i>
                    </div>
                </a>
            </Button>
        );
        toolbar.appendChild(refreshButton);
      }
       
    

        headerElement.appendChild(toolbar);
    };

    const header = {
        visible: true,
        buttons: [],
        template: headerTemplate
    };

    const getSelectionConfig = () => {
      switch (selectionmode) {
          case 'checkbox':
              return {
                  enabled: true,
                  checkBoxes: {
                      enabled: true
                  },
                  onRowSelected: handleRowsSelected  // Menambahkan handler ketika row dipilih
                  
              };
          case 'many':
              return {
                  enabled: true,
                  mode: 'many',
                  onRowSelected: handleRowsSelected  // Menambahkan handler ketika row dipilih
              };
  
          case 'singlerow':
              return {
                  enabled: true,
                  mode:'one',
           
                  onRowSelected: handleRowsSelected  // Menambahkan handler untuk seleksi satu baris
              };
          default:
              return {
                  enabled: false
              };
      }
  };
 

 


  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.refresh();
    }
  }, []);


  const handleReloadData = async () => {
    try {
      const params = {
        page: page + 1,
        limit: limit,
        ...filterParams,
      };
      const cancelTokenSource = axios.CancelToken.source();
      await getAllByPath(path, params, cancelTokenSource.token);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  
    
      const handleAddClick = (e: any) => {
          if (onClickAdd) {
              onClickAdd(e);
          } else {
              const target = typeof addbtn == 'boolean' ? 'add' : addbtn;
              navigate(target);
          }
      };
  
      const deleteData = async (primaryKey: any) => {
        if (selection.current && selection.current[primaryKey]) {
          setLoading(true);
          try {
            // Lakukan penghapusan data dengan menggunakan primary key
            let req: any = await deleteByPath(path, selection.current[primaryKey], source.token);
            
            // Setelah penghapusan berhasil, perbarui UI dan state yang terkait
            setLoading(false);
            dispatchNotification(`${req?.message}`, 'success');
            setIsDialogOpenDelete(false);
            setIsDialogOpen(false);
      
            // Panggil fungsi untuk memperbarui data yang ditampilkan di tabel
            handleRefreshView(filterParams);
          } catch (error: any) {
            setLoading(false);
            let message = error?.response ? error?.response?.data?.message : error?.response?.config?.statusText;
            dispatchNotification(`${message}`, 'danger');
          }
        }
      };
      const handleDelete = () => {
      
        const rowData = selection.current; // Use selectionRef.current to access the selected row data
        
        if (rowData && rowData[primaryKey]) {
          // Set the delete confirmation message
          setDialogMessageDelete('Apakah Anda yakin ingin menghapus data ini?');
          // Show confirmation dialog before deletion
          setIsDialogOpenDelete(true); // Open the delete confirmation dialog
        } else {
         
          setDialogMessage('Tidak ada data yang dipilih, Silahkan Pilih Data terlebih dahulu!');
          setIsDialogOpen(true);
        }
      };
      
      
      const handleEdit = (e: any) => {
        
      
          const rowData = selection.current; // Use selection.current to access the selected row data
        
      
          if (rowData && rowData[primaryKey]) {
              const selectedId = rowData[primaryKey]; // Retrieve the primary key value from the row data
          
      
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
           
              setDialogMessage('Tidak ada data yang dipilih,Silahkan Pilih Data terlebih dahulu!');
              setIsDialogOpen(true);
          }
      };
  
  
      const handleExport = async (export_type:any) => {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filterParams }
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
      
      
    
      
      
      const handleUpload = (e: any) => {
          if (onClickUpload) {
            onClickUpload(e);
          }
        };
   
  
      const handleClearFilter = (): void => {
          gridRef.current?.clearFilter();
        };
  
       
      
        // const handleRefresh = async () => {
        //   console.log('Refreshing grid');
        //   const adapter = await createDataAdapter(page, limit, filterParams, path, source);
        //   setDataAdapter(adapter);
        //   gridRef.current.refresh();
        // };
        const fetchData = async (pageIndex: any, pageSize: any, filterParams: any, path: any, cancelToken: any) => {
          const params = {
            page: pageIndex + 1,
            limit: pageSize,
            ...filterParams, // Filter params di sini
          };
        
          try {
            const data: any = await getAllByPath(path, params, cancelToken);
            const modifiedData = respDataApi(data) || [];
            const totalRecords = data.total || modifiedData.length;
        
            const modifiedResults = modifiedData.map((result: any, index: any) => ({
              ...result,
              number: index + pageIndex * pageSize + 1,
            }));
        
            const currentPage = pageIndex + 1;
            const totalPageCount = Math.ceil(totalRecords / pageSize);
            const pageInfo = `${currentPage} of ${totalPageCount}`;
        
            return {
              dataSource: modifiedResults,
              lastPage: totalPageCount - 1,
              virtualDataSourceLength: totalRecords,
              pageInfo,
            };
          } catch (error) {
            console.error('Error fetching data:', error);
            return {
              dataSource: [],
              lastPage: 0,
              virtualDataSourceLength: 0,
              pageInfo: '0 of 0',
            };
          }
        };
        
        
        const createDataAdapter = async (page: any, limit: any, filterParams: any, path: any, source: any) => {
          try {
            const result = await fetchData(page, limit, filterParams, path, axios.CancelToken.source().token);
        
            const dataSource = result.dataSource || [];
        
            const adapter = new window.Smart.DataAdapter({
              virtualDataSourceCache: true,
              virtualDataSource: (resultCallbackFunction: any, details: any) => {
                let sortedData = dataSource;
        
                // Menerapkan pengurutan jika ada
                if (details.sorting && Object.keys(details.sorting).length > 0) {
                  const sortColumns = [];
                  const sortOrders = [];
        
                  for (const dataField in details.sorting) {
                    if (details.sorting.hasOwnProperty(dataField)) {
                      const sortOrder = details.sorting[dataField].sortOrder;
                      sortColumns.push(dataField);
                      sortOrders.push(sortOrder);
                    }
                  }
        
                  sortedData = window.Smart.DataAdapter.Sort(sortedData, sortColumns, sortOrders);
                }
        
                // Menerapkan filter jika ada
                if (details.filtering && Object.keys(details.filtering).length > 0) {
                  const filterColumns = [];
                  const filters = [];
        
                  for (const dataField in details.filtering) {
                    if (details.filtering.hasOwnProperty(dataField)) {
                      const filter = details.filtering[dataField];
                      filterColumns.push(dataField);
                      filters.push(filter);
                    }
                  }
        
                  try {
                    sortedData = window.Smart.DataAdapter.Filter(sortedData, filterColumns, filters);
                  } catch (error) {
                    console.error('Error filtering data:', error);
                    sortedData = dataSource; // Kembali ke data asli jika ada kesalahan
                  }
                }
        
                resultCallbackFunction({
                  dataSource: sortedData,
                  virtualDataSourceLength: result.virtualDataSourceLength,
                });
              },
              id: 'primaryKey',
              dataFields: source?.dataFields || [],
              localData: source?.localData || [],
              url: source?.url || '',
              cache: source?.cache || false,
              totalrecords: source?.totalrecords || 0,
              beforeprocessing: source?.beforeprocessing || null,
            });
        
            return adapter;
          } catch (error) {
            console.error('Error creating data adapter:', error);
            throw error;
          }
        };
        
        
        const [dataAdapter, setDataAdapter] = useState(new window.Smart.DataAdapter());
        
        const fetchDataAdapter = useCallback(async () => {
          try {
            const adapter = await createDataAdapter(page, limit, filterParams, path, source);
            setDataAdapter(adapter);
          } catch (error) {
            console.error('Error fetching or creating DataAdapter:', error);
          }
        }, [page, limit, filterParams, path, source]);
        
        
        useEffect(() => {
          fetchDataAdapter();
        }, [fetchDataAdapter]);
        
        
        useEffect(() => {
        if (dataAdapter) {
         
        }
        }, [dataAdapter]);
        
        useEffect(() => {
          if (gridRef.current && dataAdapter) {
            gridRef.current.dataSource = dataAdapter;
          }
        }, [dataAdapter]);
      // Fungsi untuk memperbarui tampilan grid dengan data baru
      const handleRefreshView = async (filterParams:any) => {
      
        const adapter = await createDataAdapter(page, limit, filterParams, path, source);
  
        setDataAdapter(adapter);
        if (gridRef.current) {
          gridRef.current.refreshView();
        } 
      };
      
    return (
      <>
      <TopBarLoader isLoading={loading} />
       
    
                
            {/* {isVisible && <div ref={(el) => el && header.template(el)}></div>} */}
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
      {/* <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button> */}
          <Grid
          key={dataAdapter ? 'with-data' : 'without-data'}
          dataSource={dataAdapter}
            id="grid"
            ref={gridRef}
          header={header}
            onFilter={handleFilter}
            filtering={filtering}
            columns={columns}
            columnGroups={columnGroup}
            appearance={{
              alternationCount: 2,
              showRowHeader: true,
              showRowHeaderSelectIcon: true,
              showRowHeaderFocusIcon: true,
              autoShowColumnFilterButton: false
            }}
            behavior={{ columnResizeMode: 'growAndShrink' }}
            selection={getSelectionConfig()}
            onSort={handleOnSort}
            sorting={{ enabled: true }}
            onPage={handlePageChange}
            paging={{
              enabled: true,
              pageSize: limit,
              pageIndex: page,
            }}
            pager={{
              template: 'Pages: {first} {previous} {pages} {next} {last}',
              visible: pager,
              pageSizeSelector: {
                visible: true,
                dataSource: [10, 20, 50, 100, 1000]
              },
              summary: {
                visible: true
              },
              navigationInput: {
                visible: true
              },
              pageIndexSelectors: {
                dataSource: 3
              },
              navigationButtons: {
                position: 'far'
              }
            }}
            onRowClick={handleRowsSelected}
            editing={{ enabled: editable }}
            style={{
              width: width || '100%',
              height: height || '770px',
            }}
          />

            {/* </div> */}
        
        </>
  );
}


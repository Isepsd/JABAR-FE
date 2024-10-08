import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import JqxTreeGrid, { ITreeGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
import { getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
// import { useWatch } from 'react-hook-form';
// import { debounce } from 'lodash';

interface TreeGridComponentProps extends ITreeGridProps {
    onInsert?: () => void,
    loadChildren: (parentId: number) => Promise<any[]>;
    showInsertButton?: boolean,
    showRefreshButton?: boolean,
    showClearButton?: boolean,
    showexcelButton?: boolean,
    showActionButtons?: boolean,
    onEditClick?: (id: string) => void,
    onDeleteClick?: (id: string) => void,
    path: any;
    filterParams: any;
    dataFieldsColsConfig: any;
    primaryKey: any;
    exportToExcel?: any;
    onRowCheck?: any;
    // respDataApi: any;
}

const TreeGridComponent: React.FC<TreeGridComponentProps> = React.memo(({
    width = '100%',
    // respDataApi,
    height = 'auto',
    sortable = false,
    filterable = false,
    showToolbar = false,
    columnsResize = false,
    checkboxes = false,
    selectionMode = 'singleRow',
    pageSize = 10, 
    theme = 'light',
    onInsert,
    loadChildren,
    showInsertButton = false,
    showRefreshButton = false,
    showClearButton = false,
    showexcelButton = false, 
    showActionButtons = false,
    onRowDoubleClick,
    onRowSelect,
    onEditClick,
    onDeleteClick,
    path,
    filterParams = {},
    dataFieldsColsConfig=[],
    primaryKey,
    onRowCheck
}) => {
    const sc = axios.CancelToken.source();
    const treeGridRef = useRef<JqxTreeGrid>(null);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false); // Loader state
    const [checkedRows, setCheckedRows] = useState([]); // State to hold all checked rows
    const [parentRows, setParentRows] = useState([]);   // State to hold all parent rows

    // Define the source with loadServerData function
    useEffect(() => {
        if (path && filterParams.id_ref_lokasi) {
            setIsLoaderVisible(true); // Show loader before processing
            const params = {
                page: -1,
                limit: 10,
                sort_by: primaryKey,
                sort_order: 'asc',
                ...filterParams,
            };
            
            getAllByPath(path, params, sc.token)
                .then((response: any) => {
                    const { results } = response;
                    setItems(results.map((result: any) => ({...result})));
                })
                .catch((error) => {
                    const message = error.response?.data?.message || 'An error occurred while fetching data.';
                    dispatchNotification(message, 'danger');
                })
                .finally(() => {
                    setIsLoaderVisible(false); // Ensure loader is hidden after processing
                });
        }
    }, [path, filterParams, primaryKey]);
    
    // const watchedDate = useWatch({ name: 'tgl_laporan' });

    // useEffect(() => {
    // console.log('Date changed:', watchedDate);
    // // Set the filters based on the new date
    // setFilters(prev => ({
    //     ...prev,
    //     date: watchedDate ? moment(watchedDate).format('YYYY-MM-DD') : undefined,
    // }));
    // }, [watchedDate]);

    
    const dataAdapter = useMemo(() => new jqx.dataAdapter({
        
        dataType: 'json',
        dataFields: dataFieldsColsConfig.dataFields,
        localData: items,
        id: primaryKey,
        hierarchy: dataFieldsColsConfig.hierarchy,
        root: 'results'
    }), [items]);

    // Collect data children to check/uncheck 
    const getAllChildIds = useCallback((dataSource: any[]): any[] => {
        let childIds: any[] = [];
        const findChildren = (rows: any[]) => {
            for (const row of rows) {
                childIds.push(row.uid);
                findChildren(row.children);
            }
        };
        findChildren(dataSource);
        return childIds;
    }, []);

    // Check or uncheck all children of a given node
    const updateChildren = (node: any, checked: boolean) => {
        const allChildIds: any = getAllChildIds(node.children);
        allChildIds.forEach((id: any) => {
            if (checked) {
                treeGridRef.current?.checkRow(id);
            } else {
                treeGridRef.current?.uncheckRow(id);
            }
        });
    };

    // Check or uncheck a parent node if all its children are checked or unchecked
    const updateParentNodes = (node: any) => {
        if (node.jenis_lokasi === 'GARDU INDUK') {
            return;
        }
    
        const updateNode = (currentNode: any) => {
            if (currentNode) {
                const parentNode: any = treeGridRef.current?.getRow(currentNode.id_parent_lokasi);
    
                if (parentNode) {
                    // Get the children nodes of the parent
                    const children = parentNode.children || [];
    
                    // Determine if all children are checked
                    const allChildrenChecked = children.every((child: any) => {
                        const childRow = treeGridRef.current?.getRow(child.uid);
                        return childRow && childRow.checked;
                    });
    
                    // Determine if any child is unchecked
                    const anyChildUnchecked = children.some((child: any) => {
                        const childRow = treeGridRef.current?.getRow(child.uid);
                        return childRow && !childRow.checked;
                    });
    
                    // Update the parent's checked state
                    if (allChildrenChecked) {
                        if (!parentNode.checked) {
                            treeGridRef.current?.checkRow(parentNode.uid);
                        }
                    } else if (anyChildUnchecked) {
                        if (parentNode.checked) {
                            treeGridRef.current?.uncheckRow(parentNode.uid);
                        }
                    }
    
                    // Recursive call to update the parent node of the current parent
                    updateNode(parentNode);
                }
            }
        };
    
        // Start the recursive update from the given node
        updateNode(node);
    };
    

    // Function to get all checked rows
    const getCheckedRows = () => {
        if (treeGridRef.current) {
            return treeGridRef.current.getCheckedRows(); // Returns an array of checked row objects
        }
        return [];
    };

    // Function to recursively find all parent rows with any children checked
    const findParentRowsWithAnyChildrenChecked = (nodes: any, checkedRows: any) => {
        const allParents: any = [];

        const isChecked = (row: any) => checkedRows.some((checkedRow: any) => checkedRow.uid === row.uid);

        const checkChildrenRecursively = (node: any) => {
        if (!node.children || node.children.length === 0) {
            return isChecked(node); // No children, just check if the node itself is checked
        }

        let anyChildrenChecked = false;

        node.children.forEach((child: any) => {
            const childChecked = checkChildrenRecursively(child);
            anyChildrenChecked = anyChildrenChecked || childChecked; // At least one child is checked
        });
        
        if (anyChildrenChecked) {
            allParents.push(node);
        }

        return anyChildrenChecked || isChecked(node);
        };

        nodes.forEach((root: any) => checkChildrenRecursively(root));

        return allParents;
    };

    // Function to update checked rows and parent rows
    const updateCheckedRows = useCallback(() => {
        if (treeGridRef.current) {
        const newCheckedRows: any = getCheckedRows();
        const allRows = treeGridRef.current.getRows(); // Assuming this gets all rows dynamically

        // Find all parent rows with all children checked
        const newParentRows = findParentRowsWithAnyChildrenChecked(allRows, newCheckedRows);

        setCheckedRows(newCheckedRows);
        setParentRows(newParentRows);
        }
    }, [treeGridRef]);
    
    // Row-check event handler
    const handleRowCheck = useCallback((event: any) => {
        const { args } = event;
        const { row } = args;
    
        if (treeGridRef.current) {
            setIsLoaderVisible(true);
    
            setTimeout(() => {
                // Update the checked state of the current row
                if (row.checked) {
                    // Check all children of the row
                    updateChildren(row, true);
                } else {
                    // Uncheck all children of the row
                    updateChildren(row, false);
                }
    
                // Update the state of parent nodes based on the current row
                updateParentNodes(row);
    
                // Update the checked rows state
                updateCheckedRows();
                setIsLoaderVisible(false);
            }, 0);
        }
    }, [checkedRows, updateChildren, updateParentNodes, updateCheckedRows]);
    
    // Row-uncheck event handler
    const handleRowUncheck = useCallback((event: any) => {
        const { args } = event;
        const { row } = args;
    
        if (!treeGridRef.current) return;
    
        // Handle state updates within a single update cycle
        setIsLoaderVisible(true);
    
        // Define an async function to handle state updates
        const updateStates = async () => {

            updateChildren(row, false);
            // Update the state of parent nodes
            await updateParentNodes(row);
            updateCheckedRows();
            setIsLoaderVisible(false);
        };
    
        updateStates();
    }, [updateParentNodes]);
    
    // Effect to watch changes in parentRows and update the main app
    useEffect(() => {
        if(onRowCheck){
            const mergedArray = [...parentRows, ...checkedRows].reduce((acc: any, curr: any) => {
                const foundIndex = acc.findIndex((item: any) => item.id_ref_lokasi === curr.id_ref_lokasi);
                if (foundIndex !== -1) {
                    acc[foundIndex] = { ...acc[foundIndex], ...curr };
                } else {
                    acc.push(curr);
                }
                return acc;
            }, []);
            onRowCheck(mergedArray);
        }
    }, [parentRows,checkedRows]);

    // Row-expand event handler
    const handleRowExpand = useCallback(async (event: any) => {
        const { args } = event;
        const { row } = args;
        const parentId = row.children;

        if (loadChildren) {
            try {
                const children = await loadChildren(parentId);
                if (treeGridRef.current) {
                    treeGridRef.current.addRow(parentId, children, 'last');
                }
            } catch (error) {
                console.error('Error loading children:', error);
            }
        }
    }, [loadChildren]);

    // Double-click event handler
    const handleRowDoubleClick = useCallback((event: any) => {
        const { args } = event;
        const row = args.row;
        if (onRowDoubleClick) {
            onRowDoubleClick(row);
        }
    }, [onRowDoubleClick]);

    // Row-select event handler
    const handleRowSelect = useCallback((event: any) => {
        const row = event.args.row;
        if (onRowSelect) {
            onRowSelect(row);
        }
    }, [onRowSelect]);
    
    /** NOTIFICATION HANDLER */
    const dispatch = useDispatch();
    const dispatchNotification = (msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
    };

     /** EXPORTING DATA */
     const exportToExcel = useCallback(async (export_type: any, filters: any) => {
        if(filters.id_ref_lokasi){
            await new Promise((resolve) => setTimeout(resolve, 300));
            const filterParamUrl = Object.fromEntries(new URLSearchParams(window.location.search).entries());
            const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filters, ...filterParamUrl, ...filterParams }
            
            try {
                let req: any = await getAllDownload(path, params, sc.token);
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
        }
        
    },[filterParams, path, sc.token, dispatchNotification]);

    // Toolbar button actions
    const handleAction = useCallback((action: any, id: any) => {
        switch (action) {
            case 'insert':
                if (onInsert) {
                    onInsert();
                }
                break;
            case 'refresh':
                if (treeGridRef.current) {
                    const allRows = treeGridRef.current.getCheckedRows();
                    allRows.forEach((row: any) => {
                        treeGridRef.current?.uncheckRow(row.uid);
                    });
                    treeGridRef.current.clearSelection();
                }
                treeGridRef.current?.collapseAll();
                // setCheckedRows([]);
                setParentRows([]);
                break;
            case 'clear':
                if (treeGridRef.current) {
                    const allRows = treeGridRef.current.getCheckedRows();
                    allRows.forEach((row: any) => {
                        treeGridRef.current?.uncheckRow(row.uid);
                    });
                    treeGridRef.current.clearSelection();
                    // setCheckedRows([]);
                    setParentRows([]);
                }
                break;
            case 'download':
                const filter= {id_ref_lokasi: treeGridRef.current?.props.source.records[0].id_ref_lokasi};
                exportToExcel('xlsx', filter); // Pass filterParams to export function
                break;
            case 'update':
                if (onEditClick) {
                    onEditClick(id);
                }
                break;
            case 'delete':
                if (onDeleteClick) {
                    onDeleteClick(id);
                }
                break;
            default:
                break;
        }
    }, [onInsert, onEditClick, onDeleteClick, exportToExcel,setParentRows]);


    // Create toolbar in callback
    const createToolbar = useCallback((toolbar: any) => {
        if (toolbarRef.current) return;

        const container = document.createElement('div');
        container.style.cssText = 'float: left; margin-left: 5px;';

        const createButton = (icon: string, text: string, tooltip: string, onClick: () => void) => {
            const button = document.createElement('button');
            button.className = 'jqx-button jqx-widget jqx-fill-state-normal jqx-rc-all';
            button.style.marginRight = '5px';
            button.style.marginTop = '3px';
            button.title = tooltip;
            button.onclick = onClick;

            const iconSpan = document.createElement('span');
            iconSpan.style.marginRight = '5px';
            iconSpan.innerHTML = icon;

            const textNode = document.createTextNode(text);

            button.appendChild(iconSpan);
            button.appendChild(textNode);
            return button;
        };

        if (showInsertButton) {
            const insertButton = createButton('➕', '', 'Insert Item', () => handleAction('insert',''));
            container.appendChild(insertButton);
        }

        if (showexcelButton) {
            const downloadButton = createButton('⬇️', '', 'Download Excel', () => handleAction('download','')); 
            container.appendChild(downloadButton);
        }

        if (showRefreshButton) {
            const refreshButton = createButton('🔄', '', 'Refresh Data', () => handleAction('refresh',''));
            container.appendChild(refreshButton);
        }

        if (showClearButton) {
            const clearButton = createButton('🗑️', '', 'Clear Selection', () => handleAction('clear',''));
            container.appendChild(clearButton);
        }

        toolbar[0].appendChild(container);
        toolbarRef.current = container;
    }, [showInsertButton, showexcelButton, showRefreshButton, showClearButton, handleAction]);

    const actionColumn = useMemo(() => ({
        text: 'Actions',
        dataField: '',
        width: 100,
        hidden: !showActionButtons,
        cellsRenderer: (rowKey: any, column: any, value: any, rowData: any) => {
            return `
                <div class="action-buttons">
                <button class="edit-btn" style="color: blue; --background-color: blue; border: none; padding: 5px 10px; margin-right: 5px; cursor: pointer;" 
                    title="Edit Item" data-action="update" data-id="${rowData[primaryKey]}">
                    <i class="fas fa-edit"></i> 
                </button>
                <button class="delete-btn" style="color: red; --background-color: red; border: none; padding: 5px 10px; cursor: pointer;" 
                    title="Delete Item" data-action="delete" data-id="${rowData[primaryKey]}">
                    <i class="fas fa-trash-alt"></i> 
                </button>
                </div>`;
        }
    }), [showActionButtons, handleAction]);

    useEffect(() => {
        const handleButtonClick = (event: MouseEvent) => {
            event.preventDefault(); // Prevent event from bubbling up and interfering with grid selection
            
            const target = event.target as HTMLElement;
            const button = target.closest('button');
            if (button) {
                const action = button.getAttribute('data-action');
                const id = button.getAttribute('data-id'); // ID as string

                if (action && id) {
                    handleAction(action, id); // Pass ID in an array
                }
            }
        };
    
        document.addEventListener('click', handleButtonClick);
        return () => {
            document.removeEventListener('click', handleButtonClick);
        };
    }, [handleAction]);
    

    return (
        <>
            {isLoaderVisible && (
                <div className = "custom-dialog-overlay">
                    <JqxLoader 
                        width={100} 
                        height={30} 
                        autoOpen={true} 
                        textPosition = 'top' 
                        className="jqx-loader"
                    />
                </div>
                
            )}
            <JqxTreeGrid
                ref={treeGridRef}
                width={width}
                height={height}
                theme={theme}
                source={dataAdapter}
                columns={[...dataFieldsColsConfig.columns, actionColumn]}
                sortable={sortable}
                filterable={filterable}
                showToolbar={showToolbar}
                columnsResize={columnsResize}
                onRowCheck={handleRowCheck}
                onRowUncheck={handleRowUncheck}
                renderToolbar={createToolbar}
                selectionMode={selectionMode}
                checkboxes={checkboxes}
                onRowExpand={handleRowExpand}
                pageable={true}
                columnsHeight={30}
                pageSize={pageSize}
                pagerMode={'advanced'}
                pageSizeOptions={['10', '20', '50', '100']}
                onRowDoubleClick={handleRowDoubleClick} 
                onRowSelect={handleRowSelect}
            />
        </>
    );
});

export default TreeGridComponent;

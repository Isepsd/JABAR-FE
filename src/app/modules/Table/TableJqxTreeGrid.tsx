import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactDOM from "react-dom/client";
import JqxTreeGrid, { ITreeGridProps, jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid";
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { get } from 'lodash';
import { getAllByPath, putByPath, deleteByPath, getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import axios from 'axios';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import moment from 'moment';


interface ITableTreeGrid {
    dataFieldsColsConfig: any;
    dataSources?: any;
    path?: any;
    filterParams?: any;
    primaryKey: any;
    hierarchy: any;
    CheckBoxes?: boolean;
    hierarchicalCheckboxes?: boolean;
    respDataApi: any;
    onRowSelected?: any;
    selectionmode?: any;
    pageable?: any;
    ids?: any;

    // ACTIONS BUTTON
    addbtn?: any; // memunculkan tombol add
    onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
    updatebtn?: any; // memunculkan tombol edit
    onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
    deletebtn?: any; // memunculkan tombol delete
    reloadbtn?: any; // memunculkan tombol reload
    uploadbtn?: any; // memunculkan tombol upload
    onClickUpload?: any; // event ketika upload ex: mumunculkan modal atau reedirect ke form page
    exportbtn?: any; // memunculkan tombol export
}

const TableJqxTreeGrid: React.FC<ITableTreeGrid> = ({
    dataFieldsColsConfig = [], dataSources, path, primaryKey, filterParams = {},
    CheckBoxes = false, hierarchicalCheckboxes = false, onRowSelected, respDataApi,
    addbtn = false, onClickAdd, hierarchy, selectionmode = 'singleRow',
    updatebtn = false, onClickUpdate, pageable = false,
    deletebtn = false,
    reloadbtn = true,
    uploadbtn = false, onClickUpload,
    exportbtn = true,
    ids = 'id', // call virtual id for modals edit or something
}) => {
    // const TableJqxTreeGrid = ({ dataFieldsColsConfig = [], dataSources, path, primaryKey, filterParams = {},
    // CheckBoxes = false, hierarchicalCheckboxes = false, onRowSelected,
    // addbtn = false, onClickAdd, hierarchy, selectionmode = 'singleRow',
    // updatebtn = false, onClickUpdate, pageable = false,
    // deletebtn = false,
    // reloadbtn = true,
    // uploadbtn = false, onClickUpload,
    // exportbtn = true,
    // ids = 'id', // call virtual id for modals edit or something
    // }: TableTreeGrid) => {
    const navigate = useNavigate();
    const sc = axios.CancelToken.source();
    const [themeJqx] = useState<any>('light');
    const [columns] = useState<ITreeGridProps["columns"]>(dataFieldsColsConfig.columns);
    const TreeGrid = useRef<JqxTreeGrid>(null);
    const toolbarRendered = useRef(false);
    const myWindow = useRef<JqxWindow>(null);
    const alertWindow = useRef<JqxWindow>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [respData, setRespData] = useState<any>([]);
    const rowsSelected = useRef<any>([]);
    let [searchParams, setSearchParams] = useSearchParams();

    /** NOTIFICATION HANDLER */
    const dispatch = useDispatch();
    const dispatchNotification = (msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
    };

    const getAllData = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        try {
            const params = { page: 1,
                limit: 10,...filterParams };
            const req: any = await getAllByPath(path, params, sc.token);
            const { results } = req;
            setRespData(respDataApi(results));
            setLoading(false);
            TreeGrid.current?.updateBoundData();
        } catch (err: any) {
            setLoading(false);
        }
    };

    /** GET DATA */
    useEffect(() => {
        if (path) getAllData();
        return () => {
            sc.cancel("Request cancelled");
        };
    }, []);

    const dataSource = {
        dataFields: dataFieldsColsConfig?.dataFields,
        dataType: "json",
        hierarchy: hierarchy,
        id: primaryKey,
        localData: dataSources ? dataSources : respData,
    };

    const dataAdapter = new jqx.dataAdapter(dataSource);

    const handleRowsChecked = (event: any) => {
        console.log('handleRowsChecked', event);
        const rowsChecked = TreeGrid.current?.getCheckedRows();
        if (onRowSelected) {
            onRowSelected(rowsChecked);
        }
    };

    const handleRowsUnchecked = () => {
        const rowsUnchecked = TreeGrid.current?.getCheckedRows();
        if (onRowSelected) {
            onRowSelected(rowsUnchecked);
        }
    };

    const handleRowsSelected = (event: any) => {
        if (selectionmode === 'singleRow') {
            rowsSelected.current = event?.args?.row;
            onRowSelected(rowsSelected);
        } else {
            console.log('handleRowsSelected', event?.args?.row);
            // handleSingleRowSelect(event?.args.row);
        }
    }
    // const handleRowUnselect = (event: any) => {
    const handleRowUnselect = () => {
        TreeGrid.current?.clearSelection();
    }

    /** MENU HANDLER & PRIVILAGES BY ACCES USER */
    const rendertoolbar = (toolbar: any): void => {
        if (!toolbarRendered.current) {
            const style: React.CSSProperties = { display: 'inline-block', marginLeft: '5px' };
            const buttonsContainer = (
                <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', position: 'relative', margin: '5px' }}>
                    {addbtn && <JqxButton onClick={handleAddClick} theme={themeJqx} width={110} height={20} style={style}> <i className="fa-solid fa-plus"></i> Tambah Data </JqxButton>}
                    {updatebtn && <JqxButton onClick={handleEditClick} theme={themeJqx} width={80} height={20} style={style}> <i className="fa-solid fa-edit"></i> Edit </JqxButton>}
                    {deletebtn && <JqxButton onClick={handleDeleteData} theme={themeJqx} width={80} height={20} style={style}> <i className="fa-solid fa-trash-can"></i> Delete </JqxButton>}
                    {uploadbtn && <JqxButton onClick={handleUploadClick} theme={themeJqx} width={150} height={20} style={style}> <i className="fa-solid fa-upload"></i> Upload from Excel </JqxButton>}
                    {exportbtn && <JqxButton onClick={() => getAllDataExport('xlsx')} theme={themeJqx} width={120} height={20} style={style}> <i className="fa-solid fa-file-excel"></i> Export to Excel </JqxButton>}
                    {exportbtn && <JqxButton onClick={() => getAllDataExport('csv')} theme={themeJqx} width={120} height={20} style={style}> <i className="fa-solid fa-file-csv"></i> Export to Csv </JqxButton>}
                    {reloadbtn && <JqxButton onClick={getAllData} theme={themeJqx} width={80} height={20} style={style}> <i className="fa-solid fa-rotate"></i> Reload </JqxButton>}
                </div>
            );
            ReactDOM.createRoot(toolbar[0]).render(buttonsContainer);
            toolbarRendered.current = true;
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

    /** EDIT DATA ON TABLE */
    const updateData = async (url: string, params: any, id: any) => {
        setLoading(true);
        try {
            let req: any = await putByPath(`${url}`, params, id, sc.token);
            if (req?.status === 500) dispatchNotification(`${req?.message}`, 'danger');
            if (req?.status === 201) dispatchNotification(`${req?.message}`, 'success');
            setLoading(false);
        } catch (error: any) {
            let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
            dispatchNotification(`${message}`, 'danger');
            setLoading(false);
        }
    }

    /** HANDLE EDIT DATA */
    const handleEditClick = (e: any) => {
        console.log('handleEditClick')
        console.log(rowsSelected)
        if (rowsSelected.current[primaryKey] !=='' && rowsSelected.current[primaryKey] !==null) {
            if (onClickUpdate) {
                onClickUpdate(e);
                searchParams.delete(ids);
                // console.log(rowsSelected.current[primaryKey])
                // console.log(rowsSelected.current.id_pointtype)
                searchParams.append(ids, get(rowsSelected.current[ids], primaryKey));
                setSearchParams(searchParams);
            } else {
                navigate(`edit/${rowsSelected.current[ids]}`);
            }
        } else {
            console.log('event lain tydack ada', rowsSelected.current);
            console.log('updateData', updateData);
            //   ShowAlert();
        }
    };

    /** HANDLE DELETE DATA */
    const handleDeleteData = (): void => {
        if (rowsSelected.current[primaryKey] !=='' && rowsSelected.current[primaryKey] !==null) {
            ShowConfirmDelete();
        } else {
            ShowAlert();
        }
    };

    /** AKSI REQUEST HANDLER */
    const deleteData = async () => {
        setLoading(true);
        try {
            let req: any = await deleteByPath(path, rowsSelected.current[primaryKey], sc.token);
            setLoading(false);
            dispatchNotification(`${req?.message}`, 'success');
            HideConfirmDelete();
        } catch (error: any) {
            setLoading(false);
            let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
            dispatchNotification(`${message}`, 'danger');
        }
    };

    /** EXPORTING DATA */
    const getAllDataExport = async (export_type: any) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filterParams }
        // jqxLoader.current?.open();

        try {
            let req: any = await getAllDownload(path, params, sc.token);
            /** RESET EXPORT */
            const dataBlob = req?.data;
            const headers = req?.headers;
            let content: string = headers['content-disposition'];
            const filename = content.replace('attachment; filename=', '').replaceAll('"', '');
            fileDownload(
                dataBlob, `${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(export_type) ? filename : `${filename}.${export_type}`}`
            );
            setLoading(false);
        } catch (error: any) {
            let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
            dispatchNotification(`Gagal export / download data : ${message}`, 'danger');
            setLoading(false);
        }
    };

    /** HANDLE UPLOAD DATA */
    const handleUploadClick = (e: any) => {
        if (onClickUpload) {
            onClickUpload(e);
        }
    };

    const ShowConfirmDelete = (): void => {
        myWindow.current?.open();
    };
    const HideConfirmDelete = (): void => {
        myWindow.current?.hide();
    };

    const ShowAlert = (): void => {
        alertWindow.current?.open();
    };

    console.log('TableJqxTreeGrid re-rendered');



    return (
        <>
            <TopBarLoader isLoading={loading} />
            <div className='p-1'>
                <JqxTreeGrid
                    ref={TreeGrid}
                    theme={themeJqx}
                    width={"100%"}
                    showHeader={true}
                    autoRowHeight={true}
                    columnsResize={true}
                    columns={columns}
                    source={dataAdapter}

                    checkboxes={CheckBoxes}
                    hierarchicalCheckboxes={hierarchicalCheckboxes}
                    selectionMode={selectionmode} // multipleRows, singleRow
                    onRowSelect={handleRowsSelected}
                    onRowUnselect={handleRowUnselect}
                    onRowCheck={handleRowsChecked}
                    onRowUncheck={handleRowsUnchecked}
                    sortable={true}
                    filterable={true}
                    filterMode={"advanced"}

                    pageable={pageable}
                    pagerMode='advanced'

                    showToolbar={true}
                    renderToolbar={rendertoolbar}

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
                                <JqxButton className={'ok'} template={'danger'} style={{ display: 'inline-block', marginRight: 10 }} width={80} value={'OK'} onClick={deleteData} theme={themeJqx} />
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
};

export default TableJqxTreeGrid;
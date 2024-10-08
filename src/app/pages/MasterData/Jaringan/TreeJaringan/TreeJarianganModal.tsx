import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactTable from '@app/components/ReactTable';
import { MANUVER_COLUMNS_POPUP } from '@app/configs/react-table/master-jaringan.columns.config';
import { MANUVER_COLUMNS } from '@app/configs/react-table/master-jaringan.columns.config';
import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import { getAllByPath, putByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import TreeGridComponent from '@app/components/JqxTreeGrid/JqxTreeGrid';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

interface CustomModalProps {
    show: boolean;
    handleClose: () => void;
    rowData: any;  // You can replace 'any' with a more specific type if needed
    callbackModal: any;
    garduIndukSelected: any;
}

const CustomModal: React.FC<CustomModalProps> = ({
    show,
    handleClose,
    rowData,
    callbackModal,
}) => {
    const source = axios.CancelToken.source();
    const [columns] = useState<any>(MANUVER_COLUMNS_POPUP().columns);
    const [data, setData] = useState<any>([]);
    const [respData, setRespData] = useState<any>([]);
    const [garduInduk, setGarduInduk] = useState<any>();
    const [garduIndukOptions, setGarduIndukOptions] = useState<any>([]);
    const [filters, setFilters] = useState<any>(null);
    const [dataSelectedRow, setDataSelectedRow] = useState<any>([]);
    const [dataSelectedRowTarget, setDataSelectedRowTarget] = useState<any>();
    const dispatch = useDispatch();

    // Load data when the modal is shown
    useEffect(() => {
        if (show) getAllData();
    }, [show]);

    // Transform response data into table data
    useEffect(() => {
        const dataTableValue: any = respData.map((item: IJaringan) => ({
            number: item.number,
            id: item?.id,
            jenis_lokasi: item?.jenis,
            nama_lokasi: item?.nama_lokasi,
            coverage: item?.coverage,
            alamat: item?.alamat,
            kode_lokasi: item?.kode_lokasi,
            unit_induk: item?.unit_induk,
            up3: item?.up3_1,
            ulp: item?.ulp_1,
        }));
        setData(dataTableValue);
    }, [respData]);

    // Memoize table data
    const dataTable = useMemo(() => data, [data]);

    // Fetch all data required for the modal
    const getAllData = useCallback(async () => {
        try {
            const params = {
                page: -1,
                limit: -1,
                id_ref_lokasi: rowData.id_ref_lokasi,
            };

            const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
            const { results } = req;

            if (results?.length > 0) {
                const data = results.map((d: any, i: number) => ({
                    ...d,
                    id: d.id_ref_lokasi,
                    jenis: d.ref_jenis_lokasi.nama_jenis_lokasi,
                    parent: d.id_parent_lokasi?.nama_lokasi,
                    unit_induk: d.unit_induk?.nama_lokasi,
                    number: i + 1,
                }));
                setRespData(data);
                getAllDataGarduInduk();
            } else {
                setRespData([]);
            }
        } catch (err) {
            console.error(err);
        }
    }, [rowData, source.token]);

    // Handle changes in the Gardu Induk dropdown
    const changeGarduIndukOptions = useCallback((selected: any) => {
        setGarduInduk(selected);
        setFilters((prev: any) => ({
            ...prev,
            id_ref_lokasi: selected?.value,
        }));
    }, []);

    // Dummy function to load children for the tree grid (if needed)
    const loadChildren = useCallback(async (): Promise<any[]> => {
        return [];
    }, []);

    // Fetch data for Gardu Induk dropdown
    const getAllDataGarduInduk = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        try {
            const params = {
                page: '-1',
                limit: -1,
                id_ref_jenis_lokasi: '7b94de4b-5a60-4f83-b9b6-7ae60e508cc5', // jenis lokasi Gardu Induk
                sort_by: 'nama_lokasi',
            };

            const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
            const { results } = req;

            let data: any = results.map((d: any) => ({
                ...d,
                label: d.nama_lokasi,
                value: d.id_ref_lokasi,
            }));
            setGarduIndukOptions(data);
        } catch (err: any) {
            console.error(err);
        }
    }, [source.token]);

    // Dispatch notifications
    const dispatchNotification = useCallback((msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
    }, [dispatch]);

    // Handle row selection in the tree grid
    const handleRowSelect = useCallback((row: any) => {
        if (rowData) {
            // Only update state if the selected row is different
            if (row.id_ref_lokasi !== dataSelectedRowTarget?.id_ref_lokasi) {
                setDataSelectedRowTarget(row);
            }
        }
    }, [rowData, dataSelectedRowTarget]);
    
    // Handle confirmation button click
    const handleModalConfirm = useCallback(async () => {
        const params = {
            id_ref_lokasi: get(dataSelectedRow, '0.id'),
            id_parent_lokasi: get(dataSelectedRowTarget, 'id_ref_lokasi'),
        };
        if (!params.id_ref_lokasi && !params?.id_parent_lokasi) {
            return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
        try {
            await putByPath(`${API_PATH().master.jaringan.tree_jaringan}/update-data-parent`, params, undefined, source.token);
            dispatchNotification(`Sukses memindahkan data`, 'success');
            handleClose();
            callbackModal(params);
        } catch (err: any) {
            dispatchNotification(`Gagal memindahkan data`, 'danger');
        }
    }, [dataSelectedRow, dataSelectedRowTarget, callbackModal, handleClose, dispatchNotification, source.token]);

    // Initialize selected row data if necessary
    useEffect(() => {
        if (rowData && dataSelectedRow[0]?.id !== rowData.id_ref_lokasi) {
            setDataSelectedRow([{
                id: rowData.id_ref_lokasi,
                nama_lokasi: rowData.nama_lokasi,
                id_ref_jenis_lokasi: rowData.nama_jenis_lokasi,
                kode_lokasi: rowData.kode_lokasi,
                jenis_lokasi: rowData.jenis_lokasi,
                fungsi_lokasi: rowData.fungsi_lokasi,
                no_tiang: rowData.no_tiang,
                alamat: rowData.alamat,
                coverage: rowData.alamat,
                unit_induk: rowData.unit_induk,
                up31: rowData.up31,
                ulp1: rowData.ulp1,
            }]);
        }
    }, [rowData, dataSelectedRow]);

    // Memoized filters to avoid unnecessary re-renders
    const memoizedFilters = useMemo(() => ({ sort_by: 'nama_lokasi', ...filters }), [filters]);

    // Memoized columns configuration for TreeGridComponent
    const memoizedColumnsConfig = useMemo(() => MANUVER_COLUMNS(), []);

    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton style={{ backgroundColor: '#e5e7e9' }} >
                    <Modal.Title>Manuver Jaringan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='mt-4'>Aset yang akan dipindahkan</h5>
                    <ReactTable
                        columns={columns}
                        data={dataTable}
                        containerClass='my-3 table table-responsive'
                        styles={{ height: '100', width: '100%' }}
                    />
                    <h5 className='mt-4'>Aset akan di pindahkan ke :</h5>
                    <div style={{ width: '200px' }}>
                        <Select
                            placeholder='Pilih Gardu Induk'
                            styles={ReactSelectStyle}
                            value={garduInduk}
                            onChange={(val: any) => changeGarduIndukOptions(val)}
                            options={garduIndukOptions}
                        />
                    </div>
                    <div className='mt-4'>
                        
                        <TreeGridComponent
                            width="100%"
                            height="auto"
                            theme={'light'}
                            sortable={true}
                            filterable={false}
                            showToolbar={false}
                            columnsResize={true}
                            selectionMode="singleRow"
                            checkboxes={false}
                            loadChildren={loadChildren}
                            pageSize={10}
                            onRowSelect={handleRowSelect}
                            filterParams={memoizedFilters}
                            dataFieldsColsConfig={memoizedColumnsConfig}
                            primaryKey={'id_ref_lokasi'} 
                            path={API_PATH().master.jaringan.tree_jaringan}                   
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose} style={{ backgroundColor: '#e5e7e9', color:'#000' }}>Batal</Button>
                    <Button variant='primary' onClick={handleModalConfirm}>Simpan</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomModal;

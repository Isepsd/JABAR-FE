import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TreeGridComponent from '@app/components/JqxTreeGrid/JqxTreeGrid';
import { MANUVER_COLUMNS } from '@app/configs/react-table/master-jaringan.columns.config';
import axios from 'axios';
import { API_PATH } from '@app/services/_path.service';
import { getAllByPath } from '@app/services/main.service';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { useDispatch } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import CardWidget from '@app/components/Card/CardWidget';
import CustomModal from '@app/pages/MasterData/Jaringan/TreeJaringan/TreeJarianganModal';

const App: React.FC = () => {
    const sc = axios.CancelToken.source();
    const [garduInduk, setGarduInduk] = useState<any>();
    const [garduIndukOptions, setGarduIndukOptions] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>(null);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState<any>(null);

    useEffect(() => {
        getAllDataGarduInduk();
    }, []);

    const loadChildren = useCallback(async (): Promise<any[]> => {
        // console.log('Loading children for parent ID:', parentId);
        return []; 
    }, []);

    //handle double click on row grid
    const handleRowDoubleClick = useCallback((row: any) => {
        setSelectedRowData(row); 
        setModalVisible(true); 
    }, [selectedRowData]);

    //handle row click
    const handleRowSelect =  useCallback(async (): Promise<any[]> => {
        // set logic here
        return [];
    }, []);

    //handle close modal popup
    const handleCloseModal = useCallback(() => {
        setModalVisible(false);
        setSelectedRowData(null);
    }, []);

    const handleInsert = useCallback(() => {
            console.log('add action this')
    }, []);

    //handle select gardu induk
    const changeGarduIndukOptions = useCallback(
        async (selected: any) => {
            
            setGarduInduk(selected);
            setFilters((prev: any) => {
                const updatedFilters = {
                    ...prev,
                    id_ref_lokasi: selected?.value,
                };
                if (JSON.stringify(updatedFilters) !== JSON.stringify(prev)) {
                    return updatedFilters;
                }
                return prev; 
            });

            // Simulate data fetching or processing
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

            
        },
        [dispatch, filters]
    );

    //Get data Gardu induk
    const getAllDataGarduInduk = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        try {
          const params = {
            page: '-1',
            limit: -1,
            id_ref_jenis_lokasi: '7b94de4b-5a60-4f83-b9b6-7ae60e508cc5',//jenis lokasi Gardu Induk
            sort_by: 'nama_lokasi',
          };
          
          const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, sc.token);
          const { results } = req;
    
          let data: any = results.map((d: any) => {
            return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
          });
          setGarduIndukOptions(data);        
        } catch (err: any) {
        }
    }, [sc.token]);

    const handleEditClick = (id: any) => {
        // Implement your edit logic here
        console.log(`Edit item with ID: ${id}`);
    };

    const handleDeleteClick = (id: any) => {
        // Implement your delete logic here
        console.log(`Delete item with ID: ${id}`);
    };
    const handleRowChecked = useCallback((row: any) => {
        console.log(row);
    }, []);
    
    const memoizedTreeGridProps = useMemo(() => ({
        // width:"100%"
        // height:"auto"
        // theme :'bootstrap',
        // sortable:{true}
        // filterable:{true}
        // columnsResize:{true}
        // selectionMode:"multipleRows"
        showToolbar: true,
        checkboxes: true,
        path: API_PATH().master.jaringan.tree_jaringan,
        onInsert: handleInsert,
        loadChildren: loadChildren,
        showInsertButton: true,
        showRefreshButton: true,
        showClearButton: true,
        showexcelButton: true,
        showActionButtons: true,
        onRowDoubleClick: handleRowDoubleClick,
        onRowSelect: handleRowSelect,
        onEditClick: handleEditClick,
        onDeleteClick: handleDeleteClick,
        filterParams: { sort_by: 'nama_lokasi', ...filters },
        dataFieldsColsConfig: MANUVER_COLUMNS(),
        primaryKey: 'id_ref_lokasi',
        onRowCheck:handleRowChecked
      }), [filters]);

      
    return (
        <>
            <CardWidget title='FILTER'>
                <Form noValidate>
                    <Row>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Gardu Induk</Form.Label>
                                <Select
                                    placeholder='Pilih Gardu Induk'
                                    styles={ReactSelectStyle}
                                    value={garduInduk}
                                    onChange={changeGarduIndukOptions}
                                    options={garduIndukOptions}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </CardWidget>
            <br />
            <p style={{ color: 'red' }}><i>*Double-Click Aset yang akan dipindahkan</i></p>
            
            <TreeGridComponent {...memoizedTreeGridProps} />
            <CustomModal
                show={modalVisible}
                handleClose={handleCloseModal}
                rowData={selectedRowData} //send data param to popup
                callbackModal={() => setFilters(garduInduk)} //reload data grid after update
                garduIndukSelected={() =>setGarduInduk(garduInduk)} //set gardu induk selected after update
            />
        </>
    );
};

export default App;

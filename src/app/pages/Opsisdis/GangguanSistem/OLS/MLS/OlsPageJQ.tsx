import React, { useEffect, useState ,useRef} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { GANGGUAN_REKAP_PADAM_OLS} from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import Filter from './Filter'
/** COMPONENTS */
import { useLocation, useNavigate } from 'react-router-dom';
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
// import ModalForm from '@app/components/Modals/ModalForm';
import moment from 'moment';
import UpdateOLS from './UpdateOLS'
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import UpdateAddOLS from './UpdateAddOLS'
import UpdateEditOLS from './UpdateEditOLS'
import { Card, Col, Row } from 'react-bootstrap';
import OlsDeetailPageJQ from './OlsDeetailPageJQ'
export default function ConfigsPage() {

    const [roleActions, setRoleActions] = useState<any>({});

    const dataSelected = useRef<any>();
    const [detailID,setdetailID] = useState<any>();
    const location = useLocation();
    const navigate = useNavigate();
  
 
    const [modalAdd, setModalAdd] = useState<any>({
      approved: false,
      size: "lg",
      title: `Tambah Data`,
    });
  
    const [modalEdit, setModalEdit] = useState<any>({
      approved: false,
      size: "lg",
      title: `Edit Data`,
    });
    /** MAP DATA FROM API RESPONSE */
   const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
  
      dataTableValue.push({
        ...item,
        number: item.number,
        id: item.id,
        date: moment(item.tanggal_gangguan).format('DD-MM-YYYY'),
        up3_id: item?.up3,
        penyulang: item?.penyulang,
        ulp: item?.ulp,
        penyebab_gangguan_id: item?.penyebab_gangguan,
        titik_gangguan: item?.titik_gangguan,
        zone: item?.zone,
        proteksi_gangguan: item?.nama_proteksi,
        kinerja: item?.kinerja,
        created_at:  moment(item.created_at).format('DD-MM-YYYY'),
       
      
      });
    });
    return dataTableValue;
  };
    const handleCheckedRows = (data: any) => {
        dataSelected.current= data;
        setdetailID(dataSelected?.current.id);
    }

    const handleAdd = () => {
      // Open the add modal
      setModalAdd((prevState: any) => ({
        ...prevState,
        show: true,
      }));
  
      // Remove `id` parameter from URL
      const params = new URLSearchParams(location.search);
      params.delete('id');
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };
    const handleEdit = (item: any) => {
      dataSelected.current = item.current;
      setModalEdit((prevState: any) => ({
        ...prevState,
        show: true,
      }));
  
      // Add `id` parameter to URL
      const params = new URLSearchParams(location.search);
      params.set('id', item.current?.id_trans_drafting_wo || '');
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };
    const [filterValues, setFilterValues] = useState<any>({
        // datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
        // datum_range_before: moment().format("YYYY-MM-DD") ,
        
      });
      const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };
    const handleClose = () => {
      // Close all modals
  
      setModalAdd((prevState: any) => ({
        ...prevState,
        show: false,
      }));
      setModalEdit((prevState: any) => ({
        ...prevState,
        show: false,
      }));
  
  
      // Remove the `id` parameter from the URL search parameters
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('id');
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    };
    useEffect(() => {
        let roleAccess = ROLE_ACCESS("fasop-md-kinerja-scada");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
    }, []);


    return (
        <> 
        <UpdateOLS/>
        <br></br>
        <br></br>
      <Filter onFilterChange={handleFilterChange} />
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Gangguan Sub Sistem</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNewButton
                //AKSI 
                addbtn={roleActions.create}
                onClickAdd={handleAdd}
                updatebtn={roleActions.update}
                onClickUpdate={handleEdit}
                deletebtn={roleActions.delete}
                SetPrint={roleActions.update}

                //TABLE DATA
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan_sistem}
                filterParams={{
                  sort_by: '-tanggal_gangguan',
                ...filterValues
                }}
                dataFieldsColsConfig={GANGGUAN_REKAP_PADAM_OLS()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
                minWidth={300}
                maxWidth={600}
            />
              <hr className='my-4' />
           <Row>
                            <Col md={12} className='mb-4'>
                                <Card className='card-widget'>
                                    <Card.Header> Detail Entri Gangguan </Card.Header>
                                    <OlsDeetailPageJQ 
                                        filterParams={{ gangguan_penyulang_id: detailID }} 
                                        filterValues={filterValues} 
                                    />
                                </Card>
                            </Col>
                        </Row>
            </div>
        </JqxTabs>
        }
         <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
        <UpdateAddOLS handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
         <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <UpdateEditOLS handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
        </>
    );
}

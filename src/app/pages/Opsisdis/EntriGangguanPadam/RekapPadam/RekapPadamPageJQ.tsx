import React, { useEffect, useState ,useRef} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import { useLocation, useNavigate } from 'react-router-dom';
/** CONFIG */
import { GANGGUAN_REKAP_PADAM_GRID, } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import Filter from './Filter'
/** COMPONENTS */
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';
import VerifikasiRekapPadamPageJQ from './VerifikasiRekapPadamPageJQ'
import RekapPadamDetailPageJQ from './RekapPadamDetailPageJQ'
// import ModalForm from '@app/components/Modals/ModalForm';
import moment from 'moment';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { Card, Col, Row } from 'react-bootstrap';

export default function ConfigsPage() {
  const location = useLocation();
  const navigate = useNavigate();

    const [roleActions, setRoleActions] = useState<any>({});

    const dataSelected = useRef<any>();
    const [detailID,setdetailID] = useState<any>();
    const [modalPosting, setModalPosting] = useState<any>({
      approved: false,
      size: "xl",
      title: `Posting Data`,
    });
  

    console.log('ada wae',detailID)


    /** MAP DATA FROM API RESPONSE */
   const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
  
      dataTableValue.push({
        ...item,
        number: item.number,
        id: item.id,
        penyebab_gangguan_id: item.penyebab_gangguan_id,
        penyulang_id:item.penyulang_id,
        date: item.tanggal_gangguan,
        up3_id: item?.up3,
        penyulang: item?.penyulang,
        ulp: item?.ulp,
        penyebab_gangguan: item?.penyebab_gangguan,
        titik_gangguan: item?.titik_gangguan,
        zone: item?.zone,
        proteksi_gangguan: item?.nama_proteksi,
        kinerja: item?.kinerja,
        created_at:  moment(item.created_at).format('DD-MM-YYYY'),
       
      
      });
    });
    return dataTableValue;
  };
  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    // setdetailID(dataSelected?.current.penyulang_id);
    setdetailID(dataSelected?.current.id);
  };

    
    const [filterValues, setFilterValues] = useState<any>({
        // datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
        // datum_range_before: moment().format("YYYY-MM-DD") ,
        
      });
      const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };
    const handlePosting = (item: any) => {
      if (item.current?.posting_wo === '1') {
        alert('Data yang sudah diposting tidak bisa diposting kembali.');
        return; // Stop further execution if already posted
      }
    
      dataSelected.current = item.current;
      setModalPosting((prevState: any) => ({
        ...prevState,
        show: true,
      }));
      // Add `id` parameter to URL
  const params = new URLSearchParams(location.search);
  params.set('id', item.current?.id || '');
  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
};
const handleClose = () => {
  // Close all modals
 
  setModalPosting((prevState: any) => ({
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
      <Filter onFilterChange={handleFilterChange} />
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Entri Gangguan</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNewButton
                //AKSI 
                addbtn={roleActions.create}
                // onClickAdd={handleAddClick}
                updatebtn={roleActions.update}
                // onClickUpdate={handleEdit}
                deletebtn={roleActions.delete}
                SetVerivikasi={roleActions.update}
                onClickSetVerivikasi={handlePosting}
                //TABLE DATA
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan}
                filterParams={{
                  sort_by: '-created_at',
                ...filterValues
                }}
                dataFieldsColsConfig={GANGGUAN_REKAP_PADAM_GRID()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleRowSelected}
                exportbtn={true}
                minWidth={300}
                maxWidth={600}
            />
            <hr className='my-4' />
                        <Row>
                            <Col md={12} className='mb-4'>
                                <Card className='card-widget'>
                                    <Card.Header> Detail Entri Gangguan </Card.Header>
                                    <RekapPadamDetailPageJQ 
                                        filterParams={{ gangguan_penyulang_id: detailID }} 
                                        filterValues={filterValues} 
                                    />
                                </Card>
                            </Col>
                        </Row>
            </div>
        </JqxTabs>
        }
 <ModalFormWO modalProps={{ ...modalPosting, setShow: handleClose }}>
    <VerifikasiRekapPadamPageJQ 
          handleClose={handleClose} 
          dataSelected={dataSelected} 
          isAlreadyGangguanID={detailID}  // Pastikan ini adalah nilai boolean atau null
        />
    </ModalFormWO>

        </>
        
    );
}

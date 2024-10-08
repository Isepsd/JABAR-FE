import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cdnUrl } from '@app/helper/cdn.helper';
/** CONFIG */
import { SCADATEL_WO_APPROVE_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";

/** COMPONENTS */
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';
import CardWidget from '@app/components/Card/CardWidget';
import { Card,Col, Row } from 'react-bootstrap';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import StatisticKinerjaWO from '@app/modules/Dashboard/StatisticKinerjaWO';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
// 

import AproveSpvScadatelFormApproveJQ from './AproveSpvScadatelFormApproveJQ'
import AproveSpvScadatelDetailPageJQ from './AproveSpvScadatelDetailPageJQ'
// import PelaksanaanWoForm from './PelaksanaanWoForm'
/** SERVICE */
import { CONFIG_BOX_KOMULATIF } from '@app/configs/wo-drafting.config';
import { nanoid } from '@reduxjs/toolkit';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import AproveSpvScadatelFormView from "./AproveSpvScadatelFormView"

export default function AproveSpvScadatelPageJQ() {
  const { currentUser } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<any>(null);
  const [modal, setModal] = useState<any>({
    approved: false,
    size: "s",
    title: `View`,
  });
  const [modalApprove, setModalApprove] = useState<any>({
    approved: false,
    size: "l",
    title: `Pelaksaan WO`,
  });
  // const [modalEdit, setModalEdit] = useState<any>({
  //   approved: false,
  //   size: "lg",
  //   title: `Edit Data`,
  // });


  const dataSelected = useRef<any>();

  const [detailAprove,setdetailApprove] = useState<any>();
  const [detailAlreadyAprove,setdetailAlreadyApprove] = useState<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [detailsModuleWO, setDetailsModuleWO] = useState<any>();
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
  const renderBoxKomulatif = useMemo(() => {
    return boxKomulatif?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaWO
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            fieldName={item?.fieldName}
          />
        </Col>
      );
    });
  }, []);

  /** MAP DATA FROM API RESPONSE */
const handleRespDataApi = (data: any) => {
  let dataTableValue: any = [];

  data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        id_trans_drafting_wo: item?.id_trans_drafting_wo,
        progres: item?.progres,
        no_wo: item?.no_wo,
        tgl_wo: item?.tgl_wo,
        uraian_wo: item?.uraian_wo,
        id_ref_kegiatan: item?.nama_kegiatan,
        id_ref_lokasi_up3: item?.nama_up3,  
        nama_user_mulai_wo: item?.nama_user_mulai_wo,
        peralatan: item?.peralatan,
        jns_peralatan: item?.jns_peralatan,
        id_ref_lokasi_gi: item?.nama_gi,
        id_ref_lokasi_peralatan: item?.nama_peralatan,
        foto_sebelum: item?.foto_sebelum ? `<a href="${cdnUrl(item?.foto_sebelum)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${(item?.foto_sebelum)}</a>` : '',
        foto_sesudah: item?.foto_sesudah ? `<a href="${cdnUrl(item?.foto_sesudah)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${(item?.foto_sesudah)}</a>` : '',
        id_user_created: item?.nama_user_created,
        approve_spv_scada: item?.approve_spv_scada,
        nama_spv_scada: item?.nama_spv_scada,
        approve_spv_data: item?.approve_spv_data,
        nama_spv_data: item?.nama_spv_data,
        approve_spv_opsis: item?.approve_spv_opsis,
        nama_spv_opsis: item?.nama_spv_opsis,
        posting_wo: item?.posting_wo
      });
   
  });

  return dataTableValue;
}


const [filterValues] = useState<any>({
  id_user_mulai_wo: String(currentUser.id_user)

});

  /** view HANDLING */
  const handleView = (item: any) => {
    if (item) {
        setSelectedData(item); // Simpan data item ke state

        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));

        // Hapus parameter 'id' dari URL jika ada
        const params = new URLSearchParams(location.search);
        params.delete('id');
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    } else {
        console.error('Item is undefined or empty');
    }
};


  const handleApprove = (item: any) => {

    dataSelected.current = item.current;
    setModalApprove((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  
    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id_trans_drafting_wo || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  


  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetailsModuleWO(dataSelected?.current.id_trans_drafting_wo);
   
    setdetailApprove(dataSelected?.current.posting_wo);
    setdetailAlreadyApprove(dataSelected?.current.approve_spv_scada);
    
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("approve-spv-scadatel");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalApprove((prevState: any) => ({
      ...prevState,
      show: false,
    }));
  
    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };
  
  



 
  return (
    <>
      <CardWidget title='SCADATEL - Drafting - Approve SPV SCADATEL'>
        <Row className='gx-1'>
          {renderBoxKomulatif}
        </Row>
      </CardWidget>
      {roleActions.view && roleActions.posting && roleActions.create && roleActions.update && roleActions.delete &&
        <div style={{ margin: '20px' }}>
          <JqxTabs theme={"light"}>
            <ul style={{ marginLeft: 10 }} key="1">
              <li><i className="fa-solid fa-server"></i> Approve SPV SCADATEL</li>
            </ul>
            <div key="2">
              <TableDataJqxGridNewButton
            
                SetApprove={roleActions.approve}
                SetView={roleActions.view}
         
                onClickSetView={handleView}
                onClickSetApprove={handleApprove}
        
                path={API_PATH().fasop.drafting.wo_drafting}
                filterParams={ {posting_wo: '4'}}  // Filter untuk posting_wo 1, 3, dan 4
                dataFieldsColsConfig={SCADATEL_WO_APPROVE_GRID()}
                primaryKey={'id_trans_drafting_wo'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleRowSelected}
                exportbtn={true}
                minWidth={190}
                maxWidth={600}
              />
             
          <hr className='my-4' />
          <Row>
                <Col md={12} className='mb-4'>
                    <Card className='card-widget'>
                        <Card.Header > Dokumen Perkejaan  {dataSelected?.current?.detailsModuleWO}</Card.Header>
                        <AproveSpvScadatelDetailPageJQ
                        filterParams={{ id_modules: detailsModuleWO }} 
                       />
                    </Card>
                </Col>
            </Row>
        
            </div>
          </JqxTabs>    
        </div>
        
      }
      
      {modalApprove.show && (
      <ModalFormWO modalProps={{ ...modalApprove, setShow: handleClose }}>
        <AproveSpvScadatelFormApproveJQ 
         handleClose={handleClose} 
         dataSelected={dataSelected} 
         isAlreadyPelaksanaan={detailAprove}  // Pastikan ini adalah nilai boolean atau null
         isAlreadyApprove={detailAlreadyAprove}  // Pastikan ini adalah nilai boolean atau null
         id_spv_scada={filterValues}
        />
      </ModalFormWO>
 )}
      <ModalFormWO modalProps={{ ...modal, setShow: handleClose }}>
      {modal.show && (
            <AproveSpvScadatelFormView
                handleClose={() => setModal({ show: false })}
                selectedData={selectedData}  // Berikan data yang terpilih
            />
        )}
      </ModalFormWO>

    </>
  );
}

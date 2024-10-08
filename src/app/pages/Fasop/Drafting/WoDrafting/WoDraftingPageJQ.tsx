import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cdnUrl } from '@app/helper/cdn.helper';
/** CONFIG */
import { SCADATEL_WO_DRAFTING_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";

/** COMPONENTS */
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';


import CardWidget from '@app/components/Card/CardWidget';
import { Col, Row } from 'react-bootstrap';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import StatisticKinerjaWO from '@app/modules/Dashboard/StatisticKinerjaWO';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import WoDraftingViewForm from './WoDraftingViewForm'
import WoDraftingPostingForm from './WoDraftingPostingForm'
import WoDraftingForm from './WoDraftingForm'

/** SERVICE */
import { CONFIG_BOX_KOMULATIF } from '@app/configs/wo-drafting.config';
import { nanoid } from '@reduxjs/toolkit';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function WoDraftingPageJQ() {
  const [modal, setModal] = useState<any>({
    approved: false,
    size: "s",
    title: `View`,
  });

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

  const [modalPosting, setModalPosting] = useState<any>({
    approved: false,
    size: "s",
    title: `Posting Data`,
  });

  const dataSelected = useRef<any>();

  const [selectedData, setSelectedData] = useState<any>(null);
   

  const [detailPosting,setdetailPosting] = useState<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
 

  const renderBoxKomulatif = useMemo(() => {
    return boxKomulatif?.map((item: any) => (
      <Col md={3} key={nanoid()} className="mb-2">
        <StatisticKinerjaWO
          key={nanoid()}
          variant={item?.variant}
          path={item?.path}
          suffix={item?.suffix}
          label={item?.label}
          fieldName={item.fieldName}
          // filterParams={item?.filterParams}
        />
      </Col>
    ));
  }, []);
  

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
                id_bidang: item?.nama_bidang,
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
                posting_wo: item?.posting_wo,
                action: `<button class="action-btn" onclick="handleAction('${item?.id_trans_drafting_wo}')">Action</button>`,
               
              });
            });
          
            return dataTableValue;
          };
          




  const location = useLocation();
  const navigate = useNavigate();

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
  params.set('id', item.current?.id_trans_drafting_wo || '');
  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
};

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

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setdetailPosting(dataSelected?.current.posting_wo);
  };

  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalAdd((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: false,
    }));
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
    let roleAccess = ROLE_ACCESS("wo-drafting");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  return (
    <>
      <CardWidget title='SCADATEL - Drafting - WO Drafting'>
        <Row className='gx-1'>
          {renderBoxKomulatif}
        </Row>
      </CardWidget>
      {roleActions.create && roleActions.update && roleActions.delete &&
        <div style={{ margin: '20px' }}>
          <JqxTabs theme={"light"}>
            <ul style={{ marginLeft: 10 }} key="1">
              <li><i className="fa-solid fa-server"></i> WO Drafting</li>
            </ul>
            <div key="2">
              <TableDataJqxGridNewButton
                addbtn={roleActions.create}
                updatebtn={roleActions.update}
                deletebtn={roleActions.delete}
                SetView={roleActions.view}
                SetPosting={roleActions.posting}
                onClickSetPosting={handlePosting}
                onClickUpdate={handleEdit}
                onClickSetView={handleView}
                onClickAdd={handleAdd}
                path={API_PATH().fasop.drafting.wo_drafting}
                filterParams={{posting_wo_in : ' 0, 1 ,2 ' }}
                dataFieldsColsConfig={SCADATEL_WO_DRAFTING_GRID()}
                primaryKey={'id_trans_drafting_wo'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleRowSelected}
                exportbtn={true}
              />
              <hr className='my-4' />
            </div>
          </JqxTabs>
        </div>
      }

             
      <ModalFormWO modalProps={{ ...modal, setShow: handleClose }}>
      {modal.show && (
            <WoDraftingViewForm
                handleClose={() => setModal({ show: false })}
                selectedData={selectedData}  // Berikan data yang terpilih
            />
        )}
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
      <WoDraftingForm handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalPosting, setShow: handleClose }}>
      <WoDraftingPostingForm 
          handleClose={handleClose} 
          dataSelected={dataSelected} 
          isAlreadyPosted={detailPosting}  // Pastikan ini adalah nilai boolean atau null
        />
    </ModalFormWO>


      <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <WoDraftingForm handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
    </>
  );
}

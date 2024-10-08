import React, { useRef ,useState} from 'react';

/** CONFIG */
import { MONITORING_APKT_DETAIL_PADAM_JQ } from '@app/configs/react-table/apkt.columns.config'
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import RoleDetailForm from "./RoleDetailForm";
// import ModalForm from "@app/components/Modals/ModalForm";
import { Button } from '@app/components';
import {  postByPath } from '@app/services/main.service';
/** SERVICE */
// import UploadPadam from '@app/pages/Apkt/MonitoringApkt/UploadPadam';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ModalNotif from '@app/components/Modals/ModalNotif';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { useDispatch} from 'react-redux';
import { get } from 'lodash';
// import { current } from '@reduxjs/toolkit';
export default function RoleDetailPage({ filterParams ,roleActions,event='padam'}: ITreeJaringan) {
    let roleAccess = ROLE_ACCESS("monitoring-apkt");
     roleActions = {
      update: ROLE_ACTION(roleAccess, 'update'),
      update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
      update_status: ROLE_ACTION(roleAccess, 'update-status'),
      update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
      update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
      // update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
    };
    
    const dispatch = useDispatch();
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState<boolean>();
    const selectionmode= useRef <any>([])
    const dataSelected = useRef<any>();
    const jenis_laporan =  filterParams.current?.jenis_laporan;
    const status_laporan =  filterParams.current?.status_laporan;
    // const [action, setAction] = useState<string>();
    const dispatchNotification = (msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
      };
    // const [modal, setModal] = useState<any>({
    //     approved: false,
    //     size: 'md',
    //     title: `Update Tanggal Nyala`,
    //   });

    // const [modalConfirm, setModalConfirm] = useState<any>({
    //     show: false,
    //     approved: false,
    //     size: 'sm',
    //     icon: 'fa-regular fa-circle-question',
    //     description: `Kirim Padam Ke APKT`,
    //     subDescriotion: ``,
    //     textApproved: 'Kirim',
    //     classApproved: 'success',
    //     textDecline: 'Cancel',
    //     scrollable: false,
    //   });

      const [modalConfirmNyala, setModalConfirmNyala] = useState<any>({
        show: false,
        approved: false,
        size: 'sm',
        icon: 'fa-regular fa-circle-question',
        description: `Kirim Nyala Ke APKT`,
        subDescriotion: ``,
        textApproved: 'Kirim',
        classApproved: 'success',
        textDecline: 'Cancel',
        scrollable: false,
      });


      const [modalNotif, setmodalNotif] = useState<any>({
        show: false,
        approved: false,
        size: 'sm',
        icon: 'fa-solid fa-triangle-exclamation',
        description: `Tidak bisa kirim ke APKT !`,
        subDescriotion: `Jenis laporan PEMELIHARAAN atau status laporan sudah close tidak bisa dikirim ke APKT !`,
        textButton: 'Mengerti',
        scrollable: false,
      });
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number:item?.number,
                nama_lokasi: item?.nama_lokasi,
                id: item?.id_ref_lokasi,
                id_ref_jenis_lokasi: item?.nama_jenis_lokasi,
                kode_lokasi: item?.kode_lokasi,
                no_tiang: item?.no_tiang,
                alamat: item?.alamat,
                jenis_laporan: jenis_laporan,
                status_listrik:item?.tgl_nyala,
                coverage: item?.coverage,
                gardu_mjd:item.gardu_mjd,
                tgl_padam: item?.tgl_padam,
                status_apkt_kirim_padam: item?.status_apkt_kirim_padam,
                status_apkt_kirim_nyala:item.status_apkt_kirim_nyala
                
            });
        });
        return dataTableValue;
    }

    const kirimPadamAPKT = async (current:any) => {
        let message;
    
        try {
    
          let params: any = {
            id_user_entri: current.id_user,
            event: event
          };
          let ids: any = []
          dataSelected?.current.map((item: any) => {
    
            params.id_apkt_trans_jar = item?.id_apkt_trans_jar
            item?.children?.map((items: any) => {
              ids.push(items?.id_apkt_trans_jar_det)
    
            })
            ids.push(item?.id_apkt_trans_jar_det)
          })
          params.ids = ids;
          await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
            params,
            source.token
          );
          dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
        //   getAllData();
        } catch (err: any) {
          setLoading(false);
          dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
        }
      };

      // const onShowModal = () => {
      //   setModal((prev: any) => ({ ...prev, show: true }))
      // }
      // const onShowModalConfirm = () => {
      //   let desc = event == "nyala" ? `Kirim Nyala Ke APKT` : "Kirim Padam Ke APKT"
      //   // console.log("event", event);
      //   // console.log("desc", desc);
      //   desc;
    
      //   setModalConfirm((prev: any) => ({
      //     ...prev, show: true
      //   }))
      // }
      const onShowModalConfirmNyala = () => {
        setModalConfirmNyala((prev: any) => ({
          ...prev, show: true
        }))
      }
    
      const onShowModalNotif = () => {
        setmodalNotif((prev: any) => ({
          ...prev, show: true
        }))
      }
    //   const handleSelectRow = (rows: any) => {
    //     setDataRowsSelect(() => {
    //       return [...rows]
    //     })
    //     onCheckedRows(rows)
    //   }
   
   
   

    // const [modal, setModal] = useState<any>({
    //     approved: false,
    //     size: "lg",
    //     title: `Tambah Module`,
    //     id_token: filterParams?.id_token,
    // });

    /** HANDLE ADD */
    // const handleAddClick = () => {
    //     setModal((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));
    // };
   
    
    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
        selectionmode.current = data;
    }

    const callbackModalConfirm = (approved = false) => approved && kirimPadamAPKT(dataSelected.current); 


    return (
        <>
         <TopBarLoader isLoading={loading} />
         <div className='d-flex'>

          
            {/* { roleActions?.update_kirim_padam &&
            <Button disabled={dataSelected.current?.length === 0} onClick={jenis_laporan=='GANGGUAN' && status_laporan=='open' ? onShowModalConfirm : onShowModalNotif} >Kirim Padam ke APKT</Button>
          } */}

{ roleActions?.update_kirim_nyala &&
            <Button disabled={dataSelected.current?.length === 0} onClick={jenis_laporan=='GANGGUAN' && status_laporan=='open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
          }
        </div>
            {filterParams?.ref_apkt_trans_jar &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={roleActions.create}
                    deletebtn={roleActions.delete}
                    selectionmode={"checkbox"}
                    //TABLE DATA
                    path={API_PATH().apkt.trans_jar_detail}
                    filterParams={filterParams}
                    dataFieldsColsConfig={MONITORING_APKT_DETAIL_PADAM_JQ()}
                    primaryKey={'ref_apkt_trans_jar'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

            {/* <ModalForm modalProps={modal}>
                <RoleDetailForm paramid={filterParams?.id_token} />
            </ModalForm> */}
  {/* {roleActions?.update_kirim_padam === true && (
<ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
      )} */}
      {/* <ModalForm modalProps={modal}>
        <UploadPadam dataSelected={dataSelected} path={path} />
      </ModalForm> */}
      <ModalConfirm
        modalConfirmProps={modalConfirmNyala}
        callbackModalConfirm={callbackModalConfirm}
      />
      
      <ModalNotif
        ModalNotifProps={modalNotif}
        callbackModalNotif={callbackModalConfirm}
      />
        </>
    );
}


export interface ITreeJaringan {
    move?: boolean;
    rowSelect?: boolean;
    isUpdateNyala?: boolean;
    rowSelectType?: string;
    onCheckedRows?: any;
    dataSelected?: any;
    filterParams?: any;
    path?: any;
    event?: any;
    configColumns?: any;
    trigger?: any;
    roleActions?: any;
  }
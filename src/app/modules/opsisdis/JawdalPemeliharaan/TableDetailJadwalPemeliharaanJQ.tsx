import React, { useEffect, useState,useRef } from 'react';

/** CONFIG */
// import { INPUT_JADWAL_COLUMN_JQX } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'
import {
    INPUT_JADWAL_DOKUEMNTASI_COLUMN_JQX,
    INPUT_JADWAL_GARDU_COLUMN_JQX,
  } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import { cdnUrl } from '@app/helper/cdn.helper';
import ModalData from '@app/components/Modals/ModalForm';
// import InputJadwalForm from './InputJadwalForm';
import InputGarduForm from './InputGarduFormJQ';
import InputFormDokumentasi from './InputFormDokumentasi';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { timeFormatAlt } from '@app/helper/time.helper';

// import {
//   INPUT_JADWAL_DOKUEMNTASI_COLUMN,
//   INPUT_JADWAL_GARDU_COLUMN,
// } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';
export default function JarZoneJQ({ filterParams}:ITableInputJadwal) {
    const [roleActions, setRoleActions] = useState<any>({});
    const dataSelected = useRef<any>();
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                ...item,
                number: item?.number,
                gardu_induk: item?.gardu?.gardu_induk?.nama_lokasi,
                penyulang: item?.gardu?.penyulang?.nama_lokasi,
                gardu: item?.gardu?.nama_lokasi,
                up3: item?.gardu?.up3?.nama_lokasi,
                alamat: item?.gardu?.alamat,
                nama_dok: (
                <a href={cdnUrl(item?.file_name)} target='_blank' rel='noreferrer'>
                    {item?.nama_dok}
                </a>
                ),
            });
        });
        return dataTableValue;
    }

/** MODAL */
const [modal,setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Pilih Gardu`,
  });

  const [modalStatus,setModalStatus] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Upload Dokumen`,
  });

  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalStatus((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };


    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
    }

    /** MODAL JENIS POINT */
  

    /** EDIT HANDLING */
    const handleEdit = (item: any) => {
        // dataSelected.current = item;
        dataSelected.current = item.current;
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleAddClick = () => {
        dataSelected.current = undefined;
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleEditU = (item: any) => {
        // dataSelected.current = item;
        dataSelected.current = item.current;
        setModalStatus((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleAddClickU = () => {
        dataSelected.current = undefined;
        setModalStatus((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    // const handleCheckedRows2 = (data: any) => {
    //     return data;
    // }

    // Initialize jqxTabs
    useEffect(() => {
        const tabs = document.getElementById('tabs');
        if (tabs) {
            (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
        }

        let roleAccess = ROLE_ACCESS("zone");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);

    }, []);


    return (
        <>
            
                {/* <div key="2"> */}
                <div key="1">
                    <TableDataJqxGridNew
                        //AKSI 
                   
                        // editable={roleActions?.update} // Edit on table
                        addbtn={roleActions.create}
                        onClickAdd={handleAddClick}
                        updatebtn={roleActions.update}
                        onClickUpdate={handleEdit}
                        deletebtn={roleActions.delete}


                        //TABLE DATA DEFAULT
                        // path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                        // dataFieldsColsConfig={INPUT_JADWAL_COLUMN_JQX()}
                        
                        //TABLE DATA
                        path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
                        dataFieldsColsConfig={INPUT_JADWAL_GARDU_COLUMN_JQX()}
                        filterParams={{
                            ...filterParams
                          }}
                        primaryKey={'id_trans_jadwal_har'}
                        respDataApi={handleRespDataApi}
                        filterable={true}
                        onRowSelected={handleCheckedRows}
                        exportbtn={true}
                    />
                </div>
                <div key="2">
                    <TableDataJqxGridNew
                        //AKSI 
                   
                        // editable={roleActions?.update} // Edit on table
                        addbtn={roleActions.create}
                        onClickAdd={handleAddClickU}
                        updatebtn={roleActions.update}
                        onClickUpdate={handleEditU}
                        deletebtn={roleActions.delete}


                        //TABLE DATA DEFAULT
                        // path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                        // dataFieldsColsConfig={INPUT_JADWAL_COLUMN_JQX()}
                        
                        //TABLE DATA
                        path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
                        dataFieldsColsConfig={INPUT_JADWAL_DOKUEMNTASI_COLUMN_JQX()}
                        filterParams={{
                            ...filterParams
                          }}
                        primaryKey={'id_trans_jadwal_har'}
                        respDataApi={handleRespDataApi}
                        filterable={true}
                        onRowSelected={handleCheckedRows}
                        exportbtn={true}
                    />
                </div>

                <ModalData modalProps={modal}>
                    {/* <InputJadwalForm /> */}
                    <InputGarduForm />
                </ModalData>

                <ModalFormWO modalProps={{...modalStatus, setShow: handleClose}}>
                    <InputFormDokumentasi
                    // id_trans_jadwal_har={filterParams?.id_trans_jadwal_har}
                    setModal={setModalStatus}
                    handleClose={handleClose}
                    />
                </ModalFormWO>
        </>
    );
}


interface ITableInputJadwal {
    onCheckedRows?: any;
    page?: string;
    sendTo?: string;
    rowSelect?: boolean;
    approve?: boolean;
    filterParams: any;
    roleActions?: any
  }
import React, { useEffect, useState,useRef } from 'react';

/** CONFIG */
import { INPUT_JADWAL_COLUMN_JQX } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import ModalData from '@app/components/Modals/ModalForm';
import InputJadwalForm from './InputJadwalForm';
// import InputGarduForm from './InputGarduForm';
// import InputGarduForm from './InputGarduFormJQ';
// import ModalFormWO from "@app/components/Modals/ModalFormWO";
// import InputFormDokumentasi from './InputFormDokumentasi';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { timeFormatAlt } from '@app/helper/time.helper';
export default function JarZoneJQ({ filterParams}:ITableInputJadwal) {
    const [roleActions, setRoleActions] = useState<any>({});
    const dataSelected = useRef<any>();
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                key: item?.key,
                id: item?.id_trans_jadwal_har,
                number: item?.number,
                lbs_manual: item?.lbs_manual,
                id_og:item?.og?.nama_lokasi,
                // sumber: item?.gardu_induk?.nama_lokasi,
                up3: item?.up3?.nama_lokasi,
                jenis_pelayanan: item?.jenis_pelayanan,
                status: item?.status_pekerjaan,
                wilayah_padam: item?.wilayah_padam,
                pelaksana: item?.pelaksana?.nama,
                pengawas: item?.pengawas?.fullname,
                jtm: item?.jtm,
                keterangan: item?.keterangan,
                jenis_pekerjaan: item?.ref_jenis_pekerjaan?.name,
                user_entri: item?.user_entri?.fullname,
                wilayah: item?.wilayah,
                jam_pekerjaan: item?.jam_pekerjaan,
                jenis_jadwal: item?.jenis_jadwal,
                tgl_create: item?.tgl_entri,
                respon_apd: item?.respon_apd ? item?.respon_apd : '-',
                tgl_period: `${timeFormatAlt(item?.tgl)}`,
                butuh_padam: item?.butuh_padam,

                //buat warna
                approval_apd1: item?.approval_apd1,
                approval_area1: item?.approval_area1,
            });
        });
        return dataTableValue;
    }

/** MODAL */
const [modal,setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Tambah`,
  });

//   const handleClose = () => {
//     // Close all modals
//     setModal((prevState: any) => ({
//       ...prevState,
//       show: false,
//     }));

//     // Remove the `id` parameter from the URL search parameters
//     const searchParams = new URLSearchParams(window.location.search);
//     searchParams.delete('id');
//     const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//     window.history.replaceState({}, '', newUrl);
//   };    


    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
        // setDetails(dataSelected?.current?.id_apkt_trans_jar);
    }

    /** MODAL JENIS POINT */
  

    /** EDIT HANDLING */
    const handleEdit = (item: any) => {
        dataSelected.current = item;
    };

    const handleAddClick = () => {
        dataSelected.current = undefined;
        setModal((prevState: any) => ({
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
            
                <div key="2">
                    <TableDataJqxGridNew
                        //AKSI 
                   
                        // editable={roleActions?.update} // Edit on table
                        addbtn={roleActions.create}
                        onClickAdd={handleAddClick}
                        updatebtn={roleActions.update}
                        onClickUpdate={handleEdit}
                        deletebtn={roleActions.delete}


                        //TABLE DATA
                        path={API_PATH().opsisdis.jadwal_pemeliharaan.har} 
                        filterParams={{
                            ...filterParams
                          }}
                        dataFieldsColsConfig={INPUT_JADWAL_COLUMN_JQX()}
                        primaryKey={'id_trans_jadwal_har'}
                        respDataApi={handleRespDataApi}
                        filterable={true}
                        onRowSelected={handleCheckedRows}
                        exportbtn={true}
                    />
                </div>

                <ModalData modalProps={modal}>
                    <InputJadwalForm />
                    {/* <InputGarduForm /> */}
                </ModalData>

                {/* <ModalFormWO modalProps={{...modal, setShow: handleClose}}>
                    <InputFormDokumentasi
                    // id_trans_jadwal_har={filterParams?.id_trans_jadwal_har}
                    setModal={setModal}
                    handleClose={handleClose}
                    />
                </ModalFormWO> */}
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
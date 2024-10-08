import React, { useEffect, useState } from 'react';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { KEYPOINT_COLUMN_GRID, } from '@app/configs/react-table/master-jaringan.columns.config';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import { useSelector } from "react-redux";
// import qs from "query-string";
// import moment from 'moment';

// type Props = {
//     optionCurrentUser?: any;
//     optionJenisLayanan?: any;
//     optionJenisLayananTrafo?: any;
//     onFilterChange?: any;
// };

export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<any>({});
    // const queryParams = qs.parse(location.search);
    // const { currentUser } = useSelector((state: any) => state.auth);


    const handleRespDataApi = (data: any) => {
        return data.results.map((result: any) => ({
            id_ref_lokasi:result?.id_ref_lokasi,
                number: result?.number,
                jenis_jaringan: result?.jenis_jaringan,
                nama: result?.nama_lokasi,
                kode: result?.kode_lokasi,
                gardu_induk: result?.gardu_induk?.nama_lokasi,
                parent_lokasi: result?.parent_lokasi?.nama_lokasi,
                trafo_gi: result?.trafo_gi?.nama_lokasi,
                penyulang: result?.penyulang?.nama_lokasi,
                zone: result?.zone?.nama_lokasi,
                alamat: result?.alamat,
                jenis_peralatan: result?.jenis_peralatan,
                lat: result?.lat,
                lon: result?.lon,
                fungsi_lokasi: result?.fungsi_lokasi,
                uid: result?.uid?.nama_lokasi,
                up3_1: result?.up3_1?.nama_lokasi,
                ulp_1: result?.ulp_1?.nama_lokasi,
                count_gardu: result?.count_gardu,
                no_tiang: result?.no_tiang,
                fungsi_scada: result?.fungsi_scada,
                zona: result?.zona,
                kva: result?.kva,
                jenis_gardu: result?.jenis_gardu,
                id_pemilik: result?.id_pemilik,
                panjang_jaringan: result?.panjang_jaringan,
                jumlah_pelanggan: result?.jumlah_pelanggan,
                provinsi: result?.ref_district?.regency?.province?.name,
                kab: result?.ref_district?.regency?.name,
                kec: result?.ref_district?.name,
                status_listrik: result?.status_listrik === 1 ? <input type="checkBox" /> : null,
                rekon_beban: result?.rekon_beban === 1 ? <input type="checkBox" /> : null,
                // rekon_beban: result?.rekon_beban,
                path1: result?.path1,
                path2: result?.path2,
                path3: result?.path3,
                id_i: result?.id_i ? result?.id_i : "",
                id_v: result?.id_v ? result?.id_v : "",
                id_p: result?.id_p ? result?.id_p : "",
                id_amr: result?.id_amr ? result?.id_amr : "",
                id_portal_ext: result?.id_portal_ext ? result?.id_portal_ext : "",
        }));
    };

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("pengaman-sutm");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);
    }, []);

    // const [filterValues, setFilterValues] = useState<any>({
    //     id_ref_lokasi_up3 :null,
    //       id_ref_lokasi_up2b :null,
    //       id_ref_lokasi_subsistem :null,
    //       id_ref_lokasi :null,
      
    //       date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    //       time: queryParams?.time ? queryParams?.time : null,
    //       id_parent_lokasi: queryParams?.__parent_lokasi
    //         ? queryParams?.__parent_lokasi
    //         : null,
    //       id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    //     //   id_pusat:
    //     //     optionCurrentUser?.level == "PUSAT"
    //     //       ? optionCurrentUser?.id_unit_lokasi
    //     //       : queryParams?.__pusat,
    //     //   id_regional:
    //     //     optionCurrentUser?.level == "REGIONAL"
    //     //       ? optionCurrentUser?.id_unit_lokasi
    //     //       : queryParams?.__regional,
    //     //   id_pemilik:
    //     //     optionCurrentUser?.level == "UNIT_INDUK"
    //     //       ? optionCurrentUser?.id_unit_lokasi
    //     //       : queryParams?.__pemilik,
    //     //   id_pengelola:
    //     //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
    //     //       ? optionCurrentUser?.id_unit_lokasi
    //     //       : queryParams?.__pengelola,
    //     //   id_sub_pengelola:
    //     //     optionCurrentUser?.level == "ULP"
    //     //       ? optionCurrentUser?.id_unit_lokasi
    //     //       : queryParams?.__subpengelola,

    // });

    // const handleFilterChange = (newFilterValues: any) => {
    //     setFilterValues(newFilterValues);
    // };


 
    return (
        <>
             {/* <div className='px-2 mt-2'>
                <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isGarduInduk={true} isKP={true}   />
              </div> */}
            {roleActions.create && roleActions.update && roleActions.delete &&
                <JqxTabs theme={"light"}>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li><i className="fa-solid fa-server"></i> Keypoint</li>
                    </ul>
                    <div key="2">
                        <SmartGridComponent
                            addbtn={roleActions.create}
                            updatebtn={roleActions.update}
                            deletebtn={roleActions.delete}
                            path={API_PATH().master.jaringan.ref_lokasi}
                            filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().keypoint}}
                            dataFieldsColsConfig={KEYPOINT_COLUMN_GRID()}
                            primaryKey={'id_ref_lokasi'}
                            respDataApi={handleRespDataApi}
                            selectionmode="singlerow"
                        />
                    </div>
                </JqxTabs>
            }
           
        </>
    );
}

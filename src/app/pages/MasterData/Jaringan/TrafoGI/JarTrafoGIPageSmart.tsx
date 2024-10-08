import React, { useEffect, useState } from 'react';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { TRAFO_GI_COLUMNS_GRID } from '@app/configs/react-table/master-jaringan.columns.config';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import { useSelector } from "react-redux";
// import qs from "query-string";
// import moment from 'moment';



export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<any>({});
    // const queryParams = qs.parse(location.search);
    // const { currentUser } = useSelector((state: any) => state.auth);
  

    const handleRespDataApi = (data: any) => {
        return data.results.map((result: IJaringan) => ({
            ...result,
                number: result.number,
                id_unit_induk: result?.id_unit_induk?.nama_lokasi,
                nama: result?.nama_lokasi,
                pemilik: result?.nama,
                parent_lokasi: result?.parent_lokasi?.nama_lokasi,
                alamat: result?.alamat,
                lat: result?.lat,
                lon: result?.lon,
                no_urut: result?.no_urut,
                kapasitas: result?.kapasitas ? result?.kapasitas : "",
                coverage: result?.coverage ? result?.coverage : "",
                status_trafo: result?.status_trafo ? result?.status_trafo : "",
                i_max: result?.i_max ? result?.i_max : "",
                ratio_ct: result?.ratio_ct ? result?.ratio_ct : "",
                fk_meter_pembanding: result?.fk_meter_pembanding ? result?.fk_meter_pembanding : "",
                primer_tegangan_max: result?.primer_tegangan_max ? result?.primer_tegangan_max : "",
                primer_tegangan_min: result?.primer_tegangan_min ? result?.primer_tegangan_min : "",
                sekunder_tegangan_min: result?.sekunder_tegangan_min ? result?.sekunder_tegangan_min : "",
                sekunder_tegangan_max: result?.sekunder_tegangan_max ? result?.sekunder_tegangan_max : "",
                sinkron_data: result?.sinkron_data ? result?.sinkron_data : "",
                jenis_layanan: result?.jenis_layanan ? result?.jenis_layanan : "",
                nama_sub_sistem: result?.nama_sub_sistem ? result?.nama_sub_sistem : "",
                path1: result?.path1,
                path2: result?.path2,
                path3: result?.path3,
                id_i: result?.id_i ? result?.id_i : "",
                id_v: result?.id_v ? result?.id_v : "",
                id_p: result?.id_p ? result?.id_p : "",
                id_amr: result?.id_amr ? result?.id_amr : "",
                id_portal_ext: result?.id_portal_ext ? result?.id_portal_ext : "",
                url_webservice: result?.url_webservice ? result?.url_webservice : "",
                def_nilai_cosq: result?.def_nilai_cosq ? result?.def_nilai_cosq : "",
                def_pengukuran_teg_sekunder: result?.def_pengukuran_teg_sekunder ? result?.def_pengukuran_teg_sekunder : "",
                def_pengukuran_teg_primer: result?.def_pengukuran_teg_primer ? result?.def_pengukuran_teg_primer : "",
                rekon_beban: result?.rekon_beban === 1 ? <input type="checkBox" /> : null,
                status_listrik: result?.status_listrik === 1 ? <input type="checkBox" /> : null,
        }));
    };

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("trafo-gi");
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
    //   id_ref_lokasi_up2b :null,
    //   id_ref_lokasi_subsistem :null,
  
    //   date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    //   time: queryParams?.time ? queryParams?.time : null,
    //   id_parent_lokasi: queryParams?.__parent_lokasi
    //     ? queryParams?.__parent_lokasi
    //     : null,
    //   id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    // });

    // const handleFilterChange = (newFilterValues: any) => {
    //     setFilterValues(newFilterValues);
    // };

    
    return (
        <>
           {/* <div className='px-2 mt-2'>
                <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isGarduInduk={true}   />
              </div> */}
          
            {roleActions.create && roleActions.update && roleActions.delete &&
                    <div key="2">
                        <SmartGridComponent
                            addbtn={roleActions.create}
                            updatebtn={roleActions.update}
                            deletebtn={roleActions.delete}
                            path={API_PATH().master.jaringan.ref_lokasi}
                            filterParams={{
                                id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                                sort_by: '-tgl_update,id_ref_lokasi',
                                
                            }}
                            dataFieldsColsConfig={TRAFO_GI_COLUMNS_GRID()}
                            primaryKey={'id_ref_lokasi'}
                            respDataApi={handleRespDataApi}
                            selectionmode="singlerow"
                        />
                    </div>
            }
           
        </>
    );
}

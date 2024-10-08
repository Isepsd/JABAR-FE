import React, { useEffect, useState } from 'react';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { KANTOR_COLUMN_GRID } from '@app/configs/react-table/master-jaringan.columns.config';
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
    
//   };
export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<any>({});
    // const queryParams = qs.parse(location.search);
    // const { currentUser } = useSelector((state: any) => state.auth);
    
    const handleRespDataApi = (data: any) => {
        return data.results.map((result: any) => ({
            id_ref_lokasi:result?.id_ref_lokasi,
            number: result?.number,
            id_ref_lokasi_up3: result?.id_ref_lokasi_up3,
            id_ref_lokasi_subsistem: result?.id_ref_lokasi_subsistem,
            jenis: result?.ref_jenis_lokasi?.nama_jenis_lokasi,
            nama: result?.nama_lokasi,
            alamat: result?.alamat,
            lat: result?.lat,
            lon: result?.lon,
            unit_induk: result?.uid?.nama_lokasi,
            up3_1: result?.ref_jenis_lokasi?.nama_jenis_lokasi == "ULP" ? result?.up3_1?.nama_lokasi : "",
            status_listrik: result?.status_listrik === 1 ? <input type="checkBox" /> : null,
        }));
      };

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("kantor");
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
      
    //       date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    //       time: queryParams?.time ? queryParams?.time : null,
    //       id_parent_lokasi: queryParams?.__parent_lokasi
    //         ? queryParams?.__parent_lokasi
    //         : null,
    //       id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    //       // id_pusat:
    //       //   optionCurrentUser?.level == "PUSAT"
    //       //     ? optionCurrentUser?.id_unit_lokasi
    //       //     : queryParams?.__pusat,
    //       // id_regional:
    //       //   optionCurrentUser?.level == "REGIONAL"
    //       //     ? optionCurrentUser?.id_unit_lokasi
    //       //     : queryParams?.__regional,
    //       // id_pemilik:
    //       //   optionCurrentUser?.level == "UNIT_INDUK"
    //       //     ? optionCurrentUser?.id_unit_lokasi
    //       //     : queryParams?.__pemilik,
    //       // id_pengelola:
    //       //   optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
    //       //     ? optionCurrentUser?.id_unit_lokasi
    //       //     : queryParams?.__pengelola,
    //       // id_sub_pengelola:
    //       //   optionCurrentUser?.level == "ULP"
    //       //     ? optionCurrentUser?.id_unit_lokasi
    //       //     : queryParams?.__subpengelola,

    // });
    //   const handleFilterChange = (newFilterValues: any) => {
    //     setFilterValues(newFilterValues);
    // };
    return (
        <>
         {/* <div className='px-2 mt-2'>
                <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} iskantor={true}    />
              </div> */}
            {roleActions.create && roleActions.update && roleActions.delete &&
                    <div key="2">
                    <SmartGridComponent
                        addbtn={roleActions.create}
                        updatebtn={roleActions.update}
                        deletebtn={roleActions.delete}
                        dataFieldsColsConfig={KANTOR_COLUMN_GRID()}
                        path={API_PATH().master.jaringan.ref_lokasi}
                        filterParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().pusat},${JENIS_LOKASI().regional},${JENIS_LOKASI().uiw},${JENIS_LOKASI().up3},${JENIS_LOKASI().ulp}, ${JENIS_LOKASI().up2d}, ${JENIS_LOKASI().up3b}, ${JENIS_LOKASI().up2b}, ${JENIS_LOKASI().upt}, ${JENIS_LOKASI().ultg}`,
                            sort_by: '-tgl_update,id_ref_lokasi'
                        }}
                        primaryKey={'id_ref_lokasi'}
                        respDataApi={handleRespDataApi}
                        selectionmode="singlerow"
                    />
                </div>
            }
        </>
    );
}

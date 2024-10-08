import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { KANTOR_COLUMN_JQX, } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
import axios from "axios";
// import { useSelector } from "react-redux";
// import qs from "query-string";
// import moment from 'moment';

// type Props = {



//   optionCurrentUser?: any;
//   optionJenisLayanan?: any;
//   optionJenisLayananTrafo?: any;
//   onFilterChange?: any;

// };
export default function JarKantorJQ() {
  const [roleActions, setRoleActions] = useState<any>({});
  // const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  // const { currentUser } = useSelector((state: any) => state.auth);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_lokasi: item?.id_ref_lokasi,
        number: item?.number,
        id_ref_lokasi_up3: item?.id_ref_lokasi_up3,
        id_ref_lokasi_subsistem: item?.id_ref_lokasi_subsistem,
        jenis: item?.ref_jenis_lokasi?.nama_jenis_lokasi,
        nama: item?.nama_lokasi,
        alamat: item?.alamat,
        lat: item?.lat,
        lon: item?.lon,
        unit_induk: item?.unit_induk?.nama_lokasi,
        up3: item?.ref_jenis_lokasi?.nama_jenis_lokasi == "ULP" ? item?.up3_1?.nama_lokasi : "",
        status_listrik: item?.status_listrik


      });
    });
    return dataTableValue;
  }

  const handleCheckedRows = (data: any) => {
    return data;
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("kantor-unit");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
    return () => {
      source.cancel();
    };
  }, []);

  // const [filterValues, setFilterValues] = useState<any>({
  //   id_ref_lokasi_up3: null,
  //   id_ref_lokasi_up2b: null,
  //   id_ref_lokasi_subsistem: null,

  //   date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
  //   time: queryParams?.time ? queryParams?.time : null,
  //   id_parent_lokasi: queryParams?.__parent_lokasi
  //     ? queryParams?.__parent_lokasi
  //     : null,
  //   id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
  //   id_pusat:
  //     optionCurrentUser?.level == "PUSAT"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : queryParams?.__pusat,
  //   id_regional:
  //     optionCurrentUser?.level == "REGIONAL"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : queryParams?.__regional,
  //   id_pemilik:
  //     optionCurrentUser?.level == "UNIT_INDUK"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : queryParams?.__pemilik,
  //   id_pengelola:
  //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : queryParams?.__pengelola,
  //   id_sub_pengelola:
  //     optionCurrentUser?.level == "ULP"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : queryParams?.__subpengelola,

  // });
  // const handleFilterChange = (newFilterValues: any) => {
  //   setFilterValues(newFilterValues);
  // };
  return (
    <>

      {/* <div className='px-2 mt-2'>
        <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} iskantor={true} />
      </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&

        <JqxTabs theme="light">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Kantor Unit</li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew

              //AKSI 
              // addbtn={roleActions?.create}
              // editable={roleActions?.update} // Edit on table
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}


              //TABLE DATA
              path={API_PATH().master.jaringan.ref_lokasi}
              filterParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().pusat},${JENIS_LOKASI().regional},${JENIS_LOKASI().uiw},${JENIS_LOKASI().uid},${JENIS_LOKASI().up3},${JENIS_LOKASI().ulp}, ${JENIS_LOKASI().up2d}, ${JENIS_LOKASI().up3b}, ${JENIS_LOKASI().up2b}, ${JENIS_LOKASI().upt}, ${JENIS_LOKASI().ultg}`, sort_by: '-tgl_update,id_ref_lokasi,id_unit_induk,id_up3_1,id_ulp_1' }}
              dataFieldsColsConfig={KANTOR_COLUMN_JQX()}
              primaryKey={'id_ref_lokasi'}
              respDataApi={handleRespDataApi}
              filterable={true}
              onRowSelected={handleCheckedRows}
              exportbtn={true}
            />
          </div>

        </JqxTabs>
      }
    </>
  );
}
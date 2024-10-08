import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { SUBSISTEM_COLUMN_JQX } from '@app/configs/react-table/master-jaringan.columns.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

//filtering options
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import qs from "query-string";
// type Props = {
//     optionCurrentUser?: any;
//     optionJenisLayanan?: any;
//     optionJenisLayananTrafo?: any;
//     onFilterChange?: any;

//   };
export default function SubsistemPageJQ() {
  const [roleActions, setRoleActions] = useState<any>({});
  // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_lokasi: item?.id_ref_lokasi,
        number: item?.number,
        nama: item?.nama_lokasi,
        id_user: item?.id_user,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        status_listrik: item?.status_listrik,

      });
    });
    return dataTableValue;
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("subsistem");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const [filterValues, setFilterValues] = useState<any>({
  //   id_ref_lokasi_up3: null,
  //   id_ref_lokasi_up2b: null,
  //   id_ref_lokasi_subsistem: null,
  //   id_ref_lokasi: null,

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
        <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isSubSistem={true} />
      </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs
          theme={"light"}
        >
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Subsistem</li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew
              //AKSI 
              // addbtn={roleActions?.create}
              editable={roleActions?.update} // Edit on table
              addbtn={roleActions.create}
              updatebtn={true}
              deletebtn={roleActions.delete}

              //TABLE DATA
              path={API_PATH().master.jaringan.ref_lokasi}
              filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().subsistem, sort_by: '-tgl_update,id_ref_lokasi' }}
              dataFieldsColsConfig={SUBSISTEM_COLUMN_JQX()}
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
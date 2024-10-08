import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { JENISPEMBANGKIT_COLUMN_JQX, } from '@app/configs/react-table/master-jaringan.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import qs from "query-string";
// type Props = {



//   optionCurrentUser?: any;
//   optionJenisLayanan?: any;
//   optionJenisLayananTrafo?: any;
//   onFilterChange?: any;

// };

export default function JarJenisPembangkitJQ() {
  const [roleActions, setRoleActions] = useState<any>({});
  // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("jenis-pembangkit");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);

  }, []);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_jenis_pembangkit: item?.id_ref_jenis_pembangkit,
        number: item?.number,
        nama: item?.nama,


      });
    });
    return dataTableValue;
  }

  const handleCheckedRows = (data: any) => {
    return data;
  }

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
        <MasterDataFilter onFilterChange={handleFilterChange} optionCurrentUser={currentUser} optionJenisLayanan={false} isUID={true} isUnitPembangkit={true} isPembangkit={true} />
      </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs
          theme={"light"}
        >
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Jenis Pembangkit</li>
            {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
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
              path={API_PATH().master.jaringan.jenis_pembangkit}
              filterParams={{ sort_by: 'nama' }}
              dataFieldsColsConfig={JENISPEMBANGKIT_COLUMN_JQX()}
              primaryKey={'id_ref_jenis_pembangkit'}
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

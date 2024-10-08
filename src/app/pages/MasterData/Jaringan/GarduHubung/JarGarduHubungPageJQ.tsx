import React, { useRef, useState, useEffect } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { GARDU_HUBUNG_COLUMNS_JQ } from '@app/configs/react-table/master-jaringan.columns.config';
import { IJaringanGarduHubung } from '@app/interface/jaringan-gardu-hubung.interface';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

//filtering options
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import qs from "query-string";


export default function JarGarduHubungPageJQ() {
  // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);
  const [roleActions, setRoleActions] = useState<any>({});
  useEffect(() => {

    let roleAccess = ROLE_ACCESS("gardu-hubung");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);

  }, []);
  const dataSelected = useRef<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IJaringanGarduHubung) => {
      dataTableValue.push({
        ...item,
        number: item.number,
        kode: item?.kode_lokasi,
        nama: item?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        alamat: item?.alamat,
        lat: item?.lat,
        lon: item?.lon,
        jenis_gardu: item?.jenis_gardu,
        fungsi_scada: item?.fungsi_scada,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        id_i: item?.id_i ? item?.id_i : "",
        id_v: item?.id_v ? item?.id_v : "",
        id_p: item?.id_p ? item?.id_p : "",
        id_amr: item?.id_amr ? item?.id_amr : "",
        id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
        url_webservice: item?.url_webservice ? item?.url_webservice : "",
        rekon_beban: item?.rekon_beban,
        status: item?.status_listrik,
      });
    });
    return dataTableValue;
  }

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data;
  }
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
  //       id_pusat:
  //         optionCurrentUser?.level == "PUSAT"
  //           ? optionCurrentUser?.id_unit_lokasi
  //           : queryParams?.__pusat,
  //       id_regional:
  //         optionCurrentUser?.level == "REGIONAL"
  //           ? optionCurrentUser?.id_unit_lokasi
  //           : queryParams?.__regional,
  //       id_pemilik:
  //         optionCurrentUser?.level == "UNIT_INDUK"
  //           ? optionCurrentUser?.id_unit_lokasi
  //           : queryParams?.__pemilik,
  //       id_pengelola:
  //         optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
  //           ? optionCurrentUser?.id_unit_lokasi
  //           : queryParams?.__pengelola,
  //       id_sub_pengelola:
  //         optionCurrentUser?.level == "ULP"
  //           ? optionCurrentUser?.id_unit_lokasi
  //           : queryParams?.__subpengelola,

  // });
  //   const handleFilterChange = (newFilterValues: any) => {
  //     setFilterValues(newFilterValues);
  // };
  return (
    <>
      {/* <div className='px-2 mt-2'>
                <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isGarduInduk={true} isGH={true}   />
              </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs theme="light">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Gardu Hubung</li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew
              //AKSI 

              // editable={roleActions?.update} // Edit on table
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}


              //TABLE DATA
              path={API_PATH().master.jaringan.ref_lokasi}
              filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().keypoint, fungsi_lokasi: 'GH', sort_by: '-id_ref_lokasi' }}
              dataFieldsColsConfig={GARDU_HUBUNG_COLUMNS_JQ()}
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
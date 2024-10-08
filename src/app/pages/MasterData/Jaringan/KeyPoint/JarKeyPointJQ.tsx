import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { KEYPOINT_COLUMN_JQX, } from '@app/configs/react-table/master-jaringan.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

//filtering options
// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import qs from "query-string";

export default function JarKeyPointJQ() {
  const [roleActions, setRoleActions] = useState<any>({});
  // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_lokasi: item?.id_ref_lokasi,
        number: item?.number,
        jenis_jaringan: item?.jenis_jaringan,
        nama: item?.nama_lokasi,
        kode: item?.kode_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        trafo_gi: item?.trafo_gi?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        zone: item?.zone?.nama_lokasi,
        alamat: item?.alamat,
        jenis_peralatan: item?.jenis_peralatan,
        lat: item?.lat,
        lon: item?.lon,
        fungsi_lokasi: item?.fungsi_lokasi,
        unit_induk: item?.unit_induk?.nama_lokasi,
        up3_1: item?.up3_1?.nama_lokasi,
        ulp_1: item?.ulp_1?.nama_lokasi,
        count_gardu: item?.count_gardu,
        no_tiang: item?.no_tiang,
        fungsi_scada: item?.fungsi_scada,
        zona: item?.zona,
        kva: item?.kva,
        jenis_gardu: item?.jenis_gardu,
        id_pemilik: item?.id_pemilik,
        panjang_jaringan: item?.panjang_jaringan,
        jumlah_pelanggan: item?.jumlah_pelanggan,
        provinsi: item?.ref_district?.regency?.province?.name,
        kab: item?.ref_district?.regency?.name,
        kec: item?.ref_district?.name,
        status_listrik: item?.status_listrik,
        rekon_beban: item?.rekon_beban,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        id_i: item?.id_i ? item?.id_i : "",
        id_v: item?.id_v ? item?.id_v : "",
        id_p: item?.id_p ? item?.id_p : "",
        id_amr: item?.id_amr ? item?.id_amr : "",
        id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
      });
    });
    return dataTableValue;
  }

  const handleCheckedRows = (data: any) => {
    return data;
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("pengaman-jaringan-sutm");
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
        <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isGarduInduk={true} isKP={true} />
      </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs theme="light">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> KeyPoint</li>
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
              filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().keypoint }}
              dataFieldsColsConfig={KEYPOINT_COLUMN_JQX()}
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

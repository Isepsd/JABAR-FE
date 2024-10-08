import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { TRAFO_GI_COLUMNS_JQX } from '@app/configs/react-table/master-jaringan.columns.config';
import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
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

export default function JarTrafoGIPageJQ() {
  // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);
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

  const [roleActions, setRoleActions] = useState<any>({});
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IJaringan) => {
      dataTableValue.push({
        ...item,
        id_ref_lokasi: item?.id_ref_lokasi,
        number: item?.number,
        nama: item?.nama_lokasi,
        pemilik: item?.pemilik,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        id_unit_induk: item?.unit_induk?.nama_lokasi,
        alamat: item?.alamat,
        sub_sistem: item?.sub_sistem,
        lat: item?.lat,
        lon: item?.lon,
        no_urut: item?.no_urut,
        kapasitas: item?.kapasitas ? item?.kapasitas : "",
        coverage: item?.coverage ? item?.coverage : "",
        status_trafo: item?.status_trafo ? item?.status_trafo : "",
        i_max: item?.i_max ? item?.i_max : "",
        ratio_ct: item?.ratio_ct ? item?.ratio_ct : "",
        fk_meter_pembanding: item?.fk_meter_pembanding ? item?.fk_meter_pembanding : "",
        primer_tegangan_max: item?.primer_tegangan_max ? item?.primer_tegangan_max : "",
        primer_tegangan_min: item?.primer_tegangan_min ? item?.primer_tegangan_min : "",
        sekunder_tegangan_min: item?.sekunder_tegangan_min ? item?.sekunder_tegangan_min : "",
        sekunder_tegangan_max: item?.sekunder_tegangan_max ? item?.sekunder_tegangan_max : "",
        sinkron_data: item?.sinkron_data ? item?.sinkron_data : "",
        jenis_layanan: item?.jenis_layanan ? item?.jenis_layanan : "",
        nama_sub_sistem: item?.nama_sub_sistem ? item?.nama_sub_sistem : "",
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        id_i: item?.id_i ? item?.id_i : "",
        id_v: item?.id_v ? item?.id_v : "",
        id_p: item?.id_p ? item?.id_p : "",
        id_amr: item?.id_amr ? item?.id_amr : "",
        id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
        url_webservice: item?.url_webservice ? item?.url_webservice : "",
        def_nilai_cosq: item?.def_nilai_cosq ? item?.def_nilai_cosq : "",
        def_pengukuran_teg_sekunder: item?.def_pengukuran_teg_sekunder ? item?.def_pengukuran_teg_sekunder : "",
        def_pengukuran_teg_primer: item?.def_pengukuran_teg_primer ? item?.def_pengukuran_teg_primer : "",
        rekon_beban: item?.rekon_beban,
        status: item?.status_listrik,
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


  // });
  // const handleFilterChange = (newFilterValues: any) => {
  //   setFilterValues(newFilterValues);
  // };
  return (
    <>
      {/* <div className='px-2 mt-2'>
        <MasterDataFilter optionCurrentUser={currentUser} onFilterChange={handleFilterChange} isGarduInduk={true} />
      </div> */}
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs theme="light">
          <ul style={{ marginLeft: 10 }} key="1">
            <li> <i className="fa-solid fa-server"></i> Trafo GI</li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew
              // AKSI
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}
              // TABLE DATA
              path={API_PATH().master.jaringan.ref_lokasi}
              filterParams={{
                id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                sort_by: '-tgl_update,id_ref_lokasi'
              }}
              dataFieldsColsConfig={TRAFO_GI_COLUMNS_JQX()}
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

import React, { useEffect, useState } from 'react';

/** CONFIG */
import { SEGMENT_COLUMN_JQX } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

import moment from 'moment';
import qs from "query-string";

type Props = {
  optionCurrentUser?: any;
};

export default function JarSegmentJQ({ optionCurrentUser }: Props) {
  const [roleActions, setRoleActions] = useState<any>({});
  const queryParams = qs.parse(location.search);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_lokasi: item?.id_ref_lokasi,
        number: item.number,
        jenis_jaringan: item?.jenis_jaringan,
        nama: item?.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        trafo_gi: item?.trafo_gi?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        zone: item?.zone?.nama_lokasi,
        alamat: item?.alamat,
        kva: item?.kva,
        uid: item?.uid?.nama_lokasi,
        up3_1: item?.up3_1?.nama_lokasi,
        ulp_1: item?.ulp_1?.nama_lokasi,
        panjang_jaringan: item?.panjang_jaringan,
        count_gardu: item?.count_gardu,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        id_i: item?.id_i,
        id_p: item?.id_p,
        id_v: item?.id_v,
        id_amr: item?.id_amr,
        id_portal_ext: item?.id_portal_ext,
        url_webservice: item?.url_webservice,
        status_listrik: item?.status_listrik,
      });
    });
    return dataTableValue;
  }

  const handleCheckedRows = (data: any) => {
    return data;
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("segment");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  const [filterValues] = useState<any>({
    id_ref_lokasi_up3: null,
    id_ref_lokasi_up2b: null,
    id_ref_lokasi_subsistem: null,
    id_ref_lokasi: null,
    date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    time: queryParams?.time ? queryParams?.time : null,
    id_parent_lokasi: queryParams?.__parent_lokasi
      ? queryParams?.__parent_lokasi
      : null,
    id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pusat,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__regional,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pemilik,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pengelola,
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__subpengelola,
  });

  return (
    <>
      {roleActions.view && roleActions.create && roleActions.update && roleActions.delete &&
        <div key="2">
          <TableDataJqxGridNew
            addbtn={roleActions.create}
            updatebtn={roleActions.update}
            deletebtn={roleActions.delete}
            path={API_PATH().master.jaringan.ref_lokasi}
            filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().keypoint, fungsi_lokasi: 'SEGMENT', sort_by: '-id_ref_lokasi', ...filterValues }}
            dataFieldsColsConfig={SEGMENT_COLUMN_JQX()}
            primaryKey={'id_ref_lokasi'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>
      }
    </>
  );
}

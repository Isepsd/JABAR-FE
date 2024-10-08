// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef, useState } from "react";
// import { useSelector } from "react-redux";

/** CONFIG */
import { ASET_REF_ASET_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";
// import CardWidget from "@app/components/Card/CardWidget";
/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";
// import BoxPrioritasAset from "@app/modules/Dashboard/BoxPrioritasAset";
// import BoxStatusHarAset from "@app/modules/Dashboard/BoxStatusHarAset";
import CardPage from "@app/components/Card/CardPage";
import Filter from "./Filter";
import CardWidget from "@app/components/Card/CardWidget";
/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";

export default function TransMutasiPage() {
  let roleAccess = ROLE_ACCESS("aset-ref");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    create: ROLE_ACTION(roleAccess, "create"),
    update: ROLE_ACTION(roleAccess, "update"),
    delete: ROLE_ACTION(roleAccess, "delete"),
  };
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        // id: item?.id_ref_aset,
        // group_aset: item?.ref_aset_group?.nama,
        // parent_aset: item?.ref_aset_parent?.deskripsi,
        // kategori_aset: item?.ref_aset_kategori?.nama,
        // manufaktur: item?.ref_aset_manufaktur?.nama,
        // kondisi_aset: item?.ref_aset_kondisi?.nama,
        // status_aset: item?.ref_aset_status?.nama,
        // ruangan: item?.ref_aset_ruangan?.nama,
        // lantai: item?.ref_aset_lantai?.nama,
        // rak: item?.ref_aset_rak?.nama,
        // prioritas: item?.ref_prioritas?.nama,
        // bagian: item?.ref_bagian?.nama,
        // station: item?.ref_lokasi_station?.kode_lokasi,
        // trafo: item?.ref_lokasi_trafo?.nama_lokasi,
        // penyulang: item?.ref_lokasi_penyulang?.kode_lokasi,
      });
    });

    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>();
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };
  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
  };

  return (
    <>
      <CardWidget title="FILTER">
        <Filter
          // setAdd={true}
          onFilterChange={handleFilterChange}
        />
      </CardWidget>
      {roleActions.create && roleActions.update && roleActions.delete && (
        <div>
          <CardPage title="WO Mutasi">
            <TableDataJqxGridEam
              //AKSI
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}
              //TABLE DATA
              path={API_PATH().eam.eam_trans_wo}
              filterParams={{
                ...filterValues,
              }}
              sortBy={"-tgl_entri,-nomor_wo"}
              dataFieldsColsConfig={ASET_REF_ASET_COLUMNS_JQ()}
              primaryKey={"id"}
              respDataApi={handleRespDataApi}
              filterable={true}
              onRowSelected={handleCheckedRows}
              exportbtn={true}
            />
          </CardPage>
        </div>
      )}
    </>
  );
}

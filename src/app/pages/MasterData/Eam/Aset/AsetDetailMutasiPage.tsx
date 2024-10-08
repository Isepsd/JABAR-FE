// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef, useState } from "react";
/** CONFIG */
import { ASET_REF_ASET_RIWAYAT_MUTASI_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";
// import CardWidget from "@app/components/Card/CardWidget";
/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";

export default function AsetDetailMutasiPage({ filterParams }: any) {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  const [id_ref_aset] = useState(filterParams?.id_ref_aset);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: filterParams?.id_ref_aset,
      });
    });
    return dataTableValue;
  };

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data;
  };

  return (
    <>
      {filterParams?.id_ref_aset && (
        <TableDataJqxGridEam
          //AKSI
          addbtn={false}
          updatebtn={false}
          deletebtn={false}
          // addMutasi={filterParams?.roleActions?.create}
          addMutasi={false}
          //TABLE DATA
          path={API_PATH().eam.eam_trans_aset_mutasi}
          filterParams={filterParams}
          dataFieldsColsConfig={ASET_REF_ASET_RIWAYAT_MUTASI_COLUMNS_JQ()}
          primaryKey={{ id_ref_aset }}
          respDataApi={handleRespDataApi}
          filterable={true}
          onRowSelected={handleCheckedRows}
          exportbtn={false}
          reloadbtn={false}
          showtoolbar={false}
        />
      )}
    </>
  );
}

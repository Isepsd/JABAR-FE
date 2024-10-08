// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef } from "react";
/** CONFIG */
import { ASET_REF_ASET_EXT_ATR_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";
// import CardWidget from "@app/components/Card/CardWidget";
/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";

export default function AsetDetailPage({ filterParams }: any) {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: item?.id_ref_aset_ext_atr,
        atribut: item?.ref_aset_kategori_ext_atr?.nama,
        satuan: item?.ref_aset_kategori_ext_atr?.satuan,
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
          //TABLE DATA
          path={API_PATH().master.eam.eam_ref_aset_ext_atr}
          filterParams={filterParams}
          sortBy={"urutan"}
          dataFieldsColsConfig={ASET_REF_ASET_EXT_ATR_COLUMNS_JQ()}
          primaryKey={"id"}
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

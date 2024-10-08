// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef, useState } from "react";
/** CONFIG */
import { ASET_REF_KATEGORI_EXT_ATR_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";

/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";
import AsetKategoriExtAtrForm from "./AsetKategoriExtAtrForm";
import ModalEamForm from "@app/components/Modals/ModalEamForm";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";

export default function AsetKategoriExtAtrPage({ filterParams }: any) {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    //console.log("dataTableValue");
    let dataTableValue: any = [];

    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: item?.id_ref_aset_kategori_ext_atr,
        nama: item?.nama,
        group_aset: item?.ref_aset_group?.nama,
        status: item?.status,
      });
    });

    //console.log(dataTableValue);
    return dataTableValue;
  };

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data;
  };

  const [modal, setModal] = useState<any>({
    approved: false,
    size: "md",
    title: `Atribut`,
    id_ref_aset_kategori: filterParams?.id_ref_aset_kategori,
  });

  /** HANDLE ADD */
  const handleAddClick = () => {
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  return (
    <>
      {filterParams?.id_ref_aset_kategori && (
        <TableDataJqxGridEam
          //AKSI
          addbtn={filterParams?.roleAccess?.create}
          updatebtn={filterParams?.roleAccess?.update}
          deletebtn={filterParams?.roleAccess?.delete}
          onClickAdd={handleAddClick}
          onClickUpdate={handleAddClick}
          //TABLE DATA
          sortBy={"urutan"}
          path={API_PATH().master.eam.eam_ref_aset_kategori_ext_atr}
          filterParams={filterParams}
          dataFieldsColsConfig={ASET_REF_KATEGORI_EXT_ATR_COLUMNS_JQ()}
          primaryKey={"id"}
          respDataApi={handleRespDataApi}
          filterable={true}
          onRowSelected={handleCheckedRows}
          exportbtn={false}
        />
      )}
      <ModalEamForm modalProps={modal}>
        <AsetKategoriExtAtrForm paramid={filterParams?.id_ref_aset_kategori} />
      </ModalEamForm>
    </>
  );
}

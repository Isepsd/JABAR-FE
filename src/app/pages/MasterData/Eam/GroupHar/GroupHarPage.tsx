// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef } from "react";
import CardPage from "@app/components/Card/CardPage";

/** CONFIG */
import { ASET_REF_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";

/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";

export default function GroupHarPage() {
  let roleAccess = ROLE_ACCESS("aset-group");
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
        number: item?.number,
        id: item?.id_ref_group_har,
        nama: item?.nama,
        status: item?.status,
      });
    });
    return dataTableValue;
  };

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data;
  };

  return (
    <>
      {roleActions.create && roleActions.update && roleActions.delete && (
        <CardPage title="Group Har">
          <TableDataJqxGridEam
            //AKSI
            addbtn={roleActions.create}
            updatebtn={roleActions.update}
            deletebtn={roleActions.delete}
            //TABLE DATA
            sortBy={"-nama"}
            path={API_PATH().master.eam.eam_ref_group_har}
            filterParams={{}}
            dataFieldsColsConfig={ASET_REF_COLUMNS_JQ()}
            primaryKey={"id"}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </CardPage>
      )}
    </>
  );
}

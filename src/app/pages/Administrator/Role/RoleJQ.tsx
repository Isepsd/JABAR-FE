import React, { useEffect, useState } from "react";

/** CONFIG */
import { ROLE_COLUMNS_JQX } from "@app/configs/react-table.config";

/** COMPONENTS */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import "jqwidgets-scripts/jqwidgets/jqxtabs";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function RoleJQ() {
  const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        name: item?.name,
        description: item?.description,
        level: item?.level,
      });
    });
    return dataTableValue;
  };

  const handleCheckedRows = (data: any) => {
    return data;
  };
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }

  // Initialize jqxTabs
  useEffect(() => {
    const tabs = document.getElementById("tabs");
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, "jqxTabs", {
        theme: "light",
        reorder: true,
      });
    }

    let roleAccess = ROLE_ACCESS("roles");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      create: ROLE_ACTION(roleAccess, "create"),
      update: ROLE_ACTION(roleAccess, "update"),
      delete: ROLE_ACTION(roleAccess, "delete"),
      settings: ROLE_ACTION(roleAccess, "setting"),
    };
    setRoleActions(roleAct);
    console.log("roleAct", roleAct);
  }, []);

  return (
    <>
      <div id="tabs">
        <ul style={{ marginLeft: 10 }} key="1">
          <li>
            <i className="fa-solid fa-server"></i> Roles
          </li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew
            //AKSI
            // addbtn={roleActions?.create}
            // editable={roleActions?.update} // Edit on table
            // addbtn={roleActions.create}
            exportbtn={false}
            addbtn={roleActions.create}
            updatebtn={roleActions.update}
            SetPrivilegesbtn={roleActions.settings}
            // deletebtn={roleActions.delete}

            //TABLE DATA
            path={API_PATH().admin.role}
            filterParams={{}}
            dataFieldsColsConfig={ROLE_COLUMNS_JQX()}
            primaryKey={"id"}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
          />
        </div>
      </div>
    </>
  );
}

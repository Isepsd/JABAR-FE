import React, { useEffect, useState } from 'react';

/** CONFIG */
import { USERS_MANAGEMENT_COLUMNS_JQX, } from '@app/configs/react-table.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

const renderFullnameUsernameCell = (row: number, column: any, value: any, rowData: any) => {
    // const avatarUrl = rowData.avatar ? `${process.env.API_CDN}${rowData.avatar}` : '/static/avatar.png';
    
    return `
        <div class="d-flex align-items-center">
       
            <div class="ps-3">
                <div class="name font-weight-bold" style="font-size: 16px;">${rowData.fullname || ''}</div>
                <div class="subname" style="font-size: 12px; font-weight: 400; line-height: 1;">${rowData.username || ''}</div>
            </div>
        </div>
    `;
}


export default function RoleJQ() {
    const [roleActions, setRoleActions] = useState<any>({});
  
    const handleRespDataApi = (data:any) => {
        return data.map((item:any) => {
          return {
            number: item?.number,
            id_user:item?.id_user,
            fullname_username: renderFullnameUsernameCell(0, null, null, item), // Panggil dengan parameter yang sesuai
            avatar: item.avatar, // Ensure avatar is passed to renderer
            phone: (
              <div
                className="cursor-pointer"
                onClick={() => item.phone && window.open(`tel:${item.phone}`, "_blank")}
              >
                {item.phone}
              </div>
            ),
            jabatan: item.jabatan?.nama,
            hak_akses: item.role?.name,
            role: item.role,
            level: item.level,
            unit: item.unit,
            email: item.email, // Panggil dengan parameter yang sesuai
            status: item?.status,
          };
        });
      };


    const handleCheckedRows = (data: any) => {
        return data;
    }
    // const handleCheckedRows2 = (data: any) => {
    //     return data;
    // }

    // Initialize jqxTabs
    useEffect(() => {
        const tabs = document.getElementById('tabs');
        if (tabs) {
            (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
        }

        let roleAccess = ROLE_ACCESS("admin-user");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, "view"),
            create: ROLE_ACTION(roleAccess, "create"),
            update: ROLE_ACTION(roleAccess, "update"),
            delete: ROLE_ACTION(roleAccess, "delete"),
        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);

    }, []);


    return (
        <>
            <div id="tabs">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Roles</li>
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
                        SetPassword={roleActions.update}
                        // deletebtn={roleActions.delete}

                        //TABLE DATA
                        path={API_PATH().admin.user}
                        filterParams={{sort_by: "fullname",}}
                        dataFieldsColsConfig={USERS_MANAGEMENT_COLUMNS_JQX()}
                        primaryKey={'id_user'}
                        respDataApi={handleRespDataApi}
                        filterable={true}
                        onRowSelected={handleCheckedRows}
                  
                    />
                </div>

            </div>
        </>
    );
}

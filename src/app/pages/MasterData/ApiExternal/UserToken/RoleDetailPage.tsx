import React, { useRef, useState } from 'react';

/** CONFIG */
import { MASTER_ROLES_TOKEN_DETAIL_COLUMN_JQX } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import RoleDetailForm from "./RoleDetailForm";
import ModalForm from "@app/components/Modals/ModalForm";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';

export default function RoleDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("user-token");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_token_role: item?.id_token_role,
                number: item?.number,
                nama:item?.ext_module.nama,
                tanggal_buat: item.ext_user_token.created_at ? moment(item.created_at).format("DD-MM-YYYY HH:mm") : '-',
                id_module:item?.id_module
            });
        });
        return dataTableValue;
    }

    const [modal, setModal] = useState<any>({
        approved: false,
        size: "lg",
        title: `Tambah Module`,
        id_token: filterParams?.id_token,
    });

    /** HANDLE ADD */
    const handleAddClick = () => {
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.id_token &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={handleAddClick}
                    deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().master.external.user_token_role}
                    filterParams={filterParams}
                    dataFieldsColsConfig={MASTER_ROLES_TOKEN_DETAIL_COLUMN_JQX()}
                    primaryKey={'id_token_role'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

            <ModalForm modalProps={modal}>
                <RoleDetailForm paramid={filterParams?.id_token} />
            </ModalForm>
        </>
    );
}

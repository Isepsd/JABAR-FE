import React, { useRef, useState } from 'react';

/** CONFIG */
import { JENIS_POINT_DETAIL_COLUMNS_JQ } from '@app/configs/react-table/master-fasop.columns.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import JenisPointDetailForm from './JenisPointDetailForm';
import ModalForm from "@app/components/Modals/ModalForm";
import { IFasopPointTypeState } from '@app/interface/fasop-pointtype-state.interface';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function GroupWhatsappDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("jenis-point");
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
        data?.forEach((item: IFasopPointTypeState) => {
            dataTableValue.push({
                number: item?.number,
                id_pointtype_state: item?.id_pointtype_state,
                // value: item.statekey || '-',
                value: item.statekey,
                quality_code: item?.quality_code,
                // quality_code: item?.quality_code || '-',
                state_label: item.name,
                // valid: (
                //   <div className='position-relative text-center w-100'>
                //     <Form.Check checked={!!item?.valid} disabled />
                //   </div>
                // ),
                // status: (
                //   <div className='position-relative text-center w-100'>
                //     <Form.Check checked={!!item.status} disabled />
                //   </div>
                // ),
            });
        });
        return dataTableValue;
    }

    const [modal, setModal] = useState<any>({
        approved: false,
        size: "lg",
        title: `Tambah Kontak`,
        id_wa_group: filterParams?.id_wa_group,
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
            {filterParams?.id_pointtype &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={handleAddClick}
                    deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().master.fasop.point_type_state}
                    filterParams={filterParams}
                    dataFieldsColsConfig={JENIS_POINT_DETAIL_COLUMNS_JQ()}
                    primaryKey={'id_pointtype_state'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

<ModalForm modalProps={modal} ids='ids'>
        <JenisPointDetailForm></JenisPointDetailForm>
      </ModalForm>
        </>
    );
}

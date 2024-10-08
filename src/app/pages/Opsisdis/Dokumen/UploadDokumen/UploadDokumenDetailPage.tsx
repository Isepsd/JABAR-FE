import React, { useRef, useState } from 'react';

/** CONFIG */
import { OPSISDIS_DAFTAR_DOKUMEN_DETAIL_COLUMN_JQX } from "@app/configs/react-table/opsisdis.column.config";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import ModalForm from "@app/components/Modals/ModalForm";
import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";
import UploadDokumenDetailFormPage from "./UploadDokumenDetailFormPage";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function UploadDokumenDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("upload-dokumen");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, "create"),
        update: ROLE_ACTION(roleAccess, "update"),
        delete: ROLE_ACTION(roleAccess, "delete"),
    };

    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            if (item?.kat_dok_id === filterParams?.kat_dok_id) {
                dataTableValue.push({
                    number: item?.number,
                    kat_dok_detail_id: item?.kat_dok_detail_id,
                    nama: item?.nama,
                    keterangan: item?.keterangan,
                    created_at: item?.created_at,
                });
            }
        });
        return dataTableValue;
    }

    const [modal, setModal] = useState<any>({
        approved: false,
        size: "lg",
        title: `Tambah Detail Kategori Dokumen`,
        kat_dok_id: filterParams?.kat_dok_id,
        // mode: 'add', // 'edit' for update mode
        // data: null,
    });

    const [modaledit, setModalEdit] = useState<any>({
        approved: false,
        size: "lg",
        title: `Detail Kategori Dokumen`,
        kat_dok_id: filterParams?.kat_dok_id,
        // mode: 'add', // 'edit' for update mode
        // data: null,
    });

    /** HANDLE ADD */
    const handleAddClick = () => {
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
            // mode: 'add',
            // kat_dok_id: filterParams?.kat_dok_id,
            // title: `Tambah Detail Kategori Dokumen`,
            // data: null,
        }));
    };

    /** HANDLE EDIT */
    const handleEditClick = () => {
        if (dataSelected.current) {
            setModalEdit((prevState: any) => ({
                ...prevState,
                show: true,
                // mode: 'edit',
                // title: `Detail Kategori Dokumen`,
                // data: dataSelected.current,
            }));
        } else {
            alert("Pilih data terlebih dahulu!");
        }
    };

    /** HANDLE DELETE */
    const handleDeleteClick = () => {
        if (dataSelected.current) {
            if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                // Call delete API endpoint
                // Example: API.delete(API_PATH().opsisdis.dokumen.kategori_dokumen_detail, dataSelected.current.kat_dok_detail_id)
                alert("Data berhasil dihapus!");
                // Refresh data if needed
            }
        } else {
            alert("Pilih data terlebih dahulu!");
        }
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {roleActions.view && roleActions.create && roleActions.update && roleActions.delete && (
                <JqxTabs theme='light'>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li>
                            <i className="fa fa-file"></i> Detail Kategori Dokumen
                        </li>
                    </ul>
                    <div key="2">

                        <TableDataJqxGridNew
                            addbtn={roleActions.create}
                            onClickAdd={handleAddClick}
                            updatebtn={roleActions.update}
                            onClickUpdate={handleEditClick}
                            deletebtn={roleActions.delete}
                            onClickDelete={handleDeleteClick}
                            path={API_PATH().opsisdis.dokumen.kategori_dokumen_detail}
                            filterParams={filterParams}
                            dataFieldsColsConfig={OPSISDIS_DAFTAR_DOKUMEN_DETAIL_COLUMN_JQX()}
                            primaryKey={'kat_dok_detail_id'}
                            respDataApi={handleRespDataApi}
                            filterable={true}
                            onRowSelected={handleRowSelected}
                            exportbtn={false}
                            reloadbtn={true}
                        />


                    </div>
                </JqxTabs>
            )}

            <ModalForm modalProps={modal}>
                <UploadDokumenDetailFormPage
                    kat_dok_id={filterParams?.kat_dok_id}
                />
            </ModalForm>

            <ModalForm modalProps={modaledit}>
                <UploadDokumenDetailFormPage
                    kat_dok_id={filterParams?.kat_dok_id}
                />
            </ModalForm>
        </>
    )
}

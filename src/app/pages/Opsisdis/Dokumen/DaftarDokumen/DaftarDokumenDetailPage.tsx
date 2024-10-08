import React, { useRef } from 'react';

/** CONFIG */
import { OPSISDIS_DAFTAR_DOKUMEN_DETAIL_COLUMN_JQX } from "@app/configs/react-table/opsisdis.column.config";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import ModalForm from "@app/components/Modals/ModalForm";
import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";
// import UploadDokumenDetailFormPage from "./UploadDokumenDetailFormPage";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function UploadDokumenDetailPage({ filterParams }: any) {
    let roleAccess = ROLE_ACCESS("upload-dokumen");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        // create: ROLE_ACTION(roleAccess, "create"),
        // update: ROLE_ACTION(roleAccess, "update"),
        // delete: ROLE_ACTION(roleAccess, "delete"),
    };

    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            if (item?.kat_dok_id === filterParams?.kat_dok_id) {  // Memfilter data berdasarkan filterParams
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

    // const [modal, setModal] = useState<any>({
    //     approved: false,
    //     size: "lg",
    //     title: `Tambah Detail Kategori Dokumen`,
    //     kat_dok_id: filterParams?.kat_dok_id,
    // });

    /** HANDLE ADD */
    // const handleAddClick = () => {
    //     setModal((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));
    // };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {roleActions.view && (
                <JqxTabs theme='light'>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li>
                            <i className="fa fa-file"></i> Detail Kategori Dokumen
                        </li>
                    </ul>
                    <div key="2">
                        {filterParams?.kat_dok_id ? (
                            <TableDataJqxGridNew
                                // addbtn={roleActions.create}
                                // onClickAdd={handleAddClick}
                                // updatebtn={roleActions.update}
                                // deletebtn={roleActions.delete}
                                path={API_PATH().opsisdis.dokumen.kategori_dokumen_detail}
                                filterParams={filterParams}  // Menerapkan filterParams ke TableDataJqxGridNew
                                dataFieldsColsConfig={OPSISDIS_DAFTAR_DOKUMEN_DETAIL_COLUMN_JQX()}
                                primaryKey={'kat_dok_detail_id'}
                                respDataApi={handleRespDataApi}
                                filterable={true}
                                onRowSelected={handleRowSelected}
                                exportbtn={false}
                                reloadbtn={true} // Add reload button if needed
                            />
                        ) : (
                            <div className="alert alert-warning" role="alert">
                                Silahkan Pilih Kategori Dokumen Terlebih Dahulu!
                            </div>
                        )}
                    </div>
                </JqxTabs>
            )}

        </>
    )
}

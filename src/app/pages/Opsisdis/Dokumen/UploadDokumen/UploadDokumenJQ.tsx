import React, { useState, useRef } from "react";
import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";

/** CONFIG */
import { OPSISDIS_DAFTAR_DOKUMEN_COLUMN_JQX } from "@app/configs/react-table/opsisdis.column.config";

/** COMPONENTS */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import UploadDokumenDetailPage from "./UploadDokumenDetailPage";
import { Card, Col, Row } from "react-bootstrap";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";

export default function UploadDokumenJQ() {
  // let roleAccess = ROLE_ACCESS("group-portal");
  let roleAccess = ROLE_ACCESS("upload-dokumen");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    create: ROLE_ACTION(roleAccess, "create"),
    update: ROLE_ACTION(roleAccess, "update"),
    delete: ROLE_ACTION(roleAccess, "delete"),
  };
  const dataSelected = useRef<any>();
  const [details, setDetails] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        kat_dok_id: item?.kat_dok_id,
        nama: item?.nama,
        bidang: item?.bidang,
      });
    });
    return dataTableValue;
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.kat_dok_id);
  };

  return (
    <>
      {roleActions.view && roleActions.create && roleActions.update && roleActions.delete && (
        <Row>
          <Col md={6}> {/* Tabel data di kolom kiri */}
            <JqxTabs theme="light">
              <ul style={{ marginLeft: 10 }} key="1">
                <li>
                  <i className="fa fa-file"></i> Kategori Dokumen
                </li>
              </ul>
              <div key="2">
                <TableDataJqxGridNew
                  //AKSI
                  addbtn={roleActions.create}
                  updatebtn={roleActions.update}
                  deletebtn={roleActions.delete}
                  //TABLE DATA
                  path={API_PATH().opsisdis.dokumen.kategori_dokumen}
                  filterParams={{}}
                  dataFieldsColsConfig={OPSISDIS_DAFTAR_DOKUMEN_COLUMN_JQX()}
                  primaryKey={"kat_dok_id"}
                  respDataApi={handleRespDataApi}
                  filterable={true}
                  onRowSelected={handleRowSelected}
                  exportbtn={false}
                />
              </div>
            </JqxTabs>
          </Col>

          <Col md={6}> {/* Komponen detail di kolom kanan */}
            <Card className="card-widget">
              <UploadDokumenDetailPage
                filterParams={{ kat_dok_id: details ? details : null }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

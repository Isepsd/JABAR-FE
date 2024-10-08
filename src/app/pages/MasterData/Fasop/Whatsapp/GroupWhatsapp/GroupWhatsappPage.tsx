import React, { useState, useRef } from "react";
import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";

/** CONFIG */
import { WHATSAPP_GROUP_COLUMNS } from "@app/configs/react-table/master-fasop.columns.config";

/** COMPONENTS */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import GroupWhatsappDetailPage from "./GroupWhatsappDetailPage";
import { Card, Col, Row } from "react-bootstrap";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";

export default function GroupWhatsappPage() {
  // let roleAccess = ROLE_ACCESS("group-portal");
  let roleAccess = ROLE_ACCESS("group");
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
        id_wa_group: item?.id_wa_group,
        nama: item?.nama,
        nama_bot: item?.bot?.nama,
        status: item?.status,
      });
    });
    return dataTableValue;
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_wa_group);
  };

  return (
    <>
      {roleActions.create && roleActions.update && roleActions.delete && (
        <JqxTabs>
          <ul style={{ marginLeft: 10 }} key="1">
            <li>
              <i className="fa-solid fa-server"></i> Group Portal
            </li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew
              //AKSI
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}
              //TABLE DATA
              path={API_PATH().master.fasop.whatsapp.group}
              filterParams={{}}
              dataFieldsColsConfig={WHATSAPP_GROUP_COLUMNS()}
              primaryKey={"id_wa_group"}
              respDataApi={handleRespDataApi}
              filterable={true}
              onRowSelected={handleRowSelected}
              exportbtn={true}
            />
            <hr className="my-4" />

            <Row>
              <Col md={12} className="mb-4">
                <Card className="card-widget">
                  <Card.Header>
                    {" "}
                    Detail Kontak Group {dataSelected?.current?.nama}
                  </Card.Header>
                  <GroupWhatsappDetailPage
                    filterParams={{ id_wa_group: details ? details : null }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </JqxTabs>
      )}
    </>
  );
}

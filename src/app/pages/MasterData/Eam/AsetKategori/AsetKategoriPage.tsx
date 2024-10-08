// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef, useState } from "react";
import CardPage from "@app/components/Card/CardPage";
import { Card, Col, Row } from "react-bootstrap";
/** CONFIG */
import { ASET_REF_KATEGORI_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";

/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";
import styled from "styled-components";
/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import AsetKategoriExtAtrPage from "./AsetKategoriExtAtrPage";
export default function AsetKategoriPage() {
  let roleAccess = ROLE_ACCESS("aset-kategori");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    create: ROLE_ACTION(roleAccess, "create"),
    update: ROLE_ACTION(roleAccess, "update"),
    delete: ROLE_ACTION(roleAccess, "delete"),
  };
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  const [details, setDetails] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    //console.log("dataTableValue");
    let dataTableValue: any = [];

    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: item?.id_ref_aset_kategori,
        id_ref_aset_kategori: item?.id_ref_aset_kategori,
        nama: item?.nama,
        aset_group: item?.ref_aset_group?.nama,
        status: item?.status,
      });
    });

    //console.log(dataTableValue);
    return dataTableValue;
  };

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_ref_aset_kategori);
  };

  return (
    <>
      {roleActions.create && roleActions.update && roleActions.delete && (
        <Row className="gx-2 mb-1">
          <Col md={7}>
            <CardPage title="Kategori Aset">
              <TableDataJqxGridEam
                //AKSI
                addbtn={roleActions.create}
                updatebtn={roleActions.update}
                deletebtn={roleActions.delete}
                //TABLE DATA
                path={API_PATH().master.eam.eam_ref_aset_kategori}
                sortBy={"-id_ref_aset_group,nama"}
                filterParams={false}
                dataFieldsColsConfig={ASET_REF_KATEGORI_COLUMNS_JQ()}
                primaryKey={"id"}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
              />
            </CardPage>
          </Col>
          <Col md={5} className="mb-10">
            <Card>
              <CardHeader>
                <i className="fa-solid fa-layer-group"></i>
                <strong>
                  {" "}
                  Atribut by Kategori {dataSelected?.current?.nama}
                </strong>
              </CardHeader>
              <Card.Body className="mb-10">
                <AsetKategoriExtAtrPage
                  filterParams={{
                    id_ref_aset_kategori: details ? details : null,
                    roleAccess: roleActions,
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

const CardHeader = styled(Card.Header)`
  background: transparent;
  font-size: 1.15rem;
  padding: 0.65rem 1rem;
`;

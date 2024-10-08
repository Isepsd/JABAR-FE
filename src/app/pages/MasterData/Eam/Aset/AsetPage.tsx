// import React, { useRef,useState,useEffect } from 'react';
import React, { useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
/** CONFIG */
import { ASET_REF_ASET_COLUMNS_JQ } from "@app/configs/react-table/master-eam.columns.config";
// import CardWidget from "@app/components/Card/CardWidget";
/** COMPONENTS */
import TableDataJqxGridEam from "@app/modules/Table/TableDataJqxGridEam";
// import BoxPrioritasAset from "@app/modules/Dashboard/BoxPrioritasAset";
// import BoxStatusHarAset from "@app/modules/Dashboard/BoxStatusHarAset";
import CardPage from "@app/components/Card/CardPage";
import Filter from "./Filter";
import CardWidget from "@app/components/Card/CardWidget";
/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import AsetDetailPage from "./AsetDetailPage";
import AsetDetailMutasiPage from "./AsetDetailMutasiPage";

export default function AsetPage() {
  let roleAccess = ROLE_ACCESS("aset-ref");
  const [key, setKey] = useState("atribut");
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
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: item?.id_ref_aset,
        group_aset: item?.ref_aset_group?.nama,
        parent_aset: item?.ref_aset_parent?.deskripsi,
        kategori_aset: item?.ref_aset_kategori?.nama,
        manufaktur: item?.ref_aset_manufaktur?.nama,
        kondisi_aset: item?.ref_aset_kondisi?.nama,
        status_aset: item?.ref_aset_status?.nama,
        ruangan: item?.ref_aset_ruangan?.nama,
        lantai: item?.ref_aset_lantai?.nama,
        rak: item?.ref_aset_rak?.nama,
        prioritas: item?.ref_prioritas?.nama,
        bagian: item?.ref_bagian?.nama,
        station: item?.ref_lokasi_station?.kode_lokasi,
        trafo: item?.ref_lokasi_trafo?.nama_lokasi,
        penyulang: item?.ref_lokasi_penyulang?.kode_lokasi,
      });
    });

    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>();
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };
  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_ref_aset);
  };

  return (
    <>
      {/* <Row className="gx-2 mb-1"> */}
      {/* <Col md={12}>
          <div className="mb-2">
            <BoxPrioritasAset
              title="Prioritas Inspeksi Level 3"
              path="master.eam.eam_ref_bobot_prioritas"
              suffix="ASET"
            />
          </div>
        </Col> */}
      {/* <Col md={4}>
          <div className="mb-2">
            <BoxStatusHarAset
              title="Status Pemeliharaan"
              path="master.eam.eam_ref_aset"
              suffix="ASET"
            />
          </div>
        </Col> */}
      {/* </Row> */}

      <CardWidget title="FILTER">
        <Filter
          // setAdd={true}
          onFilterChange={handleFilterChange}
        />
      </CardWidget>
      {roleActions.create && roleActions.update && roleActions.delete && (
        <div>
          <CardPage title="Daftar Aset">
            <TableDataJqxGridEam
              //AKSI
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              deletebtn={roleActions.delete}
              //TABLE DATA
              path={API_PATH().master.eam.eam_ref_aset}
              filterParams={{
                ...filterValues,
              }}
              sortBy={
                "-no_aset_int,ref_ase_group__nama,ref_ase_kategori__nama,deskripsi"
              }
              dataFieldsColsConfig={ASET_REF_ASET_COLUMNS_JQ()}
              primaryKey={"id"}
              respDataApi={handleRespDataApi}
              filterable={true}
              onRowSelected={handleCheckedRows}
              exportbtn={true}
            />
            <div className="align-items-left">
              {/* <h5 className="mb-0">Lokasi Aset</h5> */}
              <Tabs
                variant="tabs"
                activeKey={key}
                onSelect={(k: any) => setKey(k)}
                className="ms-auto p-1"
              >
                <Tab eventKey="atribut" title="Detail"></Tab>
                <Tab eventKey="mutasi" title="Riwayat Mutasi"></Tab>
                {/* <Tab eventKey="pm" title="Riwayat Pemeliharaan"></Tab>
                <Tab eventKey="ggn" title="Riwayat Gangguan"></Tab> */}
              </Tabs>
            </div>

            {key == "atribut" && (
              <div className="align-items-center mb-10">
                <AsetDetailPage
                  filterParams={{
                    id_ref_aset: details ? details : null,
                  }}
                />
              </div>
            )}
            {key == "mutasi" && (
              <div className="align-items-center mb-10">
                <AsetDetailMutasiPage
                  filterParams={{
                    id_ref_aset: details ? details : null,
                    roleActions: roleActions,
                    jenis_wo: "MUTASI",
                  }}
                />
              </div>
            )}
          </CardPage>
        </div>
      )}
    </>
  );
}

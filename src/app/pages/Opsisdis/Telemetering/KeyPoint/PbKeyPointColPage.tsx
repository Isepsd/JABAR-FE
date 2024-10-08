import TableDataListActionNew from "@app/modules/Table/TableDataListActionNew";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import TablePengukuranBeban from "@app/modules/Table/TableDataJqxGridTelemetering";
import CardWidget from "@app/components/Card/CardWidget";
import Filter from "../Filter/FilterColGh";
import { useSelector } from "react-redux";
import axios from "axios";
// import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { infoLabelsNew } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
// import { PENGUKURAN_BEBAN_TRAFO_COLUMN_1PHASE_JQWIDGET } from "@app/configs/jqwidget/pengukuran-beban-trafo.column.config";
import { PENGUKURAN_BEBAN_KP_COLUMN_3PHASE_JQWIDGET } from "@app/configs/jqwidget/pengukuran-beban-penyulang.column.config";
import moment from "moment";

export default function PbKeyPointColPage() {
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true);
  const [roleActions, setRoleActions] = useState<any>({});
  // START FILTER BERDASARKAN HIRARKI LEVEL
  const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    let roleAccess = ROLE_ACCESS("kp-col");
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, "generate"),
      update: ROLE_ACTION(roleAccess, "update"),
    };

    setRoleActions(roleAct);

    return () => {
      source.cancel();
    };
  }, []);

  const [filterValues, setFilterValues] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    id_parent_lokasi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
    // id_pusat:
    //   currentUser?.level == "PUSAT" ? currentUser?.id_unit_lokasi : null,
    // id_regional:
    //   currentUser?.level == "REGIONAL" ? currentUser?.id_unit_lokasi : null,
    // id_pemilik:
    //   currentUser?.level == "UNIT_INDUK" ? currentUser?.id_unit_lokasi : null,
    // id_pengelola:
    //   currentUser?.level == "UP2D" || currentUser?.level == "UP3"
    //     ? currentUser?.id_unit_lokasi
    //     : null,
    // id_sub_pengelola:
    //   currentUser?.level == "ULP" ? currentUser?.id_unit_lokasi : null,
  });
  const handleFilterChange = (newFilterValues: any) => {
    console.log("newFilterValues");
    console.log(newFilterValues);
    setFilterValues(newFilterValues);
  };

  const handleCheckedRows = (data: any) => {
    return data;
  };

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data?.map((item: any) => {
      item.nama_gardu_induk = item?.ref_parent_lokasi?.nama_gardu_induk;
      item.kode_gardu_induk =
        item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi;
      item.penyulang_gardu_induk =
        item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi;
      item.kode_penyulang = item?.ref_lokasi?.kode_lokasi;
      item.nama_lokasi = item?.ref_lokasi?.nama_lokasi;
      item.id_pemilik = item?.ref_lokasi?.id_pemilik;
      item.jenis_layanan = item?.jenis_layanan;
      item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi;
      item.up3 = item?.ref_lokasi?.up3_1
        ? item?.ref_lokasi?.up3_1?.nama_lokasi
        : null;
      item.i_max = item?.ref_lokasi?.i_max;
      // item.no_urut_cell = item?.ref_lokasi?.no_urut;
      item.datum = moment(item?.datum).format("DD MMMM YYYY");
      return item;
    });
    // console.log("dataTableValue", dataTableValue);

    return dataTableValue;
  };
  return (
    <>
      {loading == false && (
        <div>
          <CardWidget title="FILTER">
            <Filter
              // setAdd={true}
              onFilterChange={handleFilterChange}
              optionCurrentUser={currentUser}
              optionJenisLayanan={false}
            />
          </CardWidget>
          <TableDataListActionNew
            filterLayout="card"
            infoLabels={infoLabelsNew()}
          ></TableDataListActionNew>

          <TablePengukuranBeban
            //TABLE DATA
            path={API_PATH().opsisdis.pengukuran_beban.keypoint_col}
            filterParams={{
              // jenis_layanan: "KTT",
              ...filterValues,
            }}
            dataFieldsColsConfig={PENGUKURAN_BEBAN_KP_COLUMN_3PHASE_JQWIDGET()}
            primaryKey={"id"}
            respDataApi={handleRespDataApi}
            filterable={false}
            onRowSelected={handleCheckedRows}
            exportbtn={false}
            reloadbtn={false}
            allowEdit={roleActions?.update || false}
            selectionmode={"singlecell"}
            pageable={false}
          />
        </div>
      )}
    </>
  );
}

import TableDataListActionNew from "@app/modules/Table/TableDataListActionNew";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import TablePengukuranBeban from "@app/modules/Table/TableDataJqxGridTelemetering";
import Filter from "../Filter/FilterCol";
import { useSelector } from "react-redux";
import axios from "axios";
// import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { infoLabelsNew } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { PENGUKURAN_BEBAN_PENYULANG_COLUMN_3PHASE_JQWIDGET } from "@app/configs/jqwidget/pengukuran-beban-penyulang.column.config";
import moment from "moment";
import CardWidget from "@app/components/Card/CardWidget";

export default function UidPage() {
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true);
  const [roleActions, setRoleActions] = useState<any>({});
  // START FILTER BERDASARKAN HIRARKI LEVEL
  const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    let roleAccess = ROLE_ACCESS("rencana-beban-unit");
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, "generate"),
      create: ROLE_ACTION(roleAccess, "create"),
      update: ROLE_ACTION(roleAccess, "update"),
    };

    setRoleActions(roleAct);

    return () => {
      source.cancel();
    };
  }, []);

  const [filterValues, setFilterValues] = useState<any>({
    datum: moment().format("YYYY-MM-DD"),
    id_ref_lokasi_gi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
  });
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  const handleCheckedRows = (data: any) => {
    return data;
  };

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data?.map((item: any) => {
      item.nama_gardu_induk =
        item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi;
      item.trafo = item?.ref_parent_lokasi?.nama_lokasi;
      item.kode_gardu_induk =
        item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi;
      item.penyulang_gardu_induk =
        item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi;
      item.kode_penyulang = item?.ref_lokasi?.kode_lokasi;
      item.nama_lokasi = item?.ref_lokasi?.nama_lokasi;
      item.id_pemilik = item?.ref_lokasi?.id_pemilik;
      item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi;
      item.up3 = item?.ref_lokasi?.up3_1
        ? item?.ref_lokasi?.up3_1?.nama_lokasi
        : null;
      item.ulp = item?.ulp;
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
            path={API_PATH().opsisdis.pengukuran_beban.penyulang_col}
            filterParams={{
              // jenis_layanan: null,
              ...filterValues,
            }}
            dataFieldsColsConfig={PENGUKURAN_BEBAN_PENYULANG_COLUMN_3PHASE_JQWIDGET()}
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

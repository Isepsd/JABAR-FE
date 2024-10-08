import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import TablePengukuranBeban from "@app/modules/opsisdis/TablePengukuranBeban";
import Filter from "../Filter/FilterCol";
import { useSelector } from "react-redux";
import axios from "axios";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { infoLabels } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { PENGUKURAN_BEBAN_TRAFO_COLUMN_1PHASE_JQWIDGET } from "@app/configs/jqwidget/pengukuran-beban-trafo.column.config";
import moment from "moment";

export default function PbTrafoGICol1PhasePage150824() {
  const source = axios.CancelToken.source();
  const url = API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt_col_1phase;
  const urlCountNull =
    API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt_col_1phase_total;
  const [add, setAdd] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [columns, setColumns] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});

  // START FILTER BERDASARKAN HIRARKI LEVEL
  const { currentUser } = useSelector((state: any) => state.auth);
  const customFilter = [
    {
      search: "__pusat",
      field: "id_pusat",
    },
    {
      search: "__regional",
      field: "id_regional",
    },
    {
      search: "__pemilik",
      field: "id_pemilik",
    },
    {
      search: "__pengelola",
      field: "id_pengelola",
    },
    {
      search: "__subpengelola",
      field: "id_sub_pengelola",
    },
  ];

  const [customParams] = useState<any>({
    jenis_layanan: "NON KTT",
  });

  const callBackCount = (valid: boolean, filter: any) => {
    let addValid: any = false;
    if (
      valid &&
      !filter?.id_pusat &&
      !filter?.id_regional &&
      !filter?.id_pemilik &&
      !filter?.id_pengelola &&
      !filter?.id_sub_pengelola &&
      filter?.id_parent_lokasi
    ) {
      addValid = true;
    }
    setAdd(addValid);
  };

  // END FILTER BERDASARKAN HIRARKI LEVEL
  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
  }, []);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("trafo-gi-col-1phase");
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, "generate"),
      update: ROLE_ACTION(roleAccess, "update"),
    };
    setRoleActions(roleAct);
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let fields: any =
      PENGUKURAN_BEBAN_TRAFO_COLUMN_1PHASE_JQWIDGET(roleActions);
    setColumns(fields);
  }, [roleActions]);

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
      item.datum = moment(item?.datum).format("DD MMM YYYY HH:mm");
      return item;
    });
    // console.log("dataTableValue", dataTableValue);

    setDataRows(() => {
      return dataTableValue;
    });
  };
  return (
    <>
      <TopBarLoader isLoading={loading} />
      {loading == false && (
        <>
          <TableDataListAction
            generate={add}
            column={false}
            add={false}
            module="Telemetring Trafo GI"
            filterLayout="card"
            infoLabels={infoLabels()}
            exportOptions={[{ label: "MS-Excel", type: "xlsx" }]}
          >
            <Filter
              // setAdd={setAdd}
              optionCurrentUser={currentUser}
              optionJenisLayanan={false}
            />
          </TableDataListAction>
          <div>
            <TablePengukuranBeban
              roleActions={roleActions}
              pathServiceCountNull={urlCountNull}
              pathService={url}
              primaryKey="id"
              callBackCount={callBackCount}
              label="Telemetring Trafo GI"
              module="Telemetring Trafo GI"
              customFilter={customFilter}
              customParams={customParams}
              ChangeColorRow={true}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              columnsConfig={columns}
            />
          </div>
        </>
      )}
    </>
  );
}

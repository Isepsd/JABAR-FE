import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
// import TablePengukuranTegangan from "@app/modules/opsisdis/TablePengukuranTegangan";
import SmartGridPB from "@app/modules/Table/SmartGridPB";
import Filter from "../Filter/FilterCol";
import { useSelector } from "react-redux";
import axios from "axios";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { infoLabels } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { TEGANGAN_TRAFO_COLUMN_SMARTGRID } from "@app/configs/jqwidget/pbtrafo-smartgrid.column.config";
import moment from "moment";

export default function PbTeganganTrafoGISmart() {
  const source = axios.CancelToken.source();
  const url = API_PATH().opsisdis.pengukuran_beban.teg_trafo_gi_non_ktt;
  //   const urlCountNull =
  //     API_PATH().opsisdis.pengukuran_beban.teg_trafo_gi_non_ktt_total;
  const [add] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
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

  //   const callBackCount = (valid: boolean, filter: any) => {
  //     let addValid: any = false;
  //     if (
  //       valid &&
  //       !filter?.id_pusat &&
  //       !filter?.id_regional &&
  //       !filter?.id_pemilik &&
  //       !filter?.id_pengelola &&
  //       !filter?.id_sub_pengelola &&
  //       filter?.id_parent_lokasi
  //     ) {
  //       addValid = true;
  //     }
  //     setAdd(addValid);
  //   };

  // END FILTER BERDASARKAN HIRARKI LEVEL

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
  }, []);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("teg-trafo-gi");
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, "generate"),
      update: ROLE_ACTION(roleAccess, "update"),
    };
    setRoleActions(roleAct);
    return () => {
      source.cancel();
    };
  }, []);

  const handleRespDataApi = (data: any) => {
    return data?.results.map((item: any) => ({
      ...item,
      nama_gardu_induk: item?.ref_parent_lokasi?.nama_lokasi,
      kode_gardu_induk: item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi,
      penyulang_gardu_induk:
        item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi,
      kode_penyulang: item?.ref_lokasi?.kode_lokasi,
      nama_lokasi: item?.ref_lokasi?.nama_lokasi,
      id_pemilik: item?.ref_lokasi?.id_pemilik,
      jenis_layanan: item?.jenis_layanan,
      nama_parent: item?.ref_parent_lokasi?.nama_lokasi,
      up3: item?.ref_lokasi?.up3_1
        ? item?.ref_lokasi?.up3_1?.nama_lokasi
        : null,
      datum: moment(item?.datum).format("DD MMM YYYY"),
    }));
  };
  return (
    <>
      <TopBarLoader isLoading={loading} />
      <TableDataListAction
        generate={add}
        column={false}
        add={false}
        module="Telemetring Teg Trafo"
        filterLayout="card"
        infoLabels={infoLabels()}
        exporting={false}
        reload={false}
      >
        <Filter
          // setAdd={setAdd}
          optionCurrentUser={currentUser}
          optionJenisLayanan={false}
        />
      </TableDataListAction>
      {loading == false && roleActions && (
        <>
          <div>
            <SmartGridPB
              addbtn={false}
              updatebtn={false}
              deletebtn={false}
              //   generatebtn={roleActions.generate}
              generatebtn={false}
              exportbtn={true}
              path={url}
              primaryKey={"id"}
              label="Telemetring Teg Trafo"
              filterParams={{ jenis_layanan_in: null }}
              respDataApi={handleRespDataApi}
              selectionmode="singlecell"
              customFilter={customFilter}
              editable={true}
              dataFieldsColsConfig={TEGANGAN_TRAFO_COLUMN_SMARTGRID(
                roleActions
              )}
            />
          </div>
        </>
      )}
    </>
  );
}

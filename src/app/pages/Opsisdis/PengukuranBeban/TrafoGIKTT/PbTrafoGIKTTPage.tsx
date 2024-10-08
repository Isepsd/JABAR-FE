import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import TablePengukuranBebanJqxGrid from "@app/modules/Table/TablePengukuranBebanJqxGrid";
import Filter from "../Filter/Filter";
import { infoLabels } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET } from "@app/configs/jqwidget/pengukuran-beban-trafo.column.config";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PbTrafoGIKTTPage() {
  const [add, setAdd] = useState<any>(false);
  const [roleActions, setRoleActions] = useState<any>({});
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  // const [loading, setLoading] = useState<any>(true);

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

  useEffect(() => {
    // new Promise((resolve) => setTimeout(resolve, 300));

    let roleAccess = ROLE_ACCESS("pengukuran-beban-trafo-gi");
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, "generate"),
      update: ROLE_ACTION(roleAccess, "update"),
    };
    setRoleActions(roleAct);
    // setAdd(true);
    return () => {
      source.cancel();
    };
  }, []);

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item.number,
        nama_gardu_induk: item?.ref_parent_lokasi?.nama_gardu_induk,
        kode_gardu_induk: item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi,
        penyulang_gardu_induk:
          item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi,
        kode_penyulang: item?.ref_lokasi?.kode_lokasi,
        nama_lokasi: item?.ref_lokasi?.nama_lokasi,
        id_pemilik: item?.ref_lokasi?.id_pemilik,
        jenis_layanan: item?.jenis_layanan,
        nama_parent: item?.ref_parent_lokasi?.nama_lokasi,
        tap: item?.tap,
        no_urut_cell: item?.no_urut_cell,
        up3: item?.ref_lokasi?.up3_1
          ? item?.ref_lokasi?.up3_1?.nama_lokasi
          : null,
        datum: moment(item?.datum).format("DD MMM YYYY HH:mm"),
      });
    });
    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>();
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  const handleCheckedRows = (data: any) => {
    return data;
  };

  return (
    <>
      <TableDataListAction
        generate={add}
        column={false}
        add={false}
        module="Telemetring Trafo KTT"
        filterLayout="card"
        infoLabels={infoLabels()}
        exporting={false}
        reload={false}
      >
        <Filter
          setAdd={setAdd}
          onFilterChange={handleFilterChange}
          optionCurrentUser={currentUser}
          optionJenisLayanan="KTT,CAMPURAN"
          optionJenisLayananTrafo="KTT"
        />
      </TableDataListAction>
      {roleActions && filterValues && (
        <>
          <div>
            <TablePengukuranBebanJqxGrid
              // ROLES
              addbtn={roleActions.create}
              updatebtn={roleActions.update}
              roleActions={roleActions}
              // AKSI
              deletebtn={false}
              exportbtn={true}
              reloadbtn={false}
              showfilterrow={false}
              editable={true}
              filterable={false}
              // TABLE DATA
              path={API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt}
              // customFilter={filterValues}
              customParams={{
                jenis_layanan_in: "KTT,CAMPURAN",
                ...filterValues,
              }}
              dataFieldsColsConfig={PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET(
                roleActions
              )}
              callBackCount={callBackCount}
              primaryKey={"id"}
              respDataApi={handleRespDataApi}
              onRowSelected={handleCheckedRows}
            />
          </div>
        </>
      )}
    </>
  );
}

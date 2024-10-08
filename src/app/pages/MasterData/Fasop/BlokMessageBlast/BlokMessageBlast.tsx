import React, { useState, useEffect } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { DAFTAR_PENYULANG_TIDAK_KIRIM_APKT } from "@app/configs/react-table/apkt.columns.config";
import { API_PATH } from "@app/services/_path.service";
import CardWidget from "@app/components/Card/CardWidget";
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import FormData from "@app/modules/Form/FormDataWAGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@app/components";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import moment from "moment";
import qs from "query-string";
import MasterDataFilter from "@app/modules/opsisdis/MasterData/MasterDataFilter_wa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Import useLocation
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";

// interface IWhatsappDetailForm {
//   modalDecline?: any;
//   paramid?: number;
//   filterLayout?: any;
// }
type Props = {
  optionCurrentUser?: any;
  optionJenisLayanan?: any;
  optionJenisLayananTrafo?: any;
  onFilterChange?: any;
  // satuan2?: any;
};

export const IBlacklistFeild = {
  id_ref_lokasi: null,
  // whatsapp: 1,
};

export default function BlokMessageBlast(
  // { paramid }: IWhatsappDetailForm,
  { optionCurrentUser }: Props
) {
  const [dataSelected, setDataSelected] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const handleRowsSelected = (item: any) => {
    setDataSelected(item.current);
  };

  let roleAccess = ROLE_ACCESS("daftar-point-kirim-wa");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    update: ROLE_ACTION(roleAccess, "update"),
    create: ROLE_ACTION(roleAccess, "create"),
    delete: ROLE_ACTION(roleAccess, "delete"),
  };

  const location = useLocation();
  const queryParams = qs.parse(location.search);
  // const [columns] = useState<any>(DAFTAR_PENYULANG_TIDAK_KIRIM_APKT());

  // const onSubmitForm = (data: any) => {
  //   let idx: any = [];
  //   if (dataSelected.length > 0) {
  //     dataSelected.map((item: any) => {
  //       idx.push(item?.id_ref_lokasi);
  //     });
  //   }
  //   data.id_ref_lokasi = idx;
  //   data.id_wa_group = paramid;
  //   setDataParams(data);
  // };

  // const onSubmitForm = () => {
  //   if (dataSelected.length > 0) {
  //     const item = dataSelected[0];
  //     const formattedData = {
  //       id_ref_lokasi: item?.id_ref_lokasi,
  //       whatsapp: 1,
  //       // user_input: data.created_user,
  //       // id_user_updated: data.id_user_entri,
  //     };

  //     const datas = { datas: formattedData };
  //     console.log(datas);
  //     setDataParams(datas);
  //   } else {
  //     // Handle the case where dataSelected is empty
  //     console.log("No data selected");
  //   }
  // };

  const onSubmitForm = () => {
    const formattedData = dataSelected.map((item: any) => ({
      id_ref_lokasi: item?.id_ref_lokasi,
      // whatsapp: 1,
      [filterValues.satuan2]: 1,
      // user_input: data.created_user,
      // id_user_updated: data.id_user_entri,
    }));

    const datas = { datas: formattedData };
    console.log(datas);
    setDataParams(datas);

    // data.id_wa_kontak = idx;
    // data.id_wa_group = paramid;
    // setDataParams(data);
  };

  const onSubmitForm2 = () => {
    const formattedData2 = dataSelected.map((item: any) => ({
      id_ref_lokasi: item?.id_ref_lokasi,
      // whatsapp: 0,
      [filterValues.satuan2]: 0,
      // user_input: data.created_user,
      // id_user_updated: data.id_user_entri,
    }));

    const datas = { datas: formattedData2 };
    console.log(datas);
    setDataParams(datas);

    // data.id_wa_kontak = idx;
    // data.id_wa_group = paramid;
    // setDataParams(data);
  };

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        checked: true,
        key: item?.key,
        number: item.number,
        id_ref_lokasi: item.id_ref_lokasi,
        nama_lokasi: item.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        kode_lokasi: item.kode_lokasi,
        fungsi_lokasi: item.fungsi_lokasi,
      });
    });
    return dataTableValue;
  };

  const validationSchema = Yup.object().shape({
    id_wa_kontak: Yup.string().nullable(),
    id_wa_group: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({});
  const { handleSubmit, setValue, setError } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const [filterValues, setFilterValues] = useState<any>({
    id_ref_lokasi_up3: null,
    id_ref_lokasi_up2b: null,
    id_ref_lokasi_subsistem: null,
    date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    time: queryParams?.time ? queryParams?.time : null,
    id_parent_lokasi: queryParams?.__parent_lokasi
      ? queryParams?.__parent_lokasi
      : null,
    id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pusat,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__regional,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pemilik,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pengelola,
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__subpengelola,
    satuan2: "whatsapp",
  });

  // useLocation to detect route changes
  useEffect(() => {
    // Function to refresh or re-fetch data
    const refreshData = () => {
      console.log("Route changed, refreshing data...");
      setFilterValues({
        ...filterValues,
        date: queryParams?.date
          ? queryParams?.date
          : moment().format("YYYY-MM-DD"),
        time: queryParams?.time ? queryParams?.time : null,
        id_parent_lokasi: queryParams?.__parent_lokasi
          ? queryParams?.__parent_lokasi
          : null,
        id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
        id_pusat:
          optionCurrentUser?.level == "PUSAT"
            ? optionCurrentUser?.id_unit_lokasi
            : queryParams?.__pusat,
        id_regional:
          optionCurrentUser?.level == "REGIONAL"
            ? optionCurrentUser?.id_unit_lokasi
            : queryParams?.__regional,
        id_pemilik:
          optionCurrentUser?.level == "UNIT_INDUK"
            ? optionCurrentUser?.id_unit_lokasi
            : queryParams?.__pemilik,
        id_pengelola:
          optionCurrentUser?.level == "UP2D" ||
          optionCurrentUser?.level == "UP3"
            ? optionCurrentUser?.id_unit_lokasi
            : queryParams?.__pengelola,
        id_sub_pengelola:
          optionCurrentUser?.level == "ULP"
            ? optionCurrentUser?.id_unit_lokasi
            : queryParams?.__subpengelola,
      });
    };

    refreshData();
  }, [location]); // This effect runs every time the route changes

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  // Determine the title based on filterValues.satuan2
  const getCardTitle = (satuan2: string) => {
    switch (satuan2) {
      case "telegram":
        return "Daftar Penyulang Tidak Kirim Telegram";
      case "kafka":
        return "Daftar Penyulang Tidak Kirim Kafka";
      case "sms":
        return "Daftar Penyulang Tidak Kirim SMS";
      default:
        return "Daftar Penyulang Tidak Kirim WA";
    }
  };

  return (
    <>
      <div className="px-2 mt-2">
        <MasterDataFilter
          optionCurrentUser={currentUser}
          onFilterChange={handleFilterChange}
          isGarduInduk={true}
          isPenyulang={true}
          isWA={true}
        />
      </div>
      <br></br>
      <Row>
        <Col md={5}>
          <CardWidget title="Daftar Penyulang">
            <TableDataJqxGridNew
              dataFieldsColsConfig={DAFTAR_PENYULANG_TIDAK_KIRIM_APKT()}
              respDataApi={handleRespDataApi}
              onRowSelected={handleRowsSelected}
              path={API_PATH().master.jaringan.ref_lokasi}
              primaryKey={"id_ref_lokasi"}
              filterable={true}
              filterParams={{
                id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                // whatsapp: 0,
                [filterValues.satuan2]: 0,

                id_pusat:
                  optionCurrentUser?.level == "PUSAT"
                    ? optionCurrentUser?.id_unit_lokasi
                    : queryParams?.__pusat,
                id_regional:
                  optionCurrentUser?.level == "REGIONAL"
                    ? optionCurrentUser?.id_unit_lokasi
                    : queryParams?.__regional,
                id_pemilik:
                  optionCurrentUser?.level == "UNIT_INDUK"
                    ? optionCurrentUser?.id_unit_lokasi
                    : queryParams?.__pemilik,
                id_pengelola:
                  optionCurrentUser?.level == "UP2D" ||
                  optionCurrentUser?.level == "UP3"
                    ? optionCurrentUser?.id_unit_lokasi
                    : queryParams?.__pengelola,
                id_sub_pengelola:
                  optionCurrentUser?.level == "ULP"
                    ? optionCurrentUser?.id_unit_lokasi
                    : queryParams?.__subpengelola,

                ...filterValues,
              }} // Filter hanya untuk kolom feeder
              selectionmode={"checkbox"}
              exportbtn={false}
            />
          </CardWidget>
        </Col>
        <Col md={7}>
          <CardWidget>
            <Row className="gx-3">
              <Col md="3" sm>
                {dataSelected && roleActions.update && (
                  <FormData
                    setError={setError}
                    setValue={setValue}
                    dataParams={dataParams}
                    fields={IBlacklistFeild}
                    path={API_PATH().master.jaringan.ref_lokasi_batch}
                    customLabel="state"
                    onLoading={setLoading}
                    onGetDataResult={setDataSelected}
                    hideTitle={true}
                    ids="id_detail"
                  >
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                      <Modal.Footer>
                        <div className="d-flex gap-2">
                          <Button
                            type="submit"
                            variant="primary"
                            isLoading={loading}
                          >
                            <i className="fas fa-angle-right"></i>
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </FormData>
                )}
                <br></br>
                {dataSelected && roleActions.update && (
                  <FormData
                    setError={setError}
                    setValue={setValue}
                    dataParams={dataParams}
                    fields={IBlacklistFeild}
                    path={API_PATH().master.jaringan.ref_lokasi_batch}
                    customLabel="state"
                    onLoading={setLoading}
                    onGetDataResult={setDataSelected}
                    hideTitle={true}
                    ids="id_detail"
                  >
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm2)}>
                      <Modal.Footer>
                        <div className="d-flex gap-2">
                          <Button
                            type="submit"
                            variant="secondary"
                            isLoading={loading}
                          >
                            <i className="fas fa-angle-left"></i>
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </FormData>
                )}
              </Col>

              <Col md={9}>
                {/* <CardWidget title="Daftar Penyulang Tidak Kirim WA"> */}
                <CardWidget title={getCardTitle(filterValues.satuan2)}>
                  {/* {roleActions.create && ( */}
                  <TableDataJqxGridNew
                    dataFieldsColsConfig={DAFTAR_PENYULANG_TIDAK_KIRIM_APKT()}
                    respDataApi={handleRespDataApi}
                    onRowSelected={handleRowsSelected}
                    path={API_PATH().master.jaringan.ref_lokasi}
                    primaryKey={"id_ref_lokasi"}
                    filterable={true}
                    filterParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                      // whatsapp: 1,
                      [filterValues.satuan2]: 1,

                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : queryParams?.__pusat,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : queryParams?.__regional,
                      id_pemilik:
                        optionCurrentUser?.level == "UNIT_INDUK"
                          ? optionCurrentUser?.id_unit_lokasi
                          : queryParams?.__pemilik,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : queryParams?.__pengelola,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : queryParams?.__subpengelola,

                      ...filterValues,
                    }} // Filter hanya untuk kolom feeder
                    selectionmode={"checkbox"}
                    exportbtn={false}
                  />
                  {/* )} */}
                </CardWidget>
              </Col>
            </Row>
          </CardWidget>
        </Col>
      </Row>
    </>
  );
}

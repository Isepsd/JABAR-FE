import { API_PATH } from "@app/services/_path.service";
import React, { useState } from "react";
import { WHATSAPP_TAMBAH_KONTAK_GROUP_COLUMNS } from "@app/configs/react-table/master-fasop.columns.config";

import { Col, Form, Modal, Row } from "react-bootstrap";
import { Button, ButtonCancel } from "@app/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormData from "@app/modules/Form/FormDataWAGroup";
import * as Yup from "yup";
// import TableDataJqxGrid from '@app/modules/opsisdis/TableJQX/TableDataJqxGrid';
import TableDataJqxGrid from "@app/modules/Table/TableDataJqxGridNew";

interface IWhatsappDetailForm {
  modalDecline?: any;
  paramid?: number;
  filterLayout?: any;
}

export const IBlacklistFeild = {
  id_wa_kontak: null,
  status_data: 1,
};

export default function GroupWhatsappDetailForm({
  modalDecline,
  paramid,
}: IWhatsappDetailForm) {
  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        checked: true,
        key: item?.key,
        number: item.number,
        nama_kontak: item.nama,
        no_kontak: item.no_kontak,
        id_wa_kontak: item.id_wa_kontak,
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

  const handleRowsSelected = (item: any) => {
    setDataSelected(item.current);
  };
  // const onSubmitForm = (data: any) => {
  //   if (dataSelected.length > 1) {
  //     const kontakGroups = dataSelected.map((selectedItem: any) => ({
  //       id_wa_kontak: selectedItem.id_wa_kontak,
  //       id_wa_group: paramid,
  //     }));
  //     setDataParams(kontakGroups);
  //     console.log(kontakGroups);
  //   } else if ((dataSelected.length = 1)) {
  //     data.id_wa_kontak = dataSelected[0]?.id_wa_kontak;

  //     // data.id_wa_kontak = dataSelected.id_wa_kontak;
  //     data.id_wa_group = paramid;
  //     setDataParams(data);
  //     console.log(data);
  //   }
  // };
  const onSubmitForm = (data: any) => {
    const formattedData = dataSelected.map((item: any) => ({
      id_wa_group: paramid,
      id_wa_kontak: item?.id_wa_kontak,
      id_user_created: data.created_user,
      id_user_updated: data.id_user_entri,
    }));

    const datas = { datas: formattedData };
    console.log(datas);
    setDataParams(datas);

    // data.id_wa_kontak = idx;
    // data.id_wa_group = paramid;
    // setDataParams(data);
  };

  return (
    <>
      <Row className="animate__animated animate__fadeIn">
        <div className="col-md-12 p-4">
          <div className={`ms-md-0`}>
            <Row>
              <Col md={12} className="mb-3">
                <TableDataJqxGrid
                  path={API_PATH().master.fasop.whatsapp.kontak}
                  dataFieldsColsConfig={WHATSAPP_TAMBAH_KONTAK_GROUP_COLUMNS()}
                  primaryKey={"id_wa_kontak"}
                  selectionmode={"checkbox"}
                  respDataApi={handleRespDataApi}
                  // serachBar={true}
                  onRowSelected={handleRowsSelected}
                  reloadbtn={false}
                />
              </Col>
              {dataSelected && (
                <Col md={12}>
                  <FormData
                    setError={setError}
                    setValue={setValue}
                    dataParams={dataParams}
                    fields={IBlacklistFeild}
                    path={API_PATH().master.fasop.whatsapp.kontak_group}
                    customLabel="state"
                    onLoading={setLoading}
                    batch={true}
                    onGetDataResult={setDataSelected}
                    hideTitle={true}
                    ids="id_detail"
                  >
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                      <Modal.Footer>
                        <div className="d-flex gap-2">
                          <ButtonCancel
                            type="modal"
                            ids="id_detail"
                            onClick={modalDecline}
                          />
                          <Button
                            type="submit"
                            variant="primary"
                            isLoading={loading}
                          >
                            {" "}
                            Simpan{" "}
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </FormData>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </Row>
    </>
  );
}

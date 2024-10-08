import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import { MASTER_ROLES_TOKEN_DETAIL_FORM_JQX } from '@app/configs/react-table/master-opsisdis.columns.config';

import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Button, ButtonCancel } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormData from '@app/modules/Form/FormData';
import * as Yup from 'yup';
import TableDataJqxGrid from '@app/modules/Table/TableDataJqxGrid';

interface IRoleDetailForm{
  modalDecline?: any;
  paramid?: number;
 
}

export const IBlacklistFeild = {
  id_module: null,
  status_data: 1,
};

export default function RoleTokenPageDetailForm({ modalDecline, paramid }: IRoleDetailForm) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  
 
 

  const handleRespDataApi = (data:any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        checked: true,
        key: item?.key,
        number: item.number,
        nama_module: item.nama,
        id_module: item.id_module,
      });
    });
    setDataRows(dataTableValue);
  
    
  };

  
  
  const validationSchema = Yup.object().shape({
    id_module: Yup.string().nullable(),
    id_token: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({});
  const {
    handleSubmit,
  
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const handleRowsSelected = (item: any) => {
    setDataSelected(item.current);
    console.log('setDataSelected', item.current);
  };

  const onSubmitForm = (data: any) => {
    let idx: any = [];
    if (dataSelected.length > 0) {
      dataSelected.map((item: any) => {
        idx.push(item?.id_module);
      });
    }
    data.id_module = idx;
    data.id_token = paramid;
    setDataParams(data);
  };

  

  return (
    <>
      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12 p-4'>
          <div className={`ms-md-0`}>
            <Row>
              <Col md={12} className="mb-3">
                         <TableDataJqxGrid
                            path={API_PATH().master.external.extmodule}
                            
                            dataFieldsColsConfig={MASTER_ROLES_TOKEN_DETAIL_FORM_JQX()}
                            primaryKey={'id_module'}
                            selectionmode={"checkbox"}
                            respDataApi={handleRespDataApi}
                            rowData={dataRows}
                            serachBar={true}
                            onCheckedRows={handleRowsSelected}
                           />
                
              </Col>
              {dataSelected &&
                <Col md={12}>
                  <FormData
                    setError={setError}
                    setValue={setValue}
                    dataParams={dataParams}
                    fields={IBlacklistFeild}
                    path={API_PATH().master.external.user_token_role}
                    customLabel='state'
                    onLoading={setLoading}
                    onGetDataResult={setDataSelected}
                    hideTitle={true}
                    ids="id_detail"
                   
                  >
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                      <Modal.Footer>
                        <div className='d-flex gap-2'>
                          <ButtonCancel type='modal' ids='id_detail' onClick={modalDecline} />
                          <Button type='submit' variant='primary' isLoading={loading}> Simpan </Button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </FormData>
                </Col>
              }

            </Row>
          </div>
        </div>
      </Row>
    </>
  )
}

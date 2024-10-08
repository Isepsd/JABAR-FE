import React, { useState,useRef } from 'react';
import { Button, Col, Form, Modal, Row,Card } from 'react-bootstrap';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import {  IFasopPointTypeState,FasopPointTypeStateField } from '@app/interface/fasop-pointtype-state.interface';
import { JENIS_POINT_DETAIL_COLUMNS_JQ } from '@app/configs/react-table/master-fasop.columns.config';
import { useForm ,useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
// import { useSearchParams } from 'react-router-dom';

type Props = {
  paramid: any;
  handleClose: any;
 
};

export default function FasJenisPointCopy({ handleClose,paramid }:Props) {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [searchParams] = useSearchParams();
  const dataSelected = useRef<any>();
  // const [dataTable, setDataTable] = useState<any[]>([]); // State to hold table data

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Label wajib diisi'),
    // status: Yup.number()
    //   .nullable()
    //   .transform((_, v) => (v == 1 ? 1 : 0)),
    // valid: Yup.number()
    //   .nullable()
    //   .transform((_, v) => (v == 1 ? 1 : 0)),
    // quality_code: Yup.string().nullable(),
    // id_pointtype: Yup.string().nullable(),
    // statekey: Yup.number()
    //   .required('Value wajib diisi'),
  });

  const handleRespDataApi = (data: any) => {
    return data.map((item: IFasopPointTypeState, index: number) => ({
      id: index + 1,
      number: item?.number,
      id_pointtype_state: item?.id_pointtype_state,
      id_pointtype: item?.id_pointtype,
      statekey: item.statekey,
      quality_code: item?.quality_code,
      state_label: item.name,
      valid: item.valid,
      status: item.status,
    }));
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data;
  };

  const formModel = useState<any>({})[0];

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const id_pointtype = useWatch({ control, name: 'id_pointtype_copy' });

  // useEffect(() => {
  //   if (id_pointtype_copy) {
  //     fetchTableData();
  //   }
  // }, [id_pointtype_copy]);

  // const fetchTableData = async () => {
  //   const queryParams = new URLSearchParams({ id_pointtype_copy });
  //   const url = `${API_PATH().master.fasop.point_type_state}?${queryParams.toString()}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     const mappedData = handleRespDataApi(data);
  //     setDataTable(mappedData);
  //   } catch (error) {
  //     console.error('Error fetching table data:', error);
  //   }
  // };


  
  const onSubmitForm = (data: any) => {
    const parent = paramid;
    const parent_copy = id_pointtype;
    const submitData = { ...data, id_pointtype: parent,id_pointtype_copy: parent_copy };
    

    
    setDataParams(submitData);
    // setDataParams(submitData_copy);

    // Perform the API request or other submit actions here
    console.log("Data to be submitted:", submitData); // For debugging

    // Close the modal after submitting
    handleClose();
  };

  const { errors } = formState || {};

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopPointTypeStateField}
        path={API_PATH().master.fasop.point_type_state}
        onLoading={setLoading}
        isModal={true}
        ids='ids'
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row className='mb-2'>
              <Col md={12} className="">
                <Form.Group className='mb-2'>
                  <Form.Label>Jenis Point</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='id_pointtype_copy'
                    pathServiceName='master.fasop.point_type_get'
                    labelField='name'
                    valueField='id_pointtype'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: 1,
                      limit: 10,
                      is_induk: 'ANAK',
                      sort_by: '-name',
                    }}
                  />
                </Form.Group>
              </Col>

              {id_pointtype && (
                <Col md={12} className='mb-4'>
                  <Card className='card-widget'>
                    <Card.Header>Detail Jenis Point</Card.Header>
                    <TableDataJqxGridNew
                      exportbtn={false}
                      reloadbtn={false}
                      path={API_PATH().master.fasop.point_type_state}
                      primaryKey={'id_pointtype_state'}
                      dataFieldsColsConfig={JENIS_POINT_DETAIL_COLUMNS_JQ()}
                      filterParams={{ id_pointtype }}
                      respDataApi={handleRespDataApi}
                      filterable={true}
                      onRowSelected={handleRowSelected}
                    />
                  </Card>
                </Col>
              )}
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <ButtonCancel type='modal' onClick={handleClose} />
            <Button type='submit' variant='primary' disabled={loading}>
              Copy
            </Button>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}

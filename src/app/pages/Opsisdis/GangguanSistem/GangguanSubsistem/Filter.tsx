import React, { useState } from 'react';
import { Col, Form, Row  ,InputGroup, FormControl} from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

import moment from 'moment';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { timeFormSelect } from '@app/helper/time.helper';



// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { API_PATH } from '@app/services/_path.service';

export default function RCKinFilter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();



  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
 
    datum_range_after: Yup.string().nullable(),
    datum_range_before: Yup.string().nullable(),
    penyulang_id: Yup.string().nullable(),
    id_gardu_induk: Yup.string().nullable(),
   
  });

  const [formModel] = useState<any>({

    datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
    datum_range_before: moment().format("YYYY-MM-DD") ,
    penyulang_id:'',
    id_gardu_induk:''

  });

  const { handleSubmit, setValue, setError, register, formState, control } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

 

 
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {  


    let params = data;
      params.id_induk_pointtype = '3d391819-4288-4699-80f4-7ebd5ae0d733'

    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });

    onFilterChange(params)
  };

  

  // console.log('errors', errors);
  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
      
          // datum_range_after: moment().format('YYYY-MM-DD'),
          // datum_range_before: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
          datum_range_before: moment().format("YYYY-MM-DD") ,
          penyulang_id:'',
          id_gardu_induk:''
        
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
          <Col md={3} className="">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("datum_range_after")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={moment(watchDatum2Before)
                  //   .subtract(1, 'month')
                  //   .format('YYYY-MM-DD')}
                  // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("datum_range_before")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={watchDatum1After}
                  // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          
            <Col md={5} className="">
            <Form.Group className='mb-2'>
                <Form.Label >
               Pilih Jenis Gangguan
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    // watchParent={watchPenyulang}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      // id_penyulang: watchPenyulang // Ini mengambil nilai penyulang yang dipilih
                    }}
                    setValue={setValue}
                  />
                </Col>
              </Form.Group>
              </Col>
              
              
            <Col md={5} className='mt-2'>
              <FilterActionButton
                className='justify-content-start'
                loading={loading}
              />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}

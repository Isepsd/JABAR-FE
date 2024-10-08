
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";


import React from "react";
// import React, { } from "react";

// import axios from 'axios';
import InputDate from '@app/components/Date/InputDate';
import {  Col, Row, Form  } from "react-bootstrap";
// import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import InputForm from '@app/components/Input/FormInputNoLabel';
// import { API_PATH } from "@app/services/_path.service";
// import { useWatch } from "react-hook-form";
// import { getAllByPath } from '@app/services/main.service';
// import { KOODINASI_PROTEKSI_OPTIONS } from "@app/configs/select-options/working-permit.select";
// import { get } from "lodash";
// import TablePeralatanRC from "./TablePeralatanRC";
// import TablePeralatanRCcopy from "./TablePeralatanRC copy";
// import TablePeralatanFIOHL from "./TabelPeralatanFIOHL";
// import InputDate from '@app/components/Date/InputDate';

interface IPemeriksaanLanjutanForm {
  control: any
  errors: any
  register: any
 
  setValue?: any
}

export default function PemeriksaanLanjutanForm({
  control,
  errors,
  // setValue,
  register,
  
}: IPemeriksaanLanjutanForm) {
   
  
    // const watchPenyulang = useWatch({ control, name: 'penyulang_id' });
  

  
  return (

    <>
            
      
                  <Form.Group as={Row} className='mb-3'>
                  <Form.Label column md={4}>
                      Tanggal Input :
                    </Form.Label>
                    <Col md={8}>
                    <InputDate
                      errors={errors}
                      register={register}
                      type="date"
                      fieldName="tanggal_gangguan"
                      // step={1}
                    />
                    </Col>
                  </Form.Group>
                 

                  <hr />
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                  Penyebab Gangguan
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        required={false}
                        fieldName={'penyebab_gangguan_id'}
                        pathServiceName={'master.opsisdis.rekap_padam.penyebab_gangguan'}
                        labelField={'nama'}
                        valueField={'id'}
                        placeholder={'Pilih...'}
                        isClearable={true}
                        errors={errors}
                        control={control}
                      />
                    </Col>
                  </Form.Group>
            
      
     
    </>
  )
}
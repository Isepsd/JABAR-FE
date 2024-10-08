import {  STATUS_PADAM} from "@app/configs/select-options/rekap_padam.select";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";

import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

import React from "react";
// import React, { } from "react";

// import axios from 'axios';
import InputDate from '@app/components/Date/InputDate';
import {  Col, Row, Form  } from "react-bootstrap";
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
import CardWidget from '@app/components/Card/CardWidget';
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
            
       
        <Row>
    
        <Col md={6} sm>
        <CardWidget>
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
            <Form.Label column md={4}>Kategori Gangguan</Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={false}
                fieldName={'jenis_gangguan'}
                pathServiceName={'master.opsisdis.rekap_padam.kategori_gangguan'}
                labelField={'nama'}
                valueField={'id'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Col>
          </Form.Group>
        
        
          
          {/* <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Keterangan Gangguan
            </Form.Label>
            <Col md={8}>
              <InputForm
                control={control}
                name={'keterangan_ggn'}
                as="textarea"
              />
            </Col>
          </Form.Group> */}
          </CardWidget>
        </Col>
       
        <Col md={6}>
        <CardWidget className="mb-4">
        <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
           Status
            </Form.Label>
            <Col md={8}>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`status`}
                options={STATUS_PADAM}
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
                required={true}
                fieldName={'penyebab_gangguan'}
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

        
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
            Rele
            </Form.Label>
            <Col md={8}>
               <Form.Control
                      {...register('rele_kerja')}
                      isInvalid={errors.rele_kerja}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.rele_kerja?.message}
                    </Form.Control.Feedback>
            </Col>
          </Form.Group>
        
          </CardWidget>

        </Col>
      </Row>
     
    </>
  )
}
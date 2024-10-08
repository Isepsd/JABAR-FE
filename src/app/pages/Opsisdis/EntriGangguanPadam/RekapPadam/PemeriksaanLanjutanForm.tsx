import {  STATUS_PADAM} from "@app/configs/select-options/rekap_padam.select";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamicOLD";
import SelectAsyncDynamicPenyulangpadam from "@app/modules/SelectForm/SelectAsyncDynamicPenyulangpadam";

import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

import React ,{useEffect, useState}from "react";
// import React, { } from "react";
import { useWatch } from 'react-hook-form';
// import axios from 'axios';
import InputDate from '@app/components/Date/InputDate';
import {  Col, Row, Form  } from "react-bootstrap";
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
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
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
interface IPemeriksaanLanjutanForm {
  control: any
  errors: any
  register: any
  watch: any
  setValue?: any
}

export default function PemeriksaanLanjutanForm({
  control,
  errors,
  setValue,
  register,
  // watch,
  
}: IPemeriksaanLanjutanForm) {
  const source = axios.CancelToken.source();
   // Watch value of 'penyulang_id' (which corresponds to 'id_ref_lokasi')
  //  const selectedPenyulangId = watch('penyulang_id');
  const [selectedTrafoGi, setSelectedTrafoGi] = useState(null);
   const selectedPenyulangId = useWatch({ control, name: "penyulang_id" });

 
   console.log('Extracted ayatrafo:', selectedTrafoGi);
  
   // Function to fetch Trafo data based on selected penyulang
  // Function to fetch Trafo data based on selected penyulang
const fetchTrafoData = async (penyulangId: any) => {
  try {
    const req:any = await getAllByPath(`${API_PATH().master.jaringan.ref_lokasi}/${penyulangId}`, {}, source.token);
    console.log('API response:', req); // Inspect API response

    // Assuming that id_trafo_gi is part of the response, extract it
    const idTrafoGi = req?.results?.id_trafo_gi || ''; // Update this based on actual response structure
    console.log('Extracted id_trafo_gi:', idTrafoGi);

    // Now update the queryParams for SelectAsyncDynamic for Trafo and Gardu Induk
    setSelectedTrafoGi(idTrafoGi); // Store id_trafo_gi in a state variable
  } catch (error) {
    console.error('Error fetching Trafo data:', error);
  }
};

    // Effect to trigger API call or perform action when penyulang_id changes
   useEffect(() => {
    if (selectedPenyulangId) {
      // Perform your API call here using selectedPenyulangId
      console.log('Selected Penyulang ID:', selectedPenyulangId);
      fetchTrafoData(selectedPenyulangId); // Call your function to fetch data
    }
  }, [selectedPenyulangId]);

  return (

    <>
            
        <Col md={6} sm>
          
        <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={2}>
              Tanggal Input :
            </Form.Label>
            <Col md={2}>
            <InputDate
              errors={errors}
              register={register}
              type="date"
              fieldName="tanggal_gangguan"
              // step={1}
            />
            </Col>
            <Form.Label column md={2}>
              Jam Input :
            </Form.Label>
            <Col md={3}>
            <InputDate
              errors={errors}
              register={register}
              type="time"
              fieldName="time"
              // step={1}
            />
            </Col>
          </Form.Group>
       
        </Col>
<Row>
    
        <Col md={6} sm>
        <CardWidget>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                      Penyulang
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName="penyulang_id"
                        control={control}
                        errors={errors}
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        queryParams={{
                           id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                          //  id_gardu_induk: watchgarduinduk
                          }}
                        setValue={setValue}
                        // watchParent={watchgarduinduk}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                      Cuaca
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName={'id_ref_ep_cuaca'}
                        pathServiceName={
                          'opsisdis.rekap_padam.ref_ep_cuaca'
                        }
                        labelField={'nama'}
                        valueField={'id'}
                        placeholder={'Pilih...'}
                        isClearable={true}
                        errors={errors}
                        control={control}
                        queryParams={{ page: -1 }}
                      />
                  
                    </Col>
                    
                  </Form.Group>
                  <hr />
                     {/* Form untuk Trafo */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Trafo
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamicPenyulangpadam
                    fieldName="trafo_id"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih Trafo"
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={selectedTrafoGi} // Melihat perubahan dari pilihan Trafo
                    queryParams={{
                      id_ref_lokasi: selectedTrafoGi, // Gunakan Trafo yang dipilih untuk query
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().trafo_gi}`,
                    }}
                  />
                </Col>
              </Form.Group>

              <hr />

              {/* Form untuk Gardu Induk */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Gardu Induk
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    watchParent={selectedTrafoGi} // Mengikuti nilai dari select Trafo GI
                    queryParams={{
                      id_trafo_gi: selectedTrafoGi, // Pastikan queryParam tergantung pada nilai Trafo yang dipilih
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                    }}
                    setValue={setValue}
                  />
                </Col>
              </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
           UP3
            </Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                 fieldName="up3_id"
                 fieldNameParent="id_uid"
                 control={control}
                 errors={errors}
                 labelField={'nama_lokasi'}
                 valueField={'id_ref_lokasi'}
                 pathServiceName={'master.jaringan.ref_lokasi'}
                 queryParams={{  id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                 setValue={setValue}
              />
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
           Kode J
            </Form.Label>
            <Col md={8}>
             
                  
                    <Form.Control
                      {...register('kode_j')}
                      isInvalid={errors.kode_j}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.kode_j?.message}
                    </Form.Control.Feedback>
                
            </Col>
          </Form.Group>
          <hr />
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
            <Form.Label column md={4}>Kategori Gangguan</Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={false}
                fieldName={'kat_gangguan'}
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
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
            Jenis Gangguan
            </Form.Label>
            <Col md={8}>
             
              <Form.Check
                {...register('jenis_gangguan')}
                inline
                type='radio'
                value='sktm'
                label='SKTM'
                style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
              <Form.Check
                {...register('jenis_gangguan')}
                inline
                type='radio'
                value='sutm'
                label='SUTM'
              />
           
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
            Titik Gangguan
            </Form.Label>
            <Col md={8}>
               <Form.Control
                      {...register('titik_gangguan')}
                      isInvalid={errors.titik_gangguan}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.titik_gangguan?.message}
                    </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'controlId='zone'>
            <Form.Label column md={4}>
           Zone
            </Form.Label>
            <Col md={8}>
            <Form.Check
                {...register('zone')}
                inline
                type='radio'
                value='1'
                label='Zone 1'
                style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
              <Form.Check
                {...register('zone')}
                inline
                type='radio'
                value='2'
                label='Zone 2'
              />
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
            Proteksi
            </Form.Label>
            <Col md={8}>
            <SelectAsyncDynamic
                required={false}
                fieldName={'nama_proteksi'}
                pathServiceName={'master.opsisdis.rekap_padam.status_proteksi'}
                labelField={'nama'}
                valueField={'nama'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Col>
          </Form.Group>
    
          
          {/* <Form.Group as={Row} className='mb-3'>
            <Form.Label md={4} column>Keterangan FDIR</Form.Label>
            <Col md={8}>
              <InputForm
                control={control}
                name={'keterangan_penyulang_fdir'}
                as="textarea"
              />
            </Col>
          </Form.Group> */}
       </CardWidget>
       <CardWidget className="mb-4" title='Kendala Recovery'>
       <Form.Group  style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }} controlId='kendala_apkt'>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem' }}>SLD Tidak Update</label>
   
            <Form.Check
                {...register('kendala_apkt')}
                inline
                type='checkbox'
                value='SLDTidakUpdate'
               
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.1rem' }}>Gagal RC</label>
              <Form.Check
                {...register('kendala_apkt')}
                inline
                type='radio'
                value='gagal_rc'
               
              />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.2rem' }}>Non RC</label>
              <Form.Check
                {...register('kendala_apkt')}
                inline
                type='radio'
                value='non_rc'
               
              />
                </div>
                
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Tidak Bisa Manuver Karena Jaringan</label>
              <Form.Check
                {...register('kendala_apkt')}
                inline
                type='radio'
                 value='tidak_bisa_manuver'
            
              />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Manuver Tidak Sesuai</label>
              <Form.Check
                {...register('kendala_apkt')}
                inline
                type='radio'
                value='manuver_tidak_sesuai'
               
              />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Cuaca</label>
              <Form.Check
                {...register('kendala_apkt')}
                inline
                type='radio'
               value='cuaca'
            
              />
                   </div>
                   
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem' }}>Tidak Bisa Manuver Karena Beban Tinggi</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='radio'
                value='tidak_bisa_manuver_karena_beban_tinggi'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.1rem' }}>Ditahan Unit</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='radio'
                value='ditahan_unit'
                style={{ margin: 0 }}
              />
            </div>
          </Form.Group>
          </CardWidget>

        </Col>
      </Row>
     
    </>
  )
}
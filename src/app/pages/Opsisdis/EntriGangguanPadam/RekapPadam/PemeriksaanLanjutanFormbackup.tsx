import {  STATUS_PADAM,FAULT_INDIKATOR,OPTION_FAI_MTRZ,STATUS_PERFORM ,OPTION_URAIAN,OPTION_PERALATAN} from "@app/configs/select-options/rekap_padam.select";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectAsyncDynamicTable from "@app/modules/SelectForm/SelectAsyncDynamicTable";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import SelectFormStaticTable from "@app/modules/SelectForm/SelectFormStaticTable";
import React, { useState } from "react";
import { useWatch } from 'react-hook-form';
import axios from 'axios';
// import React, { } from "react";
// import axios from 'axios';
import InputDate from '@app/components/Date/InputDate';
import {  Table, Button,Col, Row, Form, Card  } from "react-bootstrap";
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
import { API_PATH } from "@app/services/_path.service";
interface IPemeriksaanLanjutanForm {
  control: any
  errors: any
  register: any

  setValue?: any
  handlesubmitFI:any
  handlesubmitdetail:any
}

export default function PemeriksaanLanjutanForm({
  control,
  errors,
  setValue,
  handlesubmitFI,
  handlesubmitdetail,
  // idTransEp,
  // handleAddPeralatan,
  // handleEditPeralatan,
  // handleAddPeralatanFiohl,
  // handleEditPeralatanFiohl,
  register,
  
}: IPemeriksaanLanjutanForm) {
  // const source = axios.CancelToken.source();
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  
  const watchPenyulang = useWatch({ control, name: 'penyulang_id' });
  // /** GET DATA PAGINATION */
  // const getDispatcher = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       page: -1,
  //       limit: -1,
  //       id_ref_regu_petugas: 11
  //     };

  //     const req: any = await getAllByPath(get(API_PATH(), "admin.user"), params, source.token);
  //     const { results } = req;
  //     // const dataLength = results ? results.length : 0;
  //     let data = results.map((d: any) => {
  //       return { ...d, label: d.fullname, value: d.id_user }
  //     });
  //     // setOptionsDispatcher(dataLength > 0 ? data : [])
  //   } catch (err: any) {
  //     // setOptionsDispatcher([])
  //   }
  // };

  // const watchJenisGangguan = useWatch({ control, name: "id_ref_ep_kat_ggn" });

  // const handleAdd = () => {
  //   handleAddPeralatan();
  // }

  // const handleAddFiohl = () => {
  //   handleAddPeralatanFiohl();
  // }

  // const watchStatusProteksi = useWatch({ control, name: 'id_status_proteksi' });


  // console.log("watchStatusProteksi", watchStatusProteksi);

  // useEffect(() => {
  //   getDispatcher()
  // }, [])
  

  const [rows, setRows] = useState<any[]>([]);
      const [rowsDetailManuver, setRowsDetailManuver] = useState<any[]>([]);

      const addRow = () => {
        setRows([...rows, {}]);
      };

      const handleRowChange = (index: number, fieldName: string, value: any) => {
        const updatedRows = rows.map((row, i) =>
          i === index ? { ...row, [fieldName]: value } : row
        );
        setRows(updatedRows);
      };

      const addRowManuver = () => {
        setRowsDetailManuver([...rowsDetailManuver, {}]);
      };

      const handleRowManuverChange = (index: number, fieldName: string, value: any) => {
        const updatedRows = rowsDetailManuver.map((row, i) =>
          i === index ? { ...row, [fieldName]: value } : row
        );
        setRowsDetailManuver(updatedRows);
      };

      const handleDeleteRow = (index: number) => {
        setRows(rows.filter((_, i) => i !== index));
      };

      const handleDeleteRowManuver = (index: number) => {
        setRowsDetailManuver(rowsDetailManuver.filter((_, i) => i !== index));
      };


        // // Submit handler for Fault Indikator
        // const handleSubmitFaultIndikator = async () => {
        //   try {
        //     const response = await axios.post(API_PATH().opsisdis.rekap_padam.fi, rows);
        //     console.log('Fault Indikator data successfully submitted:', response.data);
        //   } catch (error) {
        //     console.error('Error submitting Fault Indikator data:', error);
        //   }
        // };

        // // Submit handler for Detail Manuver Gangguan Penyulang
        // const handleSubmitDetailManuver = async () => {
        //   try {
        //     const response = await axios.post(API_PATH().opsisdis.rekap_padam.detail, rowsDetailManuver);
        //     console.log('Detail Manuver data successfully submitted:', response.data);
        //   } catch (error) {
        //     console.error('Error submitting Detail Manuver data:', error);
        //   }
        // };


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
                        queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                        setValue={setValue}
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
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label column md={4}>
                      Trafo
                      </Form.Label>
                      <Col md={8}>
                        <SelectAsyncDynamic
                         fieldName="trafo_id"
                         pathServiceName="master.jaringan.ref_lokasi"
                         labelField="nama_lokasi"
                         valueField="id_ref_lokasi"
                         placeholder="Pilih Trafo"
                         isClearable={true}
                         errors={errors}
                         control={control}
                         queryParams={{
                           sort_by: "nama_lokasi",
                           id_ref_jenis_lokasi: `${JENIS_LOKASI().trafo_gi}`,
                           status_listrik: 1,
                           jenis_layanan: "NON KTT",
                         }}
                        />
                      </Col>
                    </Form.Group>
               <hr />
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
                    watchParent={watchPenyulang}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      id_penyulang: watchPenyulang // Ini mengambil nilai penyulang yang dipilih
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
                 queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
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
                required={true}
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
          <Form.Group as={Row} className='mb-3'>
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
                required={true}
                fieldName={'proteksi_gangguan'}
                pathServiceName={'master.opsisdis.rekap_padam.status_proteksi'}
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
                <Form.Group style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem' }}>SLD Tidak Update</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='SLDTidakUpdate'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.1rem' }}>Gagal RC</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='gagal_rc'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.2rem' }}>Non RC</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='non_rc'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Tidak Bisa Manuver Karena Jaringan</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='tidak_bisa_manuver'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Manuver Tidak Sesuai</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='manuver_tidak_sesuai'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.3rem' }}>Cuaca</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='cuaca'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem' }}>Tidak Bisa Manuver Karena Beban Tinggi</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='tidak_bisa_manuver_karena_beban_tinggi'
                style={{ margin: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <label style={{ marginBottom: '0.5rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem', paddingTop: '0.1rem' }}>Ditahan Unit</label>
              <Form.Check
                {...register('kendala_apkt')}
                type='checkbox'
                value='ditahan_unit'
                style={{ margin: 0 }}
              />
            </div>
          </Form.Group>
      </CardWidget>

        </Col>
        
        
         <div>
          
          <>
          <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
      <div className='text-center flex-grow-1'>Fault Indikator</div>
      <Button variant="primary" onClick={addRow}>+ Tambah Detail</Button>
    </Card.Header>

    <CardWidget classNameBody='mb-2'>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Fault Indikator</th>
            <th>Lokasi Gardu</th>
            <th className="narrow-column">Arah</th>
            <th>Status</th>
            <th>Perform</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <SelectFormStaticTable
                  control={control}
                  errors={errors}
                  fieldName={`fault_indikator${index}`}
                  options={FAULT_INDIKATOR}
                  onChange={(value: any) => handleRowChange(index, 'fault_indikator', value)}
                />
              </td>
              <td>
                <SelectAsyncDynamicTable
                  fieldName={`id_ref_lokasi${index}`}
                  pathServiceName="master.jaringan.ref_lokasi"
                  labelField="nama_lokasi"
                  valueField="id_ref_lokasi"
                  placeholder="Pilih Trafo"
                  isClearable
                  errors={errors}
                  control={control}
                  queryParams={{
                    id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                    sort_by: "nama_lokasi",
                  }}
                  onChange={(value: any) => handleRowChange(index, 'id_ref_lokasi_trafo', value)}
                />
              </td>
              <td className="narrow-column">
                <Form.Control
                  {...register(`arah${index}`)}
                  isInvalid={errors[`arah${index}`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`arah${index}`]?.message}
                </Form.Control.Feedback>
              </td>
              <td>
                <SelectFormStaticTable
                  control={control}
                  errors={errors}
                  fieldName={`status${index}`}
                  options={OPTION_FAI_MTRZ}
                  onChange={(value: any) => handleRowChange(index, 'status', value)}
                />
              </td>
              <td>
                <SelectFormStaticTable
                  control={control}
                  errors={errors}
                  fieldName={`perform${index}`}
                  options={STATUS_PERFORM}
                  onChange={(value: any) => handleRowChange(index, 'perform', value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRow(index)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CardWidget>

    <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
      <div className='text-center flex-grow-1'>Detail Manuver Gangguan Penyulang</div>
      <Button variant="primary" onClick={addRowManuver}>+ Tambah Detail Manuver</Button>
    </Card.Header>

    <CardWidget classNameBody='mb-2'>
    <Table bordered className="mt-3 wide-table">
  <thead>
    <tr>
      <th rowSpan={2} className="wide-column">Dispatcher</th>
      <th rowSpan={2}>Tanggal</th>
      <th rowSpan={2}>Jam</th>
      <th rowSpan={2} className="wide-column">Uraian</th>
      <th rowSpan={2} className="wide-column" >Peralatan</th>
      <th rowSpan={2} className="wide-column">Nama</th>
      <th rowSpan={2} className="wide-column">Arah</th>
      <th rowSpan={2} className="wide-column">Gardu Padam</th>
      <th rowSpan={2} className="wide-column">Arus (A)</th>
      <th colSpan={9} className="text-center">Rele Kerja</th> {/* Kolom grup untuk Rele Kerja */}
      <th rowSpan={2} className="wide-column">Remote</th>
      <th rowSpan={2} className="wide-column">Penyebab Gagal RC</th>
      <th rowSpan={2} className="wide-column">Manuver</th>
      <th colSpan={4} className="text-center">Arus Gangguan A</th>
      <th rowSpan={2} className="wide-column">Keterangan</th>
      <th rowSpan={2} className="wide-column">Indikasi Gangguan</th>
      <th rowSpan={2} className="narrow-column">Aksi</th> {/* Kolom aksi */}
    </tr>
    <tr>
      {/* Columns for Rele Kerja */}
      <th className="narrow-column">OC</th>
      <th className="narrow-column">GF</th>
      <th className="narrow-column">R</th>
      <th className="narrow-column">S</th>
      <th className="narrow-column">T</th>
      <th className="narrow-column">M</th>
      <th className="narrow-column">BC</th>
      <th className="narrow-column">UFR</th>
      <th className="narrow-column">TD</th>

      {/* Columns for Arus Gangguan A */}
      <th className="narrow-column">R</th>
      <th className="narrow-column">S</th>
      <th className="narrow-column">T</th>
      <th className="narrow-column">N</th>
    </tr>

  </thead>
  <tbody>
    {rowsDetailManuver.map((row, index) => (
      <tr key={index}>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td>
          <InputDate
            errors={errors}
            register={register}
            type="date"
            fieldName="date"
          />
        </td>
        <td>
          <InputDate
            errors={errors}
            register={register}
            type="time"
            fieldName="time"
          />
        </td>
        <td>
          <SelectFormStaticTable
            control={control}
            errors={errors}
            fieldName={`uraian${index}`}
            options={OPTION_URAIAN}
            onChange={(value: any) => handleRowManuverChange(index, 'uraian', value)}
          />
        </td>
        <td>
          <SelectFormStaticTable
            control={control}
            errors={errors}
            fieldName={`peralatan${index}`}
            options={OPTION_PERALATAN}
            onChange={(value: any) => handleRowManuverChange(index, 'peralatan', value)}
          />
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`nama${index}`)}
            isInvalid={errors[`nama${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`nama${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`arah_manuver${index}`)}
            isInvalid={errors[`arah_manuver${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`arah_manuver${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`gardu_padam${index}`)}
            isInvalid={errors[`gardu_padam${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`gardu_padam${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`arus${index}`)}
            isInvalid={errors[`arus${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`arus${index}`]?.message}
          </Form.Control.Feedback>
        </td>

        {/* Checkbox Rele Kerja */}
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`oc_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`gf_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`r_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`s_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`t_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`m_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`bc_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`ufr_${index}`} />
          </div>
        </td>
        <td className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            <Form.Check type="checkbox" name={`td_${index}`} />
          </div>
        </td>
        <td>
          <SelectFormStaticTable
            control={control}
            errors={errors}
            fieldName={`uraian${index}`}
            options={OPTION_URAIAN}
            onChange={(value: any) => handleRowManuverChange(index, 'uraian', value)}
          />
        </td>  
        <td>
          <SelectFormStaticTable
            control={control}
            errors={errors}
            fieldName={`uraian${index}`}
            options={OPTION_URAIAN}
            onChange={(value: any) => handleRowManuverChange(index, 'uraian', value)}
          />
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td className="wide-column">
          <Form.Control
            {...register(`dispatcher${index}`)}
            isInvalid={errors[`dispatcher${index}`]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[`dispatcher${index}`]?.message}
          </Form.Control.Feedback>
        </td>
        <td>
          <SelectFormStaticTable
            control={control}
            errors={errors}
            fieldName={`uraian${index}`}
            options={OPTION_URAIAN}
            onChange={(value: any) => handleRowManuverChange(index, 'uraian', value)}
          />
        </td>
        <td>
          <Button variant="danger" onClick={() => handleDeleteRowManuver(index)}>
            Hapus
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
      </Table>
    </CardWidget>
            {/* <TablePeralatanFIOHL
              idTransEp={idTransEp}
              handleAdd={handleAddFiohl}
              handleEdit={handleEditPeralatanFiohl}
            /> */}
          </>
     
  </div>
 </Row>
      {/* <ModalData modalProps={modalTambahPeralatan}>
        <ModalTambahPertalatan dataSelected={dataSelect} />
      </ModalData> */}
    </>
  )
}
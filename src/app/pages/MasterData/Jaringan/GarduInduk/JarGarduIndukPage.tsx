import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IJaringanGarduInduk } from '@app/interface/jaringan-gardu-induk.interface';
import { GARDU_INDUK } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function JarGarduIndukPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});

  const [columns, setColumns] = useState<any>(GARDU_INDUK());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IJaringanGarduInduk, index: number) => {
      let alamat: string = item?.alamat;
      if (item?.ref_district) {
        alamat += ", " + item?.ref_district?.name
      }
      if (item?.ref_regency) {
        alamat += ", " + item?.ref_regency?.name
      }
      if (item?.ref_province) {
        alamat += ", " + item?.ref_province?.name
      }
      dataTableValue.push({
        number: item.number,
        kode_lokasi: item?.kode_lokasi,
        jenis_gi: item?.jenis_gi,
        fungsi_scada: item?.fungsi_scada,
        nama_lokasi: item?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        unit_pembangkit: item?.unit_pembangkit?.nama_lokasi,
        up2b: item?.up2b?.nama_lokasi,
        alamat: alamat,
        lat: item?.lat,
        lon: item?.lon,
        status: (<BadgeStatus status={item?.status_listrik}></BadgeStatus>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {roleActions?.update &&
                <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
              }
              {roleActions?.delete &&
                <Dropdown.Item
                  onClick={() => handleDelete(item)}
                  className='text-danger-hover'
                >
                  Delete
                </Dropdown.Item>
              }

            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit')
  };

/** COLUMN SHOW HIDE EVENT HANDLE */
useEffect(() => {
  let cols: any = columns?.filter(({ show }: any) => show === true);
  let roleAccess = ROLE_ACCESS("gardu-induk")
  const roleAct = {
    view: ROLE_ACTION(roleAccess, 'view'),
    create: ROLE_ACTION(roleAccess, 'create'),
    update: ROLE_ACTION(roleAccess, 'update'),
    delete: ROLE_ACTION(roleAccess, 'delete'),
  };
  setRoleActions(roleAct);
  if (!roleAct?.delete && !roleAct?.update) {
    cols = cols?.filter((item: any) => {
      return item?.accessor != "action"
    })
  }
  setDataColumns(cols);
}, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.jaringan.ref_lokasi}
        // exportConfig={{ path: API_PATH().master.management_upload.gardu_induk + '/download-excel', customParams: {} }}
        primaryKey={'id_ref_lokasi'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
        filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk, sort_by: '-tgl_update,id_ref_lokasi' }}
      ></TableData>
    </>
  );
}

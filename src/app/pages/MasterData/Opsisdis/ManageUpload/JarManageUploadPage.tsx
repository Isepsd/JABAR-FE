import React from 'react';
import FormUpload from '@app/modules/MasterData/FormUpload';

export default function JarManageUploadPage() {
  const menu = [
    {
      name: 'Master Unit Pembangkit',
      id_ref_jenis_lokasi: 1,
      name_ref_jenis_lokasi: 'unit-pembangkit',
    },
    {
      name: 'Master Pembangkit',
      id_ref_jenis_lokasi: 2,
      name_ref_jenis_lokasi: 'pembangkit',
    },
    {
      name: 'Master Gardu Induk',
      id_ref_jenis_lokasi: 4,
      name_ref_jenis_lokasi: 'gardu-induk',
    },
    {
      name: 'Master Trafo GI',
      id_ref_jenis_lokasi: 5,
      name_ref_jenis_lokasi: 'trafo-gi',
    },
    {
      name: 'Master Penyulang',
      id_ref_jenis_lokasi: 6,
      name_ref_jenis_lokasi: 'penyulang',
    },
    {
      name: 'Master Gardu Hubung',
      id_ref_jenis_lokasi: 11,
      name_ref_jenis_lokasi: 'gardu-hubung',
    },
    {
      name: 'Master Key Point',
      id_ref_jenis_lokasi: 36,
      name_ref_jenis_lokasi: 'keypoint',
    },
    {
      name: 'Master Zone',
      id_ref_jenis_lokasi: 7,
      name_ref_jenis_lokasi: 'zona',
    },
    {
      name: 'Master Section',
      id_ref_jenis_lokasi: 8,
      name_ref_jenis_lokasi: 'section',
    },
    {
      name: 'Master Segment',
      id_ref_jenis_lokasi: 9,
      name_ref_jenis_lokasi: 'segment',
    },
    // { name: 'Master Lateral', id_ref_jenis_lokasi: 0 },
    {
      name: 'Master Gardu Distribusi',
      id_ref_jenis_lokasi: 10,
      name_ref_jenis_lokasi: 'gardu-distribusi',
    },
    {
      name: 'Master Trafo GD',
      id_ref_jenis_lokasi: 14,
      name_ref_jenis_lokasi: 'trafo-gardu-distribusi',
    },
  ];

  return (
    <>
      {menu.map((item: any, index: number) => (
        <FormUpload
          key={index}
          name={item.name}
          idRefJenisLokasi={item.id_ref_jenis_lokasi}
          nameRefJenisLokasi={item.name_ref_jenis_lokasi}
        />
      ))}
    </>
  );
}

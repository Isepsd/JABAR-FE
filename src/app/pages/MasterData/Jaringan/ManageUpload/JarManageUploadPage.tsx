import React from 'react';
import { useSelector } from 'react-redux';
// import FormUpload from '@app/modules/MasterData/FormUpload';
import FormUpload from './FormUpload';

export default function JarManageUploadPage() {
  const { currentUser } = useSelector((state: any) => state.auth);

  const menu = [
    {
      name: 'Master Unit Pembangkit',
      id_ref_jenis_lokasi: '60582a74-9666-4ff8-af20-b04bc0378fb1',
      name_ref_jenis_lokasi: 'unit-pembangkit',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '60582a74-9666-4ff8-af20-b04bc0378fb1' }
    },
    {
      name: 'Master Pembangkit',
      id_ref_jenis_lokasi: '7013071e-0fbe-432b-971b-7b36b374747a',
      name_ref_jenis_lokasi: 'pembangkit',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '7013071e-0fbe-432b-971b-7b36b374747a' }
    },
    {
      name: 'Master Gardu Induk',
      id_ref_jenis_lokasi: '7b94de4b-5a60-4f83-b9b6-7ae60e508cc5',
      name_ref_jenis_lokasi: 'gardu-induk',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '7b94de4b-5a60-4f83-b9b6-7ae60e508cc5' }
    },
    {
      name: 'Master Trafo GI',
      id_ref_jenis_lokasi: '7c24f9a4-ac6a-4ff0-99e2-fc61371d4ec4',
      name_ref_jenis_lokasi: 'trafo-gi',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '7c24f9a4-ac6a-4ff0-99e2-fc61371d4ec4' }
    },
    {
      name: 'Master Penyulang',
      id_ref_jenis_lokasi: '88130fe7-eddf-4717-883d-784eefedde5d',
      name_ref_jenis_lokasi: 'penyulang',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '88130fe7-eddf-4717-883d-784eefedde5d' }
    },
    {
      name: 'Master Gardu Hubung',
      id_ref_jenis_lokasi: '9f33e7fd-9fc1-42c4-aee0-36a803d565f5',
      name_ref_jenis_lokasi: 'gardu-hubung',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '9f33e7fd-9fc1-42c4-aee0-36a803d565f5', fungsi_lokasi: 'GH' }
    },
    {
      name: 'Master Key Point',
      id_ref_jenis_lokasi: '508d16bc-1a9f-4fd1-a813-49a612baaa75',
      name_ref_jenis_lokasi: 'keypoint',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '508d16bc-1a9f-4fd1-a813-49a612baaa75' }
    },
    {
      name: 'Master Zone',
      id_ref_jenis_lokasi: '898f6086-918d-40d5-90c5-f410ba51434d',
      name_ref_jenis_lokasi: 'zona',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '898f6086-918d-40d5-90c5-f410ba51434d', fungsi_lokasi: 'ZONE' }
    },
    {
      name: 'Master Section',
      id_ref_jenis_lokasi: '8d7e0035-f357-4613-91df-f9eddc435960',
      name_ref_jenis_lokasi: 'section',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '8d7e0035-f357-4613-91df-f9eddc435960', fungsi_lokasi: 'SECTION' }
    },
    {
      name: 'Master Segment',
      id_ref_jenis_lokasi: '8fed0acb-b594-457a-a613-9a4d5a3009e3',
      name_ref_jenis_lokasi: 'segment',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '8fed0acb-b594-457a-a613-9a4d5a3009e3', fungsi_lokasi: 'SEGMENT' }
    },
    // { name: 'Master Lateral', id_ref_jenis_lokasi: 0 },
    {
      name: 'Master Gardu Distribusi',
      id_ref_jenis_lokasi: '991c9f7e-f78b-41bd-934d-f5dce075b57b',
      name_ref_jenis_lokasi: 'gardu-distribusi',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '991c9f7e-f78b-41bd-934d-f5dce075b57b' }
    },
    {
      name: 'Master Trafo GD',
      id_ref_jenis_lokasi: '9f33e7fd-9fc1-42c4-aee0-36a803d565f5',
      name_ref_jenis_lokasi: 'trafo-gardu-distribusi',
      filterParams: { id_user_created: currentUser.id_user, id_ref_jenis_lokasi: '9f33e7fd-9fc1-42c4-aee0-36a803d565f5' }
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
          filterParams={item.filterParams}
        />
      ))}
    </>
  );
}

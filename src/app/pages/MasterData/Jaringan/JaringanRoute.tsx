import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';
// import JarJenisPembangkitPageSmart from './JenisPembangkit/JarJenisPembangkitPageSmart';
import JarJenisPembangkitFormPage from './JenisPembangkit/JarJenisPembangkitFormPage';

// /** PAGE */
const JarGarduDistribusiJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiJQ"))
// const JarGarduDistribusiSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiSmart"))
const JarGarduDistribusiForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiFormPage"))
const JarGarduHubungFormPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungFormPage"))
const JarGarduHubungPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungPageJQ"))
// const JarGarduHubungPageSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungPageSmart"))
const JarGarduHubungDetail = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungDetailPage"))
const JarGarduHubungDetailForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungDetailFormPage"))
const JarGarduIndukJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduInduk/JarGarduIndukJQ"))
// const JarGarduIndukSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduInduk/JarGarduIndukSmart"))
const JarGarduIndukForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduInduk/JarGarduIndukFormPage"))
const JarManageUploadPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/ManageUpload/JarManageUploadPage"))
const JarPembangkitJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Pembangkit/JarPembangkitJQ"))
// const JarPembangkitSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Pembangkit/JarPembangkitSmart"))
const JarPembangkitForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Pembangkit/JarPembangkitFormPage"))
const JarPenyulangJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Penyulang/JarPenyulangJQ"))
const JarPenyulangForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Penyulang/JarPenyulangFormPage"))
const JarSectionJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Section/JarSectionJQ"))
// const JarSectionSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Section/JarSectionSmart"))
const JarSectionForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Section/JarSectionFormPage"))
const JarSegmentJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Segment/JarSegmentJQ"))
// const JarSegmentSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Segment/JarSegmentSmart"))
const JarSegmentForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Segment/JarSegmentFormPage"))
const JarTrafoGDJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGD/JarTrafoGDJQ"))
// const JarTrafoGDSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGD/JarTrafoGDSmart"))
const JarTrafoGDForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGD/JarTrafoGDFormPage"))
const JarTrafoGIPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGI/JarTrafoGIPageJQ"))
// const JarTrafoGIPageSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGI/JarTrafoGIPageSmart"))
const JarTrafoGIForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGI/JarTrafoGIFormPage"))
const JarTreeJaringanPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/TreeJaringan/JarTreeJaringanPage"))
const JarUnitPembangkitJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/UnitPembangkit/JarUnitPembangkitJQ"))
// const JarUnitPembangkitSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/UnitPembangkit/JarUnitPembangkitSmart"))
const JarUnitPembangkitForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/UnitPembangkit/JarUnitPembangkitForm"))
const JarZoneJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Zone/JarZoneJQ"))
// const JarZoneSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Zone/JarZoneSmart"))
const JarZoneForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Zone/JarZoneFormPage"))
const JarKantorJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Kantor/JarKantorJQ"))
// const JarKantorSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Kantor/JarKantorSmart"))
const JarKantorForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Kantor/JarKantorFormPage"))
const SubsistemPageJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/Subsistem/SubsistemPageJQ"))
// const SubsistemPageSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/Subsistem/SubsistemPageSmart"))
const SubsistemForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Subsistem/SubsistemForm"))
const JarKeyPointJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/KeyPoint/JarKeyPointJQ"))
// const JarKeyPointSmart = React.lazy(() => import("@app/pages/MasterData/Jaringan/KeyPoint/JarKeyPointSmart"))
const JarKeyPointForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/KeyPoint/JarKeyPointForm"))
const JarJenisPembangkitJQ = React.lazy(() => import("@app/pages/MasterData/Jaringan/JenisPembangkit/JarJenisPembangkitJQ"))

export default function JaringanRoute() {
  return (
    <>
      <Routes>
        <Route path="jenis-pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitFormPage /></React.Suspense>} />
        </Route>
        <Route path="unit-pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitForm /></React.Suspense>} />
        </Route>
        <Route path="pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitForm /></React.Suspense>} />
        </Route>
        <Route path="gardu-induk">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukForm /></React.Suspense>} />
        </Route>
        <Route path='trafo-gi'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIForm /></React.Suspense>} />
        </Route>
        <Route path='zone'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarZoneJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarZoneForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarZoneForm /></React.Suspense>} />
        </Route>
        <Route path='section'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionForm /></React.Suspense>} />
        </Route>
        <Route path='segment'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentForm /></React.Suspense>} />
        </Route>
        <Route path='penyulang'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangForm /></React.Suspense>} />
        </Route>
        <Route path='gardu-distribusi'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiForm /></React.Suspense>} />
        </Route>
        <Route path='trafo-gd'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDForm /></React.Suspense>} />
        </Route>
        <Route path='gardu-hubung'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungPage /></React.Suspense>} />
          <Route path="detail/:id/edit/:id_gh" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetailForm /></React.Suspense>} />
          <Route path="detail/:id/add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetailForm /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungFormPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetail /></React.Suspense>} />
        </Route>

        <Route path='kantor'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorForm /></React.Suspense>} />
        </Route>
        <Route path='subsistem'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemPageJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemForm /></React.Suspense>} />
        </Route>
        <Route path='pengaman-sutm'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarKeyPointJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarKeyPointForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarKeyPointForm /></React.Suspense>} />
        </Route>

        <Route path="tree-jaringan" element={<React.Suspense fallback={<TopBarLoader />}><JarTreeJaringanPage /></React.Suspense>} />
        <Route path="management-upload" element={<React.Suspense fallback={<TopBarLoader />}><JarManageUploadPage /></React.Suspense>} />



        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}

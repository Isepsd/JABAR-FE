import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const PegawaiPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersPage"))
const PegawaiFormPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersFormPage"))

const JabatanForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Jabatan/JabatanForm"))
const JabatanPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Jabatan/JabatanJQ"))
const DepartementPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Departement/DepartementJQ"))
const DepartementForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Departement/DepartementForm"))
const PerusahaanJQ = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Perusahaan/PerusahaanJQ"))
const PerusahaanForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Perusahaan/PerusahaanForm"))
const ReguPetugasJQ = React.lazy(() => import("@app/pages/MasterData/AdminKsa/ReguPetugas/ReguPetugasJQ"))
const ReguPetugasForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/ReguPetugas/ReguPetugasForm"))
const PetugasReguJQ = React.lazy(() => import("@app/pages/MasterData/AdminKsa/PetugasRegu/PetugasReguJQ"))
const PetugasReguForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/PetugasRegu/PetugasReguForm"))

export default function AdminKSARoute() {
  return (
    <>
      <Routes>
        <Route path='pegawai'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiPage rowAction={['edit', 'delete']} /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiFormPage password={false} /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiFormPage password={false} /></React.Suspense>} />
        </Route>

        <Route path='perusahaan'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanForm /></React.Suspense>} />
        </Route>
        <Route path='departement'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><DepartementPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><DepartementForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><DepartementForm /></React.Suspense>} />
        </Route>
        <Route path='jabatan'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JabatanPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JabatanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JabatanForm /></React.Suspense>} />
        </Route>
        <Route path='regu-petugas'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasForm /></React.Suspense>} />
        </Route>
        <Route path='petugas-regu'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguForm /></React.Suspense>} />
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}

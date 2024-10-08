import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const UsersPageJQ = React.lazy(() => import("@app/pages/Administrator/Users/UsersPageJQ"))
const UsersFormPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersFormPage"))

const RoleJQ = React.lazy(() => import("@app/pages/Administrator/Role/RoleJQ"))
const RoleFormPage = React.lazy(() => import("@app/pages/Administrator/Role/RoleFormPage"))

const RoleSettingsPage = React.lazy(() => import("@app/pages/Administrator/Role/RoleSettingPage"))
const UsersSetNewPassword = React.lazy(() => import("@app/pages/Administrator/Users/UsersSetNewPasswordPage"))

const HistoriKalkukasiPage = React.lazy(() => import("@app/pages/Administrator/HistoriKalkulasi/HistoriKalkukasiPage"))
const HistoriKalkukasiFormPage = React.lazy(() => import("@app/pages/Administrator/HistoriKalkulasi/HistoriKalkukasiFormPage"))

const MenuPage = React.lazy(() => import("@app/pages/Administrator/Menu/MenuPage"))
const ApplicationSettingsPage = React.lazy(() => import("@app/pages/Administrator/Application/ApplicationSettingsPage"))

export default function AdministratorRouting() {
  return (
    <Routes>
      <Route path="">
        {/* Users  */}
        <Route path="users">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><UsersPageJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UsersFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><UsersFormPage /></React.Suspense>} />
          <Route path="set-password/:id" element={<React.Suspense fallback={<TopBarLoader />}><UsersSetNewPassword /></React.Suspense>} />
        </Route>

        {/* Role  */}
        <Route path="role">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RoleJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><RoleFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><RoleFormPage /></React.Suspense>} />
          <Route path="settings/:id" element={<React.Suspense fallback={<TopBarLoader />}><RoleSettingsPage /></React.Suspense>} />
        </Route>

        {/* Histori Kalkukasi  */}
        <Route path="histori-kalkulasi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><HistoriKalkukasiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><HistoriKalkukasiFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><HistoriKalkukasiFormPage /></React.Suspense>} />
          {/* <Route path="settings/:id" element={<React.Suspense fallback={<TopBarLoader />}><RoleSettingsPage /></React.Suspense>} /> */}
        </Route>

        {/* Role  */}
        <Route path="menu">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><MenuPage /></React.Suspense>} />
        </Route>

        <Route path="settings" element={<React.Suspense fallback={<TopBarLoader />}><ApplicationSettingsPage /></React.Suspense>} />
        
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Route>
    </Routes>
  )
}

import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const WpApprovalJQ = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/Approval/WpApprovalJQ"))
const WpApprovalFormPage = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/Approval/WpApprovalFormPage"))

const WpLaranganTanggungJwbQRCJQ = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/LaranganTanggungJwbQRC/WpLaranganTanggungJwbQRCJQ"))
const WpLaranganTanggungJwbQRCFormPage = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/LaranganTanggungJwbQRC/WpLaranganTanggungJwbQRCFormPage"))

const WpPertanyaanQRCJQ = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/PertanyaanQRC/WpPertanyaanQRCJQ"))
const WpPertanyaanQRCFormPage = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/PertanyaanQRC/WpPertanyaanQRCFormPage"))

const WpRiskPointQRCPage = React.lazy(() => import("@app/pages/MasterData/WorkingPermit/RiskPointQRC/WpRiskPointQRCPage"))

export default function WorkingPermitRoute() {
  return (
    <>
      <Routes>
        <Route path="pertanyaan-qrc">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WpPertanyaanQRCJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><WpPertanyaanQRCFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><WpPertanyaanQRCFormPage /></React.Suspense>} />
        </Route>
        <Route path="larangan-tj-qrc">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WpLaranganTanggungJwbQRCJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><WpLaranganTanggungJwbQRCFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><WpLaranganTanggungJwbQRCFormPage /></React.Suspense>} />
        </Route>
        <Route path="approval">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WpApprovalJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><WpApprovalFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><WpApprovalFormPage /></React.Suspense>} />
        </Route>
        <Route path="risk-qrc" element={<React.Suspense fallback={<TopBarLoader />}><WpRiskPointQRCPage /></React.Suspense>} /> 
        <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
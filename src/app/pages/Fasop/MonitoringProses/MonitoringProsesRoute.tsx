import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const MonitoringProsesPage = React.lazy(() => import("@app/pages/Fasop/MonitoringProses/MonitoringProsesPage"))

export default function SpectrumHistoriRoute() {
  return (
    <>
      <Routes>
        <Route path="monitoring-proses" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringProsesPage /></React.Suspense>} />
        
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}

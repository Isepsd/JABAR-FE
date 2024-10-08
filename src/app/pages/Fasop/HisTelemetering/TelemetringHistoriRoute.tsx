import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const HisTelemetring5MPageJQ = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/Telemetring/5Menit/HisTelemetring5MPageSmart"))
const HisTelemetring30MPageJQ = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/Telemetring/30Menit/HisTelemetring30MPageSmart"))
const FreBackupHarianPage = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/FrekuensiPembangkit/BackupHarian/FreBackupHarianPage"))
const FreEksekusiPage = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/FrekuensiPembangkit/Eksekusi/FreEksekusiPage"))
const FreMonitoringPage = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/FrekuensiPembangkit/Monitoring/FreMonitoringPage"))
const FreMonitoringDetail = React.lazy(() => import("@app/pages/Fasop/HisTelemetering/FrekuensiPembangkit/Monitoring/FreMonitoringDetail"))


export default function SpectrumHistoriRoute() {
  return (
    <>
    <Routes> 
          <Route path="telemetering-5mnt" element={<React.Suspense fallback={<TopBarLoader />}><HisTelemetring5MPageJQ /></React.Suspense>} /> 
          <Route path="telemetering-30mnt" element={<React.Suspense fallback={<TopBarLoader />}><HisTelemetring30MPageJQ /></React.Suspense>} /> 
          <Route path="monitoring">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}>
            <FreMonitoringPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}>
            <FreMonitoringDetail /></React.Suspense>} />
          </Route>
          <Route path="history" element={<React.Suspense fallback={<TopBarLoader />}><FreBackupHarianPage /></React.Suspense>} />
          <Route path="ekskursi" element={<React.Suspense fallback={<TopBarLoader />}><FreEksekusiPage /></React.Suspense>} />
          
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}

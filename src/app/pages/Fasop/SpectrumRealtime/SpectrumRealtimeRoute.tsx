import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const SrMessagePage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/Message/SrMessagePage"))
const SrStatusDigitalPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusDigital/SrStatusDigitalPage"))
const StatSoeJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/soe/StatSoeJQ"))
const SrStatusAnalogPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusAnalog/SrStatusAnalogPage"))
const SrStatusMasterPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusMaster/SrStatusMasterPage"))
const SrStatusRTUPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusRTU/SrStatusRTUPage"))
const SrUFRPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/UFR/SrUFRPage"))
const StatTelemeteringPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/Telemetering/StatTelemeteringPageJQnew"))
const StatMasterStationPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/MasterStation/StatMasterStationPageJQ"))
const StatRtuPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/RTU/StatRtuPageJQ"))
const StatTelesignalPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/Telesignal/StatTelesignalPageJQ"))
const TopologiStatusNetwork = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/TopologiStatusNetwork/MonitoringGarduJQ"))

export default function SpectrumRealtimeRoute() {
  return (
    <>
      <Routes>
        <Route path="telemetering" element={<React.Suspense fallback={<TopBarLoader />}><StatTelemeteringPageJQ /></React.Suspense>} />
        <Route path="soe-and-alarm-proteksi" element={<React.Suspense fallback={<TopBarLoader />}><StatSoeJQ /></React.Suspense>} />
        <Route path="master-station" element={<React.Suspense fallback={<TopBarLoader />}><StatMasterStationPageJQ /></React.Suspense>} />
        <Route path="rtu" element={<React.Suspense fallback={<TopBarLoader />}><StatRtuPageJQ /></React.Suspense>} />
        <Route path="telesignal" element={<React.Suspense fallback={<TopBarLoader />}><StatTelesignalPageJQ /></React.Suspense>} />
        <Route path="topologi-status" element={<React.Suspense fallback={<TopBarLoader />}><TopologiStatusNetwork /></React.Suspense>} />
        <Route path="message" element={<React.Suspense fallback={<TopBarLoader />}><SrMessagePage /></React.Suspense>} />
        <Route path="status-digital" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusDigitalPage /></React.Suspense>} />
        <Route path="status-analog" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusAnalogPage /></React.Suspense>} />
        <Route path="status-master" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusMasterPage /></React.Suspense>} />
        <Route path="status-rtu" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusRTUPage /></React.Suspense>} />
        <Route path="ufr" element={<React.Suspense fallback={<TopBarLoader />}><SrUFRPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
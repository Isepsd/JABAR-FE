import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const ShAnalogPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Analog/ShAnalogPage"))
const ShDigitalPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Digital/ShDigitalPage"))
const ShIPPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/IP/ShIPPage"))
const ShMasterPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Master/ShMasterPageJQ"))
const ShMessagePageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Message/ShMessagePageJQ"))
const ShPengukuranPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Pengukuran/ShPengukuranPageJQ"))
const ShRTUPageSmart = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/RTU/ShRTUPageJQ"))
const ShRemoteControlPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/RemoteControl/ShRemoteControlPageJQ"))
const ShRemoteControlPageForm = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/RemoteControl/ShRemoteControlPageForm"))
const ShTRIPPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/TRIP/ShTRIPPageJQ"))
const ScadaPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/SCADA/ScadaPageJQ"))
const HisTelemetringPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Telemetering/HisTelemetringPageJQ"))
const HisTelesignalPageJQ = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Telesignal/HisTelesignalPageJQ"))

export default function SpectrumHistoriRoute() {
  return (
    <>
      <Routes>
        <Route path="analog" element={<React.Suspense fallback={<TopBarLoader />}><ShAnalogPage /></React.Suspense>} />
        <Route path="scada" element={<React.Suspense fallback={<TopBarLoader />}><ScadaPage /></React.Suspense>} />
        <Route path="digital" element={<React.Suspense fallback={<TopBarLoader />}><ShDigitalPage /></React.Suspense>} />
        <Route path="ip" element={<React.Suspense fallback={<TopBarLoader />}><ShIPPage /></React.Suspense>} />
        <Route path="master" element={<React.Suspense fallback={<TopBarLoader />}><ShMasterPageJQ /></React.Suspense>} />
        <Route path="message" element={<React.Suspense fallback={<TopBarLoader />}><ShMessagePageJQ /></React.Suspense>} />
        <Route path="pengukuran" element={<React.Suspense fallback={<TopBarLoader />}><ShPengukuranPageJQ /></React.Suspense>} />
        {/* <Route path="remote-control" element={<React.Suspense fallback={<TopBarLoader />}><ShRemoteControlPage /></React.Suspense>} /> */}
        <Route path='remote-control'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ShRemoteControlPage /></React.Suspense>} />
          {/* <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateRekapPadam /></React.Suspense>} /> */}
          {/* <Route path="rekap/add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateRekapPadam /></React.Suspense>} /> */}
          <Route path="rekon/:id" element={<React.Suspense fallback={<TopBarLoader />}><ShRemoteControlPageForm /></React.Suspense>} />
        </Route>
        <Route path="rtu" element={<React.Suspense fallback={<TopBarLoader />}><ShRTUPageSmart /></React.Suspense>} />
        <Route path="trip" element={<React.Suspense fallback={<TopBarLoader />}><ShTRIPPage /></React.Suspense>} />
        <Route path="telemetering" element={<React.Suspense fallback={<TopBarLoader />}><HisTelemetringPageJQ /></React.Suspense>} />
        <Route path="telesignal" element={<React.Suspense fallback={<TopBarLoader />}><HisTelesignalPageJQ /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}

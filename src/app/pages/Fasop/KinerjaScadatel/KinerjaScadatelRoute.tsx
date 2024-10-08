import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";
// import JarJenisPembangkitPage from './JenisPembangkit/JarJenisPembangkitPage';
// import JarJenisPembangkitFormPage from './JenisPembangkit/JarJenisPembangkitFormPage';

/** PAGE */
// const JarGarduDistribusiPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiPage"))
// const JarGarduDistribusiForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiFormPage"))

const KinTelemeteringPageJQ = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/Telemetering/KinTelemeteringPageJQ"));
const KinTelesignalPageJQ = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/Telesignal/KinTelesignalPageJQ"));
const KinRtuPageJQ = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/Rtu/KinRtuPageJQ"));
const KinMasterStationPageJQ = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/MasterStation/KinMasterStationPageJQ"));
const TripPage = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/Trip/KinTripPageJQ"));
const KinRemoteControlPageJQ = React.lazy(() => import("@app/pages/Fasop/KinerjaScadatel/RemoteControl/KinRemoteControlPageJQ"));
// const KinEstimatorStatePage = React.lazy(() => import("@app/pages/Fasop/Scadatel/NewKinerjaScadatel/EstimatorState/KinEstimatorStateJQ"));





export default function KinerjaScadatelRoute() {
  return (
    <>
      <Routes>
        {/* <Route path="/state-estimator">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinEstimatorStatePage />
              </React.Suspense>
            }
          />
        </Route> */}
        <Route path="/telemetering">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinTelemeteringPageJQ />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="/telesignal">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinTelesignalPageJQ />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="/rtu">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinRtuPageJQ />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="/master-station">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinMasterStationPageJQ />
              </React.Suspense>
            }
          />
        </Route>


        <Route path="/trip">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <TripPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="/remote-control">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinRemoteControlPageJQ />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}

import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";

/** PAGE */

// const PbPenyulangCol1PhasePage = React.lazy(
//   () =>
//     import(
//       "@app/pages/Opsisdis/Telemetering/Penyulang/PbPenyulangCol1PhasePage"
//     )
// );
const PbPenyulangColPage = React.lazy(
  () => import("@app/pages/Opsisdis/Telemetering/Penyulang/PbPenyulangColPage")
);
const PbTrafoGIColPage = React.lazy(
  () => import("@app/pages/Opsisdis/Telemetering/TrafoGI/PbTrafoGIColPage")
);

const PbTrafoKTTCol1PhasePage = React.lazy(
  () => import("@app/pages/Opsisdis/Telemetering/TrafoGIKTT/PbTrafoGIColPage")
);
// const PbTrafoKTTCol3PhasePage = React.lazy(() => import("@app/pages/Opsisdis/Telemetering/TrafoGIKTT/PbTrafoKTTCol3PhasePage"))
const PbTeganganTrafoGISmart = React.lazy(
  () =>
    import(
      "@app/pages/Opsisdis/Telemetering/TeganganTrafoGI/PbTeganganTrafoGISmart"
    )
);

const PbPembangkitColPage = React.lazy(
  () =>
    import("@app/pages/Opsisdis/Telemetering/Pembangkit/PbPembangkitColPage")
);
const PbGarduHubungColPage = React.lazy(
  () =>
    import("@app/pages/Opsisdis/Telemetering/GarduHubung/PbGarduHubungColPage")
);

const PbKeyPointColPage = React.lazy(
  () => import("@app/pages/Opsisdis/Telemetering/KeyPoint/PbKeyPointColPage")
);

const UidPage = React.lazy(
  () => import("@app/pages/Opsisdis/Telemetering/RencanaBeban/UidPage")
);

export default function TelemeteringRoute() {
  return (
    <>
      <Routes>
        <Route
          path="rencana-beban-unit"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <UidPage />
            </React.Suspense>
          }
        />
        <Route
          path="keypoint-col"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbKeyPointColPage />
            </React.Suspense>
          }
        />
        <Route
          path="gh-col"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbGarduHubungColPage />
            </React.Suspense>
          }
        />
        <Route
          path="pembangkit-col"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbPembangkitColPage />
            </React.Suspense>
          }
        />
        <Route
          path="penyulang-col"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbPenyulangColPage />
            </React.Suspense>
          }
        />
        <Route
          path="trafo-gi-ktt-col-1phase"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbTrafoKTTCol1PhasePage />
            </React.Suspense>
          }
        />
        {/* <Route path="trafo-gi-ktt-col-3phase" element={<React.Suspense fallback={<TopBarLoader />}><PbTrafoKTTCol3PhasePage /></React.Suspense>} /> */}

        <Route
          path="trafo-gi-col-1phase"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbTrafoGIColPage />
            </React.Suspense>
          }
        />

        <Route
          path="teg-trafo-gi"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PbTeganganTrafoGISmart />
            </React.Suspense>
          }
        />

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}

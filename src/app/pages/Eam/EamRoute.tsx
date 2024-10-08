import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";

/** PAGE */

const TransMutasiFormPage = React.lazy(
  () => import("@app/pages/Eam/TransMutasi/TransMutasiFormPage")
);
const TransMutasiPage = React.lazy(
  () => import("@app/pages/Eam/TransMutasi/TransMutasiPage")
);

export default function FasopRoute() {
  return (
    <>
      <Routes>
        <Route path="trans-mutasi">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <TransMutasiPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <TransMutasiFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <TransMutasiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}

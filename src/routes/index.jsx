import { Routes, Route } from "react-router-dom";

import DefaultLayout from "../components/layouts/DefaultLayout";
import AuthLayout from "../components/layouts/AuthLayout";

import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import VenueCategries from "../pages/venues/Venues";
import NotFound from "../pages/NotFound";

function Routing() {
  return (
    <Routes>
      <Route element={<AuthLayout />} path={"/auth"}>
        <Route index element={<SignIn />} />
      </Route>
      <Route element={<DefaultLayout />} path={"/"}>
        <Route index element={<Dashboard />} />
        <Route element={<VenueCategries />} path={"/venues"} />
        <Route element={<NotFound />} path="*" />
      </Route>
    </Routes>
  );
}

export default Routing;

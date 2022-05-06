import React from "react";
import { Routes , Route, Navigate, RouteProps } from "react-router-dom";

import Boxes from "pages/Boxes";
import Login from "pages/Login";
import Register from "pages/Register";
import Box from "pages/Box";
import CreateBox from "pages/CreateBox";
import Locations from "pages/Locations";
import CreateLocation from "pages/CreateLocation";

interface ProtectedRouteProps extends RouteProps {
  auth: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, ...props }) => {
  return auth === "success" ? <Route {...props} /> : <Navigate to="/" />;
};

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Boxes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/box/create" element={<CreateLocation />} />
      <Route path="/box/:boxId" element={<Box />} />
      <Route path="/location" element={<Locations />} />
      <Route path="/location/create" element={<CreateLocation />} />
    </Routes >
  );
};

export default Router;
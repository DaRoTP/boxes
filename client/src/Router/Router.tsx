import React from "react";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";

import Boxes from "pages/Boxes";
import Login from "pages/Login";
import Register from "pages/Register";
import Box from "pages/Box";
import CreateBox from "pages/CreateBox";
import Locations from "pages/Locations";
import CreateLocation from "pages/CreateLocation";
import { AuthStatus } from "context/UserContext";
interface RouteRestrictedProps extends RouteProps {
  condition: boolean;
  children: any;
  redirectPath: string;
}

const ProtectedRoute: React.FC<RouteRestrictedProps> = ({
  condition,
  redirectPath = "/",
  children,
}) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const Router: React.FC<{ isAuth: AuthStatus }> = ({ isAuth }) => {
  return (
    <Routes>
      <Route path="/" element={<Boxes />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute redirectPath="/" condition={isAuth !== "success"}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute redirectPath="/" condition={isAuth !== "success"}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/box/create"
        element={
          <ProtectedRoute redirectPath="/login" condition={isAuth === "success"}>
            <CreateBox />
          </ProtectedRoute>
        }
      />
      <Route
        path="/box/:boxId"
        element={
          <ProtectedRoute redirectPath="/login" condition={isAuth === "success"}>
            <Box />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location"
        element={
          <ProtectedRoute redirectPath="/login" condition={isAuth === "success"}>
            <Locations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location/create"
        element={
          <ProtectedRoute redirectPath="/login" condition={isAuth === "success"}>
            <CreateLocation />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default Router;

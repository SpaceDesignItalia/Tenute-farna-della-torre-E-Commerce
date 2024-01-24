import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "./API/API";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Layout/Navbar";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /* useEffect(() => {
    axios
      .get(API_URL + "Auth/CheckSession", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsAuth(res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []); */

  if (isLoading) {
    return (
      <div className="absolute left-0 w-full h-full flex flex-col justify-center items-center">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  const ProtectedRoute = ({ isAuth, redirectPath = "/login" }) => {
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const LoginRoute = ({ isAuth, redirectPath = "/" }) => {
    if (isAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<LoginRoute isAuth={isAuth} />}>
          {/* <Route exact path="/login" element={<Login />} /> */}
        </Route>
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

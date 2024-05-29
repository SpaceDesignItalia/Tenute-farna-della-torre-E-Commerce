import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "./API/API";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home/Home";
import Footbar from "./Components/Layout/Footbar";
import ShoppingCart from "./Pages/Cart/ShoppingCart";
import ProductPage from "./Pages/Product/ProductPage";
import StorePage from "./Pages/Store/StorePage";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/PostLogin/Dashboard";
import Orders from "./Pages/PostLogin/Orders/Orders";
import Addresses from "./Pages/PostLogin/Addresses/Addresses";
import Registration from "./Pages/Registration/Registration";
import AccountInfo from "./Pages/PostLogin/AccountInfo/AccountInfo";
import TermsAndCondition from "./Pages/Documents/TermsAndCondition";
import PrivacyPolicy from "./Pages/Documents/PrivacyPolicy";
import PassRecover from "./Pages/PassRecover/PassRecover";
import RecChangePassword from "./Pages/PassRecover/RecChangePassword";
import RecoverSuccess from "./Pages/PassRecover/RecoverSuccess";
import ProductDetail from "./Pages/Product/ProductDetail";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/CheckSession", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => {
        console.error("Errore durante il controllo della sessione:", err);
        setIsAuth(false);
      })
      .finally(() => {
        setIsLoading(false); // Aggiorna lo stato di caricamento quando la richiesta è completata
      });
  }, []);

  if (isLoading) {
    return (
      <div className="absolute left-0 w-full h-full flex flex-col justify-center items-center">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<StorePage />} path="/store" />
        <Route
          element={<ProductPage />}
          path="/store/product/:id/:productName"
        />
        <Route
          element={<ProductDetail />}
          path="/store/product/:id/:productName/details"
        />
        <Route element={<About />} path="/about" />
        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/registration" />
        <Route element={<PassRecover />} path="/recover/recover-account" />
        <Route
          element={<RecChangePassword />}
          path="/recover/reset-password/:email/:token"
        />
        <Route
          element={<RecoverSuccess />}
          path="/recover/passchanged/:email/:token"
        />
      </Routes>
      <ProtectedRoutes isAuth={isAuth} />
      <Footbar />
    </>
  );
}

const ProtectedRoutes = ({ isAuth }) => {
  // Definiamo i percorsi protetti
  const protectedPaths = [
    "/dashboard",
    "/orders",
    "/addresses",
    "/editAddress",
    "/addAddress",
    "/cart",
  ];

  // Verifichiamo se l'utente sta tentando di accedere a un percorso protetto
  const isAccessingProtectedPath = protectedPaths.some((path) =>
    window.location.pathname.startsWith(path)
  );

  // Se l'utente non è autenticato e sta tentando di accedere a un percorso protetto, lo reindirizziamo a /
  if (!isAuth && isAccessingProtectedPath) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<AccountInfo />} path="/dashboard/settings" />
        <Route element={<Orders />} path="/dashboard/orders" />
        <Route element={<Addresses />} path="/dashboard/addresses" />
        <Route element={<ShoppingCart />} path="/cart" />
      </Route>
    </Routes>
  );
};

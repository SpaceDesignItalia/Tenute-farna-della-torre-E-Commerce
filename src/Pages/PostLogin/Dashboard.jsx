import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import axios from "axios";
import { API_URL } from "../../API/API";

const actions = [
  {
    title: "Storico ordini",
    description: "Visualizza lo storico degli ordini associati al tuo account",
    href: "/dashboard/orders",
    icon: RestoreIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Indirizzi",
    description: "Gestisci gli indirizzi di spedizione del tuo account",
    href: "/dashboard/addresses",
    icon: HomeOutlinedIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Informazioni personali",
    description: "Modifica le tue informazioni personali",
    href: "/dashboard/settings",
    icon: ManageAccountsOutlinedIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Logout", // Aggiungi un nuovo elemento per il logout
    description: "Esci dal profilo",
    href: "/", // Puoi specificare l'endpoint di logout qui
    icon: LogoutOutlinedIcon, // Cambia l'icona a tua scelta
    iconForeground: "text-red-700", // Cambia il colore dell'icona a tua scelta
    iconBackground: "bg-red-50", // Cambia il colore di sfondo dell'icona a tua scelta
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(API_URL + "/Customer/GetCustomerData", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUserData(res.data.customer);
        }
      });
  }, []);

  function handleLogout() {
    axios
      .get(API_URL + "/Customer/Logout", { withCredentials: true })
      .then((window.location.href = "/"));
  }

  return (
    <section className="py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 pb-16 lg:max-w-4xl lg:px-0">
            <h1 className="text-3xl font-bold">
              Ciao, {userData.name + " " + userData.surname}
            </h1>
            <p className="mt-5 text-sm text-gray-500">
              Gestisci il tuo account e le tue informazioni personali.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-lg sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
              {actions.map((action, actionIdx) => (
                <div
                  key={action.title}
                  className={classNames(
                    actionIdx === 0
                      ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                      : "",
                    actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                    actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                    actionIdx === actions.length - 1
                      ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                      : "",
                    "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                  )}
                >
                  <div>
                    <span
                      className={classNames(
                        action.iconBackground,
                        action.iconForeground,
                        "inline-flex rounded-lg p-3 ring-4 ring-white"
                      )}
                    >
                      <action.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      <a
                        href={actionIdx !== 3 ? action.href : undefined}
                        onClick={actionIdx === 3 ? handleLogout : undefined}
                        className={
                          actionIdx !== 3
                            ? "focus:outline-none"
                            : "focus:outline-none cursor-pointer"
                        }
                      >
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../API/API";
import axios from "axios";
import { Spinner, Button, Input } from "@nextui-org/react";
import bg from "../../assets/Uva4.jpg";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { XCircleIcon } from "@heroicons/react/20/solid";

export default function RecChangePassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    confermaPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [incompleteForm, setIncompleteForm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    axios
      .get(`${API_URL}/Customer/CheckOTP/${token}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.error("Errore durante il controllo della sessione:", err);
        setSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handlePasswordConfirmation = () => {
    const match = formValues.password === formValues.confermaPassword;
    setPasswordsMatch(match);
  };

  const handleSubmit = () => {
    if (!passwordsMatch) {
      console.error("Le password non corrispondono.");
      setIncompleteForm(true);

      // Reset the incompleteForm state after 5 seconds
      setTimeout(() => {
        setIncompleteForm(false);
      }, 5000);

      return;
    }

    axios
      .post(
        `${API_URL}/Customer/UpdatePassword/${token}`,
        {
          password: formValues.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200 && res.data) {
          console.log("Password aggiornata con successo!");
        } else {
          console.error("Errore durante l'aggiornamento della password.");
        }
      })
      .catch((err) => {
        console.error("Errore durante l'aggiornamento della password:", err);
      });
  };

  if (isLoading) {
    return (
      <div className="absolute left-0 w-full h-full flex flex-col justify-center items-center">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <div>
      {success ? (
        <div className="h-screen flex min-h-full flex-1">
          <div className="w-1/2 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Recupera Password
                </h2>
              </div>

              <div className="mt-10">
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <Input
                          label="Inserisci la nuova password"
                          variant="bordered"
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={() => toggleVisibility("password")}
                            >
                              {isVisible ? (
                                <RemoveRedEyeOutlinedIcon />
                              ) : (
                                <VisibilityOffOutlinedIcon />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          value={formValues.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          onBlur={handlePasswordConfirmation}
                        />
                      </div>
                      <div className="mt-2">
                        <Input
                          label="Conferma password"
                          variant="bordered"
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={() =>
                                toggleVisibility("confermaPassword")
                              }
                            >
                              {isVisible ? (
                                <RemoveRedEyeOutlinedIcon />
                              ) : (
                                <VisibilityOffOutlinedIcon />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                          value={formValues.confermaPassword}
                          onChange={(e) =>
                            handleInputChange(
                              "confermaPassword",
                              e.target.value
                            )
                          }
                          onBlur={handlePasswordConfirmation}
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        onClick={handleSubmit}
                        color="primary"
                        className="text-white"
                        radius="sm"
                        fullWidth
                      >
                        Aggiorna Password
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {incompleteForm && (
            <div className="fixed top-20 right-20 z-50">
              <div className="rounded-md max-w-sm mx-auto bg-red-50 p-4 border border-red-300 transition-all duration-500 opacity-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-sm font-medium text-red-800">
                      Compila tutti i campi e assicurati che le password
                      coincidano.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={bg}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Pagina non trovata
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Il link non è valido, controlla che quello inserito sia uguale a
                quello inviato via mail, se l'errore dovesse ripresentarsi
                riavvia la procedura di recupero password.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

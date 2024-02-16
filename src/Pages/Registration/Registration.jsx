import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import bg from "../../assets/Uva4.jpg";

export default function Registration() {
  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    password: "",
    confermaPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [incompleteForm, setIncompleteForm] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const isValid =
      formValues.nome.trim() !== "" &&
      formValues.cognome.trim() !== "" &&
      formValues.telefono.trim() !== "" &&
      formValues.email.trim() !== "" &&
      formValues.password.trim() !== "" &&
      formValues.confermaPassword.trim() !== "" &&
      formValues.password === formValues.confermaPassword;

    setIsFormValid(isValid);
    setPasswordMismatch(!isValid);
  }, [formValues]);

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    setPasswordMismatch(false);
    setIncompleteForm(false);
    setIsRegistrationSuccess(false); // Reset the success flag on input change
  };

  const handleRegister = () => {
    if (isFormValid) {
      console.log("Registrazione effettuata:", formValues);
      setIsRegistrationSuccess(true);
      setFormValues({
        nome: "",
        cognome: "",
        telefono: "",
        email: "",
        password: "",
        confermaPassword: "",
      });
      setTimeout(() => {
        setIsRegistrationSuccess(false);
      }, 3000); // Nascondi l'alert di successo dopo 3 secondi
    } else {
      setIncompleteForm(true);
      setTimeout(() => {
        setIncompleteForm(false);
      }, 3000); // Nascondi l'alert di errore dopo 3 secondi
    }
  };

  return (
    <div className="h-screen flex min-h-full flex-1">
      <div className="w-1/2 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crea il tuo nuovo account
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome e Cognome
                  </label>
                  <div className="mt-2">
                    <Input
                      label="Nome"
                      variant="bordered"
                      size="sm"
                      radius="sm"
                      value={formValues.nome}
                      onChange={(e) =>
                        handleInputChange("nome", e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-2">
                    <Input
                      label="Cognome"
                      variant="bordered"
                      size="sm"
                      radius="sm"
                      value={formValues.cognome}
                      onChange={(e) =>
                        handleInputChange("cognome", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Numero di telefono
                  </label>
                  <div className="mt-2">
                    <Input
                      label="Inserisci il tuo numero di telefono"
                      variant="bordered"
                      size="sm"
                      radius="sm"
                      value={formValues.telefono}
                      onChange={(e) =>
                        handleInputChange("telefono", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <Input
                      label="Inserisci la tua mail"
                      variant="bordered"
                      size="sm"
                      radius="sm"
                      value={formValues.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <Input
                      label="Inserisci la tua password"
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
                          onClick={() => toggleVisibility("confermaPassword")}
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
                        handleInputChange("confermaPassword", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Button
                    color="primary"
                    className="text-white"
                    radius="sm"
                    fullWidth
                    onClick={handleRegister}
                  >
                    Registrati
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isRegistrationSuccess && (
        <div className="fixed top-20 right-20 z-50">
          <div className="rounded-md max-w-sm mx-auto bg-green-50 p-4 border border-green-300 transition-all duration-500 opacity-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h2 className="text-sm font-medium text-green-800">
                  Registrazione avvenuta con successo.
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  Compila tutti i campi e assicurati che le password coincidano.
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
  );
}

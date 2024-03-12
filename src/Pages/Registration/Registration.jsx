import React, { useState } from "react";
import { Button, Input, Checkbox, Link } from "@nextui-org/react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import bg from "../../assets/Uva4.jpg";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function Registration() {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    phone: "",
    mail: "",
    password: "",
    confermaPassword: "",
  });

  const [alertData, setAlertData] = useState({
    isOpen: false,
    variant: "",
    title: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  function handleNameChange(value) {
    const capitalizedValue =
      typeof value === "string" && value.trim() !== ""
        ? value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
        : "";
    setFormValues({ ...formValues, name: capitalizedValue });
  }

  function handleSurnameChange(value) {
    const capitalizedValue =
      typeof value === "string" && value.trim() !== ""
        ? value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
        : "";
    setFormValues({ ...formValues, surname: capitalizedValue });
  }

  function handlePhoneNumberChange(value) {
    // Rimuove tutti i caratteri non numerici
    const numericInput = value.replace(/\D/g, "");

    // Imposta il numero di telefono solo se l'input contiene almeno un numero
    if (numericInput.length <= 10) {
      setFormValues({ ...formValues, phone: numericInput });
    }
  }

  function handleEmailChange(value) {
    setFormValues({ ...formValues, mail: value });
  }

  function handlePassordChange(value) {
    setFormValues({ ...formValues, password: value });
  }

  function handleConfirmPasswordChange(value) {
    setFormValues({ ...formValues, confermaPassword: value });
  }

  function isValid() {
    if (
      formValues.name !== "" &&
      formValues.surname !== "" &&
      formValues.phone !== "" &&
      formValues.mail !== ""
    ) {
      return !!(
        formValues.password !== "" &&
        formValues.confermaPassword === formValues.password
      );
    } else {
      return false;
    }
  }
  console.log();

  const handleRegister = async () => {
    event.preventDefault();
    try {
      if (isValid() === true) {
        const response = await axios.post(
          API_URL + "/Customer/Register",
          formValues
        );

        setAlertData({
          isOpen: true,
          variant: "success",
          title: "Account creato",
          message: "Account creato con successo!",
        });
        setIsCreating(true);
        if (response.status === 201) {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } else {
        setAlertData({
          isOpen: true,
          variant: "error",
          title: "Errore",
          message: "Manca qualche dato o le password non coincidono.",
        });
      }
    } catch (error) {
      console.error("Errore durante la creazione dell'account", error);
      setAlertData({
        isOpen: true,
        variant: "error",
        title: "Account già esistente",
        message: "La mail è già associata a un account.",
      });
    }
  };

  const handleClose = () => {
    setAlertData({
      isOpen: false,
      variant: "",
      title: "",
      message: "",
    });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={alertData.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert size="lg" severity={alertData.variant} sx={{ width: "100%" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>{alertData.title}</AlertTitle>
          {alertData.message}
        </Alert>
      </Snackbar>
      <div className="h-screen flex min-h-full flex-1">
        <div className="w-1/2 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
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
                        value={formValues.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        isRequired
                      />
                    </div>
                    <div className="mt-2">
                      <Input
                        label="Cognome"
                        variant="bordered"
                        size="sm"
                        radius="sm"
                        value={formValues.surname}
                        onChange={(e) => handleSurnameChange(e.target.value)}
                        isRequired
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
                        value={formValues.phone}
                        onChange={(e) =>
                          handlePhoneNumberChange(e.target.value)
                        }
                        isRequired
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
                        value={formValues.mail}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        isRequired
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
                            onClick={() => setIsVisible(!isVisible)}
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
                        onChange={(e) => handlePassordChange(e.target.value)}
                        isRequired
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
                            onClick={() => setIsVisible(!isVisible)}
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
                          handleConfirmPasswordChange(e.target.value)
                        }
                        isRequired
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Checkbox className="text-white" isRequired>
                      Accetto i{" "}
                      <Link href="/termini-e-condizioni">
                        Termini e Condizioni
                      </Link>{" "}
                      e la <Link href="/privacy-policy">Privacy Policy</Link>{" "}
                      per la registrazione dell'account.
                    </Checkbox>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      className="text-white"
                      radius="sm"
                      fullWidth
                      onClick={handleRegister}
                      isDisabled={!isValid()}
                      isLoading={isCreating}
                    >
                      Crea account
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={bg}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

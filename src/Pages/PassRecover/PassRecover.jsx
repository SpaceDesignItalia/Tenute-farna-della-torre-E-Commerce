import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { Button, Input } from "@nextui-org/react";
import bg from "../../assets/Uva4.jpg";
import { XCircleIcon } from "@heroicons/react/20/solid";

export default function PassRecover() {
  const [loginData, setLoginData] = useState({
    email: "",
  });

  const [error, setError] = useState(null);
  const [mailSent, setMailSent] = useState(false);

  function handleEmailChange(e) {
    setLoginData({ ...loginData, email: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(API_URL + "/Customer/StartRecoverPass", {
        email: loginData.email,
      });
      if (res.status === 200) {
        setMailSent(true);
      }
    } catch (err) {
      setError("Email non trovata");
      setTimeout(() => {
        setError(null);
      }, 5000); // Nascondi il messaggio di errore dopo 5 secondi
    }
  };

  return (
    <>
      {mailSent ? (
        <div className="flex items-center justify-center">
          <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Mail inviata con successo
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Prosegui con le istruzioni inviate via mail per recuperare la
                tua password.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex min-h-full flex-1">
          <div className="w-1/2 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Recupero password
                </h2>
              </div>
              <div className="mt-10">
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Inserire l'email dell'account per recuperare la password
                      </label>
                      <div className="mt-2">
                        <Input
                          label="Email"
                          variant="bordered"
                          size="sm"
                          radius="sm"
                          onChange={handleEmailChange}
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
                        Invia
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              {error && (
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
                          L'indirizzo mail inserito non corrisponde a nessun
                          account
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
      )}
    </>
  );
}

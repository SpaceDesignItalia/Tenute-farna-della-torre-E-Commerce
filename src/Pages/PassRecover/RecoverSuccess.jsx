import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../API/API";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

export default function RecoverSuccess() {
  const [success, setSuccess] = useState(false);
  const { email } = useParams();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/CheckOTP/" + email + "/" + token, {
        withCredentials: true,
      })
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
        <div className="flex items-center justify-center">
          <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Password cambiata con successo
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Ritorna alla pagina di login per accedere al tuo account.
              </p>
            </div>
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
                Link non valido, controlla di aver inserito un link corretto.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

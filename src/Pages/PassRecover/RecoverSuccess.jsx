import React from "react";

export default function RecoverSuccess() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Password recuperata con successo
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ritorna alla pagina di login per accedere al tuo account.
          </p>
        </div>
      </div>
    </div>
  );
}

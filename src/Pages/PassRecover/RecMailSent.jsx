import React from "react";

export default function RecMailSent() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Mail inviata con successo
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Prosegui con le istruzioni inviate via mail per recuperare la tua
            password.
          </p>
        </div>
      </div>
    </div>
  );
}

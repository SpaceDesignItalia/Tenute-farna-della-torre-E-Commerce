import React, { useState } from "react";
import { Button } from "@nextui-org/react";

export default function ModificaIndirizzo({ onEditAddress }) {
  const [stato, setStato] = useState("");
  const [citta, setCitta] = useState("");
  const [comuneProvincia, setComuneProvincia] = useState("");
  const [piazzaVia, setPiazzaVia] = useState("");
  const [codicePostale, setCodicePostale] = useState("");

  const handleEditClick = () => {
    const indirizzoModificato = {
      stato,
      citta,
      comuneProvincia,
      piazzaVia,
      codicePostale,
    };

    // Esegui eventuali validazioni o altri controlli necessari prima di modificare l'indirizzo

    if (onEditAddress) {
      onEditAddress(indirizzoModificato);
    }
    window.location.href = "/addresses";
  };

  return (
    <section className="bg-gray-100 py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-3xl font-bold">Ciao, nome_utente</h1>
            <p className="mt-2 text-sm text-gray-500">
              Modifica informazioni per quanto riguarda il tuo indirizzo.
            </p>
            <form className="py-10">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="stato"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nazione
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="stato"
                      id="stato"
                      autoComplete="stato"
                      value={stato}
                      onChange={(e) => setStato(e.target.value)}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="citta"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Città
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="citta"
                      id="citta"
                      autoComplete="address-level2"
                      value={citta}
                      onChange={(e) => setCitta(e.target.value)}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="comuneProvincia"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Comune/Provincia
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="comuneProvincia"
                      id="comuneProvincia"
                      autoComplete="address-level1"
                      value={comuneProvincia}
                      onChange={(e) => setComuneProvincia(e.target.value)}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="piazzaVia"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Piazza/Via
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="piazzaVia"
                      id="piazzaVia"
                      autoComplete="street-address"
                      value={piazzaVia}
                      onChange={(e) => setPiazzaVia(e.target.value)}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="codicePostale"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Codice postale
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="codicePostale"
                      id="codicePostale"
                      autoComplete="postal-code"
                      value={codicePostale}
                      onChange={(e) => setCodicePostale(e.target.value)}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <Button onClick={handleEditClick} color="primary">
                    Applica modifiche
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

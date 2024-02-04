import React, { useState } from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";

export default function Addresses() {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
  };

  const handleEditClick = () => {
    if (selectedAddress) {
      window.location.href = `/editAddress?address=${encodeURIComponent(
        selectedAddress
      )}`;
    }
  };

  return (
    <section className="bg-gray-100 py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-3xl font-bold">Ciao, nome_utente</h1>
            <p className="mt-2 text-sm text-gray-500">
              Seleziona un indirizzo tra quelli presenti o creane uno nuovo.
            </p>
            <RadioGroup
              color="primary"
              value={selectedAddress}
              onChange={handleSelectAddress}
              className="py-10"
            >
              {addressList.length > 0 ? (
                addressList.map((address) => (
                  <Radio key={address} value={address}>
                    {address}
                  </Radio>
                ))
              ) : (
                <p>Nessun indirizzo inserito</p>
              )}
            </RadioGroup>

            {selectedAddress && (
              <Button
                onClick={handleEditClick}
                color="primary"
                className="mt-4"
              >
                Modifica indirizzo
              </Button>
            )}

            <Button
              className="mt-4"
              onClick={() => (window.location.href = "/addAddress")}
              color="primary"
            >
              Aggiungi nuovo indirizzo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

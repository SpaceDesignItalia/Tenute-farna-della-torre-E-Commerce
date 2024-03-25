import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../../API/API";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Addresses() {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); // Add selected address index state
  const [selected, setSelected] = useState(null);
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

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    nation: "",
    city: "",
    municipality: "",
    postalCode: "",
    street: "",
    civicNumber: "",
  });

  const setNewAddressField = (field, value) => {
    const updatedAddress = { ...newAddress, [field]: value };
    setNewAddress(updatedAddress);
  };

  const handleSelectAddress = (value, index) => {
    setSelectedAddress(value);
    setSelectedAddressIndex(index);
  };

  const handleAddAddress = () => {
    const updatedAddressList = [...addressList, formatAddress(newAddress)];
    setAddressList(updatedAddressList);
  };

  const formatAddress = (address) => {
    const { fullName, nation, municipality, postalCode, street, civicNumber } =
      address;
    return `${fullName}, ${municipality}, ${nation}, ${street} ${civicNumber}, ${postalCode}`;
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const onOpenUpdate = (index) => {
    setUpdateModalOpen(true);
    setSelectedAddressIndex(index); // Imposta l'indice dell'indirizzo selezionato
    setNewAddress(addressList[index]); // Imposta i valori dell'indirizzo selezionato
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const onCloseModal = () => {
    setNewAddress({
      fullName: "",
      nation: "",
      city: "",
      municipality: "",
      postalCode: "",
      street: "",
      civicNumber: "",
    });
    onOpenChange();
  };

  function enableSubmit() {
    if (
      newAddress.fullName !== "" &&
      newAddress.nation !== "" &&
      newAddress.city !== "" &&
      newAddress.municipality !== "" &&
      newAddress.postalCode !== "" &&
      newAddress.street !== "" &&
      newAddress.civicNumber !== ""
    ) {
      return false;
    }
    return true;
  }

  const handleModifyAddress = () => {
    if (selectedAddressIndex !== null) {
      const updatedAddressList = [...addressList];
      const updatedAddress = formatAddress(newAddress);

      if (
        selectedAddressIndex >= 0 &&
        selectedAddressIndex < updatedAddressList.length
      ) {
        updatedAddressList[selectedAddressIndex] = updatedAddress;
        setAddressList(updatedAddressList);
      }
      onCloseUpdateModal();
    } else {
      console.error("selectedAddressIndex is null");
    }
  };

  return (
    <section className=" py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold">
              Seleziona un indirizzo tra quelli presenti o creane uno nuovo.
            </h1>
            {addressList.length > 0 ? (
              <RadioGroup
                className="my-10"
                color="primary"
                value={selectedAddress}
                onChange={handleSelectAddress}
              >
                {addressList.map((address, index) => (
                  <Radio
                    key={index}
                    value={address}
                    checked={address === selectedAddress}
                    onChange={() => handleSelectAddress(address)}
                  >
                    <p className="text-sm text-gray-900">{address}</p>
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <p className="my-10 text-sm text-gray-600">
                Nessun indirizzo presente
              </p>
            )}
            {selectedAddress && (
              <Button
                color="primary"
                className="mt-4 mx-5"
                onClick={() => onOpenUpdate(selectedAddressIndex)}
              >
                Modifica indirizzo
              </Button>
            )}

            <Button onPress={onOpen} color="primary">
              Aggiungi indirizzo
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                <>
                  <ModalHeader className="flex flex-col gap-1 pb-5">
                    Aggiunta nuovo indirizzo
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nome completo
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            setNewAddressField("fullName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="nation"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nazione
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nation"
                          id="nation"
                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            setNewAddressField("nation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="w-1/3">
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          CAP
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.postalCode}
                            onChange={(e) =>
                              setNewAddressField("postalCode", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Città
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddressField("city", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="municipality"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Comune
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="municipality"
                          id="municipality"
                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          value={newAddress.municipality}
                          onChange={(e) =>
                            setNewAddressField("municipality", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="w-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Indirizzo
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street"
                            id="street"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.street}
                            onChange={(e) =>
                              setNewAddressField("street", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="w-1/4">
                        <label
                          htmlFor="civicNumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Civico
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="civicNumber"
                            id="civicNumber"
                            maxLength="5"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.civicNumber}
                            onChange={(e) =>
                              setNewAddressField("civicNumber", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => onCloseModal()}
                    >
                      Annulla
                    </Button>
                    <Button
                      color="primary"
                      isDisabled={enableSubmit()}
                      onClick={handleAddAddress}
                      onPress={() => onCloseModal()}
                    >
                      Aggiungi
                    </Button>
                  </ModalFooter>
                </>
              </ModalContent>
            </Modal>
            <Modal
              isOpen={isUpdateModalOpen}
              onOpenChange={onCloseUpdateModal}
              placement="top-center"
            >
              <ModalContent>
                {(onCloseUpdateModal) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 pb-5">
                      Modifica indirizzo
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nome completo
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.fullName}
                            onChange={(e) =>
                              setNewAddressField("fullName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="nation"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nazione
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="nation"
                            id="nation"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.nation}
                            onChange={(e) =>
                              setNewAddressField("nation", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <div className="w-1/3">
                          <label
                            htmlFor="postalCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            CAP
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="postalCode"
                              id="postalCode"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                              value={newAddress.postalCode}
                              onChange={(e) =>
                                setNewAddressField("postalCode", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Città
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                              value={newAddress.city}
                              onChange={(e) =>
                                setNewAddressField("city", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="municipality"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Comune
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="municipality"
                            id="municipality"
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            value={newAddress.municipality}
                            onChange={(e) =>
                              setNewAddressField("municipality", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Indirizzo
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="street"
                              id="street"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                              value={newAddress.street}
                              onChange={(e) =>
                                setNewAddressField("street", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/4">
                          <label
                            htmlFor="civicNumber"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Civico
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="civicNumber"
                              id="civicNumber"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                              value={newAddress.civicNumber}
                              onChange={(e) =>
                                setNewAddressField(
                                  "civicNumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onCloseUpdateModal}
                      >
                        Annulla
                      </Button>
                      <Button
                        color="primary"
                        isDisabled={enableSubmit()}
                        onClick={handleModifyAddress}
                        onPress={onCloseUpdateModal}
                      >
                        Aggiorna
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
}

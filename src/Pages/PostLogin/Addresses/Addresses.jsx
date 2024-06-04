import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  user,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../../API/API";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Chip } from "@nextui-org/react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { CustomRadio } from "../../../Components/Layout/CustomRadio";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Addresses() {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [defaultAddress, setDefAddress] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/GetCustomerData", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUserData(res.data.customer);
          fetchAddresses();
        }
      });
  }, [userData.id]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(API_URL + "/Customer/GetAllShippingInfo", {
        params: { customerId: userData.id },
      });

      if (res.status === 200 && res.data) {
        const addresses = res.data;
        const updatedAddressList = await Promise.all(
          addresses.map(async (address) => {
            const isDefault = await isDefaultAddress(address);
            if (isDefault.result === 1) {
              setDefAddress(address.id);
            }
            return {
              ...address,
              isDefault: isDefault.result,
            };
          })
        );

        setAddressList(updatedAddressList);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const isDefaultAddress = async (address) => {
    try {
      const res = await axios.get(API_URL + "/Customer/isDefaultShipping", {
        params: { idCustomer: userData.id, idShippingInfo: address.id },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        console.error(
          "Failed to check if address is default. Status:",
          res.status
        );
        return { result: 0 }; // Ritorna un valore predefinito nel caso di errore
      }
    } catch (error) {
      console.error("Error checking if address is default:", error);
      return { result: 0 }; // Ritorna un valore predefinito in caso di errore
    }
  };

  const setDefaultAddress = (addressId) => {
    axios
      .put(API_URL + "/Customer/SetDefaultShipping", {
        idShippingInfo: addressId,
        idCustomer: userData.id,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchAddresses();
          console.log("Default address set successfully");
        } else {
          console.error("Failed to set default address. Status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error setting default address:", error);
      });
  };

  const addAddress = (addressId) => {
    axios
      .post(API_URL + "/Customer/AddShippingInfo", {
        customerId: userData.id,
        idShippingInfo: addressId,
        name: newAddress.fullName,
        address: newAddress.street,
        civicNumber: newAddress.civicNumber,
        cap: newAddress.postalCode,
        city: newAddress.city,
        province: newAddress.municipality,
        nation: newAddress.nation,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("Address added successfully");
          fetchAddresses();
        } else {
          console.error("Failed to add address. Status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const updateAddress = (address) => {
    axios
      .put(API_URL + "/Customer/UpdateShippingInfo", {
        idShippingDetail: address.id,
        name: address.fullName,
        address: address.street,
        civicNumber: address.civicNumber,
        cap: address.postalCode,
        city: address.city,
        province: address.municipality,
        nation: address.nation,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Address updated successfully");
          fetchAddresses();
        } else {
          console.error("Failed to update address. Status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  const deleteAddress = (addressId) => {
    axios
      .delete(API_URL + "/Customer/DeleteShippingInfo", {
        params: { idCustomer: userData.id, idShippingInfo: addressId },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Address deleted successfully");
          fetchAddresses();
        } else {
          console.error("Failed to delete address. Status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  const [newAddress, setNewAddress] = useState({
    id: "",
    fullName: "",
    city: "",
    municipality: "",
    nation: "",
    postalCode: "",
    street: "",
    civicNumber: "",
    isDefault: false,
  });

  const setNewAddressField = (field, value) => {
    const updatedAddress = { ...newAddress, [field]: value };
    setNewAddress(updatedAddress);
  };

  const handleSelectAddress = (addressId) => {
    const updatedAddressList = addressList.map((address) => ({
      ...address,
      isDefault: address.id === addressId, // Imposta isDefault a true solo per l'indirizzo selezionato
    }));
    setAddressList(updatedAddressList);
    setSelectedAddress(
      updatedAddressList.find((address) => address.id === addressId)
    );
    setSelectedAddressIndex(addressId);
    setDefaultAddress(addressId);
  };

  const handleAddAddress = () => {
    addAddress(newAddress);
  };

  const formatAddress = (address) => {
    const { fullName, municipality, nation, postalCode, street, civicNumber } =
      address;
    return `${fullName}, ${municipality}, ${nation}, ${street} ${civicNumber}, ${postalCode}`;
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const resetNewAddress = () => {
    setNewAddress({
      id: "",
      fullName: "",
      city: "",
      municipality: "",
      nation: "",
      postalCode: "",
      street: "",
      civicNumber: "",
      isDefault: false,
    });
  };

  const onOpenUpdate = (addressId) => {
    return () => {
      const address = addressList.find((address) => address.id === addressId);
      setSelectedAddressForEdit(address);
      setNewAddress({
        id: address.id,
        fullName: address.name,
        city: address.city,
        municipality: address.province,
        nation: address.nation,
        postalCode: address.cap,
        street: address.address,
        civicNumber: address.civicNumber,
        isDefault: address.isDefault,
      });
      setUpdateModalOpen(true);
    };
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedAddressForEdit(null);
    resetNewAddress();
  };

  const onCloseModal = () => {
    resetNewAddress();
    onOpenChange();
  };

  function enableSubmit() {
    if (
      newAddress.fullName !== "" &&
      newAddress.city !== "" &&
      newAddress.municipality !== "" &&
      newAddress.nation !== "" &&
      newAddress.postalCode !== "" &&
      newAddress.street !== "" &&
      newAddress.civicNumber !== ""
    ) {
      return false;
    }
    return true;
  }

  return (
    <section className=" py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold">
              Seleziona un indirizzo tra quelli presenti o creane uno nuovo.
            </h1>
            {addressList && addressList.length > 0 ? (
              <RadioGroup
                className="my-10"
                color="primary"
                defaultValue={defaultAddress}
              >
                <div className="lg:gap-5 lg:grid lg:grid-cols-3 sm:gap-3 sm:grid sm:grid-cols-2">
                  {addressList.map((address) => (
                    <div key={address.id}>
                      <CustomRadio
                        value={address.id}
                        onClick={() => handleSelectAddress(address.id)}
                      >
                        {address.isDefault !== 0 && (
                          <div className="text-primary flex flex-row">
                            <CheckRoundedIcon />
                            <p className="my-auto text-sm font-semibold px-1 italic">
                              Predefinito
                            </p>
                          </div>
                        )}
                        <p className="text-sm font-semibold text-gray-900">
                          {address.name}, {address.address}{" "}
                          {address.civicNumber}, {address.cap}, {address.city},{" "}
                          {address.province}, {address.nation}
                        </p>
                        <div className="flex flex-row gap-2 my-auto pt-2">
                          <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            color="primary"
                            className="text-white"
                            onClick={onOpenUpdate(address.id)}
                          >
                            <ModeEditOutlineRoundedIcon />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            color="danger"
                            onClick={() => {
                              deleteAddress(address.id);
                            }}
                          >
                            <DeleteRoundedIcon />
                          </Button>
                        </div>
                      </CustomRadio>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <p className="my-10 text-sm text-gray-600">
                Nessun indirizzo presente
              </p>
            )}

            <Button
              onPress={onOpen}
              color="primary"
              radius="sm"
              className="text-white"
            >
              Aggiungi indirizzo
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
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
                        Provincia
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
                      className="text-white"
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
              placement="center"
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
                        className="text-white"
                        color="primary"
                        isDisabled={enableSubmit()}
                        onClick={() => updateAddress(newAddress)}
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

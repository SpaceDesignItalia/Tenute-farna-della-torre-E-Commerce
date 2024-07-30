import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "../../API/API";
import { Button, RadioGroup } from "@nextui-org/react";
import { CustomRadio } from "../../Components/Layout/CustomRadio";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const fetchPublishableKey = async () => {
  const response = await axios.get(API_URL + "/Payment/GetPaymentConfig");
  return response.data.publishableKey;
};

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefAddress] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [items, setItems] = useState([
    {
      id: "1",
      name: "Brut oro SP",
      price: 5000,
      quantity: 2,
      image:
        "https://api.tenutefarina.com:3000/uploads/photo1_1716656903861brut.png",
    },
    {
      id: "5",
      name: "Perricone",
      price: 2000,
      quantity: 1,
      image:
        "https://api.tenutefarina.com:3000/uploads/photo1_1716716540510perricone.png",
    },
  ]);

  useEffect(() => {
    fetchPublishableKey().then((publishableKey) => {
      setStripePromise(loadStripe(publishableKey));
    });

    axios
      .get(API_URL + "/Customer/GetCustomerData", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUserData(res.data.customer);
          fetchAddresses();
        }
      });
  }, [userData.id]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        API_URL + "/Payment/CreateCheckoutSession",
        { items },
        { withCredentials: true }
      );
      const { id } = response.data;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error(
        "Errore nella creazione della sessione di checkout:",
        error
      );
    }
  };

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

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="mt-10 border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Informazioni per la spedizione
              </h2>
              {addressList && addressList.length > 0 ? (
                <RadioGroup
                  className="my-10"
                  color="primary"
                  defaultValue={defaultAddress}
                >
                  <div className="lg:gap-5 lg:grid lg:grid-cols-2 sm:gap-3 sm:grid sm:grid-cols-2">
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
                            {address.civicNumber}, {address.cap}, {address.city}
                            , {address.province}, {address.nation}
                          </p>
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
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          {product.quantity}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $75.52
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Pagamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

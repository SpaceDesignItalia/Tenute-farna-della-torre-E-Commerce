import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "../../API/API";
import { Button, Checkbox, Link, RadioGroup, Input } from "@nextui-org/react";
import { CustomRadio } from "../../Components/Layout/CustomRadio";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const fetchPublishableKey = async () => {
  const response = await axios.get(API_URL + "/Payment/GetPaymentConfig");
  return response.data.publishableKey;
};

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 5.0;
  const [discount, setDiscount] = useState({
    haveDiscount: false,
    discountCode: "",
    discount: null,
    isError: false,
  });
  const [userData, setUserData] = useState({
    idCustomer: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

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

    axios
      .get(API_URL + "/Cart/GetProductsByIdCustomer", { withCredentials: true })
      .then((response) => {
        setProducts(response.data);
        if (response.data.length === 0) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.idCustomer]);

  useEffect(() => {
    let subtotal = 0;
    products.forEach((product) => {
      subtotal += calculateDiscountedPrice(product) * product.amount;
    });
    setSubtotal(subtotal);
  }, [products]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        API_URL + "/Payment/CreateCheckoutSession",
        { products, discount: discount.discount },
        { withCredentials: true }
      );
      const { id } = response.data;

      const createdOrder = await handleCompleteOrder(id);

      if (createdOrder) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: id });
      }
    } catch (error) {
      console.error(
        "Errore nella creazione della sessione di checkout:",
        error
      );
    }
  };

  const handleCompleteOrder = async (paymentIntent) => {
    try {
      await axios.post(
        API_URL + "/Cart/CompleteOrder",
        {
          shippingId: selectedAddress,
          idPayment: paymentIntent,
          idDiscount: discount.discount ? discount.discount.idDiscount : null,
        },
        { withCredentials: true }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(API_URL + "/Customer/GetAllShippingInfo", {
        params: { customerId: userData.idCustomer },
      });

      if (res.status === 200 && res.data) {
        const addresses = res.data;
        const updatedAddressList = await Promise.all(
          addresses.map(async (address) => {
            const isDefault = await isDefaultAddress(address);
            if (isDefault.result === 1) {
              setSelectedAddress(address.id);
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
        params: { idCustomer: userData.idCustomer, idShippingInfo: address.id },
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

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleCheckDiscount = async () => {
    try {
      const res = await axios.get(
        API_URL + "/Discounts/CheckDiscountCodeValidity",
        {
          params: { discountCode: discount.discountCode },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.length > 0) {
        setDiscount({ ...discount, discount: res.data[0], isError: false });
      } else {
        setDiscount({ ...discount, isError: true });
      }
    } catch (error) {
      console.log("Nessuno sconto valido trovato");
      setDiscount({ ...discount, isError: true });
    }
  };

  const calculateDiscountedPrice = (product) => {
    const currentDate = new Date();
    const discountStartDate = product.startDate
      ? new Date(product.startDate)
      : null;
    if (discountStartDate && currentDate >= discountStartDate) {
      if (product.idDiscountType === 1) {
        const discountedPrice = product.unitPrice - product.value;
        return discountedPrice > 0 ? discountedPrice : 0;
      } else if (product.idDiscountType === 2) {
        const discountedPrice =
          product.unitPrice - product.unitPrice * (product.value / 100);
        return discountedPrice > 0 ? discountedPrice : 0;
      }
    }
    return product.unitPrice;
  };

  const calculateTotal = (subtotal, shippingCost, discount) => {
    let discountAmount = 0;

    if (discount && discount.discount) {
      if (discount.discount.idDiscountType === 1) {
        discountAmount = discount.discount.value;
      } else if (discount.discount.idDiscountType === 2) {
        discountAmount = (subtotal * discount.discount.value) / 100;
      }
    }

    const total = subtotal - discountAmount + shippingCost;
    return total > 0 ? total.toFixed(2) : "0.00";
  };

  const calculateDiscountAmount = (subtotal, discount) => {
    let discountAmount = 0;

    if (discount && discount.discount) {
      if (discount.discount.idDiscountType === 1) {
        discountAmount = discount.discount.value;
      } else if (discount.discount.idDiscountType === 2) {
        discountAmount = (subtotal * discount.discount.value) / 100;
      }
    }

    return discountAmount > 0 ? discountAmount.toFixed(2) : "0.00";
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
                  value={selectedAddress}
                  onValueChange={handleSelectAddress}
                >
                  <div className="lg:gap-5 lg:grid lg:grid-cols-2 sm:gap-3 sm:grid sm:grid-cols-2">
                    {addressList.map((address) => (
                      <div key={address.id}>
                        <CustomRadio value={address.id}>
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
                          <p className="text-sm font-semibold text-gray-900">
                            {address.phoneNumber}
                          </p>
                        </CustomRadio>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <div className="mt-10">
                  <p className="text-sm text-gray-500">
                    Nessun indirizzo disponibile.
                  </p>
                  <div className="mt-4">
                    <Button
                      color="primary"
                      onClick={() =>
                        (window.location.href = "/profile/addresses")
                      }
                      className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <AddRoundedIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                      Aggiungi un indirizzo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Ordine</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li
                    key={product.idProduct}
                    className="flex px-4 py-6 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <img
                        alt={product.productName}
                        src={API_URL + "/uploads/" + product.productImagePath}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a className="font-medium text-gray-700 hover:text-gray-800">
                              {product.productName}
                            </a>
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.cartPrice.toFixed(2)} €
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          x{product.amount}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotale</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {subtotal.toFixed(2)} €
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Spedizione</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shippingCost.toFixed(2)} €
                  </dd>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-6">
                  <div className="flex flex-row justify-between w-full">
                    <dt className="text-base font-medium">Sconti</dt>
                    <dd className="text-base font-medium text-gray-900">
                      <Checkbox
                        color="primary"
                        onValueChange={() =>
                          setDiscount({
                            ...discount,
                            haveDiscount: !discount.haveDiscount,
                          })
                        }
                      >
                        Ho uno sconto
                      </Checkbox>
                    </dd>
                  </div>

                  {discount.haveDiscount && (
                    <div className="flex flex-row justify-between gap-2 w-full mt-3">
                      <Input
                        isInvalid={discount.isError}
                        errorMessage="Codice sconto non valido o già utilizzato"
                        variant="bordered"
                        radius="sm"
                        placeholder="Inserisci un codice sconto"
                        onChange={(e) =>
                          setDiscount({
                            ...discount,
                            discountCode: e.target.value,
                          })
                        }
                      />
                      <Button
                        color="primary"
                        radius="sm"
                        className="text-white w-1/3"
                        isDisabled={discount.discountCode === ""}
                        onClick={handleCheckDiscount}
                      >
                        Valida
                      </Button>
                    </div>
                  )}
                </div>

                {discount.haveDiscount && discount.discount && (
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">
                      Ammontare dello sconto
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      -{calculateDiscountAmount(subtotal, discount)} €
                    </dd>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Totale</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {calculateTotal(subtotal, shippingCost, discount)} €
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button
                  onClick={handleCheckout}
                  isDisabled={
                    selectedAddress === null ||
                    products.length === 0 ||
                    (discount.haveDiscount && discount.discount === null)
                  }
                  className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Pagamento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

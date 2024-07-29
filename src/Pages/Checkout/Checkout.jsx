import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "../../API/API";

const fetchPublishableKey = async () => {
  const response = await axios.get(API_URL + "/Payment/GetPaymentConfig");
  return response.data.publishableKey;
};

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
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
  }, []);

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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <div className="rounded-lg bg-gray-50 shadow-sm">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 flex-shrink-0 rounded-md object-cover object-center sm:h-24 sm:w-24"
                />
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">{(item.price / 100).toFixed(2)} €</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              onClick={handleCheckout}
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Select, SelectItem, Button, Link } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function ShoppingCart() {
  const quantity = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
  ];

  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 5.0;
  const [VAT, setVAT] = useState(0);
  const [disabledOptions, setDisabledOptions] = useState({});

  useEffect(() => {
    axios
      .get(API_URL + "/Cart/GetProductsByIdCustomer", { withCredentials: true })
      .then((response) => {
        setProducts(response.data);
        const newDisabledOptions = {};

        response.data.forEach((product) => {
          newDisabledOptions[product.idProduct] = quantity
            .filter((q) => parseInt(q.value) > product.productAmount)
            .map((q) => q.value);
        });

        setDisabledOptions(newDisabledOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  useEffect(() => {
    let subtotal = 0;
    products.map((product) => {
      subtotal += product.unitPrice * product.amount;
    });
    setSubtotal(subtotal);
    setVAT(subtotal * 0.22);
  }, [products]);

  const handleUpdateAmount = (idProduct, amount) => {
    if (isNaN(amount)) {
      axios
        .post(
          API_URL + "/Cart/UpdateAmount",
          { idProduct: idProduct, amount: 1 },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            setUpdate(!update); // Trigger re-fetch of products
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          API_URL + "/Cart/UpdateAmount",
          { idProduct: idProduct, amount: amount },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            setUpdate(!update); // Trigger re-fetch of products
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemoveProduct = (idProduct) => {
    axios
      .post(
        API_URL + "/Cart/RemoveProduct",
        { idProduct: idProduct },
        { withCredentials: true }
      )
      .then((response) => {
        setUpdate(!update); // Trigger re-fetch of products
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrello
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className={
                products.length === 0
                  ? ""
                  : "divide-y divide-gray-200 border-b border-t border-gray-200"
              }
            >
              {products.length === 0 && <span>Il carrello è vuoto</span>}
              {products.map((product, productIdx) => (
                <li key={product.idProduct} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={API_URL + "/uploads/" + product.productImagePath}
                      alt={product.productName}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.productName}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.productName}
                            </a>
                          </h3>
                        </div>
                        <p>{product.unitPrice} €</p>
                        <h4 className="mt-1 text-sm font-medium text-gray-900">
                          Totale prodotto:{" "}
                        </h4>
                        <p>{product.unitPrice * product.amount} €</p>
                      </div>

                      <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${productIdx}`}>
                          Quantity:
                        </label>
                        <Select
                          radius="sm"
                          variant="bordered"
                          value={product.amount.toString()}
                          defaultSelectedKeys={[product.amount.toString()]}
                          onChange={(e) =>
                            handleUpdateAmount(
                              product.idProduct,
                              parseInt(e.target.value)
                            )
                          }
                          className="mt-1 block w-20"
                        >
                          {quantity.map((q) => {
                            const value = q.value;
                            const isDisabled =
                              disabledOptions[product.idProduct]?.includes(
                                value
                              );
                            return (
                              <SelectItem
                                key={value}
                                value={value}
                                isDisabled={isDisabled}
                              >
                                {q.label}
                              </SelectItem>
                            );
                          })}
                        </Select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              handleRemoveProduct(product.idProduct);
                            }}
                          >
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.productAmount > 0 ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product.productAmount > 0
                          ? "In stock"
                          : `Non disponibile`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Dettagli ordine
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotale</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {subtotal} €
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Spese di spedizione</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {shippingCost} €
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">IVA (22%)</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {VAT.toFixed(2)} €
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
                <dt>Totale</dt>
                <dd>{(subtotal + shippingCost + VAT).toFixed(2)} €</dd>
              </div>
              <Button
                as={Link}
                className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                href="/checkout"
                isDisabled={products.length === 0}
              >
                Completa ordine
              </Button>
            </dl>
          </section>
        </form>
      </div>
    </div>
  );
}

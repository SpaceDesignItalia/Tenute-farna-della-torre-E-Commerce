import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { API_URL } from "../../../API/API";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "/order/GetOrdersByIdCustomer", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        const groupedOrders = groupOrdersById(response.data);
        setOrders(groupedOrders);
      });
  }, []);

  function groupOrdersById(data) {
    const ordersMap = new Map();
    data.forEach((item) => {
      const {
        idOrder,
        idCustomer,
        idPayment,
        createdDatetime,
        idProduct,
        amount,
        productName,
        productDescription,
        productImagePath,
        unitPrice,
      } = item;

      if (!ordersMap.has(idOrder)) {
        ordersMap.set(idOrder, {
          idOrder,
          idCustomer,
          idPayment,
          createdDatetime,
          products: [],
        });
      }

      ordersMap.get(idOrder).products.push({
        id: idProduct,
        amount: amount,
        name: productName,
        description: productDescription,
        imageSrc: API_URL + "/uploads/" + productImagePath,
        imageAlt: productName,
        price: unitPrice,
      });
    });
    return Array.from(ordersMap.values());
  }

  function calculateOrderTotal(order) {
    return order.products.reduce(
      (total, product) => total + product.price * product.amount,
      0
    );
  }

  return (
    <section className="py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-3xl font-bold">Ciao, nome_utente</h1>
            <p className="mt-2 text-sm text-gray-500">
              Controlla lo stato degli ordini recenti.
            </p>

            <div className="mt-16">
              <h2 className="sr-only">Ordini recenti</h2>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                  {orders.map((order) => (
                    <div
                      key={order.idOrder}
                      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                    >
                      <h3 className="sr-only">
                        Ordine richiesto il{" "}
                        <time dateTime={order.createdDatetime}>
                          {order.createdDatetime}
                        </time>
                      </h3>

                      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                          <div>
                            <dt className="font-medium text-gray-900">
                              Numero ordine
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              {order.idOrder}
                            </dd>
                          </div>
                          <div className="hidden sm:block">
                            <dt className="font-medium text-gray-900">
                              Richiesto il
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              <time dateTime={order.createdDatetime}>
                                {order.createdDatetime}
                              </time>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Totale
                            </dt>
                            <dd className="mt-1 font-medium text-gray-900">
                              €{calculateOrderTotal(order)}
                            </dd>
                          </div>
                        </dl>

                        <Menu
                          as="div"
                          className="relative flex justify-end lg:hidden"
                        >
                          <div className="flex items-center">
                            <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">
                                Opzioni ordine {order.idOrder}
                              </span>
                              <EllipsisVerticalIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Invoice
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                          <a className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span>Vedi ricevuta</span>
                            <span className="sr-only">
                              for order {order.idOrder}
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Products */}
                      <h4 className="sr-only">Items</h4>
                      <ul role="list" className="divide-y divide-gray-200">
                        {order.products.map((product) => (
                          <li key={product.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-6 flex-1 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{product.name}</h5>
                                  <h5>{product.amount} pezzi</h5>
                                  <p className="mt-2 sm:mt-0">
                                    €{product.price}
                                  </p>
                                </div>
                                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                  {product.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 sm:flex sm:justify-between">
                              <div className="flex items-center">
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                  Consegnato il{" "}
                                  <time dateTime={order.deliveredDatetime}>
                                    {order.deliveredDate}
                                  </time>
                                </p>
                              </div>

                              <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                <div className="flex flex-1 justify-center">
                                  <a
                                    href={product.href}
                                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                  >
                                    Vedi prodotto
                                  </a>
                                </div>
                                <div className="flex flex-1 justify-center pl-4">
                                  <a className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                    Acquista ancora
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

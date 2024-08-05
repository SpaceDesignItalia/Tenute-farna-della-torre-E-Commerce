import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import axios from "axios";
import { API_URL } from "../../../API/API";
import dayjs from "dayjs";
import "dayjs/locale/it";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useLocation } from "react-router-dom";
import { Button, Skeleton } from "@nextui-org/react";

dayjs.extend(localizedFormat);
dayjs.locale("it");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirected = queryParams.get("redirected");

  const fetchPaymentDetails = async (idPayment) => {
    try {
      const response = await axios.get(
        API_URL + "/Payment/GetCheckoutDetails",
        { params: { idPayment: idPayment } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching payment details", error);
      return null;
    }
  };

  // Funzione per saldare l'ordine
  const handlePayment = async (idPayment) => {
    try {
      const response = await axios.post(
        API_URL + "/Payment/ResumeCheckoutSession",
        { sessionId: idPayment },
        { withCredentials: true }
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error resuming checkout session", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          API_URL + "/Order/GetOrdersByIdCustomer",
          { withCredentials: true }
        );

        const groupedOrders = groupOrdersById(response.data);

        const ordersWithPaymentDetails = await Promise.all(
          groupedOrders.map(async (order) => {
            const paymentDetails = await fetchPaymentDetails(order.idPayment);
            return {
              ...order,
              paymentDetails,
            };
          })
        );

        const unpaidOrdersList = ordersWithPaymentDetails.filter(
          (order) => !order.paymentDetails || !order.paymentDetails.paid
        );

        setOrders(ordersWithPaymentDetails);
        setUnpaidOrders(unpaidOrdersList);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
        price,
        idDiscount,
        discountCode,
        idDiscountType,
        value,
      } = item;

      if (!ordersMap.has(idOrder)) {
        ordersMap.set(idOrder, {
          idOrder,
          idCustomer,
          idPayment,
          idDiscount,
          discountCode,
          idDiscountType,
          value,
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
        price: price,
      });
    });
    return Array.from(ordersMap.values());
  }

  const calculateOrderTotal = (order) => {
    // Calcola il subtotale
    const subtotal = order.products.reduce(
      (total, product) => total + product.price * product.amount,
      0
    );

    // Calcola l'importo dello sconto
    let discountAmount = 0;
    if (order.idDiscount != null) {
      if (order.idDiscountType === 1) {
        discountAmount = order.value; // Sconto fisso
      } else if (order.idDiscountType === 2) {
        discountAmount = (subtotal * order.value) / 100; // Sconto percentuale
      }
    }

    // Calcola il totale finale
    const total = subtotal - discountAmount;

    return total > 0 ? total.toFixed(2) : "0.00";
  };

  if (loading) {
    return (
      <section className="py-10 px-10 max-w-7xl mx-auto rounded-lg">
        <div className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-3xl font-bold">Ordini</h1>
              <p className="mt-2 text-sm text-gray-500">
                Controlla lo stato degli ordini recenti.
              </p>
              <div className="mt-16 border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <h3 className="sr-only">Ordine richiesto il </h3>

                <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                  <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <Skeleton className="flex rounded-md w-5/6 h-10" />

                    <Skeleton className="flex rounded-md w-5/6 h-10" />

                    <Skeleton className="flex rounded-md w-5/6 h-10" />
                  </dl>

                  <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <Skeleton className="flex rounded-md w-32 h-10" />
                  </div>
                </div>

                <h4 className="sr-only">Items</h4>
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="p-4 sm:p-6">
                    <div className="flex items-center sm:items-start">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                        <Skeleton className="flex rounded-md w-full h-full" />
                      </div>
                      <div className="ml-6 flex-1 text-sm">
                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                          <h5>
                            <Skeleton className="flex rounded-md w-32 h-10" />
                          </h5>
                          <h5>
                            <Skeleton className="flex rounded-md w-32 h-10" />
                          </h5>
                          <p className="mt-2 sm:mt-0">
                            <Skeleton className="flex rounded-md w-32 h-10" />
                          </p>
                        </div>
                        <Skeleton className="flex rounded-md w-full h-72 mt-5" />
                      </div>
                    </div>

                    <div className="mt-6 sm:flex sm:justify-between">
                      <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                        <Skeleton className="flex rounded-md w-32 h-10" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-10 max-w-7xl mx-auto rounded-lg">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-3xl font-bold">Ordini</h1>
            <p className="mt-2 text-sm text-gray-500">
              Controlla lo stato degli ordini recenti.
            </p>

            {unpaidOrders.length > 0 && (
              <div className="rounded-md bg-yellow-50 p-4 mt-5">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <WarningAmberRoundedIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Attenzione: Hai ordini non pagati
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Alcuni dei tuoi ordini non sono ancora stati pagati. Per
                        completare l'acquisto e avviare la spedizione, ti
                        preghiamo di effettuare il pagamento.
                      </p>
                      <p className="mt-2">
                        Clicca sul pulsante "Saldare" accanto all'ordine per
                        procedere con il pagamento. Una volta saldato, il tuo
                        ordine sarà elaborato e spedito il prima possibile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-16">
              <h2 className="sr-only">Ordini recenti</h2>
              <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl space-y-8 lg:max-w-4xl lg:px-0">
                  {orders.map((order) => (
                    <div
                      key={order.idOrder}
                      className="border-b border-t border-gray-200 bg-white shadow-sm rounded-lg border"
                    >
                      <h3 className="sr-only">
                        Ordine richiesto il{" "}
                        <time dateTime={order.createdDatetime}>
                          {dayjs(order.createdDatetime).format("D/MMMM/YYYY")}
                        </time>
                      </h3>

                      <div className="flex items-center border-b border-gray-200 p-4 sm:gap-x-6 sm:p-6 w-full">
                        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 md:grid-cols-8 w-1/2">
                          <div className="col-span-2">
                            <dt className="font-medium text-gray-900">
                              Numero ordine
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              #{order.idOrder}
                            </dd>
                          </div>
                          <div className="col-span-2">
                            <dt className="font-medium text-gray-900">
                              Ordinato il
                            </dt>
                            <dd className="mt-1 text-gray-500">
                              <time dateTime={order.createdDatetime}>
                                {dayjs(order.createdDatetime).format(
                                  "DD/MM/YYYY"
                                )}
                              </time>
                            </dd>
                          </div>
                          {order.discountCode !== null && (
                            <div className="col-span-2">
                              <dt className="font-medium text-gray-900">
                                Codice sconto
                              </dt>
                              <dd className="mt-1 text-gray-500">
                                {order.discountCode}
                              </dd>
                            </div>
                          )}
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
                                    <>
                                      {order.paymentDetails?.paid ? (
                                        <a
                                          href={
                                            order.paymentDetails?.receipt_url
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Vedi ricevuta
                                        </a>
                                      ) : (
                                        <a
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                          onClick={() =>
                                            handlePayment(order.idPayment)
                                          }
                                        >
                                          Saldare
                                        </a>
                                      )}
                                    </>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                          {order.paymentDetails?.paid && (
                            <a
                              href={order.paymentDetails?.receipt_url}
                              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              <span>Vedi ricevuta</span>
                              <span className="sr-only">
                                for order {order.idOrder}
                              </span>
                            </a>
                          )}
                          {!order.paymentDetails?.paid && (
                            <Button
                              color="primary"
                              radius="sm"
                              className="text-white"
                              onClick={() => handlePayment(order.idPayment)}
                            >
                              Saldare
                            </Button>
                          )}
                        </div>
                      </div>

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
                                <div className="font-medium text-gray-900 sm:flex justify-between">
                                  <h5>{product.name}</h5>
                                  <h5>
                                    {product.amount}pz x {product.price}€
                                  </h5>
                                </div>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: product.description,
                                  }}
                                  className="hidden text-gray-500 sm:mt-2 sm:block"
                                />
                              </div>
                            </div>

                            <div className="mt-6 sm:flex sm:justify-between">
                              <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                <div className="flex flex-1 justify-center">
                                  <a
                                    href={
                                      "/store/product/" +
                                      product.id +
                                      "/" +
                                      product.name
                                    }
                                    className="whitespace-nowrap text-primary hover:text-primary cursor-pointer"
                                  >
                                    Vedi prodotto
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { Skeleton } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function EndOrder() {
  const { customerId, idPayment } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "/Payment/GetCheckoutDetails",
          { params: { idPayment } }
        );
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details", error);
        window.location.href = "/";
      }
    };

    const getOrderData = async () => {
      try {
        axios
          .get(API_URL + "/order/GetOrderDataByIdCustomerAndPaymentId", {
            params: { IdPayment: idPayment },
            withCredentials: true,
          })
          .then((response) => {
            console.log("Dati", response.data);
            setOrderData(response.data[0]);
          });
      } catch (error) {
        console.error("Errore nel recupero dei dati", error);
      }
    };

    const getOrderProducts = async () => {
      try {
        axios
          .get(API_URL + "/order/GetOrderByIdCustomerAndPaymentId", {
            params: { IdPayment: idPayment },
            withCredentials: true,
          })
          .then((response) => {
            console.log("Ordini", response.data);
            setProducts(response.data);
          });
      } catch (error) {
        console.error("Errore nel recupero dei dati", error);
      }
    };

    fetchPaymentDetails();
    getOrderProducts();
    getOrderData();
  }, [idPayment]);

  console.log(paymentDetails);

  const date = new Date().toLocaleDateString();

  return (
    <>
      {paymentDetails != null ? (
        <main className="mx-auto max-w-2xl pb-24 pt-8 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Ordine #{orderData.idOrder}
              </h1>
              {paymentDetails.receipt_url && (
                <a
                  href={paymentDetails.receipt_url}
                  className="hidden text-sm font-medium text-primary hover:text-primary sm:block"
                >
                  Vedi ricevuta
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Ordine effettuato il{" "}
              <strong>
                {dayjs(orderData.createdDatetime).format("DD/MM/YYYY")}
              </strong>
            </p>
          </div>

          {/* Products */}
          <section aria-labelledby="products-heading" className="mt-6">
            <h2 id="products-heading" className="sr-only">
              Products purchased
            </h2>

            <div className="space-y-8">
              {products.length !== 0 &&
                products.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                    >
                      <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                        <div className="sm:flex lg:col-span-7">
                          <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                            <img
                              alt={product.productName}
                              src={
                                product.productImagePath &&
                                API_URL + "/uploads/" + product.productImagePath
                              }
                              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            />
                          </div>

                          <div className="mt-6 sm:ml-6 sm:mt-0">
                            <h3 className="text-base font-medium text-gray-900">
                              <a href={product.href}>{product.productName}</a>
                            </h3>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              {product.unitPrice} € x{product.amount}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: product.productDescription,
                              }}
                              className="mt-3 text-sm text-gray-500"
                            />
                          </div>
                        </div>

                        <div className="mt-6 lg:col-span-5 lg:mt-0">
                          <dl className="grid grid-cols-2 gap-x-6 text-sm">
                            <div>
                              <dt className="font-medium text-gray-900">
                                Indirizzo di consegna
                              </dt>
                              <dd className="mt-3 text-gray-500">
                                <span className="block">
                                  {product.name + " " + product.surname}
                                </span>
                                <span className="block">{product.address}</span>
                                <span className="block">
                                  {product.city}, {product.cap},{" "}
                                  {product.province}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Billing */}
          <section aria-labelledby="summary-heading" className="mt-16">
            <h2 id="summary-heading" className="sr-only">
              Riepilogo Fatturazione
            </h2>

            <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
              <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                <div>
                  <dt className="font-medium text-gray-900">
                    Informazioni per la spedizione
                  </dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">
                      {" "}
                      {orderData.name + " " + orderData.surname}
                    </span>
                    <span className="block">{orderData.address}</span>
                    <span className="block">
                      {" "}
                      {orderData.city}, {orderData.cap}, {orderData.province}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="font-medium text-gray-900">
                    Informazioni di pagamento
                  </dt>
                  <dd className="-ml-4 -mt-1 flex flex-wrap items-center">
                    {paymentDetails.payment_method_details.card && (
                      <>
                        <div className="ml-4 mt-4 flex-shrink-0">
                          <svg
                            width={36}
                            height={24}
                            viewBox="0 0 36 24"
                            aria-hidden="true"
                            className="h-6 w-auto"
                          >
                            <rect
                              rx={4}
                              fill="#224DBA"
                              width={36}
                              height={24}
                            />
                            <path
                              d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                              fill="#fff"
                            />
                          </svg>
                          <p className="sr-only">Visa</p>
                        </div>
                        <div className="ml-4 mt-4">
                          <p className="text-gray-900">
                            XXXX XXXX XXXX{" "}
                            {paymentDetails.payment_method_details.card.last4}
                          </p>
                          <p className="text-gray-600">
                            Scade il{" "}
                            {
                              paymentDetails.payment_method_details.card
                                .exp_month
                            }{" "}
                            /{" "}
                            {
                              paymentDetails.payment_method_details.card
                                .exp_year
                            }
                          </p>
                        </div>
                      </>
                    )}

                    {paymentDetails.payment_method_details.paypal && (
                      <>
                        <div className="ml-4 mt-4 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            id="paypal"
                          >
                            <path
                              fill="#139AD6"
                              d="M49.2 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3H46c.2 0 .3-.1.3-.3l.4-2.5c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.5-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2H47l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.2.1.2.4.2.9"
                            ></path>
                            <path
                              fill="#263B80"
                              d="M24.7 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3h1.6c.2 0 .4-.2.5-.4l.4-2.4c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.4-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2h-.5l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.1.1.2.4.1.9M35 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3H34c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.3-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.3.3.4.8.4 1.2"
                            ></path>
                            <path
                              fill="#139AD6"
                              d="M59.4 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3h1.5c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.2-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.4.3.5.8.4 1.2"
                            ></path>
                            <path
                              fill="#263B80"
                              d="M43.7 31.4H42c-.2 0-.3.1-.4.2L39.4 35l-1-3.2c-.1-.2-.2-.3-.5-.3h-1.6c-.2 0-.3.2-.3.4l1.8 5.3-1.7 2.4c-.1.2 0 .5.2.5h1.6c.2 0 .3-.1.4-.2l5.5-7.9c.3-.3.1-.6-.1-.6"
                            ></path>
                            <path
                              fill="#139AD6"
                              d="m61.3 28.5-1.4 9c0 .2.1.3.3.3h1.4c.2 0 .4-.2.5-.4l1.4-8.8c0-.2-.1-.3-.3-.3h-1.6c-.1-.1-.2 0-.3.2"
                            ></path>
                            <path
                              fill="#263B80"
                              d="M12 25.2c-.7-.8-2-1.2-3.8-1.2h-5c-.3 0-.6.3-.7.6l-2 13.1c0 .3.2.5.4.5H4l.8-4.9v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5v-.3c-.1 0-.1 0 0 0 .1-1.3-.1-2.1-.8-2.9"
                            ></path>
                            <path
                              fill="#139AD6"
                              d="M12.7 28.1v.3c-.7 3.4-2.9 4.5-5.8 4.5H5.4c-.3 0-.6.3-.7.6l-1 6.1c0 .2.1.4.4.4h2.6c.3 0 .6-.2.6-.5v-.1l.5-3.1v-.2c0-.3.3-.5.6-.5h.4c2.5 0 4.5-1 5-4 .2-1.2.1-2.3-.5-3-.1-.2-.3-.4-.6-.5"
                            ></path>
                            <path
                              fill="#232C65"
                              d="M12 27.8c-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.4-.1-.8-.1-1.3-.1H6.2c-.1 0-.2 0-.3.1-.2.1-.3.3-.3.5l-.8 5.2v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5 0-.1 0-.2.1-.3-.2-.1-.3-.2-.5-.2-.3-.1-.3-.1-.4-.1"
                            ></path>
                          </svg>
                          <p className="sr-only">Paypal</p>
                        </div>
                        <div className="ml-4 mt-4">
                          <p className="text-gray-900">
                            {
                              paymentDetails.payment_method_details.paypal
                                .payer_name
                            }
                          </p>
                        </div>
                      </>
                    )}
                  </dd>
                </div>
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">Totale parziale</dt>
                  <dd className="font-medium text-gray-900"></dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Spedizione</dt>
                  <dd className="font-medium text-gray-900"></dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">Totale ordine</dt>
                  <dd className="font-medium text-primary">
                    ${(paymentDetails.amount / 100).toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </main>
      ) : (
        <main className="mx-auto max-w-2xl pb-24 pt-8 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <Skeleton className="flex rounded-md w-80 h-7" />
            </div>
            <Skeleton className="flex rounded-md w-24 h-7" />
          </div>

          {/* Products */}
          <section aria-labelledby="products-heading" className="mt-6">
            <h2 id="products-heading" className="sr-only">
              Products purchased
            </h2>

            <div className="space-y-8">
              <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                      <Skeleton className="flex rounded-md w-full h-full" />
                    </div>

                    <div className="mt-6 sm:ml-6 sm:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        <Skeleton className="flex rounded-md w-72 h-7" />
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        <Skeleton className="flex rounded-md w-32 h-7" />
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        <Skeleton className="flex rounded-md w-80 h-7" />
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 lg:col-span-5 lg:mt-0">
                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                      <div>
                        <Skeleton className="flex rounded-md h-40" />
                      </div>
                      <div>
                        <Skeleton className="flex rounded-md h-40" />
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Billing */}
          <section aria-labelledby="summary-heading" className="mt-16">
            <h2 id="summary-heading" className="sr-only">
              Riepilogo Fatturazione
            </h2>

            <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
              <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                <div>
                  <Skeleton className="flex rounded-md w-72 h-52 mt-2" />
                </div>

                <div>
                  <Skeleton className="flex rounded-md w-72 h-32 mt-2" />
                </div>
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                <div className="flex items-center justify-between pb-4">
                  <Skeleton className="flex rounded-md w-full h-8 mt-2" />
                </div>
                <div className="flex items-center justify-between py-4">
                  <Skeleton className="flex rounded-md w-full h-8 mt-2" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Skeleton className="flex rounded-md w-full h-8 mt-2" />
                </div>
              </dl>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

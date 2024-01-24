import React from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

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
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      price: 32.0,
      discountValue: 10,
      discountType: 1,
      color: "Sienna",
      inStock: true,
      size: "Large",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: 32.0,
      discountValue: 20,
      discountType: 2,
      color: "Black",
      inStock: false,
      leadTime: "3–4 weeks",
      size: "Large",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 3,
      name: "Nomad Tumbler",
      href: "#",
      price: 35,
      color: "White",
      inStock: true,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
      imageAlt: "Insulated bottle with white base and black snap lid.",
    },
  ];
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
              {products.length === 0 && <span>il carrello è vuoto</span>}
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {product.size}
                            </p>
                          ) : null}
                        </div>
                        <p
                          className={
                            product.discountType < 1
                              ? "mt-1 text-sm font-medium text-gray-900"
                              : "mt-1 text-sm font-medium text-gray-900 line-through"
                          }
                        >
                          € {product.price.toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.discountType > 1 && (
                            <span className="text-gray-900">€ </span>
                          )}
                          {product.discountType === 1 &&
                            product.price.toFixed(2) -
                              (product.price.toFixed(2) *
                                product.discountValue) /
                                100}
                          {product.discountType === 2 &&
                            (
                              product.price.toFixed(2) -
                              product.discountValue.toFixed(2)
                            ).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>

                        <Select
                          size="sm"
                          variant="bordered"
                          defaultSelectedKeys="1"
                        >
                          {quantity.map((quantity) => (
                            <SelectItem
                              key={quantity.value}
                              value={quantity.value}
                            >
                              {quantity.label}
                            </SelectItem>
                          ))}
                        </Select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
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
                        {product.inStock
                          ? "In stock"
                          : `Ships in ${product.leadTime}`}
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
                <dd className="text-sm font-medium text-gray-900">€99.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Spese di spedizione</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">€5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>IVA</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">€8.32</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Totale ordine
                </dt>
                <dd className="text-base font-medium text-gray-900">€112.32</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Completa ordine
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

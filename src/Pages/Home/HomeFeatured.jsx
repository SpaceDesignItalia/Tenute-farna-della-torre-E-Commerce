import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function HomeFeatured() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(API_URL + "/Featured/GetAll").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const calculateDiscountedPrice = (product) => {
    if (product.idDiscountType === null) {
      return <>€{product.unitPrice.toFixed(2)}</>;
    } else if (product.idDiscountType === 1) {
      const discountedPrice = product.unitPrice - product.value;
      return <>€{discountedPrice.toFixed(2)}</>;
    } else if (product.idDiscountType === 2) {
      const discountedPrice =
        product.unitPrice - product.unitPrice * (product.value / 100);
      return (
        <div className="flex flex-row gap-5 items-center">
          <div className="line-through text-lg text-gray-500">
            €{product.unitPrice.toFixed(2)}
          </div>
          €{discountedPrice.toFixed(2)}
        </div>
      );
    }
  };

  function discountDisplay(product) {
    if (product.idDiscountType !== null) {
      if (product.idDiscountType === 1) {
        return (
          <p className="font-semibold text-gray-600">Sconto €{product.value}</p>
        );
      } else {
        return (
          <p className="font-semibold text-gray-600">Sconto {product.value}%</p>
        );
      }
    } else {
      return <></>;
    }
  }

  return (
    <>
      {products.length > 0 && (
        <div className="bg-white">
          <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-center sm:justify-between px-4 sm:px-6 lg:px-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Prodotti in primo piano
              </h2>
              <a
                href="/store"
                className="hidden text-base font-semibold text-primary hover:text-primary sm:block"
              >
                Esplora tutto
                {/*
                 */}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="relative mt-8">
              <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                <ul className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 justify-center items-center">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="inline-flex w-64 flex-col text-center lg:w-auto"
                    >
                      <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                          <img
                            src={
                              API_URL + "/uploads/" + product.productImagePath
                            }
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-6">
                          <h3 className="mt-1 font-semibold text-gray-900">
                            <a
                              href={
                                "/store/product/" +
                                product.idProduct +
                                "/" +
                                product.productName
                              }
                            >
                              <span className="absolute inset-0" />
                              {product.productName}
                            </a>
                          </h3>
                          <div className="flex flex-col justify-center items-center gap-2">
                            <p className="text-gray-900">
                              {calculateDiscountedPrice(product)}
                            </p>
                            {discountDisplay(product)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 flex px-4 sm:hidden">
              <a
                href="/store"
                className="text-base font-semibold text-primary hover:text-primary"
              >
                Esplora tutto
                {/*
                 */}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

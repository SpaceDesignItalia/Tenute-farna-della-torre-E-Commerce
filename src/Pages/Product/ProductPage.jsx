import React, { useState, useEffect } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useLocation, useParams } from "react-router-dom";

// Simuliamo un array di prodotti per il demo
const products = [
  {
    id: 1,
    name: "Moet & Chandon",
    price: "€256",
    images: [
      {
        id: 1,
        name: "Angled view",
        src: "https://m.media-amazon.com/images/I/71d2aeO3uKL.jpg",
        alt: "Office content 1",
      },
      // More images...
    ],
    options: [
      {
        name: "0,75l",
      },
      { name: "1,0l" },
      {
        name: "1,5l",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      `,
    details: [
      {
        name: "Dettagli",
        items: ["Lorem ipsum dolor sit amet"],
      },
    ],
  },
  {
    id: 2,
    name: "Dom Perignon 2008",
    price: "€32",
    images: [
      {
        id: 2,
        name: "Angled view",
        src: "https://s.tannico.it/media/catalog/product/cache/1/thumbnail/500x500/0dc2d03fe217f8c83829496872af24a0/d/p/dp13_2.jpg",
        alt: "Office content 1",
      },
      // More images...
    ],
    options: [
      {
        name: "0,75l",
      },
      { name: "1,0l" },
      {
        name: "1,5l",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      `,
    details: [
      {
        name: "Dettagli",
        items: ["Lorem ipsum dolor sit amet"],
      },
    ],
  },
  // Add more products as needed
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Modifica per supportare più prodotti
  const { productId } = useParams();

  const product = products.find((prod) => prod.id === Number(productId));

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-primary" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Informazioni sul prodotto</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Descrizione</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">
                    Versioni disponibili
                  </h3>

                  <RadioGroup
                    value={selectedOption}
                    onChange={setSelectedOption}
                    className="mt-2 gap-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Versioni disponibili:
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.options.map((option) => (
                        <RadioGroup.Option
                          key={option.name}
                          value={option.name}
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {option.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              "h-8 w-8 px-2 py-1 rounded-full border ",
                              selectedOption === option.name
                                ? "ring-2 ring-offset-2 ring-primary"
                                : ""
                            )}
                          >
                            {option.name}
                          </span>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-primary" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

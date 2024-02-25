import React, { useState, useEffect } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { API_URL } from "../../API/API";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image, Button, Accordion, AccordionItem } from "@nextui-org/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Modifica per supportare più prodotti
  const { id, productName } = useParams();

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/CheckSession", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      });
    axios
      .get(
        API_URL + "/Products/GetProductByNameAndId/" + id + "/" + productName
      )
      .then((res) => {
        setProduct(res.data[0]);
        console.log(res.data);
      });
    axios.get(API_URL + "/Products/GetProductImagesById/" + id).then((res) => {
      setImages(res.data);
    });
  }, []);

  const calculateDiscountedPrice = () => {
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

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {images.map((image, index) => (
                    <Tab
                      key={index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={
                                API_URL + "/uploads/" + image.productImagePath
                              }
                              alt={image.productImagePath}
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

              <Tab.Panels className="flex md:block aspect-h-1 aspect-w-1 w-full">
                {images.map((image) => (
                  <Tab.Panel>
                    <Image
                      src={API_URL + "/uploads/" + image.productImagePath}
                      alt={image.productImagePath}
                      className="md:h-full md:w-full object-cover object-center sm:rounded-lg"
                      height={500}
                      width={500}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.productName}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Informazioni sul prodotto</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {calculateDiscountedPrice()}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Descrizione</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: product.productDescription,
                  }}
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex">
                  <Button
                    isDisabled={!isAuth}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Aggiungi al carrello
                  </Button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Accordion 1"
                    >
                      Test 1
                    </AccordionItem>
                    <AccordionItem
                      key="2"
                      aria-label="Accordion 2"
                      title="Accordion 2"
                    >
                      Test 2
                    </AccordionItem>
                  </Accordion>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

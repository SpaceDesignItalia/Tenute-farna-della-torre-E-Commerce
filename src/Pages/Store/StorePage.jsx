import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [tempValue, setTempValue] = useState([0, 300]);
  const [tempOrderBy, setTempOrderBy] = useState("empty");
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState([0, 300]);
  const [orderBy, setOrderBy] = useState("empty");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    axios.get(API_URL + "/Products/GetProductsEcommerce").then((res) => {
      setProducts(res.data);
      console.log(res.data);
    });
  }, []);

  const updateFilteredProducts = () => {
    const filtered = products.filter((product) => {
      const priceInRange =
        product.price >= tempValue[0] && product.price <= tempValue[1];

      if (tempOrderBy === "ASC") {
        return priceInRange;
      } else if (tempOrderBy === "DESC") {
        return priceInRange;
      } else {
        // Se l'ordinamento non è specificato, restituisci tutti i prodotti nel range di prezzo
        return priceInRange;
      }
    });

    setFilteredProducts(filtered);
  };

  const applyFilters = async () => {
    setIsLoading(true);

    await new Promise((resolve) => {
      setTimeout(async () => {
        setValue(tempValue);
        setOrderBy(tempOrderBy);
        setMobileFiltersOpen(false);

        // Chiamata API effettiva
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          updateFilteredProducts();
        } catch (error) {
          console.error("Errore durante il caricamento dei dati:", error);
        } finally {
          setIsLoading(false);
          resolve(); // Risolvi la promessa dopo aver completato il caricamento
        }
      }, 0);
    });
  };

  const handleTempPriceChange = (newRange) => {
    setTempValue(newRange);
  };

  const handleTempOrderChange = (value) => {
    setTempOrderBy(value);
  };

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

  return (
    <div className="bg-white">
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={() => setMobileFiltersOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtri
                    </h2>
                    <button
                      type="button"
                      className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Chiudi menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form className="mt-4 px-5">
                    <RadioGroup
                      defaultValue={tempOrderBy}
                      onChange={handleTempOrderChange}
                    >
                      <h2 className="text-lg font-semibold">Ordina per</h2>
                      <Radio value="empty">Nulla</Radio>
                      <Radio value="ASC">Prezzo crescente</Radio>
                      <Radio value="DESC">Prezzo decrescente</Radio>
                    </RadioGroup>
                    <h2 className="text-lg font-semibold pt-5">Filtra per</h2>
                    <h3 className="text-sm font-semibold pt-2">Prezzo</h3>
                    <div className="flex flex-row gap-3">
                      <Input
                        variant="faded"
                        type="number"
                        value={tempValue[0]}
                        aria-label="Prezzo minimo"
                        onChange={(e) => {
                          setTempValue([e.target.value, tempValue[1]]);
                        }}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              €
                            </span>
                          </div>
                        }
                        style={{
                          border: "none",
                          borderBottom: "1px solid #d2d6dc",
                        }}
                      />
                      <Input
                        variant="faded"
                        type="number"
                        value={tempValue[1]}
                        aria-label="Prezzo massimo"
                        onChange={(e) => {
                          setTempValue([tempValue[0], e.target.value]);
                        }}
                        maxValue={300}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              €
                            </span>
                          </div>
                        }
                        style={{
                          border: "none",
                          borderBottom: "1px solid #d2d6dc",
                        }}
                      />
                    </div>
                    <Slider
                      showTooltip={true}
                      formatOptions={{ style: "currency", currency: "EUR" }}
                      step={10}
                      maxValue={300}
                      minValue={0}
                      value={tempValue}
                      onChange={handleTempPriceChange}
                      className="mt-2"
                      aria-label="Prezzo"
                    />
                    <Button
                      onClick={applyFilters}
                      className="w-full bg-primary text-white mt-3"
                    >
                      Applica
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Lorem ipsum
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filtri</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filtri
                </span>
                <PlusIcon
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-3 divide-gray-200">
                  <RadioGroup
                    defaultValue={orderBy}
                    onChange={handleTempOrderChange}
                  >
                    <h2 className="text-lg font-semibold">Ordina per</h2>
                    <Radio value="empty">Nulla</Radio>
                    <Radio value="ASC">Prezzo crescente</Radio>
                    <Radio value="DESC">Prezzo decrescente</Radio>
                  </RadioGroup>
                  <h2 className="text-lg font-semibold pt-3">Filtra per</h2>
                  <h3 className="text-sm font-semibold">Prezzo</h3>
                  <div className="flex flex-row gap-3">
                    <Input
                      variant="faded"
                      type="number"
                      value={tempValue[0]}
                      aria-label="Prezzo minimo"
                      onChange={(e) => {
                        setTempValue([e.target.value, tempValue[1]]);
                      }}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">€</span>
                        </div>
                      }
                      style={{
                        border: "none",
                        borderBottom: "1px solid #d2d6dc",
                      }}
                    />

                    <Input
                      variant="faded"
                      type="number"
                      value={tempValue[1]}
                      aria-label="Prezzo massimo"
                      onChange={(e) => {
                        setTempValue([tempValue[0], e.target.value]);
                      }}
                      maxValue={300}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">€</span>
                        </div>
                      }
                      style={{
                        border: "none",
                        borderBottom: "1px solid #d2d6dc",
                      }}
                    />
                  </div>
                  <Slider
                    showTooltip={true}
                    formatOptions={{ style: "currency", currency: "EUR" }}
                    step={10}
                    maxValue={300}
                    minValue={0}
                    value={tempValue}
                    onChange={handleTempPriceChange}
                    aria-label="Prezzo"
                  />
                  <Button
                    onClick={applyFilters}
                    className="w-full bg-primary text-white"
                  >
                    Applica
                  </Button>
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.idProduct}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                      <img
                        src={API_URL + "/uploads/" + product.productImagePath}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        <a
                          href={
                            "/store/product/" +
                            product.idProduct +
                            "/" +
                            product.productName
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.productName}
                        </a>
                      </h3>
                      <div
                        className="text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: product.productDescription,
                        }}
                      />
                      <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">
                          {calculateDiscountedPrice(product)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

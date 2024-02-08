import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../API/API";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/CheckSession", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => {
        console.error("Errore durante il controllo della sessione:", err);
        setIsAuth(false);
      });
  }, []);

  const navigation = {
    pages: [
      { name: "Home", href: "/" },
      { name: "Store", href: "/store" },
      { name: "Azienda", href: "/about" },
    ],
  };
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {isAuth ? (
                    <>
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Il mio account
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Crea account
                        </a>
                      </div>
                      <div className="flow-root">
                        <a
                          href="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Login
                        </a>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Currency selector */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:items-center">
                  <a href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Mega menus */}
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-base font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <img
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  {isAuth ? (
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex"></div>

                        <div className="flex">
                          <a
                            href="/dashboard"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <a
                          href="/cart"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center lg:ml-8">
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <a
                          href="/login"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Login
                        </a>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <a
                          href="#"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Crea account
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

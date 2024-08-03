import React from "react";
import Uva2 from "../../assets/Uva2.jpg";

export default function Error404() {
  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr] h-screen">
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="flex flex-col justify-center lg:items-start items-center w-full lg:max-w-lg">
          <p className="text-6xl font-semibold leading-8 text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pagina non trovata!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Non abbiamo trovato la pagina che cercavi :(
          </p>
          <div className="mt-10">
            <a
              href="/"
              className="text-sm font-semibold leading-7 text-primary"
            >
              <span aria-hidden="true">&larr;</span> Home
            </a>
          </div>
        </div>
      </main>

      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <img
          alt=""
          src={Uva2}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function HomeCTA() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center mx-auto max-w-2xl lg:max-w-4xl">
          <p className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-4xl sm:leading-9">
            Un viaggio sensoriale e culturale
          </p>
          <figure className="mt-10">
            <blockquote className="text-center text-lg leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                Esplora il gusto autentico della Sicilia, un viaggio nel cuore
                dei vigneti e nella tradizione enologica, dove ogni sorso
                racconta una storia di passione e territorio.
              </p>
            </blockquote>
          </figure>
          <Button
            as={Link}
            color="primary"
            size="lg"
            radius="sm"
            className="mt-10 w-full lg:w-1/3 py-6 text-white"
            href="/store"
          >
            Scopri i nostri prodotti
          </Button>
        </div>
      </section>
    </>
  );
}

import React from "react";
import { Button } from "@nextui-org/react";

export default function HomeCTA() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center mx-auto max-w-2xl lg:max-w-4xl">
          <p className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-4xl sm:leading-9">
            Lorem ipsum dolor
          </p>
          <figure className="mt-10">
            <blockquote className="text-center text-lg leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                expedita voluptas culpa sapiente alias molestiae. Numquam
                corrupti in laborum sed rerum et corporis.”
              </p>
            </blockquote>
          </figure>
          <Button
            color="primary"
            size="lg"
            radius="sm"
            className="mt-10 w-full lg:w-1/3 py-6"
            href="/about"
          >
            Scopri la nostra azienda
          </Button>
        </div>
      </section>
    </>
  );
}

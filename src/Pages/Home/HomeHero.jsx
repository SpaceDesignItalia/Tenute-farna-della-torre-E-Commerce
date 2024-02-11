import React from "react";
import Vigna1 from "../../assets/Vigna1.jpg";

export default function HomeHero() {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src={Vigna1}
          alt="Office content 1"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          Tenute Farina della Torre
        </h1>
        <p className="mt-4 text-xl text-white">
          Un viaggio avvincente attraverso il cuore della sicilia, dalle colline
          di marsala, un'esperienza unica di gusto, tradizione e creatività,
          intrecciata con l'arte e l'identità del territorio siciliano.
        </p>
        <a
          href="/about"
          className="mt-8 inline-block rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white"
        >
          Scopri la nostra azienda
        </a>
      </div>
    </div>
  );
}

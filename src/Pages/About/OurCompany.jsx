import React, { Component } from "react";
import Vigna2 from "../../assets/Vigna2.jpg";

export default class OurCompany extends Component {
  render() {
    return (
      <div>
        <section class="bg-gray-100 flex items-center font-poppins">
          <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div class="flex flex-wrap md:my-10 ">
              <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <img
                  src={Vigna2}
                  alt="Office content 1"
                  class="relative z-40 object-cover w-full h-96 rounded-3xl"
                />
              </div>
              <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                <h2 class="pb-4 text-4xl font-bold text-gray-800 ">
                  L'evoluzione vinicola di Tenute Farina
                </h2>
                <p class="mb-10 text-base leading-7 text-gray-500">
                  Benvenuti nel mondo affascinante e ricco di tradizione delle
                  Tenute Farina, un'azienda vitivinicola con radici profonde
                  nella cultura enologica siciliana che si tramandano da tre
                  generazioni. La nostra storia è un viaggio attraverso le
                  antiche tradizioni vitivinicole, evolvendosi oggi verso la
                  produzione di vini DOC e IGT, con un forte impegno per
                  l'agricoltura biologica. La raccolta manuale delle uve e una
                  scrupolosa selezione delle migliori varietà dimostrano il
                  nostro impegno per preservare le qualità organolettiche del
                  nostro prodotto, ponendo sempre l'accento sull'eccellenza.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

import React from "react";
import Uva3 from "../../assets/Uva3.jpg";

export default function OurStrengths() {
  return (
    <div>
      <section class=" flex items-center font-poppins">
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6">
          <div class="flex flex-wrap md:my-10">
            <div class="w-full px-4 mb-10 lg:mb-0 ">
              <h2 class="text-center pb-4 text-4xl font-bold text-gray-800 ">
                Vini siciliani, Territorio, Arte sensoriale
              </h2>
              <p class="text-center mb-10 text-base leading-7 text-gray-500">
                L'azienda situata in una zona viticola privilegiata del comune
                di Marsala, tra l'altopiano di Paolini e le colline di Rinazzo e
                Bellusa, con i suoi 30 ettari di vigneti sembra focalizzarsi
                sulla valorizzazione delle risorse del territorio e dei vitigni
                autoctoni come Grillo, Catarratto, Muller Turgau, Pinot Grigio,
                Pinot Nero, Nerello Mascalese, Syrah, Perricone, Carricante,
                Traminer e Chardonnay, riflettendo l'eredità culturale della
                civiltà contadina siciliana. La scelta di produrre solo vini
                autoctoni siciliani e massimizzare il legame con il territorio
                marsalese è un approccio che riflette l'identità e l'unicità del
                luogo. Infine, il design delle etichette e il coinvolgimento
                dell'arte nelle degustazioni aggiunge un elemento creativo e
                culturale alla presentazione dei vini, creando un'esperienza
                sensoriale più completa per i consumatori.
              </p>
            </div>
            <div class="items-center w-full px-4 mb-10 lg:mb-0">
              <img
                src={Uva3}
                alt="Office content 1"
                class="relative z-40 object-cover w-full h-96 rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

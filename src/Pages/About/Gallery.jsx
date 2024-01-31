import React from "react";
import Uva1 from "../../assets/Uva1.jpg";
import Uva2 from "../../assets/Uva2.jpg";
import Uva3 from "../../assets/Uva3.jpg";
import Vigna1 from "../../assets/Vigna1.jpg";
import Vigna2 from "../../assets/Vigna2.jpg";
import Olive1 from "../../assets/Olive1.png";
import Olive2 from "../../assets/Olive2.png";
import Olive3 from "../../assets/Olive3.png";

export default function Gallery() {
  return (
    <div>
      <section class="bg-gray-100 flex items-center py-16 font-poppins">
        <div class="container p-4 mx-auto">
          <h2 class="pb-4 text-4xl font-bold text-center text-gray-800 ">
            Galleria
          </h2>
          <div class="mx-auto mb-10 border-b border-gray-400 w-44"></div>
          <div class="grid grid-cols-1 mt-8 lg:grid-cols-4 md:grid-cols-2">
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Uva1}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 1"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Vigna2}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 5"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Olive2}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 3"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Vigna1}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 4"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Uva2}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 5"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Olive1}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 6"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Uva3}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 7"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
            <div class="relative overflow-hidden shadow-lg group">
              <img
                src={Olive3}
                class="group-hover:origin-center group-hover:scale-105 transition inset-0 object-cover object-center  duration-500 w-full h-[350px]"
                alt="Office content 8"
              />
              <div class="absolute inset-0 z-0 group-hover:bg-black opacity-60"></div>
              <div class="absolute hidden p-4 text-center content left-4 bottom-4 right-4 group-hover:block">
                <a
                  href="#"
                  class="mb-2 text-2xl font-semibold text-gray-200 dark:text-white "
                >
                  Lorem ipsum
                </a>
                <h2 class="mb-0 text-sm font-light text-gray-300 dark:text-gray-300 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

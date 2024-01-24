import React from "react";

export default function HomeFeatured() {
  const products = [
    {
      id: 1,
      name: "Machined Pen",
      price: 35,
      discountValue: 10,
      discountType: 1,
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
      imageAlt:
        "Black machined steel pen with hexagonal grip and small white logo at top.",
    },
    {
      id: 2,
      name: "Machined Pen",
      price: 35,
      discountValue: 20,
      discountType: 2,
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
      imageAlt:
        "Black machined steel pen with hexagonal grip and small white logo at top.",
    },
    {
      id: 3,
      name: "Machined Pen",
      price: 35,
      discountValue: 0,
      discountType: null,
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
      imageAlt:
        "Black machined steel pen with hexagonal grip and small white logo at top.",
    },
    {
      id: 4,
      name: "Machined Pen",
      price: 35,
      discountValue: 0,
      discountType: null,
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
      imageAlt:
        "Black machined steel pen with hexagonal grip and small white logo at top.",
    },
  ];
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-center sm:justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Prodotti in primo piano
          </h2>
          <a
            href="#"
            className="hidden text-base font-semibold text-primary hover:text-primary sm:block"
          >
            Esplora tutto
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 justify-center items-center"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex w-64 flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <div className="flex flex-row justify-center items-center gap-2">
                        <p
                          className={
                            product.discountType < 1
                              ? "text-gray-900"
                              : "text-gray-900 line-through"
                          }
                        >
                          € {product.price.toFixed(2)}
                        </p>
                        <p>
                          {product.discountType > 1 && (
                            <span className="text-gray-900">€ </span>
                          )}
                          {product.discountType === 1 &&
                            product.price.toFixed(2) -
                              (product.price.toFixed(2) *
                                product.discountValue) /
                                100}
                          {product.discountType === 2 &&
                            (
                              product.price.toFixed(2) -
                              product.discountValue.toFixed(2)
                            ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <a
            href="#"
            className="text-base font-semibold text-primary hover:text-primary"
          >
            Esplora tutto
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@src/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <div className="bg-white h-[100vh]">
      <header className="absolute inset-x-0 top-0 z-50 w-full">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <img src="src/assets/logo.jpg" className="flex w-11" />
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/userpreference"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Back <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-40 max-sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                variant="outline"
                className="p-2 px-3 text-white bg-indigo-600"
              >
                Get started
              </Button>
              <Button className="text-sm font-semibold leading-6 text-gray-900 bg-white hover:bg-white">
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

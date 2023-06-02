import React from "react";

const Team = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Team
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of open-source web components and
            elements built with the utility classes from Tailwind
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 mx-10 md:mx-0">
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <div className="w-1/2">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://img.freepik.com/free-icon/user_318-563613.jpg"
                alt="Jese Avatar"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span>Ahmed BOUAB</span>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                Comptuer science student / full stack web developer
              </span>
              <p className="my-3 font-light text-gray-500 dark:text-gray-400">
                Junior full stack web developer with a passion for building
                digital experiences.
              </p>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <div className="w-1/2">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://svgsilh.com/svg/296989.svg"
                alt="Sofia Avatar"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span>Karima BOUDIRES</span>
              </h3>
              <span className="text-gray-600">Comptuer science student</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                computer science student, passionate about web development and
                new technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Under the guidance and supervision of the instructor
        </h2>
      </div>
      <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative my-32 sm:mb-24 xl:max-w-sm lg:w-2/5 flex justify-center mx-auto items-center">
        <div className="rounded overflow-hidden shadow-md bg-gray-200">
          <div className="absolute -mt-20 w-full flex justify-center">
            <div className="h-32 w-32">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfsFE5mn3yh1XUdRHM7Zhlc-pl7lvLvXlaemmonWfrw&s"
                alt="Hadia MOSTGHAMI"
                className="rounded-full object-cover h-full w-full shadow-md"
              />
            </div>
          </div>
          <div className="px-6 mt-16">
            <h1 className="font-bold text-3xl text-center mb-1">
              Hadia MOSTEGHANEMI
            </h1>
            <p className="text-gray-800 text-sm text-center">
              Chief Executive Officer
            </p>
            <p className="text-center text-gray-600 text-base pt-3 pb-14 font-normal">
              The CEO's role in raising a company's corporate IQ is to establish
              an atmosphere that promotes knowledge sharing and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

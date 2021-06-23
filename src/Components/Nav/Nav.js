import React, { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import BurgerLogo from 'Components/BurgerLogo/BurgerLogo';
import { gsap } from 'gsap';
import NavLink from 'Components/UI/NavLink/NavLink';

const navigation = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: "L'équipe", href: '#team' },
];

export default function Nav() {
  const navBar = React.createRef();

  useEffect(() => {
    gsap.from(navBar.current, {
      x: '30rem',
      delay: 1,
      ease: 'back.out(1.5)',
      opacity: 0,
    });
  });

  return (
    <div>
      <svg
        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <Popover>
        {({ open }) => (
          <>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="h-6 w-6" />
                    <a href="#hero">
                      <BurgerLogo />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-yellow-100 rounded-md p-2 inline-flex items-center justify-center text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div
                  ref={navBar}
                  className="hidden md:block md:ml-10 md:pr-4 md:space-x-8"
                >
                  {navigation.map(item => (
                    <NavLink
                      name={item.name}
                      href={item.href}
                      additionalStyle="hover:text-gray-900"
                    />
                  ))}
                </div>
              </nav>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="z-50 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-yellow-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div className="h-6 w-6" />
                    <div>
                      <BurgerLogo />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="hover:bg-yellow-600 hover:text-white rounded-md p-2 inline-flex items-center justify-center text-gray-700 focus:outline-none">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map(item => (
                      <NavLink
                        name={item.name}
                        href={item.href}
                        additionalStyle="block px-3 py-2 rounded-md hover:bg-yellow-600 hover:text-white"
                      />
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

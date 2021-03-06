import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default function Modal({
  goodCountry,
  openModal,
  setOpenModal,
  nextGame,
  points,
  distance,
}) {
  let countryNameFR;
  if (goodCountry) {
    if (goodCountry.translations) {
      countryNameFR = goodCountry.translations.fr;
    } else {
      countryNameFR = goodCountry.name;
    }
  }
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-30 inset-0 overflow-y-auto"
        open={openModal}
        onClose={setOpenModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {(() => {
                  if (distance === 0) {
                    return (
                      <div className="flex flex-col items-center space-y-3">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                          <CheckIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-center text-lg leading-6 font-medium text-green-600"
                        >
                          Bravo ! Vous avez trouv?? la bonne r??ponse
                        </Dialog.Title>
                      </div>
                    );
                  }

                  return (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <XIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-center text-lg leading-6 font-medium text-red-600"
                      >
                        Mauvaise r??ponse !
                      </Dialog.Title>
                    </div>
                  );
                })()}

                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2 text-sm font-medium">
                    {/* TODO a r??duite en atome */}
                    <p>
                      R??ponse :{' '}
                      <span className="text-yellow-600">
                        {goodCountry ? countryNameFR : 'Unknow'}
                      </span>
                    </p>
                    <p>
                      Vous ??tiez ??{' '}
                      <span className="text-yellow-600">{distance} km</span> de
                      la r??ponse
                    </p>
                    {/* TODO a r??duite en atome */}
                    <p>
                      Points obtenus :{' '}
                      <span className="text-yellow-600">{points}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-yellow-600 text-base font-medium text-white bg-yellow-600 hover:bg-white hover:border-yellow-600 hover:text-yellow-600 focus:outline-none"
                  onClick={() => {
                    nextGame();
                  }}
                >
                  Continuer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  goodCountry: PropTypes.shape.isRequired,
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  nextGame: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
};

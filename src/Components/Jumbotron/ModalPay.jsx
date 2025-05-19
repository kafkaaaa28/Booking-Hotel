import React, { useState, useEffect } from 'react';

const ModalPay = ({ modalState, setModalState }) => {
  return (
    <>
      {modalState === 'opening' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            class={`flex overflow-y-auto overflow-x-hidden ${
              modalState === 'opening' ? 'slide-in-top' : modalState === 'closing' ? 'slide-out-top' : 'hidden'
            } fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div class="relative p-4 w-full max-w-2xl  flex justify-center items-center max-h-full">
              <div class="relative bg-white w-full md:w-[50%] rounded-lg shadow-sm ">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-xl font-semibold text-gray-900 ">Massage</h3>
                  <button
                    type="button"
                    onClick={() => setModalState('closing')}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-[25px] ">
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold">Cara Membayar (Midtrans Sandbox)</h2>

                    <p className="text-sm text-gray-600">Anda dapat melakukan simulasi pembayaran melalui halaman resmi Midtrans Sandbox.</p>

                    <ul className="list-disc list-inside text-sm text-gray-700">
                      <li>Pilih metode pembayaran: Transfer Bank, e-Wallet, dsb.</li>
                      <li>Ikuti langkah simulasi sesuai metode yang dipilih.</li>
                      <li>Status akan otomatis terupdate jika pembayaran berhasil.</li>
                    </ul>

                    <a href="https://simulator.sandbox.midtrans.com/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
                      Buka Simulator Midtrans
                    </a>
                  </div>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPay;

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Invoice from './Invoice';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalState, setModalState] = useState('closed');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    if (modalState === 'closing') {
      setTimeout(() => {
        setModalState('closed');
      }, 300);
      document.body.style.overflow = 'auto';
    } else if (modalState === 'opening') {
      document.body.style.overflow = 'hidden';
    }
    fetchBookings();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalState]);
  const paymentBooking = async (booking) => {
    try {
      const res = await api.post('/bookings/payments', {
        booking_id: booking.id,
        nama: booking.nama,
        name: booking.name,
        email: booking.email,
        phone_number: booking.phone_number,
        harga: booking.harga,
      });

      window.snap.pay(res.data.token);
    } catch (err) {
      console.error('Gagal kirim payment:', err);
    }
  };

  return (
    <div className="h-[100vh] w-full bg-[#FAF7F2] ">
      <h2 className="text-[20px] text-center font-bold">My Bookings</h2>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Booking Id
              </th>
              <th scope="col" class="px-6 py-3">
                Room
              </th>
              <th scope="col" class="px-6 py-3">
                Checkin
              </th>
              <th scope="col" class="px-6 py-3">
                Checkout
              </th>
              <th scope="col" class="px-6 py-3">
                total
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                payment
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <td colSpan="5" className="text-center py-4 text-gray-500 ">
                Belum ada booking.
              </td>
            ) : (
              <>
                {bookings.map((book) => (
                  <tr key={book.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {book.id}
                    </th>
                    <td class="px-6 py-4">{book.name}</td>

                    <td class="px-6 py-4">{new Date(book.check_in).toLocaleDateString()}</td>
                    <td class="px-6 py-4">{new Date(book.check_out).toLocaleDateString()}</td>
                    <td class="px-6 py-4">Rp. {book.harga}</td>
                    <td class="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'confirmed' ? 'bg-green-200 text-green-800' : book.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {book.status}
                      </span>{' '}
                    </td>
                    <td class="px-6 py-4">
                      <button
                        type="button"
                        onClick={
                          book.status === 'pending'
                            ? () => paymentBooking(book)
                            : book.status === 'confirmed'
                            ? () => {
                                setModalState('opening');
                                setSelectedBooking(book);
                              }
                            : null
                        }
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {book.status === 'pending' ? 'Pay' : book.status === 'confirmed' ? 'Invoice' : ''}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
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
                  <h3 class="text-xl font-semibold text-gray-900 ">Invoice</h3>
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
                  <Invoice booking={selectedBooking} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-white text-black">
          <p className="text-black">Alert</p>
        </ModalHeader>
        <ModalBody className="bg-white ">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-black ">Sebelum Melakukan Pembayaran Klik cara pembayaran di Navbar </p>
          </div>
        </ModalBody>
        <ModalFooter className="bg-white text-black">
          <Button onClick={() => setOpenModal(false)}>Baik</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyBookings;

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    fetchBookings();
  }, []);

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
                Checkin
              </th>
              <th scope="col" class="px-6 py-3">
                Checkout
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Bukti Pembayaran
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
                    <td class="px-6 py-4">{new Date(book.check_in).toLocaleDateString()}</td>
                    <td class="px-6 py-4">{new Date(book.check_out).toLocaleDateString()}</td>
                    <td class="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'confirmed' ? 'bg-green-200 text-green-800' : book.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {book.status}
                      </span>{' '}
                    </td>
                    <td class="px-6 py-4">
                      {book.payment_proof && (
                        <a href={`https://backend-hotel-production-206f.up.railway.app${book.payment_proof}`} target="_blank" rel="noopener noreferrer">
                          View Proof
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;

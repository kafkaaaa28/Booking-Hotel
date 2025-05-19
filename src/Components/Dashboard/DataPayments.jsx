import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
const DataPayments = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchPayments = async () => {
      try {
        const res = await api.get('/bookings/all-payments');
        setPayment(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <p className="md:text-[25px] text-center font-bold mb-5">Daftar Seluruh Payments</p>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-red-800">
            <tr>
              <th scope="col" class="px-6 py-3">
                BOOK-ID
              </th>
              <th scope="col" class="px-6 py-3">
                ORDER-ID
              </th>
              <th scope="col" class="px-6 py-3">
                PAYMENT-TYPE
              </th>
              <th scope="col" class="px-6 py-3">
                STATUS
              </th>
              <th scope="col" class="px-6 py-3">
                TIME
              </th>
            </tr>
          </thead>
          <tbody>
            {payment.map((pay) => (
              <tr key={pay.id} class={`bg-red-950 border-b text-white border-gray-200`}>
                <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  {pay.booking_id}
                </th>
                <td class="px-6 py-4">{pay.order_id}</td>
                <td class="px-6 py-4">{pay.payment_type}</td>
                <td class="px-6 py-4">{pay.transaction_status}</td>
                <td class="px-6 py-4">{pay.transaction_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPayments;

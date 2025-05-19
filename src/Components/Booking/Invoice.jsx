import api from '../../utils/api.js';
const Invoice = ({ booking }) => {
  console.log(booking);
  if (!booking) return null;
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);
  const timeDiff = Math.abs(checkOut - checkIn);
  const daysBetween = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const timestamp = Date.now();
  const OrderId = `ORDER-${booking.id}-${timestamp}`;
  const date = new Date(booking.transaction_time);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formatted = date.toLocaleString('en-GB', options).replace(',', '');
  return (
    <div>
      <div key={booking.id}>
        <p className="text-center">#{booking.id}</p>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <div className="bg-slate-300 p-2 flex flex-col rounded-lg justify-center items-center w-[50%] ">
              <p className="text-[13px] font-bold">CheckIn Date</p>
              <p className="text-[13px]">{checkIn.toLocaleDateString()}</p>
            </div>
            <div className="bg-slate-300 flex flex-col rounded-lg justify-center items-center w-[50%]">
              <p className="text-[13px] font-bold">CheckOut Date</p>
              <p className="text-[13px]">{checkOut.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="bg-slate-300 rounded-lg flex flex-col p-2 w-full">
            <p className="text-[13px] font-bold">Client</p>
            <p className="text-[13px] ">{booking.nama}</p>
          </div>

          <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-black uppercase bg-gray-300 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Rooms
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nights
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b  text-black border-gray-200">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {booking.name}
                  </th>
                  <td class="px-6 py-4">{daysBetween}</td>
                  <td class="px-6 py-4">{booking.harga}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-300 rounded-lg flex flex-col p-2 w-full">
            <p className="text-[13px] font-bold">Order ID</p>
            <p className="text-[13px] ">{OrderId}</p>
          </div>
          <div className="bg-slate-300 rounded-lg flex flex-col p-2 w-full">
            <p className="text-[13px] font-bold">Payment-Type</p>
            <p className="text-[13px] ">{booking.payment_type}</p>
          </div>
          <div className="bg-slate-300 rounded-lg flex flex-col p-2 w-full">
            <p className="text-[13px] font-bold">Transaction-Time</p>
            <p className="text-[13px] ">{formatted}</p>
          </div>
          <div className="bg-slate-300 rounded-lg flex flex-col p-2 w-full">
            <p className="text-[13px] font-bold">Status</p>
            <div className="bg-green-300 w-[90px] flex justify-center items-center rounded-lg">
              <p className="text-[13px] ">{booking.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

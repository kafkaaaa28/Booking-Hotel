import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Component() {
  const [fileName, setFileName] = useState('');
  const Navigate = useNavigate();
  const handleSucces = () => {
    Navigate('/CheckBooking');
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };
  const location = useLocation();

  const { name, Harga, daysBetween, Checkin, Checkout } = location.state || {};
  return (
    <div className="h-[290vh] md:h-[200vh] lg:h-[380vh] bg-[#FAF7F2] w-full">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-[20px] mt-[20px]">Booking Confirmation</p>
        <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg h-[300px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <p className=" text-[20px] mt-[17px]">Booking Details</p>
          <p className=" text-[15px] mt-[17px]">
            Check-in : <span className="font-bold">{Checkin}</span> , from 11:00 am
          </p>
          <p className=" text-[15px] mt-[17px]">
            Check-out :<span className="font-bold">{Checkout}</span> , until 10:00 am
          </p>
        </div>
        <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg h-[300px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <p className=" text-[15px] mt-[17px] mb-[10px]">Coupon Code :</p>
          <input type="text" className="rounded-lg w-[230px] bg-[#FAF7F2] mb-[15px] md:w-[350px]" />
          <button
            type="button"
            class="text-white w-[230px] md:w-[350px] ml-[10px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Apply
          </button>
        </div>
        <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg h-[300px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <p className=" text-[20px] mt-[17px]">Price BreakDown</p>
          <div className="flex gap-[20px] mt-[20px] ">
            <p className="text-black">
              Name <span className="">:</span>
            </p>
            <p className="text-black">{name}</p>
          </div>
          <div className="flex gap-[150px] mt-[20px] ">
            <p className="text-black">
              Nights <span className="ml-[10px]">:</span>
            </p>
            <p className="text-black">{daysBetween}</p>
          </div>

          <div className="flex gap-[120px] mt-[20px]">
            <p className="text-black">
              Total <span className="ml-[30px]">:</span>
            </p>
            <p className="text-black">$ {Harga}</p>
          </div>
        </div>
        <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg min-h-[400px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <form class="max-w-sm mx-auto">
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </label>
              <input type="email" id="email" class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:w-[350px] " placeholder="name@gmail.com" required />
            </div>
            <div class="mb-5">
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">
                Your Name
              </label>
              <input type="text" id="text" class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required />
            </div>
            <div class="mb-5">
              <label for="number" class="block mb-2 text-sm font-medium text-gray-900 ">
                phone number
              </label>
              <input type="number" id="number" class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="0893156759" required />
            </div>
            <div class="flex items-start mb-5"></div>
          </form>
        </div>
        <div className="bg-white border flex flex-col border-gray-300 rounded-lg shadow-lg h-[300px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <p className="text-[20px] mt-[17px] text-center">Payment Method</p>
          <div className="ml-[20px] mr-[20px] mt-[20px]">
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="pay-on-arrival" type="radio" name="payment-method" value="pay-on-arrival" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pay-on-arrival" className="ms-2 text-sm font-medium text-gray-900">
                  Pay on Arrival
                </label>
                <p className="text-gray-400 text-[10px]">Pay with cash on arrival.</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="direct-bank-transfer" type="radio" name="payment-method" value="direct-bank-transfer" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="direct-bank-transfer" className="ms-2 text-sm font-medium text-gray-900">
                  Direct Bank Transfer
                </label>
                <p className="text-gray-400 text-[10px]">Make your payment directly into our bank account. Please use your Booking ID as the payment reference.</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="pay-by-card" type="radio" name="payment-method" value="pay-by-card" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pay-by-card" className="ms-2 text-sm font-medium text-gray-900">
                  Pay by Card (Stripe)
                </label>
                <p className="text-gray-400 text-[10px]">Pay with your credit card via Stripe. Use the card number 4242424242424242 with CVC 123, a valid expiration date and random 5-digit ZIP code to test a payment.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg h-[200px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="file-upload" className="block text-[20px]  font-medium text-gray-700 text-center">
              proof of payment
            </label>
            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="mt-2 border border-gray-300 rounded-md p-1  w-[300px]" />
            {fileName && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                File name: <strong>{fileName}</strong>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[300px] mt-[20px]  items-start">
          <p>Total Price $ {Harga}</p>
          <button
            type="button"
            onClick={handleSucces}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-[20px] w-[200px]"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}

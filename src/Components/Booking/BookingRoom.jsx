import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { SlSizeFullscreen } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
export default function Component({ handlebook }) {
  const [Checkin, setCheckin] = useState('');
  const [Checkout, setCheckout] = useState('');
  const [daysBetween, setdaysBetween] = useState(null);
  const [harga, setHarga] = useState(null);

  const location = useLocation();
  const { name, Price, imageUrl, imageUrl2, user, facility, size, description, amenities } = location.state || {};

  const handleDateCheckin = (e) => {
    const selectedDate = e.target.value;
    setCheckin(selectedDate);
    calculateDays(selectedDate, Checkout);
  };

  const handleDateCheckout = (e) => {
    const selectedDate = e.target.value;
    setCheckout(selectedDate);
    calculateDays(Checkin, selectedDate);
  };
  const calculateDays = (checkinDate, checkoutDate) => {
    if (checkinDate && checkoutDate) {
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);
      const SelisihWaktu = checkout - checkin;
      const SelisihHari = Math.ceil(SelisihWaktu / (1000 * 60 * 60 * 24));
      const harga = SelisihHari * Price;
      setdaysBetween(SelisihHari);
      setHarga(harga);
    } else {
      setdaysBetween(null);
    }
  };
  const Navigate = useNavigate();

  const handelBooking = () => {
    if (Checkin && Checkout) {
      Navigate('/BookingConfirm', {
        state: {
          name,
          harga,
          daysBetween,
          Checkin,
          Checkout,
        },
      });
      handlebook();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('Please select checkin and checkout date');
    }
  };
  return (
    <div className="h-[200vh] md:h-[170vh] lg:h-[210vh] bg-[#FAF7F2]">
      <div className="flex flex-col justify-center items-center">
        <p className="text-[24px] text-black mt-[30px] md:text-[40px]">{name}</p>
        <img className="w-[350px] mt-[20px] md:w-[700px]" src={imageUrl} alt={name} />
        <div className="flex flex-col lg:flex-row mr-[20px] ml-[20px] md:ml-[40px]">
          <div className="lg:w-[700px]">
            <p className="text-black text-[16px] ml-[20px] mt-[30px]  md:text-[30px] lg:text-[25px]">{description}</p>
            <div className="flex gap-5 mt-[20px] ml-[25px]">
              <img src={imageUrl} alt={name} className="w-[150px] h-[100px] md:w-[350px] md:h-[250px] lg:w-[300px] lg:h-[200px]" />
              <img src={imageUrl2} alt={name} className="w-[150px] h-[100px] md:w-[350px] md:h-[250px] lg:w-[300px] lg:h-[200px]" />
            </div>
          </div>
          <div className="bg-white border flex flex-col border-gray-300 rounded-lg shadow-lg h-[300px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[370px] lg:w-[500px]">
            <div className="ml-[40px] mt-[30px] mr-[30px]">
              <p className="text-black text-[20px]">Rp. {Price} / Night</p>
              <div className="flex gap-4 my-[20px]">
                <FaUser className="text-[13px] " />
                <p className="text-[13px]">Adults : {user}</p>
              </div>
              <div className="flex gap-4  ">
                <FaStar className="text-[30px] md:text-[20px]" />
                <p className="text-[13px]">Amenities : {amenities}</p>
              </div>
              <div className="flex gap-4 my-[20px] ">
                <FaEye className="text-[13px]" />
                <p className="text-[13px]">View : {facility}</p>
              </div>
              <div className="flex gap-4  ">
                <SlSizeFullscreen className="text-[13px]" />
                <p className="text-[13px]">Size : {size}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border flex flex-col border-gray-300 rounded-lg shadow-lg min-h-[400px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:min-h-[370px] lg:w-[500px]">
          <div className="flex flex-col items-center p-4">
            <label htmlFor="date" className="mb-2">
              Check-in Date
            </label>
            <input type="date" id="date" name="date" value={Checkin} onChange={handleDateCheckin} className="border border-gray-300 rounded p-2 w-[300px] md:w-[500px] lg:w-[400px]" required />
            {Checkin && <p className="mt-4 text-gray-600">Selected date: {Checkin}</p>}
            <label htmlFor="date" className="mb-2 mt-5">
              Check-Out Date
            </label>
            <input type="date" id="date" name="date" value={Checkout} onChange={handleDateCheckout} className="border border-gray-300 rounded p-2 w-[300px] md:w-[500px] lg:w-[400px]" required />
            {Checkout && <p className="mt-4 text-gray-600">Selected date: {Checkout}</p>}
            {daysBetween && harga !== null ? (
              <p className="mt-4 text-gray-600">
                Rp. {harga} / for {daysBetween} Nights{' '}
              </p>
            ) : (
              ''
            )}
            <button
              type="button"
              onClick={handelBooking}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-[50px] md:w-[500px] lg:w-[400px]"
            >
              {daysBetween && harga !== null ? 'CONFIRM RESERVATION' : 'CHECK AVALIABLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

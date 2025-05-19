import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import api from '../../utils/api';
import { Spinner } from 'flowbite-react';
export default function Component({ setIsAuthenticated, isAuthenticated, setUser }) {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navigateData, setNavigateData] = useState(null);
  const { name, harga, daysBetween, Checkin, Checkout } = location.state || {};
  const { state } = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (err) {
        console.error('Token validation failed:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };
    validateToken();
  }, []);

  const Toggler = () => {
    setOpenModal(!openModal);
  };

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToMyBookings = () => {
    navigate('/my-bookings', { state: navigateData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('nama', formData.nama);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('name', state.name);
    formDataToSend.append('check_in', state.Checkin);
    formDataToSend.append('check_out', state.Checkout);
    formDataToSend.append('harga', parseInt(state.harga, 10));
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await api.post('/bookings', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const booking = response.data;
      const booking_id = booking.id || booking.data?.id;
      setNavigateData({
        booking_id,
        nama: formData.nama,
        email: formData.email,
        phone_number: formData.phone_number,
        harga,
        name,
        daysBetween,
      });
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);

      alert('Gagal membuat booking: ' + (err.response?.data?.message || err.message));
    }
  };
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner color="info" aria-label="Info spinner example" />
      </div>
    );
  return (
    <>
      <div className="h-[230vh] md:h-[160vh] lg:h-[270vh] bg-[#FAF7F2] w-full">
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
              <p className="text-black">Rp. {harga}</p>
            </div>
          </div>

          <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg min-h-[400px] mt-[30px] w-[350px] mr-[10px] ml-[10px] md:w-[700px] md:ml-[30px] lg:h-[550px] lg:w-[500px]">
            <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
              <div class="mb-5 mt-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:w-[350px] "
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Name
                </label>
                <input
                  type="text"
                  id="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="name"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 ">
                  phone number
                </label>
                <input
                  type="number"
                  id="number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  class="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="0893156759"
                  required
                />

                <p>Total Price Rp. {harga}</p>
                {isAuthenticated ? (
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-[20px] w-[200px]"
                  >
                    BOOK NOW
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={Toggler}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-[20px] w-[200px]"
                  >
                    BOOK NOW
                  </button>
                )}
              </div>
              <div class="flex items-start mb-5"></div>
            </form>
          </div>
        </div>
      </div>

      {/* modal jika belum login */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 " />
            <h3 className="mb-5 text-lg font-normal text-black">Untuk memesan hotel, Anda harus login terlebih dahulu</h3>
            <div className="flex bg-green-400 justify-center gap-4">
              <Button color="failure" className="w-full" onClick={() => setOpenModal(false)}>
                {'Oke'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal show={success} size="md" onClose={() => setSuccess(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 " />
            <h3 className="mb-5 text-lg font-normal text-black">Booking Berhasil Silahkan melanjutkan pembayaran dihalaman mybookings</h3>
            <div className="flex bg-green-400 justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setSuccess(false);
                  goToMyBookings();
                }}
              >
                {'oke'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

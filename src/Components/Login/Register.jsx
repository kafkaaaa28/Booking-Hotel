import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
const Register = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const Toggler = () => {
    setOpenModal(!openModal);
  };

  const handleNavigate = () => {
    navigate('/login');
  };
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Kata sandi tidak cocok');
      return;
    }

    try {
      const response = await api.post('/auth/register', { name, email, password });
      setMessage(response.data.message || 'Register berhasil');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <>
      <div className="h-screen bg-center bg-no-repeat bg-[url('https://wallpaperaccess.com/full/2690557.jpg')] bg-gray-400 bg-blend-multiply flex flex-col justify-center items-center ">
        <div
          className={` 
            
            } bg-black/50 border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg min-h-[400px] w-[350px]  ml-[20px] md:w-[700px] md:ml-[30px] lg:min-h-[370px] lg:w-[500px]`}
        >
          <div className="mb-[20px]">
            <p className="text-center text-[20px] font-bold text-white">Sign Up Account</p>
          </div>
          <form onSubmit={onSubmit} class="max-w-md mx-auto">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onChange}
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>
            <button
              type="submit"
              onClick={Toggler}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Regis
            </button>
          </form>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            {error && !message ? (
              <>
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-black" />
                <h3 className="mb-5 text-lg font-normal text-black">{error}</h3>
              </>
            ) : (
              <>
                <IoIosCheckmarkCircleOutline className="mx-auto mb-4 h-14 w-14 text-black" />
                <h3 className="mb-5 text-lg font-normal text-black">{message}</h3>
              </>
            )}

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={error && !message ? Toggler : handleNavigate}
                class={`focus:outline-none text-white ${error && !message ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'}  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}
              >
                Yes
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Register;

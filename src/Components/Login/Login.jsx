import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import api from '../../utils/api';
const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setformData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { email, password } = formData;
  const handleregis = (e) => {
    e.preventDefault();
    navigate('/register');
  };
  const Toggler = () => {
    setOpenModal(!openModal);
  };
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      setIsAuthenticated(true);
      setUser(res.data.user);
      setTimeout(() => {
        navigate(res.data.user.role === 'admin' ? '/dashboard' : '/');
      }, 100);
    } catch (err) {
      Toggler();
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="h-screen bg-center bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp9913903.jpg')] bg-gray-400 bg-blend-multiply flex flex-col justify-center items-center">
        <div className="bg-black/50 border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg min-h-[400px] w-[350px]  ml-[20px] md:w-[700px] md:ml-[30px] lg:min-h-[370px] lg:w-[500px]">
          <div className="mb-[20px]">
            <p className="text-center text-[20px] font-bold text-white">Sign To My Hotels</p>
            {error && <div className="alert alert-danger text-white">{error}</div>}
          </div>
          <form onSubmit={handelogin} class="max-w-md mx-auto">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={email}
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

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
          <div className="flex gap-2 mt-[20px]">
            <p className="text-[13px] text-white">No Account Yet ?</p>
            <button onClick={handleregis} className="text-[13px] text-[#1A56DB]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 " />
            <h3 className="mb-5 text-lg font-normal text-black">{error}</h3>
            <div className="flex bg-green-400 justify-center gap-4">
              <Button color="failure" className="w-full" onClick={() => setOpenModal(false)}>
                {'Oke'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Login;

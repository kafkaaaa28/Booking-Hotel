import react from 'react';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      Navigate('/');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const Toggler = () => {
    Navigate('/register');
  };

  return (
    <div className="h-[120vh]  bg-[#FAF7F2] flex flex-col justify-center items-center ">
      <div className="bg-white border flex flex-col justify-center items-center border-gray-300 rounded-lg shadow-lg min-h-[400px] w-[350px]  ml-[20px] md:w-[700px] md:ml-[30px] lg:min-h-[370px] lg:w-[500px]">
        <div className="mb-[20px]">
          <p className="text-[10px] text-center">{msg}</p>
          <p className="text-center text-[20px] font-bold">Sign To My Hotels</p>
        </div>
        <form onSubmit={Auth} class="max-w-md mx-auto">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              onChange={(e) => setPassword(e.target.value)}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <p className="text-[13px]">No Account Yet ?</p>
          <button onClick={Toggler} className="text-[13px] text-[#1A56DB]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;

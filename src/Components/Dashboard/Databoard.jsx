import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Databoard = () => {
  const [totalUser, settotalUser] = useState(0);
  const [totalBook, settotalBook] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        settotalUser(res.data.length);
        setLoading(false);
      } catch (err) {
        console.error('Gagal ambil user:', err);
        setLoading(false);
      }
    };
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/all');
        settotalBook(res.data.data.length);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
    fetchUsers();
  }, []);
  return (
    <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <div className="bg-gradient-to-r from-red-900 mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <p className="text-white font-bold">Welcome Back Admin</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="bg-gradient-to-r from-red-900 mt-[20px] flex flex-col justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-white font-bold">Total User</p>
          <p className="text-white font-bold">{totalUser}</p>
        </div>
        <div className="bg-gradient-to-r from-red-900 mt-[20px] flex flex-col justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-white font-bold">Total Book</p>
          <p className="text-white font-bold">{totalBook}</p>
        </div>
      </div>
    </div>
  );
};

export default Databoard;

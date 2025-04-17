import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import UserList from './UserList';
import Navdashboard from './Navdashboard';
import DataBookings from './DataBookings';
import Databoard from './Databoard';
import { Route, Routes, Navigate } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <Navdashboard />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<Databoard />} />
            <Route path="Userlist" element={<UserList />} />
            <Route path="Databookings" element={<DataBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

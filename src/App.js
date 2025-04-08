import './App.css';
import Jumbotron from './Components/Jumbotron/Jumbotron';
import About from './Components/About/About';
import Services from './Components/AboutServices/Services';
import Rooms from './Components/Rooms/Rooms';
import BookingRoom from './Components/Booking/BookingRoom';
import BookingConfirm from './Components/Booking/BookingConfirm';
import Dashboard from './Components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Jumbotron/Navbar';
import CheckBooking from './Components/Booking/CheckBooking';
import Register from './Components/Login/Register';
import { useState } from 'react';
import Ceklogin from './Components/Login/Login';

function App() {
  const [Count, setCount] = useState(0);
  const [Book, setBook] = useState(0);
  const handlerooms = () => {
    setCount(Count + 1);
  };
  const handlebook = () => {
    setBook(Book + 1);
  };
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Ceklogin />} />
          <Route path="/CheckBooking" element={<CheckBooking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/BookingConfirm" element={Book >= 1 ? <BookingConfirm /> : <Navigate to="/" />} />
          <Route path="/BookingRoom" element={Count >= 1 ? <BookingRoom handlebook={handlebook} /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={
              <>
                <Jumbotron />
                <About />
                <Services />
                <Rooms handlerooms={handlerooms} />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

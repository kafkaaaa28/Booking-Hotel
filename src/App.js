import './App.css';
import Jumbotron from './Components/Jumbotron/Jumbotron';
import About from './Components/About/About';
import Services from './Components/AboutServices/Services';
import Rooms from './Components/Rooms/Rooms';
import BookingRoom from './Components/Booking/BookingRoom';
import BookingConfirm from './Components/Booking/BookingConfirm';
import Dashboard from './Components/Dashboard/Dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbars from './Components/Jumbotron/Navbar';
import Register from './Components/Login/Register';
import Team from './Components/About/Team';
import Contact from './Components/Contact/Contact';
import { useState, useEffect } from 'react';
import MyBookings from './Components/Booking/MyBookings';
import Ceklogin from './Components/Login/Login';
import api from './utils/api';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Count, setCount] = useState(0);
  const [Book, setBook] = useState(0);

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_CLIENT_KEY);

    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn('Unauthorized, removing token');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          console.error('Other error:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
  if (loading) return <div>Loading...</div>;
  const handlerooms = () => {
    setCount(Count + 1);
  };
  const handlebook = () => {
    setBook(Book + 1);
  };
  return (
    <div>
      {isAuthenticated !== null && (
        <>
          <Navbars setUser={setUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} user={user} logout={logout} />

          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Ceklogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/dashboard/*" element={isAuthenticated && user?.role === 'admin' ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/BookingConfirm" element={Book >= 1 ? <BookingConfirm setUser={setUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/BookingRoom" element={Count >= 1 ? <BookingRoom handlebook={handlebook} /> : <Navigate to="/" />} />
            <Route path="team" element={<Team />} />
            <Route path="/Contact" element={<Contact />} />
            <Route
              path="/"
              element={
                <>
                  <Jumbotron user={user} />
                  <About />
                  <Services />
                  <Rooms handlerooms={handlerooms} />
                </>
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

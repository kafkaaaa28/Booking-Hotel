import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Menggunakan jwtDecode
import { useState, useEffect } from 'react';

export default function Component() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  useEffect(() => {
    refreshToken();
  }, []);

  const Navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        Navigate('/');
      }
    }
  };

  return (
    <Navbar fluid rounded style={{ backgroundColor: isHomepage ? '#3F030A' : '#FAF7F2' }}>
      <NavbarBrand href="https://flowbite-react.com">
        <span className={`self-center whitespace-nowrap text-xl ${isHomepage ? 'text-white' : 'text-black'} font-semibold`}>My Hotels</span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-5">
        <Link to={'/login'}>
          <Button style={{ backgroundColor: '#1D4ED8' }}>Login</Button>
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          Home
        </NavbarLink>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          {name}
        </NavbarLink>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          About
        </NavbarLink>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          Services
        </NavbarLink>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          Pricing
        </NavbarLink>
        <NavbarLink href="#" style={{ color: isHomepage ? '' : 'black' }}>
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

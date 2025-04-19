import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, Drawer, DrawerHeader, DrawerItems, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBarsProgress } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import api from '../../utils/api';
const Navbars = ({ setIsAuthenticated, isAuthenticated, user, logout, setUser }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const Navigate = useNavigate();
  const handleClose = () => setIsOpen(false);
  const [screen, setScreen] = useState(window.innerWidth < 768);
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      setOpenModal(false);
      setTimeout(() => {
        Navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  const Toggler = () => {
    setOpenModal(!openModal);
  };
  if (isAuthenticated === null) return null;
  const handleResize = () => {
    setScreen(window.innerWidth < 768);
  };

  return (
    <>
      <Navbar fluid rounded style={{ backgroundColor: isHomepage ? '#3F030A' : '#FAF7F2' }}>
        <NavbarBrand href="https://flowbite-react.com">
          <span className={`self-center whitespace-nowrap text-xl ${isHomepage ? 'text-white' : 'text-black'} font-semibold`}>My Hotels</span>
        </NavbarBrand>
        <div className="flex md:order-2 gap-5">
          {isAuthenticated ? (
            <>
              <button onClick={Toggler} type="button" className="focus:outline-none  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                Logout
              </button>
            </>
          ) : (
            <Link to={'/login'}>
              <Button style={{ backgroundColor: '#1D4ED8' }}>Login</Button>
            </Link>
          )}
        </div>
        {screen ? (
          <>
            <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg  bg-gray-400 text-white hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
              <button className="" onClick={() => setIsOpen(true)}>
                <FaBarsProgress className="text-[24px]" />
              </button>
            </div>
            <Drawer open={isOpen} onClose={handleClose} style={{ backgroundColor: '#3F030A' }}>
              <DrawerHeader title="Drawer" />
              <DrawerItems>
                <NavbarLink as={Link} to="/" style={{ color: isHomepage ? '' : 'white' }}>
                  Home
                </NavbarLink>
                {isAuthenticated && user?.role === 'admin' ? (
                  <NavbarLink as={Link} to="/dashboard" style={{ color: isHomepage ? '' : 'white' }}>
                    Dashboard
                  </NavbarLink>
                ) : (
                  ''
                )}
                <NavbarLink as={Link} to="/team" style={{ color: isHomepage ? '' : 'white' }}>
                  About
                </NavbarLink>
                <NavbarLink as={Link} to="/Contact" style={{ color: isHomepage ? '' : 'white' }}>
                  Contact
                </NavbarLink>

                <NavbarLink as={Link} to="/my-bookings" style={{ color: isHomepage ? '' : 'white' }}>
                  My Bookings
                </NavbarLink>
              </DrawerItems>
            </Drawer>
          </>
        ) : (
          <NavbarCollapse>
            <Link to={'/'}>
              <NavbarLink style={{ color: isHomepage ? '' : 'black' }}>Home</NavbarLink>
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to={'/dashboard'}>
                <NavbarLink style={{ color: isHomepage ? '' : 'black' }}>dashboard</NavbarLink>
              </Link>
            )}
            <Link to={'/team'}>
              <NavbarLink style={{ color: isHomepage ? '' : 'black' }}>About</NavbarLink>
            </Link>
            <Link to={'/Contact'}>
              <NavbarLink style={{ color: isHomepage ? '' : 'black' }}>Contact</NavbarLink>
            </Link>
            <NavbarLink as={Link} to="/my-bookings" style={{ color: isHomepage ? '' : 'black' }}>
              My Bookings
            </NavbarLink>
          </NavbarCollapse>
        )}
      </Navbar>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah anda yakin akan keluar?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleLogout}>
                ya
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                tidak
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Navbars;

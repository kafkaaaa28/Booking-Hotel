import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
const DataBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/all');
        setBookings(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  const Toggler = () => {
    setOpen(!open);
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.patch(`/bookings/${id}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)));
        setMsg('Status berhasil diupdate!');
      } else {
        setError(`Gagal: ${response.data.message}`);
      }
      Toggler();
    } catch (err) {
      console.error('Full error:', err);
      setError(`Update gagal: ${err.response?.data?.message || err.message}`);
      Toggler();
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus booking ini?')) return;

    try {
      await api.delete(`/bookings/${id}`);

      setBookings(bookings.filter((booking) => booking.id !== id));

      setMsg('Booking berhasil dihapus');
      Toggler();
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Gagal menghapus: ${err.response?.data?.message || err.message}`);
      Toggler();
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="h-[120vh] w-full bg-[#FAF7F2] ">
        <p className="md:text-[25px] text-center font-bold mb-5">Daftar Seluruh Booking</p>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-red-800">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>

                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Check-In
                </th>
                <th scope="col" class="px-6 py-3">
                  Check-Out
                </th>
                <th scope="col" class="px-6 py-3">
                  Bukti Pembayaran
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" colSpan="2" class="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((book) => (
                <tr key={book.id} class={`bg-red-950 border-b text-white   border-gray-200`}>
                  <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                    {book.id}
                  </th>

                  <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                    {book.email}
                  </th>
                  <td class="px-6 py-4">{new Date(book.check_in).toLocaleDateString()}</td>
                  <td class="px-6 py-4">{new Date(book.check_out).toLocaleDateString()}</td>
                  <td class="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'confirmed' ? 'bg-green-200 text-green-800' : book.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {book.status}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <select value={book.status} onChange={(e) => handleStatusChange(book.id, e.target.value)} className="text-black border rounded p-1 text-sm">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </td>
                  <td className="py-2 text-center">
                    <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={open} size="md" onClose={() => setOpen(false)} popup>
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            {error && !msg ? (
              <>
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 " />
                <h3 className="mb-5 text-lg font-normal text-black">{error}</h3>
              </>
            ) : (
              <>
                <IoMdCheckmarkCircleOutline className="mx-auto mb-4 h-14 w-14 text-red-400 " />
                <h3 className="mb-5 text-lg font-normal text-black">{msg}</h3>
              </>
            )}
            <div className="flex bg-green-400 justify-center gap-4">
              <Button color="failure" className="w-full" onClick={() => setOpen(false)}>
                {'oke'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DataBookings;

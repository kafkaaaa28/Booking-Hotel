import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
const UserList = () => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setUsers(users.map((user) => (user.id === id ? res.data : user)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    handleUpdate(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <p className="md:text-[25px] text-center font-bold mb-5">Daftar Seluruh User</p>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-red-800">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} class={`bg-red-950 border-b ${editingId === user.id ? 'text-black' : 'text-white'}  text-white border-gray-200`}>
                <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  {user.id}
                </th>
                <td class="px-6 py-4">{editingId === user.id ? <input type="text" className={`text-black`} name="name" value={editForm.name} onChange={handleChange} /> : user.name}</td>
                <td class="px-6 py-4">{editingId === user.id ? <input type="email" className={`text-black`} name="email" value={editForm.email} onChange={handleChange} /> : user.email}</td>
                <td class="px-6 py-4">
                  {' '}
                  {editingId === user.id ? (
                    <select name="role" value={editForm.role} className={`text-black`} onChange={handleChange}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td class="px-6 py-4">
                  {editingId === user.id ? (
                    <>
                      <button onClick={() => handleSubmit(user.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {' '}
                      {user?.role === 'admin' ? (
                        <button
                          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          <button
                            className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>

                          <button
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

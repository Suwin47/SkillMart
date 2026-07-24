import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  Search,
  Users,
  Trash2,
} from "lucide-react";

import ConfirmModal from "../components/common/ConfirmModal";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");

      setUsers(res.data.users);

    } catch (err) {
      console.error(err);

      toast.error("Unable to load users.");
    }
  };

  const deleteUser = async () => {
    if (!selectedUser) return;

    try {
      setDeleting(true);

      await api.delete(`/admin/users/${selectedUser}`);

      toast.success("User deleted successfully.");

      fetchUsers();

      setIsModalOpen(false);
      setSelectedUser(null);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete user."
      );

    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Users
            </h1>

            <p className="text-slate-500">
              Manage all registered users.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">

            <Users size={20} />

            {filteredUsers.length}

          </div>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th>Email</th>

                <th>Role</th>

                <th>Joined</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-t"
                >

                  <td className="p-4 font-medium">
                    {user.fullName}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        user.role === "admin"
                          ? "bg-red-500"
                          : user.role === "seller"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    {user.role !== "admin" ? (

                      <button
                        onClick={() => {
                          setSelectedUser(
                            user._id
                          );
                          setIsModalOpen(true);
                        }}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                    ) : (

                      <span className="text-sm text-slate-400">
                        Protected
                      </span>

                    )}

                  </td>

                </tr>

              ))}

              {filteredUsers.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="py-10 text-center text-slate-500"
                  >
                    No users found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete User?"
        message="This action cannot be undone. Are you sure you want to delete this user?"
        loading={deleting}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={deleteUser}
      />
    </>
  );
}

export default AdminUsers;
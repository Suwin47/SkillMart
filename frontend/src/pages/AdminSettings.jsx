import { useContext, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function AdminSettings() {
  const { user, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const res = await api.put("/users/profile", form);

      login(res.data.user);

      toast.success("Profile Updated");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to update profile."
      );

    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Admin Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account settings.
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow">

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Bio
            </label>

            <textarea
              rows="5"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <button
            onClick={saveProfile}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminSettings;
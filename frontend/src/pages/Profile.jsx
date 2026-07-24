import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";
import {
    User,
    ShieldCheck,
    Camera,
    Lock,
    Save,
} from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import api from "../services/api";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [user, setUser] = useState(null);

    const [fullName, setFullName] = useState("");
    const { updateUser } = useContext(AuthContext);

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get("/auth/profile");

            setUser(data.user);
            setFullName(data.user.fullName);

        } catch (err) {
            console.error(err);
            toast.error("Unable to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setSaving(true);

            const { data } = await api.put(
                "/auth/update-profile",
                {
                    fullName,
                }
            );

            setUser(data.user);      // updates Profile page state
updateUser(data.user);   // updates AuthContext + localStorage

            toast.success(data.message);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to update profile."
            );

        } finally {
            setSaving(false);
        }
    };

    const uploadImage = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("profileImage", image);

        try {

           const { data } = await api.post(
  "/auth/upload-profile-image",
  formData
);

setUser(data.user);

// Update AuthContext + localStorage
updateUser(data.user);

toast.success("Profile picture updated.");
        } catch (err) {

            toast.error("Upload failed.");

        }
    };

    const changePassword = async () => {
        try {

            await api.put("/auth/change-password", passwords);

            toast.success("Password updated.");

            setPasswords({
                currentPassword: "",
                newPassword: "",
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to change password."
            );

        }
    };

    if (loading) {
  return (
    <>
      <Navbar />
      <Loader />
      <Footer />
    </>
  );
}

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 pt-16 pb-12">

                <div className="mx-auto mt-6 max-w-5xl rounded-3xl bg-white p-10 shadow-xl">

                    <h1 className="mb-10 text-4xl font-bold">
                        Account Settings
                    </h1>

                    {/* Profile */}

                    <div className="flex flex-col items-center gap-6">

                       <img
  src={
    image
      ? URL.createObjectURL(image)
      : user.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.fullName
        )}`
  }
  alt={user.fullName}
  className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover"
/>

                        <label className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-medium text-white">

                            <Camera size={18} className="mr-2 inline" />

                            Upload Photo

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                            />

                        </label>

                        {image && (
                            <button
  onClick={uploadImage}
  disabled={saving}
  className={`rounded-xl px-6 py-2 text-white transition ${
    saving
      ? "cursor-not-allowed bg-green-300"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {saving ? "Uploading..." : "Upload"}
</button>
                        )}

                    </div>

                    {/* Details */}

                    <div className="mt-10 grid gap-6">

                        <div>

                            <label className="font-medium">
                                Full Name
                            </label>

                            <input
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                className="mt-2 w-full rounded-xl border p-3"
                            />

                        </div>

                        <div>

                            <label className="font-medium">
                                Email
                            </label>

                            <input
                                value={user.email}
                                disabled
                                className="mt-2 w-full rounded-xl border bg-slate-100 p-3"
                            />

                        </div>

                        <div className="flex gap-4">

                            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-600">
                                {user.role}
                            </span>

                            {user.isVerified && (
                                <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">

                                    <ShieldCheck size={18} />

                                    Verified

                                </span>
                            )}

                        </div>

                        <button
                            onClick={updateProfile}
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white"
                        >
                            <Save size={20} />

                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>

                    {/* Change Password */}

                    <div className="mt-16">

                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

                            <Lock size={24} />

                            Change Password

                        </h2>

                        <input
                            type="password"
                            placeholder="Current Password"
                            value={passwords.currentPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    currentPassword: e.target.value,
                                })
                            }
                            className="mb-4 w-full rounded-xl border p-3"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    newPassword: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border p-3"
                        />

                        <button
                            onClick={changePassword}
                            className="mt-6 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white"
                        >
                            Update Password
                        </button>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default Profile;
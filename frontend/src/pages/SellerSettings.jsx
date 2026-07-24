import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import {
  User,
  Lock,
  CreditCard,
  Bell,
  Trash2,
  Camera,
} from "lucide-react";

function SellerSettings() {
  const [profile, setProfile] = useState({
  fullName: "",
  email: "",
  storeName: "",
  phone: "",
  bio: "",
  profileImage: "",
});

const [image, setImage] = useState(null);
const [passwords, setPasswords] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const [payment, setPayment] = useState({
  upiId: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
});

useEffect(() => {
  fetchProfile();
}, []);
const fetchProfile = async () => {
  try {
    const { data } = await api.get("/auth/profile");

    setProfile({
      fullName: data.user.fullName || "",
      email: data.user.email || "",
      storeName: data.user.storeName || "",
      phone: data.user.phone || "",
      bio: data.user.bio || "",
      profileImage: data.user.profileImage || "",
    });
    setPayment({
  upiId: data.user.upiId || "",
  bankName: data.user.bankName || "",
  accountNumber: data.user.accountNumber || "",
  ifscCode: data.user.ifscCode || "",
});

  } catch (err) {
    console.log(err);
  }
};
const updateProfile = async () => {
  try {
    const { data } = await api.put("/auth/update-profile", {
      fullName: profile.fullName,
      storeName: profile.storeName,
      phone: profile.phone,
      bio: profile.bio,
    });

    toast.success(data.message || "Profile updated successfully.");

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to update profile."
    );
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

    setProfile((prev) => ({
      ...prev,
      profileImage: data.user.profileImage,
    }));

    toast.success("Profile picture updated.");

  } catch (err) {
    console.error(err);

    toast.error("Image upload failed.");
  }
};
const changePassword = async () => {
  if (!passwords.currentPassword) {
    return toast.error("Enter your current password.");
  }

  if (!passwords.newPassword) {
    return toast.error("Enter a new password.");
  }

  if (passwords.newPassword.length < 6) {
    return toast.error("Password must be at least 6 characters.");
  }

  if (passwords.newPassword !== passwords.confirmPassword) {
    return toast.error("Passwords do not match.");
  }

  try {
    await api.put("/auth/change-password", {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    toast.success("Password updated successfully.");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to change password."
    );
  }
};
const savePayment = async () => {
  try {
    const { data } = await api.put("/auth/update-profile", payment);

    toast.success(
      data.message || "Payment details updated."
    );

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to save payment details."
    );
  }
};
const deleteAccount = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to permanently delete your account?"
  );

  if (!confirmed) return;

  try {
    const { data } = await api.delete("/auth/delete-account");

    toast.success(data.message);

    localStorage.removeItem("user");

    window.location.href = "/";

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to delete account."
    );
  }
};
  return (
    <div className="space-y-8 p-8">

      <h1 className="text-4xl font-bold text-slate-800">
        Seller Settings
      </h1>

      {/* Profile */}

      <div className="rounded-2xl bg-white p-8 shadow">

  <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">
    <User size={24} />
    Profile Information
  </h2>

  <div className="flex flex-col items-center gap-5">

    <img
      src={
        profile.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.fullName
        )}`
      }
      alt="Profile"
      className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
    />

    <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-white">

      <Camera size={18} className="mr-2 inline" />

      Change Photo

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

    </label>

    {image && (
  <button
    onClick={uploadImage}
    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
  >
    Upload Photo
  </button>
)}

  </div>

  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div>

      <label className="font-medium">
        Full Name
      </label>

      <input
        value={profile.fullName}
        onChange={(e) =>
          setProfile({
            ...profile,
            fullName: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Email
      </label>

      <input
        value={profile.email}
        disabled
        className="mt-2 w-full rounded-xl border bg-slate-100 p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Store Name
      </label>

      <input
        value={profile.storeName}
        onChange={(e) =>
          setProfile({
            ...profile,
            storeName: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Phone
      </label>

      <input
        value={profile.phone}
        onChange={(e) =>
          setProfile({
            ...profile,
            phone: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

  </div>

  <div className="mt-6">

    <label className="font-medium">
      Bio
    </label>

    <textarea
      rows={4}
      value={profile.bio}
      onChange={(e) =>
        setProfile({
          ...profile,
          bio: e.target.value,
        })
      }
      className="mt-2 w-full rounded-xl border p-3"
    />

  </div>

  <button
  onClick={updateProfile}
  className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
>
  Save Changes
</button>

</div>

      {/* Password */}

      <div className="rounded-2xl bg-white p-8 shadow">

  <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">
    <Lock size={24} />
    Change Password
  </h2>

  <div className="space-y-5">

    <div>

      <label className="font-medium">
        Current Password
      </label>

      <input
        type="password"
        value={passwords.currentPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            currentPassword: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        New Password
      </label>

      <input
        type="password"
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            newPassword: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Confirm Password
      </label>

      <input
        type="password"
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            confirmPassword: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <button
      onClick={changePassword}
      className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
    >
      Update Password
    </button>

  </div>

</div>

      {/* Payment */}

      <div className="rounded-2xl bg-white p-8 shadow">

  <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">

    <CreditCard size={24} />

    Payment Details

  </h2>

  <div className="grid gap-6 md:grid-cols-2">

    <div>

      <label className="font-medium">
        UPI ID
      </label>

      <input
        value={payment.upiId}
        onChange={(e) =>
          setPayment({
            ...payment,
            upiId: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Bank Name
      </label>

      <input
        value={payment.bankName}
        onChange={(e) =>
          setPayment({
            ...payment,
            bankName: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        Account Number
      </label>

      <input
        value={payment.accountNumber}
        onChange={(e) =>
          setPayment({
            ...payment,
            accountNumber: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

    <div>

      <label className="font-medium">
        IFSC Code
      </label>

      <input
        value={payment.ifscCode}
        onChange={(e) =>
          setPayment({
            ...payment,
            ifscCode: e.target.value,
          })
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>

  </div>

  <button
    onClick={savePayment}
    className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
  >
    Save Payment Details
  </button>

</div>

      {/* Danger Zone */}

      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">

  <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-red-600">
    <Trash2 size={24} />
    Danger Zone
  </h2>

  <p className="mb-6 text-slate-600">
    Permanently delete your seller account.
    This action cannot be undone.
  </p>

  <button
    onClick={deleteAccount}
    className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
  >
    Delete My Account
  </button>

</div>

    </div>
  );
}

export default SellerSettings;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import api from "../services/api";

function BecomeSeller() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    try {
      const res = await api.get("/seller/request");
      setRequest(res.data.request);
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/seller/request", {
        businessName,
        about,
      });

      toast.success(res.data.message);

      setRequest(res.data.request);

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <h2 className="text-xl font-semibold">
            Loading...
          </h2>
        </main>
        <Footer />
      </>
    );
  }

  if (request) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 py-12">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">

            <h1 className="text-3xl font-bold">
              Seller Request
            </h1>

            <p className="mt-6">
              <span className="font-semibold">
                Business Name:
              </span>{" "}
              {request.businessName}
            </p>

            <p className="mt-4">
              <span className="font-semibold">
                About:
              </span>{" "}
              {request.about}
            </p>

            <p className="mt-6">
              <span className="font-semibold">
                Status:
              </span>{" "}

              <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                {request.status}
              </span>
            </p>

            <p className="mt-8 text-slate-500">
              Your seller request is under review.
              We will notify you once it has been approved.
            </p>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">

          <h1 className="mb-2 text-3xl font-bold">
            Become a Seller
          </h1>

          <p className="mb-8 text-slate-500">
            Submit your seller application to start selling digital products on SkillMart.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block font-medium">
                Business Name
              </label>

              <input
                type="text"
                value={businessName}
                onChange={(e) =>
                  setBusinessName(e.target.value)
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
                placeholder="Enter your business name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                About You
              </label>

              <textarea
                rows="5"
                value={about}
                onChange={(e) =>
                  setAbout(e.target.value)
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
                placeholder="Tell us about yourself..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default BecomeSeller;
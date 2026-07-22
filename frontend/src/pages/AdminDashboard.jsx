import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import api from "../services/api";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/seller-requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load seller requests.");
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      const res = await api.put(
        `/admin/seller-requests/${id}/approve`
      );

      toast.success(res.data.message);

      fetchRequests();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to approve seller."
      );
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await api.put(
        `/admin/seller-requests/${id}/reject`
      );

      toast.success(res.data.message);

      fetchRequests();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to reject seller."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 py-10">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-8 text-4xl font-bold">
            Admin Dashboard
          </h1>

          {loading ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              Loading Seller Requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              <h2 className="text-2xl font-semibold">
                No Seller Requests
              </h2>

              <p className="mt-3 text-slate-500">
                There are currently no seller applications.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl bg-white shadow">

              <table className="w-full">

                <thead className="bg-slate-100">
                  <tr>

                    <th className="p-4 text-left">
                      User
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Business
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {requests.map((request) => (

                    <tr
                      key={request._id}
                      className="border-t"
                    >

                      <td className="p-4 font-medium">
                        {request.user?.fullName}
                      </td>

                      <td className="p-4 text-slate-600">
                        {request.user?.email}
                      </td>

                      <td className="p-4">
                        {request.businessName}
                      </td>

                      <td className="p-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : request.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="p-4 text-center">

                        {request.status === "Pending" ? (

                          <div className="flex justify-center gap-3">

                            <button
                              onClick={() =>
                                approveRequest(request._id)
                              }
                              className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                rejectRequest(request._id)
                              }
                              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                            >
                              Reject
                            </button>

                          </div>

                        ) : (

                          <span className="font-medium text-slate-500">
                            No Action Required
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;
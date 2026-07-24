import { useEffect, useState } from "react";
import api from "../services/api";

function AdminSellerRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/seller-requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    }
  };

  const approveSeller = async (id) => {
    try {
      await api.put(`/admin/seller-requests/${id}/approve`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectSeller = async (id) => {
    try {
      await api.put(`/admin/seller-requests/${id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Seller Requests
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-t">
                <td className="p-4">
                  {request.user?.fullName}
                </td>

                <td>{request.user?.email}</td>

                <td>{request.status}</td>

                <td className="space-x-2 text-center">
                  <button
                    onClick={() =>
                      approveSeller(request._id)
                    }
                    className="rounded bg-green-500 px-4 py-2 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectSeller(request._id)
                    }
                    className="rounded bg-red-500 px-4 py-2 text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-8 text-center text-gray-500"
                >
                  No Seller Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSellerRequests;
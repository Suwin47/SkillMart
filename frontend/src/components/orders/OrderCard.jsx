import { Calendar, Download } from "lucide-react";

function OrderCard({ order }) {
  const product = order.service;

  return (
    <div className="flex items-center gap-6 rounded-2xl bg-white p-6 shadow">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-32 w-48 rounded-xl object-cover"
      />

      <div className="flex-1">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {product.category}
        </span>

        <h2 className="mt-3 text-2xl font-bold">
          {product.title}
        </h2>

        <p className="mt-2 text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex gap-8 text-sm">

          <div>
            <p className="text-slate-500">Payment</p>
            <p className="font-semibold">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Order</p>
            <p className="font-semibold">
              {order.orderStatus}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>

        </div>

      </div>

      <div className="text-right">

        <h3 className="text-3xl font-bold text-blue-600">
          ₹{order.amount}
        </h3>

        <button
          className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Download size={18} />
          Download
        </button>

      </div>

    </div>
  );
}

export default OrderCard;
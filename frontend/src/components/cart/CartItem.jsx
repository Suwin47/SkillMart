import { Trash2 } from "lucide-react";

function CartItem({
  item,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="flex gap-5 rounded-2xl bg-white p-5 shadow">

      <img
        src={item.service.thumbnail}
        alt={item.service.title}
        className="h-28 w-40 rounded-xl object-cover"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/160x120?text=No+Image";
        }}
      />

      <div className="flex flex-1 flex-col justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {item.service.title}
          </h2>

          <p className="mt-2 text-slate-500">
            {item.service.category}
          </p>

        </div>

        <div className="mt-4 flex items-center gap-4">

          <button
            onClick={() =>
              updateQuantity(
                item._id,
                item.quantity - 1
              )
            }
            disabled={item.quantity === 1}
            className="rounded-lg border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            -
          </button>

          <span className="font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              updateQuantity(
                item._id,
                item.quantity + 1
              )
            }
            className="rounded-lg border px-3 py-1"
          >
            +
          </button>

        </div>

      </div>

      <div className="flex flex-col items-end justify-between">

        <h2 className="text-2xl font-bold text-blue-600">
          ₹{item.service.price * item.quantity}
        </h2>

        <button
          onClick={removeItem}
          className="text-red-600 transition hover:text-red-700"
        >
          <Trash2 />
        </button>

      </div>

    </div>
  );
}

export default CartItem;
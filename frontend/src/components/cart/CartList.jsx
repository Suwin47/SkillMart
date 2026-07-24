import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import EmptyState from "../common/EmptyState";
import Loader from "../common/Loader";
import ConfirmModal from "../common/ConfirmModal";

function CartList() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Confirmation Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      setCart(res.data.cart);
      setSubtotal(res.data.subtotal);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load cart."
      );

    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    id,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${id}`, {
        quantity,
      });

      fetchCart();

    } catch (err) {
      toast.error(
        "Unable to update quantity."
      );
    }
  };

  const removeItem = async () => {
    if (!selectedItem) return;

    try {
      setRemoving(true);

      await api.delete(`/cart/${selectedItem}`);

      toast.success(
        "Item removed from cart."
      );

      fetchCart();

      setIsModalOpen(false);
      setSelectedItem(null);

    } catch (err) {

      toast.error(
        "Unable to remove item."
      );

    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your Cart is Empty"
        description="Looks like you haven't added any products yet."
        buttonText="Browse Products"
        buttonLink="/products"
      />
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">

        <div className="space-y-5 lg:col-span-2">

          {cart.map((item) => (

            <CartItem
              key={item._id}
              item={item}
              updateQuantity={updateQuantity}

              removeItem={() => {
                setSelectedItem(item._id);
                setIsModalOpen(true);
              }}

            />

          ))}

        </div>

        <CartSummary
          subtotal={subtotal}
          totalItems={cart.length}
        />

      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Remove Item?"
        message="Are you sure you want to remove this item from your cart?"
        loading={removing}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={removeItem}
      />
    </>
  );
}

export default CartList;
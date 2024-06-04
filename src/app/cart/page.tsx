"use client";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { useTheme } from "next-themes";
import React from "react";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item?.id}
                className="mb-4 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={item?.images[0]}
                    alt={item?.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">{item?.title}</h2>
                    <p>${item?.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item?.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item?.id, Number(e.target.value))
                    }
                    className={`w-16 p-2 border rounded ${theme === "dark" ? "bg-black-100 text-white " : "bg-white text-black-100"}`}
                  />
                  <button
                    onClick={() => handleRemove(item?.id)}
                    className="ml-4 p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full ml-auto mt-4">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button className="mt-4 p-2 bg-green-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

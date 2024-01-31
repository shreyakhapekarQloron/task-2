import React from "react";
import { useGlobalContext } from "../Context";
import "./Cart.css";

export const Cart = () => {
  const { cart, data } = useGlobalContext();

  // Filter out items in the cart with quantity greater than 0
  const cartItems = Object.keys(cart).filter((key) => cart[key] > 0);


  // Calculate the total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    cartItems.forEach((itemId) => {
      const itemInfo = data.find((d) => d.id === Number(itemId));

      if (itemInfo) {
        totalAmount += cart[itemId] * itemInfo.price;
      }
    });

    return totalAmount;
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
        <ul>
          {cartItems.map((itemId) => {
            const itemInfo = data.find((d) => d.id === Number(itemId));

            return (
              <li key={itemId}>
                {itemInfo && (
                  <>
                    <span>{itemInfo.title}</span>
                    <span>Quantity: {cart[itemId]}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <p>Total: ${getTotalCartAmount().toFixed(2)}</p>
      </div>
    </div>
  );
};
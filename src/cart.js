import React from "react";
import {useGlobalContext} from "./Context"

export const Cart = () => {
  const { cart, data } = useGlobalContext();

  const cartItems = Object.keys(cart).filter((key) => cart[key] > 0);

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

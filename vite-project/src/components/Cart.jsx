import React, { useState, useEffect } from "react";
import Product from "./Product";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();
  const products = [
    { id: 1, name: "Product A", price: 19.99 },
    { id: 2, name: "Product B", price: 29.99 },
    { id: 3, name: "Product C", price: 14.99 },
    // ... add more products as needed
  ];
  useEffect(() => {
    const val = calculateTotal().toFixed(2);
    setTotal(val);
  }, []);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    const val = cartItems.reduce((total, item) => total + item.price, 0);
    return val;
  };
  const makepayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51ObeRrSI3hYVzAkNrGOoSah9imlF7Zler3EfAEWlAdzgLFlTgtNe6mifqkpmJMADr2GbeMj9GXIY26pRwApvH5ej00B76nlop3"
    );

    const body = {
      products: cartItems,
    };
    const res = await axios.post(
      "http://localhost:5000/checkout",body
     
    );
    console.log(res);
    const result = stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    console.log(result);
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - INR{item.price.toFixed(2)}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: INR{calculateTotal().toFixed(2)}</p>
      <button onClick={makepayment}>check out</button>
      <h3>Available Products</h3>
      // Assume you have a list of products with 'id', 'name', and 'price'
      properties
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default Cart;

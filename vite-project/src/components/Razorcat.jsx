//https://dev.to/soumyadey/integrate-razorpay-in-your-react-app-2nib

import React, { useState, useEffect } from "react";
import Product from "./Product";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import logo from "../assets/react.svg";
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
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/createorder", {
      amount: calculateTotal(),
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(result.data.data);
    const { id: order_id, currency, amount } = result.data.data;
    console.log(currency);
    const options = {
      key: "rzp_test_KWxXXWwFdBE6VW", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/razorchekout",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
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
      <button onClick={displayRazorpay}>check out</button>
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

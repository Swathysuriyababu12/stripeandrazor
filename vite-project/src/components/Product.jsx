import React from "react";

const Product = ({ product, onAddToCart }) => {
  return (
    <div>
      <h4>{product.name}</h4>
      <p>INR{product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;

const stripe = require("stripe")(
  "sk_test_51ObeRrSI3hYVzAkNH3pYX6F7bsSgs6rySkexwRMwrXfGpZJBLdqNFR8fJxiQ6tDddZ08KEqTwFUy08in4mVfPVsg004BcO17gQ"
);
console.log(process.env.key_id);
const makePayment = async (req, res) => {
  const product = await stripe.products.create({
    name: "Starter Subscription",
    description: "inr12/Month subscription",
  });

  const price = await stripe.prices.create({
    unit_amount: 9000,
    currency: "INR",
    product: product.id,
  });
  if (price) {
    console.log(
      "Success! Here is your starter subscription product id: " + product.id
    );
    console.log(
      "Success! Here is your starter subscription price id: " + price.id
    );
    res.send(
      "Success! Here is your starter subscription product id: " + product.id
    );
  } else {
    console.log("error");
    res.send("error");
  }
};
const checkout = async (req, res) => {
  // This is your test secret API key.
  const { products } = await req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price),
    },
    quantity: 1,
    billing_address_collection: [],
  }));
  console.log(lineItems);
  const YOUR_DOMAIN = "http://localhost:5173";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/failure`,
  });

  res.json({ id: session.id });
};

module.exports = { makePayment, checkout };

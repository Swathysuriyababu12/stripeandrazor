const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const { makePayment, checkout } = require("./controllers/stripe");
const { razormakePayment, razorcheckout } = require("./controllers/razor");
//gxva-vtzv-tifa-chqf-lxbh
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/payment", makePayment);
app.post("/checkout", checkout);

app.post("/createorder", razormakePayment);
app.post("/razor/checkout", razorcheckout);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

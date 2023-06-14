const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user");
const products = require("./models/productsModel");
const router = express.Router();
// const checkoutRoute = require("./routes/checkout");
const stripe = require("stripe")(
  "sk_test_51N9UPtSH3DMLL4whD9pKmG562m9TtEIGp3Ms8A802Bmac0l1sZVlVk5sDrKyd7YDhLN00HDPWKioDuD9Oz8bl7dm00ktEw5D3Z"
);

const app = express();
app.use(cors());
const PORT = process.env.PORT;
//middleware

app.use(express.json());

// api routes

app.get("/", async (req, res) => {
  //res.send("Movie List");
  try {
    const allproducts = await products.find();
    res.json(allproducts);
  } catch (error) {
    res.json(error);
  }
});

// app.get("/", function (req, res) {
//   productsModel.find((err, docs) => {
//     if (!err) {
//       res.render("list", {
//         data: docs,
//       });
//     } else {
//       console.log("Failed to retrieve the Course List: " + err);
//     }
//   });
// });

app.use("/api/user", userRoutes);

app.use("/checkout", async (req, res) => {
  const items = req.body.items;
  console.log(req.body);

  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

// database connection
mongoose
  .connect(process.env.DB_KEY)
  .then(() => {
    console.log("DB connected");
  })

  .catch((err) => {
    console.log(err);
  });

// port listening
app.listen(PORT, () => {
  console.log(`server listening ${PORT}`);
});

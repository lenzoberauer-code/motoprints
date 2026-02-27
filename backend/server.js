const stripe = require("stripe")("DEIN_SECRET_KEY");
const express = require("express");
const cors = require("cors");
require ("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "MotoPrints Hoodie", price: 49.9 },
  { id: 2, name: "MotoPrints Shirt", price: 29.9 },
  { id: 3, name: "Sticker Pack", price: 9.9 }
];

app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/checkout", async (req, res) => {
  const items = req.body.items;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map(i => ({
      price_data: {
        currency: "eur",
        product_data: { name: i.name },
        unit_amount: i.price * 100
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000"
  });

  res.json({ url: session.url });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server läuft"));
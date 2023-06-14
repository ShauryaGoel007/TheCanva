const stripe = require("stripe")(process.env.SECRETSTRIPEKET);

const checkoutfunc = async (req, res) => {
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
    cancel: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
};

module.exports = { checkoutfunc };

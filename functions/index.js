// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const { Logging } = require('@google-cloud/logging');
const logging = new Logging({
  projectId: process.env.GCLOUD_PROJECT,
});

const { Stripe } = require('stripe');
// const stripe = new Stripe(functions.config().stripe.secret, {
//   apiVersion: '2020-08-27',
// });

const express = require("express");
const app = express();
const path = require("path");
const stripe = require("stripe")("sk_test_51Ll96dJwCxOOQvePPjM0O1jx5xFuGNorrGsHuRmOXAm4WxyUirW8shMzUZiOf9GkgHdT8W73rgaHGk2Rztx3c89V00IrLAD4it");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/payment", async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
          {
              price_data: {
                  currency: "inr",
                  product_data: {
                      name: product.name,
                      images: [product.image],
                  },
                  unit_amount: product.amount * 100,
              },
              quantity: product.quantity,
          },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/public/sucess.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

exports.expressAPI = functions.https.onRequest(app);

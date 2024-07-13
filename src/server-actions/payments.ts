"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripeClientSecret = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      description: "Subscription payment of SHEY-RESUMES",
    });
    return {
      success: true,
      data: paymentIntent.client_secret,
      message: "Stripe client secret generated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

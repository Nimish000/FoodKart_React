
const stripe = require('stripe')('sk_test_51PNUbM01sm21W1hPlr7QPMuwaX5B2Ka3SVzhhMlxtYqQ5HUdKyPGtmRw1jq4IYYqyF5kQb8oW5aj9J0URDqVm8NR00duy6R9wm');


const stripePayment =async(req,res)=>{
     const { amount } = req.body; // amount in cents/paise

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr', // or 'usd' etc.
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports={
    stripePayment
}

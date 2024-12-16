const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const setupIntent = await stripe.setupIntents.create({
        payment_method_types: ['card'],
    });
    res.status(200).json({clientSecret: setupIntent.client_secret});
}

// import Stripe from "stripe"
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QV5k1RtrAdVYEDO9z9bi3sYi9FinwpyluEKw49rRmw8jhtOwkljToS1w8NU9RlJg5JwEusrfYDn3SbzIsZ8Vqxu00CwMpTXkZ');

export const createStripeCustomer = async (username) => {
    return await stripe.customers.create({ name: username.split('@')[0], email: username });
};

export const getStripeCustomer = async (stripeId) => {
    return await stripe.customers.retrieve(stripeId);
};

export const addPaymentMethod = async ({ customer, paymentMethodId }) => {
    return await stripe.paymentMethods.attach(paymentMethodId, { customer });
};

export const getPaymentMethods = async (customer) => {
    return await stripe.customers.listPaymentMethods(customer);
};

export const createSubscription = async ({ customer, price }) => {
    return await stripe.subscriptions.create({
        customer,
        items: [{ price }],
    });
};

export const getSubscription = async (subscriptionId) => {
    return await stripe.subscriptions.retrieve(subscriptionId);
};

export const updateDefaultPaymentMethod = async ({ customer, paymentMethodId }) => {
    return await stripe.customers.update(customer, {
        invoice_settings: { default_payment_method: paymentMethodId },
    });
};

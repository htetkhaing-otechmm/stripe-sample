// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getStripeId, saveSubscription, updateUserStripdId } from '@/services/auth.service.mjs';
import { createStripeCustomer, createSubscription, getPaymentMethods, getStripeCustomer } from '@/services/stripe.service.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'POST') {
        let result = {};
        let stripeCustomer;
        let paymentMethod;
        let { userId, username, priceId } = req.body;

        // retrieve stripid from database
        let stripeId = await getStripeId(userId);

        // register user as a customer on stripe
        if (!stripeId) {
            stripeCustomer = await createStripeCustomer(username);
            //    update user stripe customer id in database
            stripeCustomer = await updateUserStripdId(stripeCustomer.id, userId);
            stripeId = stripeCustomer.id;
        } else {
            stripeCustomer = await getStripeCustomer(stripeId);

            // re-register customer if deleted
            if (stripeCustomer.deleted) {
                stripeCustomer = await createStripeCustomer(username);

                //    update user stripe customer id in database
                stripeCustomer = await updateUserStripdId(stripeCustomer.id, userId);
                stripeId = stripeCustomer.id;
            }
        }

        if (stripeId) {
            // check payment method
            paymentMethod = await getPaymentMethods(stripeId);

            // no payment method found
            if (paymentMethod.data.length === 0) {
                res.status(400).json({ msg: 'no-payment-method-found' });
                return;
            } else {
                // create subscription
                result = await createSubscription({ customer: stripeId, price: priceId });

                // save subscription
               const sub = await saveSubscription({ userId, planId: priceId, subscriptionId: result.id });
               console.log(sub)
            }
        }

        res.status(200).json(result);
        return;
    }

    if (req.method === 'GET') {
        if (session) {
            // retrieve stripid from database
            let stripeId = await getStripeId(session.user.id);

            if (stripeId) {
                let stripeCustomer = await getStripeCustomer(stripeId);

                res.status(200).json(stripeCustomer);
            }
            res.status(200).json({});
            return;
        }
    }

    res.status(200).json({});
}

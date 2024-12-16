import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getStripeId } from '@/services/auth.service.mjs';
import { addPaymentMethod, getPaymentMethods, updateDefaultPaymentMethod } from '@/services/stripe.service.mjs';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    let result = {};

    if (req.method === 'GET') {
        const stripeId = await getStripeId(session.user.id);

        console.log(stripeId);
        if (stripeId) {
            result = await getPaymentMethods(stripeId);
            res.send({ cards: result.data });

            return;
        }
        res.send({ cards: [] });
        return;
    }

    if (req.method === 'POST') {
        const paymentMethodId = req.body.paymentMethodId;
        const stripeId = await getStripeId(session.user.id);

        result = await addPaymentMethod({ customer: stripeId, paymentMethodId });

        // update default payment method

        await updateDefaultPaymentMethod({ customer: stripeId, paymentMethodId });
    }
    res.send({ result });
}

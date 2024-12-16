import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getUserSubscription } from '@/services/auth.service.mjs';
import { getSubscription } from '@/services/stripe.service.mjs';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    let result = {};

    if (req.method === 'GET') {
        const subscription = await getUserSubscription(session.user.id);

        if (subscription?.subscriptionId) {
            console.log(subscription);
            let stripeSubscription = await getSubscription(subscription.subscriptionId);
            res.send({ stripeSubscription });
            return;
        }
    }
    res.send({ result });
}

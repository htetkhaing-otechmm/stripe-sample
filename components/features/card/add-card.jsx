import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { useEffect, useState } from 'react';
import CardForm from '@/components/features/card/card-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function AddCard({onClose}) {
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('/api/stripe/create-setup-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div style={{ maxWidth: '500px', margin: '200px auto' }}>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CardForm onClose={onClose} />
                </Elements>
            )}
        </div>
    );
}

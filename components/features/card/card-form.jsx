import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function CardForm({ onClose }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // retrieve paymentmethod.id
        const paymentMethod = await stripe?.createPaymentMethod({ type: 'card', card: elements.getElement('card') });

        // valid payment method
        if (paymentMethod.paymentMethod) {
            console.log(paymentMethod.paymentMethod);
            const paymentMethodId = paymentMethod.paymentMethod.id;
            // send paymentmethod id

            await fetch('/api/stripe/card', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ paymentMethodId }),
            });

            onClose();
        }

        if (paymentMethod.error) console.error(paymentMethod.error);
        console.log(paymentMethod);
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="payment-element" options={{ hidePostalCode: true }} />
                <button id="submit">
                    <span id="button-text">Add Payment Method</span>
                </button>
            </form>
        </>
    );
}

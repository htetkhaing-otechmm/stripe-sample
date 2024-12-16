import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DyanamicReactJson = dynamic(() => import('react-json-view'), { ssr: false });
export default function CustomerSubscription() {
    const [customerInfo, setCustomerInfo] = useState({});

    useEffect(() => {
        fetch('/api/stripe/current-subscription')
            .then((res) => res.json())
            .then((res) => setCustomerInfo(res));
    }, []);
    return (
        <>
            <h3>Current Subscription</h3>
            <DyanamicReactJson src={customerInfo} />
        </>
    );
}

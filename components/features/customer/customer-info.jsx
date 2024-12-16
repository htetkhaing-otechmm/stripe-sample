import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DyanamicReactJson = dynamic(()=> import('react-json-view'), {ssr: false})
export default function CustomerInfo() {
    const [customerInfo ,setCustomerInfo] = useState({})


    useEffect(()=>{
        fetch('/api/stripe').then(res=>res.json()).then(res => setCustomerInfo(res))
    },[])
    return <>
    <h3>Stripe Customer Information</h3>

    <DyanamicReactJson src={customerInfo}/>
    </>;
}

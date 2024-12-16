import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const CardList = forwardRef(({ addNew }, ref) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        refreshCards();
    }, []);

    useImperativeHandle(ref, () => {
        return {refreshCards};
    }, []);

    const refreshCards = () => {
        fetch('/api/stripe/card')
            .then((res) => res.json())
            .then((res) => {
                setCards(res.cards);
            });
    };

    return (
        <>
            <h3>Payment Methods </h3>
            <ul>
                {cards.map((c) => {
                    const { card } = c;
                    return <li key={c.id}>{card.brand + ' ' + card.last4 + ' ' + card.exp_month + '/' + card.exp_year}</li>;
                })}
            </ul>
            <button onClick={addNew}>Add New Payment Method</button>
        </>
    );
});
export default CardList;

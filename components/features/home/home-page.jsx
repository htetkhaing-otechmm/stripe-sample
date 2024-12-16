import { signOut, useSession } from 'next-auth/react';
import styles from './home.module.scss';
import ReactModal from 'react-modal';
import AddCard from '../card/add-card';
import { useRef, useState } from 'react';
import CardList from '../card/card-list';
import CustomerInfo from '../customer/customer-info';
import CustomerSubscription from '../customer/customer-subscription';
export default function HomePage() {
    const cardListRef = useRef(null);
    const { data: session } = useSession();
    const [openCardEntry, setOpenCardEntry] = useState(false);
    const onSubscribe = async (priceId) => {
        try {
            const res = await fetch('/api/stripe', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user?.id, priceId, username: session.user?.username }),
            });

            if (res.status === 400) {
                alert('no payment method found\n add payment method');
                setOpenCardEntry(true);
            } else {
                setOpenCardEntry(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.home}>
            {/* login  user information*/}
            <section>
                <table>
                    <tbody>
                        <tr>
                            <th>username: </th>
                            <td>{session?.user?.username}</td>
                            <th>
                                <button onClick={signOut}>Logout</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/*Subscription List */}

            <section>
                <CardList ref={cardListRef} addNew={() => setOpenCardEntry(true)} />

                <button style={{ marginLeft: '20px' }} onClick={() => cardListRef.current?.refreshCards()}>
                    Refresh Payment Methods
                </button>
            </section>

            <section className={styles.plans}>
                <h3>PLANS</h3>
                <ul>
                    <li>
                        SILVER <button onClick={() => onSubscribe('price_1QV5sBRtrAdVYEDOhlXC7wbC')}>Subscribe</button>
                    </li>
                    <li>
                        GOLD <button onClick={() => onSubscribe('price_1QVRzXRtrAdVYEDOGe5c6CJG')}>Subscribe</button>
                    </li>
                </ul>
            </section>

       

            <section>
                <CustomerSubscription />
            </section>

            <section>
                <CustomerInfo />
            </section>

            <ReactModal isOpen={openCardEntry} ariaHideApp={false} onRequestClose={() => setOpenCardEntry(false)}>
                <AddCard
                    onClose={() => {
                        setOpenCardEntry(false);
                        cardListRef.current?.refreshCards();
                    }}
                />
            </ReactModal>
        </div>
    );
}

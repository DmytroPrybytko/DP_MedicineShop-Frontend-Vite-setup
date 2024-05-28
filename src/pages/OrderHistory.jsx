import { Suspense } from 'react';
import { json, defer, useLoaderData, Await } from 'react-router-dom';

import OrderList from '../components/Shop/OrderList';
import { getAuthToken } from '../util/auth';

const apiURL = import.meta.env.VITE_API_URL;

const OrderHistoryPage = () => {
    const orders = useLoaderData();

    console.log('Orders: ', orders);

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading Orders...</p>}>
                <Await resolve={orders}>
                    {(loadedOrders) => <OrderList orders={loadedOrders.orders} />}
                </Await>
            </Suspense>
        </>
    );
};

export default OrderHistoryPage;

export const loader = async () => {
    const token = getAuthToken();

    if (!token || token === 'EXPIRED') {
        throw json({ message: 'Not Authenticated.' }, { status: 401 });
    }

    const response = await fetch(`${apiURL}order`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw json({ message: 'Error fetching Order History.' }, { status: 500 });
    }

    const resData = await response.json();
    return defer({
        orders: resData,
    });
};

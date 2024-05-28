import { Suspense } from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';

import Cart from '../components/Cart/Cart';
import { loadUserInfo } from './UserProfile';
import { dataLoader as shopListLoader } from './ShopRoot';
import { getAuthToken } from '../util/auth';

const apiURL = import.meta.env.VITE_API_URL;

const CartPage = () => {
    const data = useLoaderData();

    return (
        <div className="page">
            <Suspense>
                <Await resolve={data}>
                    {(loadedData) => <Cart user={loadedData.user} shopList={loadedData.shopList} />}
                </Await>
            </Suspense>
        </div>
    );
};

export default CartPage;

export const loader = async () => {
    const token = getAuthToken();

    if (!token || token === 'EXPIRED') {
        return defer({
            user: {},
            shopList: await shopListLoader(`${apiURL}shop`),
        });
    }

    return defer({
        user: await loadUserInfo(),
        shopList: await shopListLoader(`${apiURL}shop`),
    });
};

import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import ProductList from '../components/Shop/ProductList';

const apiURL = import.meta.env.VITE_API_URL;

const ProductsPage = () => {
    const products = useLoaderData();

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading Shop Products...</p>}>
                <Await resolve={products}>
                    {(loadedProducts) => <ProductList products={loadedProducts.products} />}
                </Await>
            </Suspense>
        </>
    );
};

export default ProductsPage;

const loadShop = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw json({ message: 'Could not load products' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData;
    }
};

export const loader = async ({ request, params }) => {
    const shopId = params.shopId;
    const reqUrl = new URL(request.url);

    let fetchUrl = `${apiURL}shop/${shopId}`;

    if (reqUrl.searchParams.size > 0) {
        fetchUrl += `?${reqUrl.searchParams.toString()}`;
    }

    return defer({
        products: await loadShop(fetchUrl),
    });
};

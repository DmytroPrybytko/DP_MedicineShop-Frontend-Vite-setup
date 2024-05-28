import { Suspense } from 'react';
import { Outlet, useLoaderData, json, defer, Await } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShopList from '../components/Shop/ShopList';
import Categories from '../components/Shop/Categories';
import ProductList from '../components/Shop/ProductList';
import SortingRules from '../components/Shop/SortingRules';
import SelectedProduct from '../components/Shop/SelectedProduct';

const apiURL = import.meta.env.VITE_API_URL;
console.log('apiURL: ', apiURL);

const ShopRootLayout = () => {
    const { shops, categories, products, sortingRules } = useLoaderData();

    const selectedShop = useSelector((state) => state.shop).selectedShop;
    const selectedProduct = useSelector((state) => state.filters).selectedProduct;

    return (
        <div className="page">
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading Shop Info...</p>}>
                <Await resolve={shops}>{(loadedShops) => <ShopList shops={loadedShops} />}</Await>
            </Suspense>
            <div className="shop_layout">
                <div className="filters">
                    {!selectedProduct && (
                        <Suspense>
                            <Await resolve={categories}>
                                {(loadedCategories) => <Categories categories={loadedCategories} />}
                            </Await>
                        </Suspense>
                    )}
                    {!selectedProduct && (
                        <Suspense>
                            <Await resolve={sortingRules}>
                                {(loadedSortingRules) => (
                                    <SortingRules sortingRules={loadedSortingRules} />
                                )}
                            </Await>
                        </Suspense>
                    )}
                    {selectedProduct && (
                        <Suspense
                            fallback={<p style={{ textAlign: 'center' }}>Loading Product...</p>}>
                            <Await resolve={products}>
                                {(loadedProducts) => (
                                    <SelectedProduct product={loadedProducts[0]} />
                                )}
                            </Await>
                        </Suspense>
                    )}
                </div>
                {!selectedShop && (
                    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading Products...</p>}>
                        <Await resolve={products}>
                            {(loadedProducts) => <ProductList products={loadedProducts} />}
                        </Await>
                    </Suspense>
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default ShopRootLayout;

export const dataLoader = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw json({ message: `Could not load data for: ${url}` }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData;
    }
};

export const loader = async ({ request, params }) => {
    let fetchProductsUrl = `${apiURL}products`;

    const reqUrl = new URL(request.url);

    if (reqUrl.searchParams.size > 0) {
        fetchProductsUrl += `?${reqUrl.searchParams.toString()}`;
    }

    const url = {
        shopList: `${apiURL}shop`,
        categories: `${apiURL}categories`,
        sortingRules: `${apiURL}sortingrules`,
        productList: fetchProductsUrl,
    };

    // console.log('url.productlist: ', url.productList);
    return defer({
        shops: await dataLoader(url.shopList),
        categories: await dataLoader(url.categories),
        sortingRules: await dataLoader(url.sortingRules),
        products: dataLoader(url.productList),
    });
};

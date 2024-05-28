import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from './UI/Button';
import classes from './MainNavigation.module.css';
import { createSearchParamsString } from '../util/URLUtils';
import profileIcon from '../../src/img/profile.svg';

const MainNavigation = () => {
    const authToken = useRouteLoaderData('root');
    const cartTotalQty = useSelector((state) => state.cart).cartTotalQuantity;
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;
    const selectedProduct = useSelector((state) => state.filters).selectedProduct;
    const selectedShop = useSelector((state) => state.shop).selectedShop;

    const getShopUrl = () => {
        let url = '/shop';
        if (selectedShop) {
            url += `/${selectedShop}`;
        }

        const searchParamsStr = createSearchParamsString([
            { key: 'cgid', value: selectedCategory },
            { key: 'srule', value: selectedSortingRule },
            { key: 'pid', value: selectedProduct },
        ]);

        return `${url}${searchParamsStr}`;
    };

    return (
        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                                end>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={getShopUrl()}
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }>
                                Shopping Cart ({cartTotalQty})
                            </NavLink>
                        </li>
                    </ul>
                    <ul className={classes.list}>
                        {!authToken && (
                            <li>
                                <NavLink
                                    to="/auth?mode=login"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }>
                                    Login/Signup
                                </NavLink>
                            </li>
                        )}
                        {authToken && (
                            <li>
                                <NavLink
                                    to="/user-profile"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }>
                                    Your Profile
                                </NavLink>
                            </li>
                        )}
                        {authToken && (
                            <li>
                                <Form method="post" action="/logout">
                                    <Button textOnly>Logout</Button>
                                </Form>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default MainNavigation;

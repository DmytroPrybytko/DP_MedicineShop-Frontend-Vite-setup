import { Outlet, NavLink } from 'react-router-dom';

import classes from '../components/MainNavigation.module.css';

const RootLayout = () => {
    return (
        <>
            <ul className={classes.list}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                        end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/shop"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}>
                        Shop
                    </NavLink>
                </li>
            </ul>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;

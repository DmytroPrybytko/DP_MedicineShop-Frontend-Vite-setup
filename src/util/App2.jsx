import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
/* import ErrorPage from './pages/Error';
import CartPage, { loader as cartUserProfileLoader } from './pages/Cart';
import HomePage from './pages/Home';
import { loader as shopsLoader } from './pages/ShopRoot';
import AuthPage from './pages/Auth';
import ProductsPage, { loader as productsLoader } from './pages/Products';
import ShopRootLayout from './pages/ShopRoot';
import { action as authAction } from './pages/Auth';
import { tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import UserProfilePage, {
    loader as userProfileLoader,
    action as userProfileAction,
} from './pages/UserProfile';
import OrderHistoryPage, { loader as orderHistoryLoader } from './pages/OrderHistory'; */

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <div>HOME</div>,
            },
            {
                path: 'shop',
                element: <div>SHOPPPPP {console.log('SHOPPP')}</div>,
            },
        ],
    },
]);

/* const router2 = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'shop',
                element: <ShopRootLayout />,
                loader: shopsLoader,
                id: 'shop',
                children: [
                    {
                        path: ':shopId',
                        element: <ProductsPage />,
                        id: 'product-list',
                        loader: productsLoader,
                    },
                ],
            },
            {
                path: 'cart',
                element: <div>CART</div>,
                element: <CartPage />,
                loader: cartUserProfileLoader,
            },
            {
                path: 'auth',
                element: <div>AUTH</div>,
                element: <AuthPage />,
                action: authAction,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
            {
                path: 'user-profile',
                element: <UserProfilePage />,
                loader: userProfileLoader,
                action: userProfileAction,
            },
            {
                path: 'order-history',
                element: <OrderHistoryPage />,
                loader: orderHistoryLoader,
            },
        ],
    },
]); */

function App() {
    return <RouterProvider router={router} />;
}

export default App;

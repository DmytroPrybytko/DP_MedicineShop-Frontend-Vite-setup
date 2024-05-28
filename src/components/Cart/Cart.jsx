import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import classes from './Cart.module.css';
import ShopCart from './ShopCart';
import BillingForm from './BillingForm';
import { cartActions } from '../../store/cart-slice';
import Modal from '../UI/Modal';
import ModalContent from '../UI/ModalContent';

const apiURL = import.meta.env.VITE_API_URL;

const getFormattedDatePlus24Hours = () => {
    let currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 24);
    let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    return formattedDate;
};

const Cart = ({ user, shopList }) => {
    const [data, setData] = useState();
    const [err, setErr] = useState();
    const [userBillingInfo, setUserBillingInfo] = useState(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const billingFormRef = useRef();

    const cart = useSelector((state) => state.cart);
    console.log('cart.shopCarts:', cart.shopCarts);
    const cartIsEmpty = cart.cartTotalQuantity === 0;

    const placeOrderHandler = async (shopCart) => {
        const saveOrder = async (order) => {
            const response = await fetch(`${apiURL}order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error('Could not place an order');
            }

            const resData = await response.json();
            return resData;
        };

        const formData = new FormData(billingFormRef.current);
        const billingData = Object.fromEntries(formData.entries());

        const { _id: userId, ...orderUserInfo } = billingData;
        console.log('userInfo 1:', orderUserInfo);

        let bilingDataErrors = '';

        for (let [key, value] of Object.entries(orderUserInfo)) {
            if (value === '') {
                bilingDataErrors += `${key} field is empty.\r\n`;
            }
        }

        console.log('ERRORS:', bilingDataErrors);

        if (bilingDataErrors.length > 0) {
            setErr(bilingDataErrors);
            return;
        }

        setUserBillingInfo(billingData);

        if (userId) {
            orderUserInfo.userType = { mode: 'registered', userId: userId };
        }
        const order = { user: orderUserInfo, cart: { ...shopCart } };
        console.log('order: ', order);

        try {
            const data = await saveOrder(order);

            console.log('resultDATA: ', data);

            setData(data);

            dispatch(cartActions.clearShopCart(shopCart.shop));
        } catch (error) {
            setErr(error.message);
            throw new Error(error);
        }
    };

    if (cartIsEmpty && !data) {
        return <h3 className={classes.center}>Your Shopping cart is empty.</h3>;
    }

    return (
        <>
            <Modal open={err} onclose={() => setErr(null)}>
                {err && (
                    <ModalContent
                        title="Error saving order!"
                        btnText="Ok"
                        onConfirm={() => setErr(null)}>
                        {err}
                    </ModalContent>
                )}
            </Modal>
            <Modal
                open={data}
                onclose={() => {
                    setData(null);
                    navigate('/cart');
                }}>
                {data && (
                    <ModalContent
                        title={data.message}
                        btnText="Continue"
                        onConfirm={() => {
                            setData(null);
                            navigate('/cart');
                        }}>
                        <p>The ordered drugs will be reserved and available for you until:</p>
                        <p>{getFormattedDatePlus24Hours()}</p>
                    </ModalContent>
                )}
            </Modal>
            {!cartIsEmpty && !data && (
                <>
                    <div className={classes.cart_container}>
                        <h2>Your Cart:</h2>
                        <hr />
                        <div className={classes.cart}>
                            <ul>
                                {cart.shopCarts.map((shopCart) => (
                                    <ShopCart
                                        key={shopCart.shop}
                                        shopCart={shopCart}
                                        shop={shopList.find((shop) => shop._id === shopCart.shop)}
                                        onSubmit={placeOrderHandler}
                                    />
                                ))}
                            </ul>
                        </div>
                        <h3>Cart Total: {cart.cartTotalPrice}</h3>
                    </div>

                    <BillingForm user={userBillingInfo} ref={billingFormRef} />
                </>
            )}
        </>
    );
};

export default Cart;

// {
//     "items": [
//         {
//             "id": "6605360a08ef8bb63ad7ce17",
//             "name": "Biprestarium",
//             "price": 24.9,
//             "quantity": 1,
//             "totalPrice": 24.9
//         }
//     ],
//         "cartTotalPrice": 24.9,
//             "totalQuantity": 1
// }

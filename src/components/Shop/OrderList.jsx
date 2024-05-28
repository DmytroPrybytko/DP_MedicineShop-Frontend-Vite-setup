import classes from './OrderList.module.css';
import CartItem from '../Cart/CartItem';
import { timeFormatter } from '../../util/formatter';

const OrderList = ({ orders }) => {
    if (orders.length === 0) {
        return <h3 className={classes.center}>No Orders Found.</h3>;
    }

    console.log('Orders From OrdersList: ', orders);

    return (
        <>
            <h3 className={classes.center}>Your Order history</h3>
            <div className={classes.order_container}>
                <ul>
                    {orders.map((order) => (
                        <div key={order._id} className={classes.order}>
                            <li>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Order ID:</td>
                                            <td>{order._id}</td>
                                        </tr>
                                        <tr>
                                            <td>Created:</td>
                                            <td>{timeFormatter(order.createdAt)}</td>
                                        </tr>
                                        <tr>
                                            <td>Shop:</td>
                                            <td>
                                                {order.cart.shop.shopName},{' '}
                                                {order.cart.shop.address}
                                            </td>
                                        </tr>
                                        {order.cart.items.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <b>{item.name}</b>:
                                                </td>
                                                <td>
                                                    {item.quantity} x {item.price}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Total items:</td>
                                            <td>{order.cart.shopTotalQuantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Price:</td>
                                            <td>{order.cart.shopTotalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default OrderList;

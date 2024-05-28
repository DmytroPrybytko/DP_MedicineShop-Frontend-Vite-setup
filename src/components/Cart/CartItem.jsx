import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = ({ item, shopId }) => {
    const dispatch = useDispatch();

    const onIncrease = () => {
        dispatch(cartActions.addToCart({ ...item, shopId }));
    };

    const onDecrease = () => {
        dispatch(cartActions.removeFromCart({ id: item.id, shopId }));
    };

    const onRemove = () => {
        dispatch(cartActions.removeItemFromCart({ id: item.id, shopId }));
    };

    return (
        <tr>
            <td className={classes.cart_item_actions}>
                <button onClick={onRemove}>X</button>
            </td>
            <td>
                <b>{item.name}</b>:
            </td>
            <td>
                {item.quantity} x {item.price}
            </td>
            <td className={classes.cart_item_actions}>
                <button onClick={() => onDecrease(item.id)}>-</button>
            </td>
            <td>{item.quantity}</td>
            <td className={classes.cart_item_actions}>
                <button onClick={onIncrease}>+</button>
            </td>
        </tr>
        // <div className={classes.cart_item}>
        //     <Card>
        //         <li>
        //             <button onClick={onRemove}>X</button>
        //             <p>
        //                 <b>{item.name}</b>: {item.quantity} x {item.price}
        //             </p>
        //             <p className={classes.cart_item_actions}>
        //                 <button onClick={() => onDecrease(item.id)}>-</button>
        //                 <span>{item.quantity}</span>
        //                 <button onClick={onIncrease}>+</button>
        //             </p>
        //             <hr />
        //             <p>total: {item.totalPrice}</p>
        //         </li>
        //     </Card>
        // </div>
    );
};

export default CartItem;

// {
//      "id": "6605360a08ef8bb63ad7ce17",
//      "name": "Biprestarium",
//      "price": 24.9,
//      "quantity": 1,
//      "totalPrice": 24.9
// }

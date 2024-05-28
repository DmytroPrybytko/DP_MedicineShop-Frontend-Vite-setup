import CartItem from './CartItem';
import Button from '../UI/Button';
import classes from './ShopCart.module.css';

const ShopCart = ({ shopCart, shop, onSubmit }) => {
    // console.log('ShopCArt shop: ', shop);
    // console.log('ShopCArt shopCart: ', shopCart);

    return (
        <>
            <li>
                <div className={classes.shop_name}>
                    {shop.shopName}, {shop.address}
                </div>
                <table>
                    <tbody>
                        {shopCart.items.map((item) => (
                            <CartItem key={item.id} item={item} shopId={shopCart.shop} />
                        ))}
                    </tbody>
                </table>
                <div className={classes.actions}>
                    <div>Shop Total: {shopCart.shopTotalPrice}</div>
                    <Button onClick={() => onSubmit(shopCart)}>Place an Order</Button>
                </div>
                <hr />
            </li>
        </>
    );
};

export default ShopCart;

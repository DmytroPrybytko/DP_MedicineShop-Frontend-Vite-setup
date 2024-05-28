import Button from '../UI/Button';
import classes from './ProductDetailView.module.css';
import { currencyFormatter } from '../../util/formatter';

const apiURL = import.meta.env.VITE_API_URL;

const ProductDetailView = ({ product, onAddToCart, onCancel }) => {
    return (
        <>
            <div className={classes.product}>
                <img src={`${apiURL}${product.imageUrl}`} alt={product.name} />
                <h2>{product.name}</h2>
                <hr />
                <div>
                    <p>{product.description}</p>
                </div>
                <p>Price: {currencyFormatter.format(product.price)}</p>
                <div className={classes.actions}>
                    <Button textOnly onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onAddToCart}>Add to cart</Button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailView;

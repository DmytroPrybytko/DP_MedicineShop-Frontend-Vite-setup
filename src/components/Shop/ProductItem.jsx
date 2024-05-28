import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { currencyFormatter } from '../../util/formatter';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ProductDetailView from './ProductDetailView';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { filtersActions } from '../../store/filters-slice';

const apiURL = import.meta.env.VITE_API_URL;

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedShop = useSelector((state) => state.shop).selectedShop;
    const [detailedView, setDetailedView] = useState(false);

    const handleAddToCart = () => {
        dispatch(
            cartActions.addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                shopId: selectedShop,
            }),
        );
    };

    const handleSelectProduct = (id) => {
        dispatch(filtersActions.setProduct(id));
        navigate(`/shop?pid=${id}`);
    };

    return (
        <>
            <Modal open={detailedView} onClose={() => setDetailedView(false)}>
                <ProductDetailView
                    product={product}
                    onAddToCart={() => {
                        handleAddToCart();
                        setDetailedView(false);
                    }}
                    onCancel={() => setDetailedView(false)}
                />
            </Modal>
            <div className={classes.product_container}>
                <Card>
                    <li>
                        <div className={classes.info_container}>
                            <div className={classes.image_container}>
                                <img src={`${apiURL}${product.imageUrl}`} alt={product.name} />
                            </div>
                            <div className={classes.product_info}>
                                <h3>Name: {product.name}</h3>
                                <p>Price: {currencyFormatter.format(product.price)}</p>
                                <hr />
                                <div>
                                    <p>{product.description}</p>
                                </div>
                                <div className={classes.product_action}>
                                    <Button textOnly onClick={() => setDetailedView(true)}>
                                        Details
                                    </Button>
                                    {selectedShop ? (
                                        <Button onClick={handleAddToCart}>Add to cart</Button>
                                    ) : (
                                        <Button onClick={() => handleSelectProduct(product._id)}>
                                            Find a Store
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                </Card>
            </div>
        </>
    );
};

export default ProductItem;

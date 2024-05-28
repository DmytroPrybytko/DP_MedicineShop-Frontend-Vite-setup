import ProductItem from './ProductItem';
import classes from './ProductList.module.css';

const ProductList = ({ products }) => {
    if (products.length < 1) {
        return <h3 className={classes.center}>No Products found.</h3>;
    }

    return (
        <>
            {/* <h1>Product List</h1> */}
            <div className={classes.product_list}>
                <ul>
                    {products.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ProductList;

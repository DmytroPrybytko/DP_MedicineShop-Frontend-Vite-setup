import { useSelector, useDispatch } from 'react-redux';

import classes from './ShopList.module.css';
import { shopActions } from '../../store/shop-slice';
import SideMenuItem from '../UI/SideMenuItem';
import { createSearchParamsString } from '../../util/URLUtils';

const ShopList = ({ shops }) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;
    const selectedProduct = useSelector((state) => state.filters).selectedProduct;
    const selectedShop = useSelector((state) => state.shop).selectedShop;

    if (shops.length < 1) {
        return <h1>No shops found.</h1>;
    }

    const handleShopSelect = (shopId) => {
        dispatch(shopActions.setSelectedShop(shopId));
    };

    const searchParamsStr = createSearchParamsString([
        { key: 'cgid', value: selectedCategory },
        { key: 'srule', value: selectedSortingRule },
        { key: 'pid', value: selectedProduct },
    ]);

    const shopIsActive = (shop) => {
        const visibleByCategory = shop.categories.some((category) => category === selectedCategory);
        const visibleByProduct = shop.products.some(
            (product) => product.toString() === selectedProduct,
        );

        if (!selectedCategory && !selectedProduct) {
            return true;
        } else if (selectedProduct) {
            return visibleByProduct;
        } else if (selectedCategory && !selectedProduct) {
            return visibleByCategory;
        } else {
            return visibleByCategory || visibleByProduct;
        }
    };

    return (
        <>
            <div className={classes.shop_list}>
                <ul>
                    {shops.map((shop) => (
                        <li key={shop._id}>
                            <div className={classes.shop_list__item}>
                                <SideMenuItem
                                    disabled={!shopIsActive(shop)}
                                    to={`/shop/${shop._id}${searchParamsStr}`}
                                    onClick={() => handleShopSelect(shop._id.toString())}
                                    selected={selectedShop === shop._id.toString()}
                                    className={({ isActive }) =>
                                        isActive || selectedShop === shop._id.toString()
                                            ? `${classes.active} ${classes.withCircle}`
                                            : undefined
                                    }>
                                    {shop.shopName}
                                </SideMenuItem>
                            </div>
                        </li>
                    ))}
                    <li>
                        <div className={classes.shop_list__item}>
                            <SideMenuItem
                                onClick={() => handleShopSelect(undefined)}
                                to={`/shop${searchParamsStr}`}
                                className={({ isActive }) =>
                                    isActive && !selectedShop
                                        ? `${classes.active} ${classes.withCircle}`
                                        : undefined
                                }>
                                All Shops
                            </SideMenuItem>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ShopList;

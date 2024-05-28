import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './SelectedProduct.module.css';
import { filtersActions } from '../../store/filters-slice';
import { createSearchParamsString } from '../../util/URLUtils';

const SelectedProduct = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedShop = useSelector((state) => state.shop).selectedShop;
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;

    const onClear = () => {
        dispatch(filtersActions.setProduct(undefined));
        let url = '/shop';

        if (selectedShop) {
            url += `/${selectedShop}`;
        }

        const searchParamsStr = createSearchParamsString([
            { key: 'cgid', value: selectedCategory },
            { key: 'srule', value: selectedSortingRule },
        ]);

        navigate(`${url}${searchParamsStr}`);
    };

    return (
        <>
            <div className={classes.selectedproduct}>
                <span>Looking for:</span>
                <div>
                    <span>{product.name}</span>
                    <button onClick={onClear}>X</button>
                </div>
            </div>
        </>
    );
};

export default SelectedProduct;

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { filtersActions } from '../../store/filters-slice';
import classes from './Categories.module.css';
import { createSearchParamsString } from '../../util/URLUtils';

const Categories = ({ categories }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;
    const selectedShop = useSelector((state) => state.shop).selectedShop;

    const handleSelect = (e) => {
        dispatch(filtersActions.setCategory(e.target.value));
        let url = '/shop';

        if (selectedShop) {
            url += `/${selectedShop}`;
        }

        const searchParamsStr = createSearchParamsString([
            { key: 'cgid', value: e.target.value !== 'All' ? e.target.value : null },
            { key: 'srule', value: selectedSortingRule },
        ]);

        navigate(`${url}${searchParamsStr}`);
    };

    return (
        <div className={classes.categories}>
            <label htmlFor="categories">Select category:</label>
            <select
                name="categories"
                onChange={handleSelect}
                defaultValue={selectedCategory ?? 'All'}>
                <option value={'All'}>All</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Categories;

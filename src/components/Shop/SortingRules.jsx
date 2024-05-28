import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './SortingRules.module.css';
import { filtersActions } from '../../store/filters-slice';
import { createSearchParamsString } from '../../util/URLUtils';

const SortingRules = ({ sortingRules }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.filters).selectedCategory;
    const selectedSortingRule = useSelector((state) => state.filters).selectedSortingRule;
    const selectedShop = useSelector((state) => state.shop).selectedShop;

    const handleSelect = (e) => {
        dispatch(filtersActions.setSortingRule(e.target.value));
        let url = '/shop';

        if (selectedShop) {
            url += `/${selectedShop}`;
        }

        const searchParamsStr = createSearchParamsString([
            { key: 'cgid', value: selectedCategory },
            { key: 'srule', value: e.target.value !== 'None' ? e.target.value : null },
        ]);

        navigate(`${url}${searchParamsStr}`);
    };

    return (
        <>
            <div className={classes.sortingrules}>
                <label htmlFor="srule">Sort by:</label>
                <select
                    name="srule"
                    onChange={handleSelect}
                    defaultValue={selectedSortingRule ?? 'None'}>
                    <option value={'None'}>----</option>
                    {sortingRules.map((sortingRule) => (
                        <option key={sortingRule._id} value={sortingRule._id}>
                            {sortingRule.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default SortingRules;

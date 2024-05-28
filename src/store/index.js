import { configureStore } from '@reduxjs/toolkit';

import cartReduser from './cart-slice';
import filtersReducer from './filters-slice';
import shopReducer from './shop-slice';

const store = configureStore({
    reducer: {
        cart: cartReduser,
        filters: filtersReducer,
        shop: shopReducer,
    },
});

export default store;

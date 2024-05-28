import { createSlice } from '@reduxjs/toolkit';

const initialFiltersState = {
    selectedCategory: undefined,
    selectedSortingRule: undefined,
    selectedProduct: undefined,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setCategory: (state, action) => {
            if (action.payload === 'All') {
                state.selectedCategory = undefined;
            } else {
                state.selectedCategory = action.payload;
            }
        },
        setSortingRule: (state, action) => {
            if (action.payload === 'None') {
                state.selectedSortingRule = undefined;
            } else {
                state.selectedSortingRule = action.payload;
            }
        },
        setProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
});

export default filtersSlice.reducer;

export const filtersActions = filtersSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialShopState = {
    selectedShop: undefined,
};

const shopSlice = createSlice({
    name: 'shop',
    initialState: initialShopState,
    reducers: {
        setSelectedShop: (state, action) => {
            state.selectedShop = action.payload;
        },
    },
});

export const shopActions = shopSlice.actions;

export default shopSlice.reducer;

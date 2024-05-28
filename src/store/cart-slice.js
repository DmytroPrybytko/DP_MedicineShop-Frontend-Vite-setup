import { createSlice } from '@reduxjs/toolkit';

const initailCartState = {
    shopCarts: [], // [ {shopId: '', items: [{id, name, price, quantity, totalPrice}]}, shopTotalPrice, shopTotalQuantity ]
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
};

const shopCartExample = [
    {
        shop: '',
        items: [{ id: '', name: '', price: 0, quantity: 0, totalPrice: 0 }],
        shopTotalPrice: 0,
        shopTotalQuantity: 0,
    },
];

const cartSlice = createSlice({
    name: 'cart',
    initialState: initailCartState,
    reducers: {
        addToCart: (state, action) => {
            const { shopId, ...newItem } = action.payload;
            console.log('newItem: ', newItem);
            console.log('shopId: ', shopId);

            const existingShop = state.shopCarts.find((shopCart) => shopCart.shop === shopId);

            if (!existingShop) {
                state.shopCarts.push({
                    shop: shopId,
                    items: [{ ...newItem, quantity: 1, totalPrice: newItem.price }],
                    shopTotalPrice: newItem.price,
                    shopTotalQuantity: 1,
                });
            } else {
                const existingItem = existingShop.items.find((item) => item.id === newItem.id);
                if (!existingItem) {
                    existingShop.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
                } else {
                    existingItem.quantity++;
                    existingItem.totalPrice =
                        Math.round((existingItem.totalPrice + newItem.price) * 100) / 100;
                }
                existingShop.shopTotalPrice =
                    Math.round((existingShop.shopTotalPrice + newItem.price) * 100) / 100;
                existingShop.shopTotalQuantity++;
            }

            state.cartTotalQuantity++;
            state.cartTotalPrice = Math.round((state.cartTotalPrice + newItem.price) * 100) / 100;
        },
        removeFromCart: (state, action) => {
            const shopId = action.payload.shopId;
            const itemId = action.payload.id;

            const shopCart = state.shopCarts.find((shopCart) => shopCart.shop === shopId);
            const existingItem = shopCart.items.find((item) => item.id === itemId);

            if (shopCart.shopTotalQuantity === 1 && existingItem) {
                state.shopCarts = state.shopCarts.filter((shopCart) => shopCart.shop !== shopId);
            } else {
                shopCart.shopTotalQuantity--;
                shopCart.shopTotalPrice =
                    Math.round((shopCart.shopTotalPrice - existingItem.price) * 100) / 100;

                if (existingItem.quantity === 1) {
                    shopCart.items = shopCart.items.filter((item) => item.id !== itemId);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice =
                        Math.round((existingItem.totalPrice - existingItem.price) * 100) / 100;
                }
            }

            state.cartTotalQuantity--;
            state.cartTotalPrice =
                Math.round((state.cartTotalPrice - existingItem.price) * 100) / 100;
        },
        removeItemFromCart: (state, action) => {
            const shopId = action.payload.shopId;
            const itemId = action.payload.id;

            const shopCart = state.shopCarts.find((shopCart) => shopCart.shop === shopId);
            const existingItem = shopCart.items.find((item) => item.id === itemId);

            state.cartTotalPrice =
                Math.round(
                    (state.cartTotalPrice - existingItem.price * existingItem.quantity) * 100,
                ) / 100;
            state.cartTotalQuantity -= existingItem.quantity;

            if (shopCart.shopTotalQuantity === existingItem.quantity) {
                state.shopCarts = state.shopCarts.filter((shopCart) => shopCart.shop !== shopId);
            } else {
                shopCart.shopTotalQuantity -= existingItem.quantity;
                shopCart.shopTotalPrice =
                    Math.round(
                        (shopCart.shopTotalPrice - existingItem.price * existingItem.quantity) *
                            100,
                    ) / 100;

                shopCart.items = shopCart.items.filter((item) => item.id !== itemId);
            }
        },
        clearShopCart: (state, action) => {
            const shopId = action.payload;
            const existingShopCart = state.shopCarts.find((shopCart) => shopCart.shop === shopId);
            state.cartTotalPrice -= existingShopCart.shopTotalPrice;
            state.cartTotalQuantity -= existingShopCart.shopTotalQuantity;
            state.shopCarts = state.shopCarts.filter((shopCart) => shopCart.shop !== shopId);
        },
        clearCart: (state) => {
            state.cartTotalQuantity = 0;
            state.cartTotalPrice = 0;
            state.shopCarts = [];
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

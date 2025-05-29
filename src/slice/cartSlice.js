import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload.product;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...newItem,
          quantity: action?.payload?.qty ? action.payload.qty : 1,
        });
        state.totalQuantity++;
      }
      //state.totalQuantity++;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalQuantity--;
    },
    decrementQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && qty > 0) {
        item.quantity = qty;
      }
    },
  },
});

export const { addToCart, removeFromCart, decrementQty } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

//export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    remove: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.find(item => item.id === id);

      if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
          const index = state.findIndex(item => item.id === id);
          state.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    clear: (state) => {
      state.length = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { add, remove, updateQuantity , clear} = cartSlice.actions;

export default cartSlice.reducer;

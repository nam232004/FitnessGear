import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../feater/cartSlice'

export const store = configureStore({
  reducer: {
    cart:cartReducer
  },
})
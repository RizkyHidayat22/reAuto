import { configureStore } from '@reduxjs/toolkit'
import fetchProduct  from '../features/ProductSilce'
export const store = configureStore({
  reducer: {
    fetchProduct,
  },
})
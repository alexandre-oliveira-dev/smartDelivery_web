import { configureStore } from '@reduxjs/toolkit';
import Cart from '../store/modules/cart';

const store = configureStore({
  reducer: {
    Cart,
  },
});

export default store;

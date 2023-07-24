import { configureStore } from '@reduxjs/toolkit';
import Cart from './modules/cart.redux';

const store = configureStore({
  reducer: {
    Cart,
  },
});

export default store;

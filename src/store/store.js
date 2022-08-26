import { configureStore } from '@reduxjs/toolkit';
import adminUsersReducer from '../actions/users/userSlice';

export const store = configureStore({
  reducer: {
    state: adminUsersReducer,
  },
});

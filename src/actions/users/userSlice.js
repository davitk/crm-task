import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  users: [
    { id: uuidv4(), lastName: 'Snow', firstName: 'Jon', role: 'Super Admin', status: 'Active',email: 'example@gmail.com', lastLogin: '2018/12/30' },
    { id: uuidv4(), lastName: 'Lannister', firstName: 'Cersei', role: 'Manager', status: 'Inactive',email: 'test@gmail.com', lastLogin: '2019/11/23' },
    { id: uuidv4(), lastName: 'Lannister', firstName: 'Jaime', role: 'Manager', status: 'Unconfirmed',email: 'valid.email@gmail.com', lastLogin: '2022/06/04' },
  ],
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const uniqueId = uuidv4();
      state.users = [...state.users, {id: uniqueId, ...action.payload }];
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(item => item.id !== action.payload.id)
    },
    editUser: (state, action) => {
      state.users =  state.users.map(((item) => item.id === action.payload.id ? {...action.payload} : item));
    },
    findUserById: (state, action) => {
      return state.users.filter((user) => user.id === action.payload.id)
    },
  },
});

export const { addUser, deleteUser, editUser, filterByName } = userSlice.actions;

export const selectUsers = (store) => store.state.users;



export default userSlice.reducer;

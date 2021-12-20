import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from '../../services/apiService/usersService';
import { showMessage } from '../fuse/messageSlice';
import { closeDialog } from '../fuse/dialogSlice';
import transformErrors from '../../utils/transformErrors';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await usersService.getUsers();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveUser = createAsyncThunk(
  'users/saveUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await usersService.saveUser(data);
      dispatch(
        showMessage({
          message: 'Usuario creado correctamente',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await usersService.updateUser(data);
      dispatch(closeDialog());
      dispatch(
        showMessage({
          message: 'Usuario actualizado correctamente',
          variant: 'success',
        })
      );
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeStatusUser = createAsyncThunk(
  'users/changeStatusUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await usersService.changeStatusUser(data);
      dispatch(
        showMessage({
          message: 'Usuario actualizado correctamente',
          variant: 'success',
        })
      );
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInfoUser = createAsyncThunk(
  'users/getInfoUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await usersService.getInfoUserCommerce();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
  (state) => state.users
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoUser: null,
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.setAll(state, action.payload);
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveUser.pending]: (state) => {
      state.loading = true;
    },
    [saveUser.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.addOne(state, action.payload);
    },
    [saveUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.upsertOne(state, action.payload);
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [changeStatusUser.pending]: (state) => {
      state.loading = true;
    },
    [changeStatusUser.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.upsertOne(state, action.payload);
    },
    [changeStatusUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [getInfoUser.fulfilled]: (state, action) => {
      state.infoUser = action.payload;
    },
  },
});

export const { setUsersSearchText } = usersSlice.actions;

export default usersSlice.reducer;

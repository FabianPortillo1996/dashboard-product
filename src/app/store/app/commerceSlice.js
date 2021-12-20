import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import history from '@history';
import { showMessage } from '../fuse/messageSlice';
import commercesService from '../../services/apiService/commercesService';
import transformErrors from '../../utils/transformErrors';

export const saveCommerce = createAsyncThunk(
  'commerces/saveCommerce',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const commerce = await commercesService.saveCommerce(data);
      history.go(0);
      dispatch(
        showMessage({
          message: 'Comercio creado correctamente',
          variant: 'success',
        })
      );
      // dispatch(closeDialog());
      return commerce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCommerce = createAsyncThunk(
  'commerces/updateCommerce',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // console.log('DATA SLICE COMMERCE-', data);
      const commerce = await commercesService.updateCommerce(data);
      history.go(0);
      // dispatch(closeDialog());
      dispatch(
        showMessage({
          message: 'Comercio actualizado correctamente',
          variant: 'success',
        })
      );
      return commerce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commerceAdapter = createEntityAdapter({});

export const { selectAll: selectCommerces, selectById: selectCommerceById } =
  commerceAdapter.getSelectors((state) => state.commerces);

const commerceSlice = createSlice({
  name: 'commerces',
  initialState: commerceAdapter.getInitialState({
    searchText: '',
    data: {
      banner: 'https://www.plastico.com/documenta/imagenes/139525/starbucks-empaques-g.jpg',
    },
    errors: {},
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
    [saveCommerce.pending]: (state) => {
      state.loading = true;
    },
    [saveCommerce.fulfilled]: (state, action) => {
      state.loading = false;
      commerceAdapter.addOne(state, action.payload);
    },
    [saveCommerce.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [updateCommerce.pending]: (state) => {
      state.loading = true;
    },
    [updateCommerce.fulfilled]: (state, action) => {
      state.loading = false;
      commerceAdapter.upsertOne(state, action.payload);
    },
    [updateCommerce.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
  },
});

export const { setUsersSearchText } = commerceSlice.actions;

export default commerceSlice.reducer;

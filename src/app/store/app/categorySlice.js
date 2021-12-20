import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import transformErrors from '../../utils/transformErrors';
import categoriesService from '../../services/apiService/categoriesService';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // const { idCommerce } = data;
      // console.log('data Slice category', data);
      return await categoriesService.getCategories(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoriesByUser = createAsyncThunk(
  'categories/getCategoriesByUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await categoriesService.getCategoryByUser(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveCategory = createAsyncThunk(
  'categories/saveCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { idCommerce, dataCategory } = data;
      const category = await categoriesService.saveCategory(idCommerce, dataCategory);
      dispatch(
        showMessage({
          message: 'Categoria creada correctamente',
          variant: 'success',
        })
      );
      dispatch(closeNewCategoryDialog());
      return category;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { idCommerce, dataCategory } = data;
      const category = await categoriesService.updateCategory(
        dataCategory.id,
        idCommerce,
        dataCategory
      );
      dispatch(closeEditCategoryDialog());
      dispatch(
        showMessage({
          message: 'Categoria actualizada correctamente',
          variant: 'success',
        })
      );
      return category;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeStatusCategory = createAsyncThunk(
  'categories/changeStatusCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { idCommerce, idCategory } = data;
      const category = await categoriesService.changeStatusCategory(idCategory, idCommerce);
      dispatch(
        showMessage({
          message: 'Categoria actualizada correctamente',
          variant: 'success',
        })
      );
      return category;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } =
  categoriesAdapter.getSelectors((state) => state.categories);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoCategory: null,
    // TODO VER DONDE PONER EL ID DEL COMMERCIO
    categoryDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
    idCommerce: 0,
  }),
  reducers: {
    setCategoriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewCategoryDialog: (state, action) => {
      state.categoryDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
      state.idCommerce = action.payload;
    },
    closeNewCategoryDialog: (state) => {
      state.categoryDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
      state.idCommerce = 0;
    },
    openEditCategoryDialog: (state, action) => {
      state.categoryDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload.data,
      };
      state.idCommerce = action.payload.idCommerce;
    },
    closeEditCategoryDialog: (state, action) => {
      state.categoryDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
      state.idCommerce = 0;
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      categoriesAdapter.setAll(state, action.payload);
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [saveCategory.pending]: (state) => {
      state.loading = true;
    },
    [saveCategory.fulfilled]: (state, action) => {
      state.loading = false;
      categoriesAdapter.addOne(state, action.payload);
    },
    [saveCategory.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      categoriesAdapter.upsertOne(state, action.payload);
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [changeStatusCategory.pending]: (state) => {
      state.loading = true;
    },
    [changeStatusCategory.fulfilled]: (state, action) => {
      state.loading = false;
      categoriesAdapter.upsertOne(state, action.payload);
    },
    [changeStatusCategory.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
  },
});

export const {
  setCategoriesSearchText,
  openNewCategoryDialog,
  openEditCategoryDialog,
  closeNewCategoryDialog,
  closeEditCategoryDialog,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

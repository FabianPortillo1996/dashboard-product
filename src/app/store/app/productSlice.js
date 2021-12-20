import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import transformErrors from '../../utils/transformErrors';
import productsService from '../../services/apiService/productsService';

const newProductVariantInitial = { data: [] };

export const getProdutsByCategory = createAsyncThunk(
  'products/getProdutsByCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await productsService.getProductsByCategory(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProdutsByCommerce = createAsyncThunk(
  'products/getProdutsByCommerce',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await productsService.getProductsByCommerce(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { idCommerce, dataProduct } = data;
      const product = await productsService.saveProduct(idCommerce, dataProduct);
      dispatch(
        showMessage({
          message: 'Producto creado correctamente',
          variant: 'success',
        })
      );
      // dispatch(closeNewProductDialog());

      return { ...product, productVariants: newProductVariantInitial };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveVariant = createAsyncThunk(
  'products/saveVariant',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const variant = await productsService.saveProductVariant(data);
      dispatch(
        showMessage({
          message: 'Variante creada correctamente.',
          variant: 'success',
        })
      );
      // dispatch(closeNewProductDialog());
      return variant;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { id } = data;
      const category = await productsService.updateProduct(id, data);
      // dispatch(closeEditProductDialog());
      dispatch(
        showMessage({
          message: 'Producto actualizado correctamente',
          variant: 'success',
        })
      );
      return category;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateVariant = createAsyncThunk(
  'products/updateVariant',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { id } = data;
      const variant = await productsService.updateProductVariant(id, data);
      // dispatch(closeEditProductDialog());
      dispatch(
        showMessage({
          message: 'Variante actualizada correctamente',
          variant: 'success',
        })
      );
      return variant;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeStatusProduct = createAsyncThunk(
  'products/changeStatusProduct',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // const { idCommerce, idCategory } = data;
      const category = await productsService.statusProduct(data);
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

export const changeStatusVariant = createAsyncThunk(
  'products/changeStatusVariant',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const variant = await productsService.statusProductVariant(data);
      dispatch(
        showMessage({
          message: 'Variante actualizada correctamente',
          variant: 'success',
        })
      );
      console.log('ESTADO:', variant);
      return variant;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductsById } =
  productsAdapter.getSelectors((state) => state.products);

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    productFilter: null,
    filter: 0,
    productDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
    variantProduct: {
      type: 'new',
      data: null,
    },
    dataVariants: null,
    idCommerce: 0,
    errorsVariants: {},
  }),
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    endEditVariant: (state, action) => {
      state.variantProduct = {
        type: 'new',
        data: null,
      };
    },
    editVariant: (state, action) => {
      state.variantProduct = {
        type: 'edit',
        data: action.payload,
      };
    },
    populateDataVariants: (state, action) => {
      state.dataVariants = action.payload;
    },
    emtyDataVariants: (state, action) => {
      state.dataVariants = null;
    },
    openNewProductDialog: (state, action) => {
      state.productDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
      state.idCommerce = action.payload;
    },
    closeNewProductDialog: (state) => {
      state.productDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
      state.idCommerce = 0;
      state.dataVariants = null;
      state.errors = {};
    },
    openEditProductDialog: (state, action) => {
      state.productDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload.data,
      };
      state.idCommerce = action.payload.idCommerce;
    },
    closeEditProductDialog: (state, action) => {
      state.productDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
      state.idCommerce = 0;
      state.dataVariants = null;
      state.errors = {};
    },
  },
  extraReducers: {
    [getProdutsByCommerce.pending]: (state) => {
      state.loading = true;
    },
    [getProdutsByCommerce.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.setAll(state, action.payload);
    },
    [getProdutsByCommerce.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveProduct.pending]: (state) => {
      state.loading = true;
    },
    [saveProduct.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.addOne(state, action.payload);
      state.productDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
      state.dataVariants = [];
      state.errors = {};
    },
    [saveProduct.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.upsertOne(state, action.payload);
      state.productDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [changeStatusProduct.pending]: (state) => {
      state.loading = true;
    },
    [changeStatusProduct.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.upsertOne(state, action.payload);
    },
    [changeStatusProduct.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [getProdutsByCategory.pending]: (state) => {
      state.loading = true;
      productsAdapter.removeAll(state);
    },
    [getProdutsByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.setAll(state, action.payload);
    },
    [getProdutsByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.errors = transformErrors(action.payload);
    },
    [saveVariant.pending]: (state) => {
      state.loading = true;
    },
    [saveVariant.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataVariants = [action.payload, ...state.dataVariants];
      state.errorsVariants = {};
    },
    [saveVariant.rejected]: (state, action) => {
      state.loading = false;
      state.errorsVariants = transformErrors(action.payload);
    },
    [updateVariant.pending]: (state) => {
      state.loading = true;
    },
    [updateVariant.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataVariants = state.dataVariants.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
      state.errorsVariants = {};
    },
    [updateVariant.rejected]: (state, action) => {
      state.loading = false;
      state.errorsVariants = transformErrors(action.payload);
    },
    [changeStatusVariant.pending]: (state) => {
      state.loading = true;
    },
    [changeStatusVariant.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataVariants = state.dataVariants.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    },
    [changeStatusVariant.rejected]: (state, action) => {
      state.loading = false;
      state.errorsVariants = transformErrors(action.payload);
    },
  },
});

export const {
  setProductsSearchText,
  setFilter,
  openNewProductDialog,
  openEditProductDialog,
  closeNewProductDialog,
  closeEditProductDialog,
  editVariant,
  endEditVariant,
  populateDataVariants,
  emtyDataVariants,
} = productsSlice.actions;

export default productsSlice.reducer;

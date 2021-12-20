import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css';

import { FilePond, registerPlugin } from 'react-filepond';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { Autocomplete } from '@material-ui/lab';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from '../../../../@fuse/hooks';
import { saveProduct, updateProduct } from '../../../store/app/productSlice';
import { selectCategories } from '../../../store/app/categorySlice';

registerPlugin(FilePondPluginImagePreview);

const initialData = {
  id: 0,
  name: '',
  category_id: '',
  description: '',
  code: '',
  price_sale: '',
  price_discount: null,
  preparation_time: '',
  photo: null,
};

const ProductContent = () => {
  const dispatch = useDispatch();
  const { type, props, data } = useSelector(({ products }) => products.productDialog);
  const { idCommerce } = useSelector(({ products }) => products);
  const [nameCategory, setNameCategory] = useState('');
  const categories = useSelector(selectCategories);
  const { errors: errorsBackendProduct } = useSelector(({ products }) => products);
  // const labels = useSelector(selectLabels);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProducts()
  );

  useEffect(() => {
    console.log('ERRORS', Object.keys(errorsBackendProduct).length);
    setErrors(errorsBackendProduct);
    // if (Object.keys(errorsBackendProduct).length !== 0) {
    //   setErrors(errorsBackendProduct);
    // }
  }, [errorsBackendProduct]);

  const handleSubmitProducts = () => {
    if (type === 'new') {
      // GUARDAR
      dispatch(saveProduct({ idCommerce, dataProduct: form }));
      // console.log('FORM GUARDAR', form);
    } else {
      // ACTUALIZAR
      dispatch(updateProduct(form));
      // console.log('FOR ACTUALIZAR', form);
    }
    setNameCategory('');
    // dispatch(saveUser(form));
  };

  useEffect(() => {
    if (type === 'edit' && data) {
      setForm({ ...form, ...data, photo: null, category_id: data.category?.id });
      const selectCategory = categories.find((item) => item.id === data.category.id);

      setNameCategory(selectCategory);
    } else {
      setForm({ ...form, ...initialData });
    }
  }, [data, dispatch]);

  const handleChangeCategoria = (event, newValue) => {
    if (newValue) {
      // setForm({ ...form, category_id: newValue.id });
      setInForm('category_id', newValue?.id);
      setNameCategory(categories.find((item) => item.id === newValue?.id));
    }
  };

  return (
    <form>
      <DialogContent classes={{ root: 'p-0' }}>
        <div className="px-16 sm:px-24 space-y-16">
          <div className="flex gap-8">
            <TextField
              error={!!errors?.name}
              helperText={errors?.name && errors?.name}
              id="name"
              label="Nombre"
              name="name"
              value={form.name}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-8">
            <Autocomplete
              className="w-full"
              value={nameCategory}
              options={categories}
              getOptionLabel={(i) => i.category}
              id="category_id"
              renderInput={(params) => (
                <TextField
                  error={!!errors?.category_id}
                  helperText={errors?.category_id && errors?.category_id}
                  fullWidth
                  {...params}
                  label="Seleccione Categoria"
                  variant="outlined"
                />
              )}
              size="small"
              onChange={(event, newValue) => {
                setInForm('category_id', newValue?.id);
                setNameCategory(categories.find((item) => item.id === newValue?.id));
              }}
            />
          </div>

          <div className="flex gap-8">
            <TextField
              error={!!errors?.description}
              helperText={errors?.description && errors?.description}
              id="description"
              label="Descripción"
              name="description"
              value={form.description}
              variant="outlined"
              fullWidth
              multiline
              maxRows={4}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-8">
            <TextField
              error={!!errors?.code}
              helperText={errors?.code && errors?.code}
              id="code"
              label="Codigo"
              name="code"
              value={form.code}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-8">
            <CurrencyTextField
              error={!!errors?.price_sale}
              helperText={errors?.price_sale && errors?.price_sale}
              id="price_sale"
              fullWidth
              label="Precio de venta"
              name="price_sale"
              variant="outlined"
              value={form.price_sale === 0 ? 1 : form.price_sale}
              decimalPlaces={0}
              digitGroupSeparator=","
              currencySymbol="$"
              outputFormat="number"
              minimumValue={1}
              onChange={(event, value) => setInForm('price_sale', value)}
            />
          </div>

          <div className="flex gap-8">
            <CurrencyTextField
              error={!!errors?.price_discount}
              helperText={errors?.price_discount && errors?.price_discount}
              id="price_discount"
              label="Precio de descuento"
              name="price_discount"
              /* eslint-disable-next-line no-nested-ternary */
              value={
                // eslint-disable-next-line no-nested-ternary
                typeof form.price_discount !== 'number'
                  ? 1
                  : form.price_discount === 0
                  ? 1
                  : form.price_discount
              }
              variant="outlined"
              fullWidth
              onChange={(event, value) => setInForm('price_discount', value)}
              decimalPlaces={0}
              digitGroupSeparator=","
              currencySymbol="$"
              outputFormat="number"
              minimumValue={1}
            />
          </div>

          <div className="flex gap-8">
            <TextField
              error={!!errors?.preparation_time}
              helperText={errors?.preparation_time && errors?.preparation_time}
              id="preparation_time"
              label="Tiempo de preparación"
              name="preparation_time"
              value={form.preparation_time}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </div>

          <div className={`w-full flex ${data?.photo?.has_photo ? '' : 'flex-col'} mt-8`}>
            <div className={`${data?.photo?.has_photo ? 'w-1/2' : 'w-full'} flex flex-col`}>
              <span className="inline-block justify-start font-bold mb-4">Imagen del producto</span>
              <FilePond
                allowMultiple={false}
                credits=""
                labelIdle="<span>SUBE LA FOTO DEL PRODUCTO</span>"
                name="files"
                onupdatefiles={(files) => {
                  // if (blogDialog.type === 'edit') {
                  // 	setInForm('photo', '');
                  // }
                  setInForm('photo', files[0]?.file);
                }}
              />
              <span className="inline-block justify-start">Imagenes de 25 x 25</span>
            </div>
            {type === 'edit' && data?.photo?.has_photo && (
              <div className="w-1/2 flex flex-col mt-4">
                <img
                  src={data?.photo?.url}
                  alt="foto"
                  className="block mx-auto rounded-8 shadow-md"
                  style={{ width: '180px', height: '180px' }}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      {type === 'new' ? (
        <DialogActions className="justify-between px-8 py-16">
          <div className="px-16">
            <Button
              onClick={handleSubmitProducts}
              variant="contained"
              color="secondary"
              /* eslint-disable-next-line no-undef */
            >
              Agregar
            </Button>
          </div>
        </DialogActions>
      ) : (
        <DialogActions className="justify-between px-8 py-16">
          <div className="px-16">
            <Button onClick={handleSubmitProducts} variant="contained" color="secondary">
              Guardar
            </Button>
          </div>
        </DialogActions>
      )}
    </form>
  );
};

export default ProductContent;

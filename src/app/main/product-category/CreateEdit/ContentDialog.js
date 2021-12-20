import { DialogActions, Switch, TextField } from '@material-ui/core';
import { MdClose, MdSave } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { useForm } from '../../../../@fuse/hooks';
import {
  closeEditCategoryDialog,
  closeNewCategoryDialog,
  saveCategory,
  updateCategory,
} from '../../../store/app/categorySlice';

const defaultFormState = {
  id: 0,
  category: '',
};

const CustomSwitch = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: red[500],
  },
})(Switch);

const ContentDialog = ({ typeDialog }) => {
  const dispatch = useDispatch();
  const [estado, setEstado] = useState(false);
  const { data } = useSelector(({ categories }) => categories.categoryDialog);
  const { idCommerce: commerceId } = useSelector(({ categories }) => categories);
  // const { commerceId } = useSelector(({ fuse }) => fuse.dialog.options);
  const { errors: errorsBackend } = useSelector(({ categories }) => categories);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    defaultFormState,
    () => handleSubmitCrearCategory()
  );

  useEffect(() => {
    if (Object.keys(errorsBackend).length !== 0) {
      setErrors(errorsBackend);
    }
  }, [errorsBackend]);

  useEffect(() => {
    if (data) {
      setForm({ ...form, ...data });
    }
  }, [data]);

  const handleSubmitCrearCategory = () => {
    const dataToSave = {
      idCommerce: commerceId,
      dataCategory: form,
    };

    if (typeDialog === 'new') {
      // CREAR CATEGORIA
      dispatch(saveCategory(dataToSave));
    } else {
      // TODO ACTUALIZAR CATEGORIA
      dispatch(updateCategory(dataToSave));
    }
  };

  const handleClseDialogByType = () => {
    if (typeDialog === 'new') {
      dispatch(closeNewCategoryDialog());
    } else {
      dispatch(closeEditCategoryDialog());
    }
  };

  return (
    <div>
      <div className="my-8">
        <TextField
          error={!!errors?.category}
          helperText={errors?.category && errors?.category}
          id="category"
          label="Nombre"
          name="category"
          value={form.category}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>

      {/* <div className="my-8 mt-16 flex justify-end align-middle items-center gap-8"> */}
      {/*  <span className="inline-block font-bold ">Estado</span> */}
      {/*  <FormGroup row> */}
      {/*    <FormControlLabel */}
      {/*      control={ */}
      {/*        <CustomSwitch */}
      {/*          checked={estado} */}
      {/*          onChange={(event) => { */}
      {/*            // handleChangeEstado(event, n); */}
      {/*            setEstado(!estado); */}
      {/*          }} */}
      {/*          name="estado" */}
      {/*        /> */}
      {/*      } */}
      {/*      label="" */}
      {/*    /> */}
      {/*  </FormGroup> */}
      {/* </div> */}

      <DialogActions className="justify-center p-8">
        <div>
          <Button
            className="mr-16"
            color="primary"
            startIcon={<MdClose />}
            variant="contained"
            onClick={() => handleClseDialogByType()}
          >
            Cancelar
          </Button>
        </div>
        <div>
          <Button
            color="secondary"
            startIcon={<MdSave />}
            onClick={handleSubmitCrearCategory}
            variant="contained"
          >
            Guardar
          </Button>
        </div>
      </DialogActions>
    </div>
  );
};

export default ContentDialog;

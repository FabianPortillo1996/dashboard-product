import { DialogActions, TextField } from '@material-ui/core';
import { MdClose, MdSave } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useForm } from '../../../../@fuse/hooks';
import { closeDialog } from '../../../store/fuse/dialogSlice';

const defaultFormState = {
  id: 0,
  nombre: '',
  email: '',
  password: '',
  estado: true,
};
const ContentDialog = () => {
  const dispatch = useDispatch();
  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    defaultFormState,
    () => handleSubmitCrearUsuario()
  );
  const handleSubmitCrearUsuario = () => {
    console.log(form);
  };

  return (
    <div>
      <div className="my-8">
        <TextField
          // error={!!errors.name}
          // helperText={errors.name && errors.name}
          id="nombre"
          label="Nombre"
          name="nombre"
          value={form.nombre}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div className="my-8">
        <TextField
          // error={!!errors.name}
          // helperText={errors.name && errors.name}
          id="correo"
          label="Email"
          name="email"
          value={form.email}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div className="my-8">
        <TextField
          // error={!!errors.name}
          // helperText={errors.name && errors.name}
          id="password"
          label="Contraseña"
          name="password"
          value={form.password}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <DialogActions className="justify-center p-8">
        <div>
          <Button
            className="mr-16"
            color="primary"
            startIcon={<MdClose />}
            variant="contained"
            onClick={() => dispatch(closeDialog())}
          >
            Cancelar
          </Button>
        </div>
        <div>
          <Button color="secondary" startIcon={<MdSave />} type="submit" variant="contained">
            Guardar
          </Button>
        </div>
      </DialogActions>
    </div>
  );
};

export default ContentDialog;

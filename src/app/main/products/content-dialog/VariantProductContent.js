import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { DialogActions } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { motion } from 'framer-motion';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';
import CommentsTableHead from '../../comments/CommentsTableHead';
import FuseScrollbars from '../../../../@fuse/core/FuseScrollbars/FuseScrollbars';
import { useForm } from '../../../../@fuse/hooks';
import {
  changeStatusVariant,
  editVariant,
  endEditVariant,
  saveVariant,
  updateVariant,
} from '../../../store/app/productSlice';

const initialData = {
  id: 0,
  name: '',
  price: '',
};

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'price_sale',
    align: 'left',
    disablePadding: false,
    label: 'Precio',
    sort: true,
  },
  {
    id: 'actions',
    align: 'center',
    disablePadding: false,
    label: 'Acciones',
    sort: true,
  },
];

const VariantProductContent = () => {
  const dispatch = useDispatch();

  const { type, data: dataEdit } = useSelector(({ products }) => products.variantProduct);
  const { data: DataProduct } = useSelector(({ products }) => products.productDialog);
  const { dataVariants } = useSelector(({ products }) => products);
  const { errorsVariants: errorsBackend } = useSelector(({ products }) => products);
  // const labels = useSelector(selectLabels);
  const [data, setData] = useState(dataVariants);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [idProduct, setIdProduct] = useState(0);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm, resetForm } =
    useForm(initialData, () => handleSubmitVariantProducts());

  useEffect(() => {
    if (Object.keys(errorsBackend).length !== 0) {
      setErrors(errorsBackend);
    }
  }, [errorsBackend]);

  useEffect(() => {
    setData(dataVariants);
  }, [dataVariants]);

  useEffect(() => {
    setIdProduct(DataProduct?.id);
  }, [DataProduct]);

  const handleSubmitVariantProducts = () => {
    if (type === 'new') {
      // GUARDAR
      dispatch(saveVariant({ ...form, product_id: DataProduct.id }));
    } else {
      // ACTUALIZAR
      dispatch(updateVariant(form));
      dispatch(endEditVariant());
    }
    resetForm();
    // dispatch(saveUser(form));
  };

  useEffect(() => {
    if (type === 'edit' && dataEdit) {
      setForm({ ...form, ...dataEdit });
    } else {
      setForm({ ...form, ...initialData });
    }
  }, [dataEdit, dispatch]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <>
      <form className="flex ">
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="w-full flex gap-8">
            <div className="flex gap-8 w-1/2">
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
                style={{ marginRight: '0.5rem' }}
              />
            </div>
            <div className="flex gap-8 w-1/2">
              <CurrencyTextField
                error={!!errors?.price}
                helperText={errors?.price && errors?.price}
                id="price"
                label="Precio de venta"
                name="price"
                /* eslint-disable-next-line no-nested-ternary */
                value={form.price === 0 ? 1 : form.price}
                variant="outlined"
                fullWidth
                onChange={(event, value) => setInForm('price', value)}
                decimalPlaces={0}
                digitGroupSeparator=","
                currencySymbol="$"
                outputFormat="number"
                minimumValue={1}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions className="px-4 py-16">
          <div className="px-16 flex gap-8">
            <Button
              onClick={handleSubmitVariantProducts}
              variant="contained"
              color="secondary"
              style={{ marginRight: '0.5rem' }}
              /* eslint-disable-next-line no-undef */
            >
              {type === 'new' ? 'Guardar' : 'Editar'}
            </Button>
            <Button
              onClick={() => {
                dispatch(endEditVariant());
                resetForm();
              }}
              variant="contained"
              color="secondary"
              style={{ background: '#FF004E', color: 'white' }}
              /* eslint-disable-next-line no-undef */
            >
              Cancelar
            </Button>
          </div>
        </DialogActions>
      </form>
      <div className="w-full flex flex-col">
        {!data || data?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full mt-8"
          >
            <Typography color="textSecondary" variant="h5">
              No existen variantes del producto!
            </Typography>
          </motion.div>
        ) : (
          <>
            <FuseScrollbars className="flex-grow overflow-x-auto">
              <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                <CommentsTableHead rows={rows} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                    return (
                      <TableRow
                        className="h-72 cursor-pointer"
                        hover
                        // role="checkbox"
                        // aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        // selected={isSelected}
                        // onClick={(event) => handleClick(n)}
                      >
                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                          {n.name}
                        </TableCell>

                        <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                          {numeral(n.price).format('$ 0,0')}
                        </TableCell>

                        <TableCell
                          className="p-4 md:p-16 truncate"
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <div>
                            <IconButton
                              onClick={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                dispatch(editVariant(n));
                              }}
                            >
                              <Icon style={{ color: '#00CE84' }}>edit_note</Icon>
                            </IconButton>
                            <Tooltip title={n?.status?.is_enabled ? 'Inhabilitar' : 'Habilitar'}>
                              <IconButton
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                  // TODO: DISPATCH PARA CAMBIAR EL ESTADO DE LA VARIANTE
                                  dispatch(changeStatusVariant(n.id));
                                }}
                              >
                                <Icon
                                  style={{
                                    color: `${n.status?.is_enabled ? '#FF004E' : '#00CE84'}`,
                                  }}
                                >
                                  {n.status?.is_enabled ? 'remove_circle' : 'check_circle'}
                                </Icon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </FuseScrollbars>
            <TablePagination
              className="flex-shrink-0 border-t-1"
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              /* eslint-disable-next-line react/jsx-no-bind */
              onPageChange={handleChangePage}
              /* eslint-disable-next-line react/jsx-no-bind */
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default VariantProductContent;

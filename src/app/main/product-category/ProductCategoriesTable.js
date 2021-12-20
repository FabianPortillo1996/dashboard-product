import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
// import { getProducts, selectProducts } from '../store/userSlice';
import { Switch } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import ProductCategoriesTableHead from './ProductCategoriesTableHead';
import {
  changeStatusCategory,
  getCategories,
  openEditCategoryDialog,
  selectCategories,
} from '../../store/app/categorySlice';

const initialFakeData = [
  {
    id: 1,
    nombre: 'Pedro del Castillo Rojas',
    mail: 'pedro@gmail.com',
    estado: true,
  },
  {
    id: 2,
    nombre: 'Juan Castro Rojas',
    mail: 'juan@gmail.com',
    estado: false,
  },
];

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'estado',
    align: 'left',
    disablePadding: false,
    label: 'Estado',
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

function ProductCategoriesTable() {
  const dispatch = useDispatch();

  const searchText = useSelector(({ categories }) => categories.searchText);
  const categorias = useSelector(selectCategories);
  const [idCommerce, setIdCommerce] = useState(0);

  const { infoUser } = useSelector(({ users }) => users);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(categorias);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // dispatch(getInfoUser());
    if (categorias) {
      setData(categorias);
    }
  }, [categorias]);

  useEffect(() => {
    if (infoUser) {
      // const { id } = infoUser?.commerce?.data;
      setIdCommerce(infoUser?.commerce?.data?.id);
      dispatch(getCategories(infoUser?.commerce?.data?.id));
    }
  }, [infoUser]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(data, (item) => item.category.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(categorias);
    }
  }, [categorias, searchText]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          No existen Categorias!
        </Typography>
      </motion.div>
    );
  }

  if (!infoUser?.has_commerce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          No existe comercio!
        </Typography>
      </motion.div>
    );
  }

  const handleChangeEstado = (event, usuario) => {
    setData(
      data.map((item) => {
        if (item.id === usuario.id) {
          return {
            ...usuario,
            estado: !usuario.estado,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductCategoriesTableHead rows={rows} />
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
                    {n.category}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.status.status}
                  </TableCell>

                  <TableCell
                    className="p-4 md:p-16 truncate "
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="lg:mb-8">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ width: '8em', marginBottom: '0.5rem' }}
                          onClick={() => {
                            // dispatch(openEditTodoDialog(n));
                            // dispatch(
                            //   openDialog({ title: 'Editar Categoria', commerceId: idCommerce })
                            // );
                            dispatch(openEditCategoryDialog({ data: n, idCommerce }));
                          }}
                        >
                          Editar
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="submit"
                          variant="contained"
                          className="text-white"
                          style={{
                            backgroundColor: n.status.is_enabled ? '#FF004E' : '#00CE84',
                            width: '8em',
                          }}
                          onClick={() =>
                            dispatch(changeStatusCategory({ idCommerce, idCategory: n.id }))
                          }
                        >
                          {n.status.is_enabled ? 'Inhabilitar' : 'Activar'}
                        </Button>
                      </div>
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
    </div>
  );
}

export default withRouter(ProductCategoriesTable);

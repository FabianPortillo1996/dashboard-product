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
import numeral from 'numeral';
import Button from '@material-ui/core/Button';
import ProductsTableHead from './ProductsTableHead';
import {
  changeStatusProduct,
  openEditProductDialog,
  populateDataVariants,
} from '../../store/app/productSlice';

const initialData = {
  id: 0,
  imagen: '',
  tipo: '',
  categoria: 0,
  nombre: '',
  descripcion: '',
  codigo: '',
  venta: 0,
  tiempo: 0,
  promocion: 0,
};

const initialFakeData = [
  {
    id: 1,
    imagen: 'https://www.plastico.com/documenta/imagenes/139525/starbucks-empaques-g.jpg',
    categoria: 'Cervezas',
    nombre: 'Producto 1',
    codigo: 'X2RS22',
    venta: 20,
  },
  {
    id: 2,
    imagen: 'https://www.plastico.com/documenta/imagenes/139525/starbucks-empaques-g.jpg',
    categoria: 'Cervezas',
    nombre: 'Producto 2',
    codigo: 'X2FTY2',
    venta: 20,
  },
  {
    id: 3,
    imagen: 'https://www.plastico.com/documenta/imagenes/139525/starbucks-empaques-g.jpg',
    categoria: 'Comida China',
    nombre: 'Producto 3',
    codigo: 'CB4S22',
    venta: 30,
  },
];

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: 'Imagen',
    sort: true,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'Categoria',
    sort: true,
  },
  {
    id: 'code',
    align: 'left',
    disablePadding: false,
    label: 'Código',
    sort: true,
  },
  {
    id: 'price',
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

const ProductsVariant = [
  {
    id: 1,
    name: 'Variante 1',
    price_sale: 1548124,
  },
  {
    id: 2,
    name: 'Variante 2',
    price_sale: 1548124,
  },
  {
    id: 3,
    name: 'Variante 3',
    price_sale: 1548124,
  },
  {
    id: 4,
    name: 'Variante 4',
    price_sale: 1548124,
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

function ProductsTable({ dataFilter, idCommerce }) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ products }) => products.searchText);
  const { infoUser } = useSelector(({ users }) => users);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(dataFilter);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(data, (item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(dataFilter);
    }
  }, [dataFilter, searchText]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          No existen Productos!
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
          No existe Comercio!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead rows={rows} />
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
                    {n?.photo?.url && (
                      <img className="block w-52 h-52 rounded" src={n.photo.url} alt={n.name} />
                    )}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.name}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.category.status}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.code}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {numeral(n.price_sale).format('$ 0,0')}
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
                            dispatch(openEditProductDialog({ data: n, idCommerce }));
                            dispatch(populateDataVariants(n.productVariants?.data));
                          }}
                        >
                          Editar
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => dispatch(changeStatusProduct(n.id))}
                          variant="contained"
                          // color="default"
                          className="text-white"
                          style={{
                            backgroundColor: n.status.is_enabled ? '#FF004E' : '#00CE84',
                            width: '8em',
                          }}
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

export default withRouter(ProductsTable);

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
import CommentsTableHead from './CommentsTableHead';

const initialFakeData = [
  {
    id: 1,
    nombre: 'Pedro del Castillo Rojas',
    mail: 'pedro@gmail.com',
    intereses: ['musica', 'ligar', 'comida', 'viajes'],
    comentarios: 'Muy buena la App.',
  },
  {
    id: 2,
    nombre: 'Juan Castro Rojas',
    mail: 'juan@gmail.com',
    intereses: ['musica', 'ligar', 'comida', 'viajes'],
    comentarios: 'Muy facil de usar.',
  },
  {
    id: 3,
    nombre: 'Ricardo Mendoza',
    mail: 'ricardo@gmail.com',
    intereses: ['musica', 'ligar', 'comida', 'viajes'],
    comentarios: 'Me ayudo a conocer gente.',
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
    id: 'correo',
    align: 'left',
    disablePadding: false,
    label: 'Correo',
    sort: true,
  },
  {
    id: 'intereses',
    align: 'left',
    disablePadding: false,
    label: 'Intereses',
    sort: true,
  },
  {
    id: 'comentarios',
    align: 'left',
    disablePadding: false,
    label: 'Comentarios',
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

function CommentsTable() {
  const dispatch = useDispatch();
  // const products = useSelector(selectProducts);
  const searchText = useSelector(({ users }) => users.searchText);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('');
  const [selected, setSelected] = useState([]);
  // const [data, setData] = useState(products);
  const [data, setData] = useState(initialFakeData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    // dispatch(getProducts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(data, (item) => item.nombre.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(initialFakeData);
    }
  }, [initialFakeData, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    // props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

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
          No existen Usuarios!
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
                    {n.nombre}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.mail}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.intereses.map((item) => {
                      <div className="flex items-center justify-center gap-4">
                        <span className="block border-1 border-red">{item}</span>;
                      </div>;
                    })}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.comentarios}
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

export default withRouter(CommentsTable);

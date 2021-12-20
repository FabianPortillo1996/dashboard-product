import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { openNewProductDialog, setFilter } from '../../store/app/productSlice';
import { showMessage } from '../../store/fuse/messageSlice';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: '100%',
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 4,
    '&.active': {
      backgroundColor:
        theme.palette.type === 'light'
          ? 'rgba(0, 0, 0, .05)!important'
          : 'rgba(255, 255, 255, .1)!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '& .list-item-icon': {
      fontSize: 16,
      width: 16,
      height: 16,
      marginRight: 16,
    },
  },
  listSubheader: {
    paddingLeft: 12,
  },
}));

const categoriasFake = [
  {
    id: 1,
    nombre: 'Cervezas',
  },
  {
    id: 2,
    nombre: 'Hambuerguesas',
  },
  {
    id: 3,
    nombre: 'Comida Japonesa',
  },
];

function ProductsSidebarContent(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { infoUser } = useSelector(({ users }) => users);

  // TODO: RECUPERAR LAS CATEGORIAS DEL STORE PARA LISTARLAS

  const handleSelectCategoryFilter = (id) => {
    dispatch(setFilter(id));
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      className="flex-auto border-l-1 border-solid"
    >
      <div className="p-24 pb-16">
        <Button
          onClick={() => {
            if (infoUser?.has_commerce) {
              dispatch(openNewProductDialog(props.commerceId));
            } else {
              dispatch(
                showMessage({
                  message: 'Cree un comercio antes de agregar un producto.',
                  variant: 'error',
                })
              );
            }
          }}
          variant="contained"
          color="secondary"
          className="w-full"
        >
          Nuevo Producto
        </Button>
      </div>
      <div className="px-12">
        <List>
          {props?.categories && (
            <>
              <ListSubheader className={classes.listSubheader} disableSticky>
                CATEGORIAS
              </ListSubheader>

              <FormControl component="fieldset">
                <RadioGroup aria-label="categoria" defaultValue="all" name="radio-buttons-group">
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="Todos"
                    onClick={(event) => handleSelectCategoryFilter(0)}
                  />
                  {props.categories.map((item) => (
                    <FormControlLabel
                      value={item?.id?.toString()}
                      control={<Radio />}
                      label={item?.category}
                      onClick={(event) => handleSelectCategoryFilter(item?.id)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          )}
        </List>
      </div>
    </motion.div>
  );
}

export default ProductsSidebarContent;

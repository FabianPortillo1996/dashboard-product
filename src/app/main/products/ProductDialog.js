import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IconButton } from '@material-ui/core';
import {
  closeEditProductDialog,
  closeNewProductDialog,
  emtyDataVariants,
  endEditVariant,
  getProdutsByCategory,
  getProdutsByCommerce,
  setFilter,
} from '../../store/app/productSlice';
import FusePageSimple from '../../../@fuse/core/FusePageSimple';
import ProductContent from './content-dialog/ProductContent';
import VariantProductContent from './content-dialog/VariantProductContent';

const useStyles = makeStyles({
  layoutRoot: {},
});

function ProductDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { infoUser } = useSelector(({ users }) => users);
  const { type, props } = useSelector(({ products }) => products.productDialog);
  const { filter } = useSelector(({ products }) => products);
  const [selectedTab, setSelectedTab] = useState(0);

  /**
   * Close Dialog
   */
  function closeTodoDialog() {
    setSelectedTab(0);
    dispatch(endEditVariant());
    dispatch(emtyDataVariants());

    if (!filter || filter === 0) {
      dispatch(setFilter(0));
      dispatch(getProdutsByCommerce(infoUser?.commerce?.data?.id));
    } else {
      // dispatch(setFilter(0));
      dispatch(getProdutsByCategory(filter));
    }

    if (type === 'edit') {
      dispatch(closeEditProductDialog());
    } else {
      dispatch(closeNewProductDialog());
    }
  }

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Dialog {...props} onClose={closeTodoDialog} fullWidth maxWidth="md">
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex justify-between w-full">
          <Typography variant="subtitle1" color="inherit">
            {type === 'new' ? 'Nuevo Producto' : 'Editar Producto'}
          </Typography>
          <IconButton className="cursor-pointer text-white" onClick={() => closeTodoDialog()}>
            <MdClose />
          </IconButton>
        </Toolbar>
      </AppBar>
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          toolbar: 'px-16 sm:px-24',
        }}
        // header={}
        contentToolbar={
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="off"
            className="w-full h-64 border-b-1"
          >
            <Tab className="h-64" label="Producto" />
            <Tab className="h-64" label="Variante" />
          </Tabs>
        }
        content={
          <div className="p-24">
            {selectedTab === 0 && (
              <div>
                {/* <h3 className="mb-16">Producto</h3> */}
                <ProductContent />
              </div>
            )}
            {selectedTab === 1 && (
              <div>
                {/* <h3 className="mb-16">Variante</h3> */}
                <VariantProductContent />
              </div>
            )}
          </div>
        }
      />
    </Dialog>
  );
}

export default ProductDialog;

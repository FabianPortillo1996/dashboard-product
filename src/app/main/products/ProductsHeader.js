import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setProductsSearchText } from '../../store/app/productSlice';

function ProductsHeader(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ products }) => products.searchText);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
        <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
          <Hidden lgUp>
            <IconButton
              onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            placeholder="Buscar"
            className="px-16"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Buscar',
            }}
            onChange={(ev) => dispatch(setProductsSearchText(ev))}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default ProductsHeader;

import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import ProductsHeader from './ProductsHeader';
import ProductsSidebarContent from './ProductsSidebarContent';
import ProductsSidebarHeader from './ProductsSidebarHeader';
import ProductsTable from './ProductsTable';
import ProductDialog from './ProductDialog';
import { getCategories, selectCategories } from '../../store/app/categorySlice';
import {
  getProdutsByCategory,
  getProdutsByCommerce,
  selectProducts,
} from '../../store/app/productSlice';

function Products(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  const { infoUser } = useSelector(({ users }) => users);
  const { filter, productFilter } = useSelector(({ products }) => products);
  const [commerceId, setCommerceId] = useState(0);
  // const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);

  useEffect(() => {
    // dispatch(getInfoUser());
  }, []);

  useEffect(() => {
    if (infoUser) {
      // const { id } = infoUser?.commerce?.data;
      dispatch(getCategories(infoUser?.commerce?.data?.id));
      setCommerceId(infoUser?.commerce?.data?.id);
      // dispatch(getProdutsByCommerce(id));
    }
  }, [infoUser]);

  useEffect(() => {
    if (infoUser) {
      if (filter === 0) {
        // TRAER TODAS LAS CATEGORIAS
        // const id = infoUser?.commerce?.data?.id;
        dispatch(getProdutsByCommerce(infoUser?.commerce?.data?.id));
      } else {
        // TRAER CATEGORIAS FILTRADAS
        dispatch(getProdutsByCategory(filter));
      }
    }
  }, [infoUser, filter]);

  useEffect(() => {
    // dispatch(getFilters());
    // dispatch(getFolders());
    // dispatch(getLabels());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    // dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<ProductsHeader pageLayout={pageLayout} />}
        contentToolbar=""
        content={<ProductsTable dataFilter={products} idCommerce={commerceId} />}
        leftSidebarHeader={<ProductsSidebarHeader />}
        leftSidebarContent={
          <ProductsSidebarContent categories={categories} commerceId={commerceId} />
        }
        ref={pageLayout}
        innerScroll
      />
      <ProductDialog />
    </>
  );
}

export default Products;

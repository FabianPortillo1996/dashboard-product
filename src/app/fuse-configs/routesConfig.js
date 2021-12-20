import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import CommentsConfig from '../main/comments/CommentsConfig';
import ProductConfig from '../main/products/ProductConfig';
import ProductCategoryConfig from '../main/product-category/ProductCategoryConfig';
import LoginConfig from '../main/login/LoginConfig';
import { authRoles } from '../auth';

const routeConfigs = [
  LoginConfig,
  CommentsConfig,
  ProductConfig,
  ProductCategoryConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff']),
  {
    exact: true,
    path: '/',
    auth: authRoles.staff,
    component: () => <Redirect to="/products" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;

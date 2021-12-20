import { lazy } from 'react';

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    // {
    //   path: [
    //     '/apps/todo/label/:labelHandle/:todoId?',
    //     '/apps/todo/filter/:filterHandle/:todoId?',
    //     '/apps/todo/:folderHandle/:todoId?',
    //   ],
    //   component: lazy(() => import('./ProductsBank')),
    // },
    // {
    //   path: '/products',
    //   component: () => <Redirect to="/apps/todo/all" />,
    // },
    {
      path: '/products',
      component: lazy(() => import('./Products')),
    },
    // {
    //   path: '/products',
    //   component: () => <Redirect to="/apps/todo/all" />,
    // },
  ],
};

export default ProductConfig;

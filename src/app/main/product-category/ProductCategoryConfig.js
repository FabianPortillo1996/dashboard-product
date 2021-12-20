import React from 'react';

const ProductCategoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/category',
      component: React.lazy(() => import('./ProductCategories')),
    },
  ],
};

export default ProductCategoryConfig;

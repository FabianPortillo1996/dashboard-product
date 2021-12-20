import React from 'react';
import { authRoles } from '../../auth';

const CommentsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.staff,
  routes: [
    {
      path: '/comments',
      component: React.lazy(() => import('./Comments')),
    },
  ],
};

export default CommentsConfig;

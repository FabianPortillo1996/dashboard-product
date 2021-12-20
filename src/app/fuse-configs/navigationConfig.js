import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Modulos',
    translate: 'Modulos',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'product-component',
        title: 'Productos',
        translate: 'Productos',
        type: 'item',
        icon: 'widgets',
        url: '/products',
        auth: authRoles.staff,
      },
      {
        id: 'product-category-component',
        title: 'Categoría productos',
        translate: 'Categoría productos',
        type: 'item',
        icon: 'widgets',
        url: '/category',
        auth: authRoles.staff,
      },
    ],
  },
];

export default navigationConfig;

import FusePageCarded from '@fuse/core/FusePageCarded';
import UsersHeader from './ProductCategoriesHeader';
import UsersTable from './ProductCategoriesTable';
import CreateEditProductCategoryDialog from './CreateEdit/CreateEditProductCategoryDialog';

function ProductCategories() {
  return (
    <>
      <FusePageCarded
        classes={{
          content: 'flex',
          contentCard: 'overflow-hidden',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<UsersHeader />}
        content={<UsersTable />}
        innerScroll
      />
      <CreateEditProductCategoryDialog />
    </>
  );
}

export default ProductCategories;

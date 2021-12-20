import FusePageCarded from '@fuse/core/FusePageCarded';
import UsersHeader from './CommentsHeader';
import UsersTable from './CommentsTable';
import CreateEditCommentDialog from './CreateEdit/CreateEditCommentDialog';

function Comments() {
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
      <CreateEditCommentDialog />
    </>
  );
}

export default Comments;

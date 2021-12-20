import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@material-ui/core';

import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

// import { closeNewUsersImportDialog } from '../../../store/app/usuariosSlice';

import ContentDialog from './ContentDialog';
import { closeDialog } from '../../../store/fuse/dialogSlice';

const CreateEditCommentDialog = () => {
  const dispatch = useDispatch();

  // const usersImportDialog = useSelector(({ usuarios }) => usuarios.usersImportDialog);
  const isOpenDialog = useSelector(({ fuse }) => fuse.dialog.state);
  const optionsDialog = useSelector(({ fuse }) => fuse.dialog.options);

  const closeCreateEditUserDialog = () => {
    dispatch(closeDialog());
  };

  const handleUploadChange = (e) => {};

  return (
    <Dialog
      classes={{
        paper: 'm-0',
      }}
      open={isOpenDialog}
      maxWidth="sm"
      fullWidth
      onClose={() => closeCreateEditUserDialog()}
    >
      <AppBar elevation={1} position="static">
        <Toolbar className="flex justify-between w-full">
          <Typography color="inherit" variant="subtitle1">
            {optionsDialog.title}
          </Typography>
          <IconButton
            className="cursor-pointer text-white"
            onClick={() => closeCreateEditUserDialog()}
          >
            <MdClose />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent className="p-8">
        <div className="mx-16">
          <ContentDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCommentDialog;

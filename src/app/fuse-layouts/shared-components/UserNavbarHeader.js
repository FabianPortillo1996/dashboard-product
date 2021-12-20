import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
    },
  },
  avatar: {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);
  const { infoUser } = useSelector(({ users }) => users);
  const [urlLogo, setUrlLogo] = useState('');

  const classes = useStyles();

  useEffect(() => {
    if (infoUser?.rol?.rol === 'Administrador' && !infoUser?.has_commerce) {
      // ES ADMIN
      setUrlLogo('assets/images/avatars/Perfil-Wuay.jpg');
    } else {
      // ES COMERCIO
      const uri = infoUser?.commerce
        ? infoUser.commerce?.data?.logo?.url
        : 'assets/images/avatars/Foto-avatar.jpg';
      setUrlLogo(uri);
    }
  }, [infoUser]);

  return (
    <AppBar
      position="static"
      color="primary"
      classes={{ root: classes.root }}
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      <Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
        {user.data.displayName}
      </Typography>
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
      >
        {user.data.email}
      </Typography>
      <div className="flex items-center justify-center absolute bottom-0 -mb-44">
        <Avatar
          className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')}
          alt="user photo"
          src={urlLogo}
        />
      </div>
    </AppBar>
  );
}

export default UserNavbarHeader;

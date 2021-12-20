import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .logo-icon': {
      transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    '& .react-badge, & .logo-text': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  reactBadge: {
    backgroundColor: '#121212',
    color: '#61DAFB',
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex items-center')}>
      <img className="logo-icon w-24 h-24" src="assets/images/logos/tender.svg" alt="logo" />
      <Typography className="text-16 leading-none mx-12 font-medium logo-text" color="inherit">
        Prueba
      </Typography>
      {/* <div className={clsx(classes.reactBadge, 'react-badge flex items-center py-4 px-8 rounded')}> */}
      {/*  <img */}
      {/*    className="react-logo" */}
      {/*    src="../../assests/tender.svg" */}
      {/*    alt="tender-logo" */}
      {/*    width="16" */}
      {/*  /> */}
      {/*   <span className="react-text text-12 mx-4">React</span> */}
      {/* </div> */}
    </div>
  );
}

export default Logo;

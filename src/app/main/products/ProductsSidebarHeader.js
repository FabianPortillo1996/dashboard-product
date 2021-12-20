import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';

const accounts = {
  creapond: 'johndoe@creapond.com',
  withinpixels: 'johndoe@withinpixels.com',
};

function ProductsSidebarHeader() {
  // const [selectedAccount, setSelectedCount] = useState('creapond');

  // function handleAccountChange(ev) {
  //   setSelectedCount(ev.target.value);
  // }

  return (
    <div className="flex flex-col justify-center h-full p-24">
      <div className="flex items-center flex-1">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          filter_alt
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          Filtros
        </Typography>
      </div>
    </div>
  );
}

export default ProductsSidebarHeader;

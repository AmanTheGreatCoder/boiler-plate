import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import Logo from 'components/Logo';

const LogoSection = () => (
  <Link component={RouterLink} to="/dashboard">
    <Logo />
  </Link>
);

export default LogoSection;

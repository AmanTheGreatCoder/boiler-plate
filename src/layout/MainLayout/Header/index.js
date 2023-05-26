import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { AzhaiAuthContext } from 'contexts/AuthContext';
import UserAddEdit from 'pages/User/UserAddEdit';
import { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import APIManager from 'utils/APImanager';
import LogoSection from '../LogoSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';

const apiManager = new APIManager();

const Header = () => {
  const theme = useTheme();
  const { auth, setAuth } = useContext(AzhaiAuthContext);
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const modalRef = useRef(null);
  const profileCardRef = useRef(null);

  const { _id, fullName, email, fullNumber } = auth;
  const editData = {
    _id,
    fullName,
    email,
    fullNumber
  };

  const editProfileClick = () => {
    modalRef.current.handleOpen();
    profileCardRef.current.handleClose();
  };

  const setProfile = async () => {
    const res = await apiManager.get('auth/profile');

    if (!res.error) {
      setAuth(res.data);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.secondary.dark,
            marginLeft: '50px',
            '&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.light
            }
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <UserAddEdit setProfile={setProfile} ref={modalRef} editData={editData} />
      <Box sx={{ flexGrow: 1 }} />
      <ProfileSection
        ref={profileCardRef}
        editProfileClick={editProfileClick}
      />
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;

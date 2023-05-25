import PropTypes from 'prop-types';
import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
// import { debounce, __ } from 'lodash'
import debounce from 'lodash.debounce';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'components/Transition';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background:
    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
  color:
    theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
  '&:hover': {
    background:
      theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    color:
      theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatarStyle variant="rounded">
            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
          </HeaderAvatarStyle>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.orange.light,
                color: theme.palette.orange.dark,
                '&:hover': {
                  background: theme.palette.orange.dark,
                  color: theme.palette.orange.light
                }
              }}
              {...bindToggle(popupState)}
            >
              <IconX stroke={1.5} size="1.3rem" />
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = forwardRef(({ getValue }, ref) => {
  useImperativeHandle(ref, () => ({
    clearSearch() {
      setValue('');
    }
  }));
  const theme = useTheme();
  const [value, setValue] = useState('');

  const verify = useCallback(
    debounce((value) => {
      getValue(value);
    }, 1000),
    []
  );

  useEffect(() => {
    verify(value);
  }, [value]);

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                  <IconSearch stroke={1.5} size="1.2rem" />
                </HeaderAvatarStyle>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions
                      type="zoom"
                      {...TransitionProps}
                      sx={{ transformOrigin: 'center left' }}
                    >
                      <Card
                        sx={{
                          background:
                            theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch
                                value={value}
                                setValue={setValue}
                                popupState={popupState}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box className="search-box" sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          size="small"
          sx={{ width: '100%', margin: '0' }}
          id="input-search-header"
          value={value}
          onChange={(e) => {
            if (value && value[0] !== ' ') {
              setValue(e.target.value);
            } else {
              setValue(e.target.value.trim());
            }
          }}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight', autoComplete: 'off' }}
        />
      </Box>
    </>
  );
});

export default SearchSection;

import {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import confirm from "views/forms/plugins/Confirm/confirm";
import { confirmMessage } from "utils/Helper";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";
import useAuth from "hooks/useAuth";
import User1 from "assets/images/users/user-round.svg";

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from "@tabler/icons";
import useConfig from "hooks/useConfig";
import { AzhaiAuthContext } from "contexts/AzhaiAuthContext";
import ProfileEdit from "./ProfileEdit";

const ProfileSection = forwardRef(() => {
  const { auth } = useContext(AzhaiAuthContext);
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    confirm(confirmMessage("logout")).then(async () => {
      try {
        localStorage.removeItem("token");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Fragment>
            <ClickAwayListener onClickAway={handleClose}>
              <Transitions in={open} {...TransitionProps}>
                <Paper>
                  <ProfileEdit modalRef={modalRef} />
                  {open && (
                    <MainCard
                      border={false}
                      elevation={16}
                      content={false}
                      boxShadow
                      shadow={theme.shadows[16]}
                    >
                      <Box sx={{ p: 2 }}>
                        <Stack>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <Typography variant="h4">
                              Welcome, {auth.fullName}
                            </Typography>
                            <Typography
                              component="span"
                              variant="h4"
                              sx={{ fontWeight: 400 }}
                            >
                              {user?.name}
                            </Typography>
                          </Stack>
                          <Typography sx={{ mt: 1 }} variant="subtitle2">
                            {auth.email}
                          </Typography>
                          <Typography variant="subtitle2">
                            +{auth.countryCode + " " + auth.phoneNumber}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Divider />
                        <List
                          component="nav"
                          sx={{
                            width: "100%",
                            maxWidth: 350,
                            minWidth: 300,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "10px",
                            [theme.breakpoints.down("md")]: {
                              minWidth: "100%",
                            },
                            "& .MuiListItemButton-root": {
                              mt: 0.5,
                            },
                          }}
                        >
                          <ListItemButton
                            sx={{ borderRadius: `${borderRadius}px` }}
                            selected={selectedIndex === 0}
                            onClick={() => {
                              console.log("modal Ref", modalRef);
                            }}
                          >
                            <ListItemIcon>
                              <IconSettings stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">
                                  Edit Profile
                                </Typography>
                              }
                            />
                          </ListItemButton>
                          <ListItemButton
                            sx={{ borderRadius: `${borderRadius}px` }}
                            selected={selectedIndex === 4}
                            onClick={handleLogout}
                          >
                            <ListItemIcon>
                              <IconLogout stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">Logout</Typography>
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Box>
                    </MainCard>
                  )}
                </Paper>
              </Transitions>
            </ClickAwayListener>
          </Fragment>
        )}
      </Popper>
    </>
  );
});

export default ProfileSection;

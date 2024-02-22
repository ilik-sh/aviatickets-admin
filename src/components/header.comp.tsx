import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "app/auth/store/auth.actions";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { RootState } from "store";
import { authSelector } from "app/auth/store/auth.selector";
import {
  AuthModulePagePaths,
  BookingsModulePagePaths,
  ChatModulePagePaths,
  TicketsModulePagePaths,
  UserModulePagePaths,
} from "enums/page-paths.enum";
import { enqueueSnackbar } from "notistack";
import { isatty } from "tty";
import { Roles } from "aviatickets-submodule/libs/enums/roles.enum";

const StyledTypography = styled(Typography)({
  cursor: "pointer",
  fontWeight: "400",
  fontSize: "1.5rem",
});

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(authSelector);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (role) {
      return setAnchorEl(event.currentTarget);
    }
    navigate(AuthModulePagePaths.SignIn);
  };

  const handleLogoClicked = (event: React.MouseEvent<HTMLElement>) => {
    navigate(TicketsModulePagePaths.SearchTickets);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    handleMenuClose();
    const response = await dispatch(signOut());
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Successfully signed out", { variant: "success" });
      navigate(AuthModulePagePaths.SignIn);
    }
  };

  const handleTicketsClick = () => {
    handleMenuClose();
    navigate(TicketsModulePagePaths.SearchTickets);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    navigate(AuthModulePagePaths.ChangePassword);
  };

  const handleUsersClick = () => {
    handleMenuClose();
    navigate(UserModulePagePaths.Users);
  };

  const handleChatClick = () => {
    handleMenuClose();
    navigate(ChatModulePagePaths.Chat);
  };

  const handleBookingsClick = () => {
    handleMenuClose();
    navigate(BookingsModulePagePaths.Bookings);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {role == "Sales"
        ? [
            <MenuItem onClick={handleChatClick}>Chat</MenuItem>,
            <MenuItem onClick={handleTicketsClick}>Tickets</MenuItem>,
          ]
        : [
            <MenuItem onClick={handleUsersClick}>Users</MenuItem>,
            <MenuItem onClick={handleBookingsClick}>Bookings</MenuItem>,
          ]}
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleChangePassword}>Change password</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {renderMobileMenu}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
            {role == "Sales" ? (
              <>
                <StyledTypography onClick={handleChatClick}>
                  Chat
                </StyledTypography>
                <StyledTypography onClick={handleTicketsClick}>
                  Tickets
                </StyledTypography>
              </>
            ) : (
              <>
                <StyledTypography onClick={handleUsersClick}>
                  Users
                </StyledTypography>
                <StyledTypography onClick={handleBookingsClick}>
                  Bookings
                </StyledTypography>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;

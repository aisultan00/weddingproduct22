import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';

const typesofholiday = [
  "Үйлену той", "Ұзату той", "Беташар", "Сүндет той", "Тұсаукесер", "Мерей той"
];
const typesoflinks = [
  "/weddings", "/uzatus", "/betashar", "/sundet", "/tkesers", "/merey"
];

function HeaderHome() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="static"
      elevation={10}
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)",
        color: "#1565c0",
        mb: 1,
        borderRadius: 4,
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.10)",
        px: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: "row", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 1, sm: 2 },
          minHeight: { xs: 56, sm: 72 },
        }}
      >
        {/* Logo & Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <CelebrationIcon sx={{ color: "#03A9F4", fontSize: 38 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2196F3",
              letterSpacing: 1,
              textShadow: "0 2px 8px #fff",
              fontSize: { xs: "1.1rem", sm: "1.5rem", md: "2rem" },
              userSelect: "none"
            }}
          >
            Тойларды тіркеу жүйесі
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                color: "#2196F3",
                background: "rgba(255,255,255,0.8)",
                borderRadius: 3,
                px: 3,
                py: 1,
                fontSize: "1.05rem",
                boxShadow: "0 2px 8px #2196F333",
                "&:hover": {
                  background: "#e3f2fd",
                  color: "#03A9F4",
                },
              }}
            >
              <HouseIcon sx={{ mr: 1, color: "#03A9F4" }} /> Басты бет
            </Button>
            <Button
              color="inherit"
              endIcon={<ArrowDropDownIcon sx={{ color: "#03A9F4" }} />}
              onClick={handleMenuOpen}
              sx={{
                fontWeight: "bold",
                color: "#2196F3",
                background: "rgba(255,255,255,0.8)",
                borderRadius: 3,
                px: 3,
                py: 1,
                fontSize: "1.05rem",
                boxShadow: "0 2px 8px #2196F333",
                "&:hover": {
                  background: "#e3f2fd",
                  color: "#03A9F4",
                },
              }}
            >
              Той түрлері
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{
                "& .MuiPaper-root": {
                  minWidth: 180,
                  borderRadius: 3,
                  boxShadow: "0 4px 24px #b388ff33",
                }
              }}
            >
              {typesofholiday.map((type, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={typesoflinks[index]}
                  onClick={handleMenuClose}
                  sx={{
                    fontWeight: "bold",
                    color: "#2196F3",
                    fontSize: "1rem",
                    "&:hover": {
                      background: "#e3f2fd",
                      color: "#03A9F4",
                    },
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                color: "#03A9F4",
                background: "rgba(255,255,255,0.7)",
                borderRadius: 2,
                boxShadow: "0 2px 8px #2196F333",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  width: 240,
                  background: "linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)",
                  color: "#1565c0",
                  p: 2,
                }
              }}
            >
              <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <CelebrationIcon sx={{ color: "#03A9F4" }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#2196F3" }}>
                  Той жүйесі
                </Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
                  <HouseIcon sx={{ mr: 1, color: "#03A9F4" }} />
                  <ListItemText primary="Басты бет" sx={{ color: "#2196F3" }} />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                {typesofholiday.map((type, idx) => (
                  <ListItem
                    button
                    key={type}
                    component={Link}
                    to={typesoflinks[idx]}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={type} />
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderHome;
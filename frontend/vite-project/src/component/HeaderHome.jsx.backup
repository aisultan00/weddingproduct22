import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Divider,
  useTheme
} from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const typesofholiday = [
  "Үйлену той", "Ұзату той", "Беташар", "Сүндет той", "Тұсаукесер", "Мерей той"
];
const typesoflinks = [
  "/weddings", "/uzatus", "/betashar", "/sundet", "/tkesers", "/merey"
];

function HeaderHome() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [adminClickCount, setAdminClickCount] = React.useState(0);
  const [lastClickTime, setLastClickTime] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const isSmallScreen = useMediaQuery('(max-width:400px)');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Скрытый способ доступа к админ панели
  const handleSecretAdminAccess = () => {
    const adminRole = localStorage.getItem('role');
    if (adminRole === 'admin') {
    const now = Date.now();
    
    // Сброс счетчика если прошло больше 3 секунд
    if (now - lastClickTime > 3000) {
      setAdminClickCount(1);
    } else {
      setAdminClickCount(prev => prev + 1);
    }
    
    setLastClickTime(now);
    
    // 5 быстрых кликов подряд открывают админ панель
    if (adminClickCount >= 4) {
      navigate('/admin');
      setAdminClickCount(0);
    }
    
    // Автоматический сброс через 3 секунды
    setTimeout(() => {
      setAdminClickCount(0);
    }, 3000);
  }
}

  return (
    <AppBar
      position="static"
      elevation={10}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        mb: 1,
        borderRadius: { xs: 0, sm: 4 },
        boxShadow: '0 8px 32px rgba(79,70,229,0.25)',
        px: { xs: 0.5, sm: 1, md: 2 },
      }}
    >
      <Toolbar
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 0.5, sm: 1, md: 2 },
          minHeight: { xs: 48, sm: 56, md: 72 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Logo & Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <CelebrationIcon 
            onClick={handleSecretAdminAccess}
            sx={{ 
              color: theme.palette.info.main,
              fontSize: { xs: 24, sm: 32, md: 38 },
              flexShrink: 0,
              transition: "transform 0.2s",
            }} 
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.common.white,
              letterSpacing: { xs: 0.5, sm: 1 },
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
              userSelect: "none",
              whiteSpace: "normal",
              wordBreak: 'keep-all',
              hyphens: 'none',
              cursor: "pointer"
            }}
            onClick={() => {navigate("/");
            }}
          >
            {isSmallScreen ? "Той жүйесі" : "Тойларды тіркеу жүйесі"}
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: { sm: 1, md: 2 },
            flexWrap: "nowrap"
          }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                color: theme.palette.common.white,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 3,
                px: { sm: 2, md: 3 },
                py: { xs: 0.5, sm: 1 },
                fontSize: { sm: "0.9rem", md: "1.05rem" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                minWidth: { sm: "auto", md: "auto" },
                '&:hover': {
                  background: 'rgba(255,255,255,0.25)'
                },
              }}
            >
              <HouseIcon sx={{ 
                mr: { sm: 0.5, md: 1 }, 
                color: theme.palette.info.main,
                fontSize: { sm: "1.2rem", md: "1.5rem" }
              }} /> 
              {isTablet ? "Басты" : "Басты бет"}
            </Button>
            <Button
              color="inherit"
              endIcon={<ArrowDropDownIcon sx={{ 
                color: theme.palette.info.main,
                fontSize: { sm: "1.2rem", md: "1.5rem" }
              }} />}
              onClick={handleMenuOpen}
              sx={{
                fontWeight: "bold",
                color: theme.palette.common.white,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 3,
                px: { sm: 2, md: 3 },
                py: { xs: 0.5, sm: 1 },
                fontSize: { sm: "0.9rem", md: "1.05rem" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                minWidth: { sm: "auto", md: "auto" },
                '&:hover': {
                  background: 'rgba(255,255,255,0.25)'
                },
              }}
            >
              {isTablet ? "Тойлар" : "Той түрлері"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{
                '& .MuiPaper-root': {
                  minWidth: { sm: 160, md: 180 },
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
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
                    color: theme.palette.text.primary,
                    fontSize: { sm: "0.9rem", md: "1rem" },
                    py: { sm: 0.5, md: 1 },
                    '&:hover': {
                      background: theme.palette.action.hover
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
                color: theme.palette.info.main,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                p: { xs: 0.5, sm: 1 },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  width: { xs: "85vw", sm: 240 },
                  maxWidth: 280,
                  background: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  p: { xs: 1.5, sm: 2 },
                }
              }}
            >
              <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <CelebrationIcon sx={{ color: theme.palette.info.main }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
                  Той жүйесі
                </Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
                  <HouseIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                  <ListItemText primary="Басты бет" sx={{ color: theme.palette.primary.main }} />
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
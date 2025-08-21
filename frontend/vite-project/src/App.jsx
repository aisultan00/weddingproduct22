import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, Grid, Stack } from "@mui/material";
import SEO from "./component/SEO";
import CelebrationIcon from '@mui/icons-material/Celebration';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import StarIcon from '@mui/icons-material/Star';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeaderHome from "./component/HeaderHome";
import { useTheme } from '@mui/material/styles';

// --- Новый современный и адаптивный HomePage ---
function HomePage() {
  const theme = useTheme();
  const typesofholiday = [
    { name: "Үйлену той", icon: <FavoriteIcon sx={{ color: theme.palette.secondary.light }} /> ,link: "/weddings" },
    { name: "Ұзату той", icon: <CelebrationIcon sx={{ color: theme.palette.primary.light }} /> ,link: "/uzatus" },
    { name: "Беташар", icon: <EmojiEmotionsIcon sx={{ color: theme.palette.secondary.light }} /> ,link: "/betashar" },
    { name: "Сүндет той", icon: <ChildCareIcon sx={{ color: theme.palette.primary.light }} /> ,link: "/sundet" },
    { name: "Тұсаукесер", icon: <Diversity3Icon sx={{ color: theme.palette.secondary.light }} /> ,link: "/tkesers" },
    { name: "Мерей той", icon: <StarIcon sx={{ color: theme.palette.primary.light }} /> ,link: "/merey" },
  ];

  const features = [
    "Той шақыруын 1 минутта жасаңыз",
    "Қонақтардың келуін онлайн бақылау",
    "Тілек жинау",
    "QR-кодпен шақыру және WhatsApp арқылы тарату",
    "Той статистикасы мен аналитика",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}44 100%)`,
        position: "relative",
        overflow: "auto",
        pb: { xs: 10, md: 0 },
        scrollBehavior: "smooth",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Hero Section */}
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            borderRadius: 5,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}55 0%, ${theme.palette.secondary.light}55 100%)`,
            boxShadow: "0 8px 32px 0 rgba(79,70,229,0.18)",
            color: theme.palette.primary.dark,
            textAlign: "center",
            p: { xs: 2, sm: 4, md: 6 },
            mb: { xs: 3, md: 6 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CelebrationIcon sx={{ fontSize: { xs: 48, md: 72 }, color: theme.palette.info.main, mb: 2 }} />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
              mb: 2,
              color: theme.palette.primary.main,
              letterSpacing: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              hyphens: 'none'
            }}
          >
            Қазақша той шақыру – заманауи форматта!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: theme.palette.primary.dark,
              fontWeight: 500,
              fontSize: 'clamp(1rem, 3.2vw, 1.5rem)',
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              hyphens: 'none'
            }}
          >
            Тойыңызды онлайн ұйымдастырыңыз, қонақтарыңызды оңай шақырыңыз, жауап алыңыз және естеліктерді сақтаңыз.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
          >
          <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontWeight: "bold",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                '&:hover': {
                  background: `${theme.palette.primary.main}14`,
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                },
              }}
              href="#features"
            >
              Мүмкіндіктерді көру
            </Button>
          </Stack>
        </Paper>

        {/* Той түрлері */}
        <Box sx={{ width: "100%", mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              letterSpacing: 1,
            }}
          >
            Той түрлерін жасап көру
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {typesofholiday.map((type, idx) => (
              <Grid item xs={6} sm={4} md={2} key={type.name}>
                <Link to={type.link} style={{ textDecoration: "none" }}>
                  <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    px: 1,
                    py: 2,
                    borderRadius: 4,
                    background: `${theme.palette.primary.light}22`,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    minWidth: 80,
                    maxWidth: 120,
                    mx: "auto",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  {type.icon}
                  <span style={{ fontSize: 'clamp(0.85rem, 2.6vw, 1.05rem)', whiteSpace: 'normal', wordBreak: 'keep-all', hyphens: 'none' }}>{type.name}</span>
                </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features */}
        <Box id="features" sx={{ width: "100%", mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              letterSpacing: 1,
            }}
          >
            Мүмкіндіктер
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: `${theme.palette.primary.light}33`,
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontWeight: 500,
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to action */}
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            borderRadius: 5,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}55 0%, ${theme.palette.secondary.main}55 100%)`,
            boxShadow: "0 4px 24px 0 rgba(79,70,229,0.18)",
            color: theme.palette.primary.main,
            textAlign: "center",
            p: { xs: 2, sm: 4 },
            mb: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              fontSize: 'clamp(1.2rem, 4.5vw, 2.5rem)',
              letterSpacing: 2,
              textShadow: "0 4px 24px #fff",
              mb: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              hyphens: 'none'
            }}
          >
            Қазақтың тойы – дәстүр мен заманауи технологияның үйлесімі!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              mb: 2,
            }}
          >
            Тойыңызды жаңа деңгейге көтеріңіз – онлайн шақыру, қонақтармен байланыс, естеліктер және тағы басқасы!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              boxShadow: "0 2px 8px rgba(79,70,229,0.35)",
              '&:hover': {
                background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)",
                color: "#fff",
              },
            }}
            href="#"
          >
            Той шақыру жасау
          </Button>
        </Paper>
      </Container>
      {/* Футер-слоган */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          zIndex: 1300,
          textAlign: "center",
          py: { xs: 1, md: 2 },
          background: `${theme.palette.background.paper}DD`,
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontSize: { xs: "1.1rem", sm: "2rem", md: "3rem", lg: "3.5rem" },
            letterSpacing: 2,
            textShadow: "0 4px 24px #fff",
            mb: 0,
            wordBreak: "break-word"
          }}
        >
          Қазақтың тойы бітпесін!
        </Typography>
      </Box>
    </Box>
  );
}

// --- Роутинг ---
import WeddingsPage from "./pages/WeddingsPage";
import WeddingPage from "./pages/slugpages/wedding/Weddingpage";
import Ownerpage from "./pages/slugpages/wedding/Ownerpage";
import Sundetspage from "./pages/Sundetspage";
import Sundetpage from "./pages/slugpages/sundet/Sundetpage";
import GuestsSundet from "./pages/slugpages/sundet/GuestsSundet";
import Tkeserspage from "./pages/Tkeserspage";
import Tkeserpage from "./pages/slugpages/tkeser/Tkeserpage";
import GuestsTkeser from "./pages/slugpages/tkeser/GuestsTkeser";
import Betasharspage from "./pages/Betasharspage";
import Betasharpage from "./pages/slugpages/betashar/Betasharpage";
import GuestsBetashar from "./pages/slugpages/betashar/GuestsBetashar";
import Mereyspage from "./pages/Mereyspage";
import Mereypage from "./pages/slugpages/merey/Mereypage";
import GuestsMerey from "./pages/slugpages/merey/GuestsMerey";
import Uzatuspage from "./pages/Uzatuspage";
import Uzatupage from "./pages/slugpages/uzatu/Uzatupage";
import GuestsUzatu from "./pages/slugpages/uzatu/GuestsUzatu";
import AdminPage from "./pages/AdminPage";
import NotfoundPage from "./component/NotfoundPage";

function App() {
  return (
    <Router>
      <SEO 
        title="Басты бет"
        description="Қазақтың тойын онлайн ұйымдастырыңыз, қонақтарыңызды оңай шақырыңыз, жауап алыңыз және естеліктерді сақтаңыз."
        keywords="Қазақтың тойы, онлайн шақыру, қонақтар, естеліктер, QR-код, WhatsApp"
      />
      <HeaderHome />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weddings" element={<WeddingsPage />} />
        <Route path="/wedding/:id" element={<WeddingPage />} />
        <Route path="/wedding/:id/Ownerpage" element={<Ownerpage />} />
        <Route path="/sundet" element={<Sundetspage />} />
        <Route path="/sundet/:id" element={<Sundetpage />} />
        <Route path="/sundet/:id/Ownerpage" element={<GuestsSundet />} />
        <Route path="/tkesers" element={<Tkeserspage />} />
        <Route path="/tkesers/:id" element={<Tkeserpage />} />
        <Route path="/tkesers/:id/Ownerpage" element={<GuestsTkeser />} />
        <Route path="/betashar" element={<Betasharspage />} />
        <Route path="/betashar/:id" element={<Betasharpage />} />
        <Route path="/betashar/:id/Ownerpage" element={<GuestsBetashar />} />
        <Route path="/merey" element={<Mereyspage />} />
        <Route path="/merey/:id" element={<Mereypage />} />
        <Route path="/merey/:id/Ownerpage" element={<GuestsMerey />} />
        <Route path="/uzatus" element={<Uzatuspage />} />
        <Route path="/uzatus/:id" element={<Uzatupage />} />
        <Route path="/uzatus/:id/Ownerpage" element={<GuestsUzatu />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
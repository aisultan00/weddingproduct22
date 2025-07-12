import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// --- Новый современный и адаптивный HomePage ---
function HomePage() {
  const typesofholiday = [
    { name: "Үйлену той", icon: <FavoriteIcon sx={{ color: "#e91e63" }} /> },
    { name: "Ұзату той", icon: <CelebrationIcon sx={{ color: "#7C4DFF" }} /> },
    { name: "Беташар", icon: <EmojiEmotionsIcon sx={{ color: "#ffb300" }} /> },
    { name: "Сүндет той", icon: <ChildCareIcon sx={{ color: "#00bcd4" }} /> },
    { name: "Тұсаукесер", icon: <Diversity3Icon sx={{ color: "#43a047" }} /> },
    { name: "Мерей той", icon: <StarIcon sx={{ color: "#ff9800" }} /> },
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
        background: "linear-gradient(135deg, #F3E5F5 0%, #7C4DFF 100%)",
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
            background: "linear-gradient(120deg, #fff 60%, #ede7f6 100%)",
            boxShadow: "0 8px 32px 0 rgba(124,77,255,0.10)",
            color: "#5e35b1",
            textAlign: "center",
            p: { xs: 2, sm: 4, md: 6 },
            mb: { xs: 3, md: 6 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CelebrationIcon sx={{ fontSize: { xs: 48, md: 72 }, color: "#7C4DFF", mb: 2 }} />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Edu QLD Hand, cursive",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
              mb: 2,
              color: "#5e35b1",
              letterSpacing: 1,
            }}
          >
            Қазақша той шақыру – заманауи форматта!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "#7C4DFF",
              fontWeight: 500,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
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
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{
                background: "linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                boxShadow: "0 2px 8px #7C4DFF44",
                "&:hover": {
                  background: "linear-gradient(90deg, #B388FF 0%, #7C4DFF 100%)",
                  color: "#fff",
                },
              }}
              href="https://wa.me/"
              target="_blank"
            >
              WhatsApp арқылы шақыру жіберу
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#7C4DFF",
                color: "#7C4DFF",
                fontWeight: "bold",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                "&:hover": {
                  background: "#ede7f6",
                  borderColor: "#B388FF",
                  color: "#5e35b1",
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
              color: "#7C4DFF",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              letterSpacing: 1,
            }}
          >
            Той түрлері
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {typesofholiday.map((type, idx) => (
              <Grid item xs={6} sm={4} md={2} key={type.name}>
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
                    background: "rgba(124,77,255,0.08)",
                    color: "#7C4DFF",
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    minWidth: 80,
                    maxWidth: 120,
                    mx: "auto",
                  }}
                >
                  {type.icon}
                  <span style={{ fontSize: "1rem", wordBreak: "break-word" }}>{type.name}</span>
                </Paper>
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
              color: "#5e35b1",
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
                    background: "rgba(124,77,255,0.06)",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ color: "#B388FF" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5e35b1",
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
            background: "linear-gradient(90deg, #7C4DFF22 0%, #B388FF22 100%)",
            boxShadow: "0 4px 24px 0 rgba(124,77,255,0.10)",
            color: "#7C4DFF",
            textAlign: "center",
            p: { xs: 2, sm: 4 },
            mb: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Edu QLD Hand, cursive",
              fontWeight: "bold",
              color: "#7C4DFF",
              fontSize: { xs: "1.3rem", sm: "2rem", md: "2.5rem" },
              letterSpacing: 2,
              textShadow: "0 4px 24px #fff, 0 2px 8px #7C4DFF88",
              mb: 1,
              wordBreak: "break-word"
            }}
          >
            Қазақтың тойы – дәстүр мен заманауи технологияның үйлесімі!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#5e35b1",
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
              background: "linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              boxShadow: "0 2px 8px #7C4DFF44",
              "&:hover": {
                background: "linear-gradient(90deg, #B388FF 0%, #7C4DFF 100%)",
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
          background: "linear-gradient(90deg, #7C4DFF22 0%, #B388FF22 100%)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Edu QLD Hand, cursive",
            fontWeight: "bold",
            color: "#7C4DFF",
            fontSize: { xs: "1.1rem", sm: "2rem", md: "3rem", lg: "3.5rem" },
            letterSpacing: 2,
            textShadow: "0 4px 24px #fff, 0 2px 8px #7C4DFF88",
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
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
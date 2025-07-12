import React from "react";
import { Container, Paper, Typography, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "./SEO";

function NotfoundPage() {
  return (
    <>
      <SEO 
        title="404 - Бет табылмады"
        description="Өкінішке орай, сіз іздеген бет табылмады. Басты бетке оралыңыз."
        keywords="404, бет табылмады, қате"
      />
      <Container maxWidth="md" sx={{ padding: { xs: 1, sm: 3 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #FFDEE9 0%,#B5FFFC 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#b71c1c",
                fontSize: { xs: "2rem", sm: "3rem" },
              }}
            >
              404
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "1.2rem", sm: "2rem" },
              textAlign: "center",
            }}
          >
            Бет табылмады
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center", fontSize: { xs: "1rem", sm: "1.2rem" } }}
          >
            Өкінішке орай, сіз іздеген бет табылмады.
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
              rowGap: 1,
            }}
          >
            <Button component={Link} to="/" variant="contained" color="primary">
              Басты бетке
            </Button>
            <Button component={Link} to="/weddings" variant="outlined" color="secondary">
              Үйлену тойлар
            </Button>
            <Button component={Link} to="/uzatus" variant="outlined" color="secondary">
              Ұзату тойлар
            </Button>
            <Button component={Link} to="/betashar" variant="outlined" color="secondary">
              Беташар тойлар
            </Button>
            <Button component={Link} to="/sundet" variant="outlined" color="secondary">
              Сүндет тойлар
            </Button>
            <Button component={Link} to="/tkesers" variant="outlined" color="secondary">
              Тұсаукесер тойлар
            </Button>
            <Button component={Link} to="/merey" variant="outlined" color="secondary">
              Мерей тойлар
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default NotfoundPage;
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function BackToHomeButton() {
  return (
    <Button
      component={Link}
      to="/"
      variant="contained"
      color="primary"
      size="large"
      startIcon={<HomeIcon />}
      sx={{
        borderRadius: 8,
        px: 4,
        py: 1.5,
        fontWeight: "bold",
        fontSize: { xs: "1rem", sm: "1.2rem" },
        boxShadow: 3,
        background: "linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%)",
        color: "#222",
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(90deg, #B5FFFC 0%, #FFDEE9 100%)",
          color: "#b71c1c",
        },
      }}
    >
      Басты бетке оралу
    </Button>
  );
}

export default BackToHomeButton;
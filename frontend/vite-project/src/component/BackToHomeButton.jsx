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
        borderRadius: 3,
        px: 4,
        py: 1.5,
        fontWeight: "bold",
        fontSize: { xs: "1rem", sm: "1.2rem" },
        boxShadow: 3,
        background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)",
        color: "#fff",
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)",
          color: "#fff",
        },
      }}
    >
      Басты бетке оралу
    </Button>
  );
}

export default BackToHomeButton;
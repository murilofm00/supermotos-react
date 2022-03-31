import { Box, Typography } from "@mui/material";

export function BannerPage() {
  return (
    <Box
      sx={{
        // pb: 3,
        margin: -3,
        position: "fixed",
        backgroundImage: `url(https://images.pexels.com/photos/3660524/pexels-photo-3660524.jpeg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: 1,
        width: 1,
        color: "white",
        textShadow: "4px 1px 3px black",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" sx={{ background: "#00000091", px: 2, mb: 1 }}>
        SUPER MOTOS
      </Typography>
      <Typography variant="h5" sx={{ background: "#00000091", px: 2 }}>
        Informação sobre duas rodas.
      </Typography>
    </Box>
  );
}

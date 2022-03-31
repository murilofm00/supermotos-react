import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Sobre } from "../models/Sobre";
import { getSobre } from "../services/sobreService";

export const SobrePage: React.FC = ({}) => {
  const [sobre, setSobre] = useState<Sobre>();

  useEffect(() => {
    getSobre().then(({ data }) => setSobre(data));
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 2,
        backgroundColor: "2c3e50",
      }}
    >
      <Typography variant="h4">Sobre nós</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mx: "auto" }}>
          <Box>
            <img
              src={sobre?.banner_sobre}
              style={{
                width: "100%",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body1">{sobre?.sobre}</Typography>
    </Container>
  );
};

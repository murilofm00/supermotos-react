import { Box, Container, Grid, Typography } from "@mui/material";
import imagem from "../assets/img/moto_sobre.jpg";

export const SobrePage: React.FC = ({}) => (
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
            src="https://images.pexels.com/photos/9109135/pexels-photo-9109135.jpeg"
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Grid>
    </Grid>

    <Typography variant="body1">
      Há mais de 26 anos na estrada, fomos a segunda startup mineira a inovar na
      forma de entregar conhecimento sobre o mundo do motociclismo. Líderes de
      mercado e especialistas no segmento, temos como combustível a paixão pela
      cultura motoqueira e a vontade de oferecer sempre a melhor e mais segura
      experiência de obter informação.
    </Typography>
  </Container>
);

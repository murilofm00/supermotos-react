import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Moto } from "../models/Moto";

interface CardMotoProps {
  moto: Moto;
}
function CardMoto({ moto }: CardMotoProps) {
  return (
    <Card sx={{ display: "flex", background: "grey" }}>
      <CardMedia
        component="img"
        sx={{ flex: 1, width: 20 }}
        src={moto.imagem}
      />
      <CardContent sx={{ flex: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>{moto.nome}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Categoria:</b>
              {moto.categoria.descricao}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CardMoto;

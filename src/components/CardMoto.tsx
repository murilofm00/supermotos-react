import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Moto } from "../models/Moto";

interface CardMotoProps {
  moto: Moto;
}
export const CardMoto: React.FC<CardMotoProps> = ({ moto, children }) => {
  return (
    <Card
      sx={{ display: "flex", border: 1, borderColor: "#d4d4d4", boxShadow: 3 }}
    >
      <CardMedia
        component="img"
        sx={{ flex: 1, width: 20, borderRight: 1, borderColor: "#d4d4d4" }}
        src={moto.imagem}
      />
      <CardContent sx={{ flex: 2 }}>
        <Grid container sx={{ rowGap: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h5">{moto.nome}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Marca: </b>
              {moto?.marca?.descricao}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Categoria: </b>
              {moto?.categoria?.descricao}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{moto.descricao}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Potência: </b>
              {moto.potencia} CC
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Ano: </b>
              {moto.ano}
            </Typography>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardMoto;

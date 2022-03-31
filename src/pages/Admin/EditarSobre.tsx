import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Sobre } from "../../models/Sobre";
import { atualizarSobre, getSobre } from "../../services/sobreService";

export const EditarSobrePage: React.FC = ({}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [sobre, setSobre] = useState<Sobre>({
    sobre: "",
    banner_sobre: "",
  } as Sobre);

  useEffect(() => {
    getSobre().then(({ data }) => setSobre(data));
  }, []);

  return (
    <Container>
      <Typography variant="h5">Motos</Typography>
      <Stack spacing={2} sx={{ my: 3 }}>
        <TextField
          label="Sobre"
          multiline
          fullWidth
          value={sobre.sobre}
          onChange={(event) =>
            setSobre({ ...sobre, sobre: event.target.value })
          }
        />
        <TextField
          label="Imagem Banner"
          fullWidth
          value={sobre.banner_sobre}
          onChange={(event) =>
            setSobre({ ...sobre, banner_sobre: event.target.value })
          }
        />
        <Button
          variant="contained"
          onClick={() =>
            atualizarSobre(sobre)
              .then(({ data }) => {
                setSobre(data);
                enqueueSnackbar("Página Sobre atualizada", {
                  variant: "success",
                });
              })
              .catch(() => {
                enqueueSnackbar("Erro ao atualizar a página Sobre", {
                  variant: "success",
                });
              })
          }
        >
          Salvar
        </Button>
      </Stack>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mx: "auto" }}>
          <img
            src={sobre?.banner_sobre}
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

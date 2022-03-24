import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

export function FiltrosMoto() {
  return (
    <>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth label="Nome" />
        <TextField fullWidth label="Ano" type="number" />
        <TextField fullWidth label="Potência" type="number" />
        <FormControl>
          <InputLabel id="categoria-select">Categoria</InputLabel>
          <Select id="categoria-select" fullWidth label="Categoria">
            <MenuItem value={1}>Street</MenuItem>
            <MenuItem value={1}>Classica</MenuItem>
            <MenuItem value={1}>Esportiva</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="categoria-select">Marca</InputLabel>
          <Select id="marca-select" fullWidth label="Marca">
            <MenuItem value={1}>Honda</MenuItem>
            <MenuItem value={1}>Yamaha</MenuItem>
            <MenuItem value={1}>Suzuki</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Button variant="contained">Buscar</Button>
    </>
  );
}

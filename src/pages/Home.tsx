import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { FiltrosMoto } from "../components/FiltrosMoto";
import { ListMotos } from "../components/ListMotos";
import { Moto } from "../models/Moto";
import { listarMotos } from "../services/motoService";

export function Home() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    listarMotos().then(({ data }) => setMotos(data));
  }, []);

  return (
    <Container>
      {/* <FiltrosMoto /> */}
      <ListMotos motos={motos} />
    </Container>
  );
}

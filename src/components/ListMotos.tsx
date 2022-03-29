import { Comment } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Moto } from "../models/Moto";
import CardMoto from "./CardMoto";

interface ListMotosProps {
  motos: Moto[];
}
export const ListMotos: React.FC<ListMotosProps> = ({ motos }) => {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      {motos.map((moto) => (
        <CardMoto key={moto.id} moto={moto}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Comment />}
            onClick={() => navigate(`comentarios/${moto.id}`)}
          >
            Comentários
          </Button>
        </CardMoto>
      ))}{" "}
    </Stack>
  );
};

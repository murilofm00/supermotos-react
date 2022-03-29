import { CircularProgress, Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMoto from "../components/CardMoto";
import { ComentarioForm } from "../components/ComentarioForm";
import { ComentarioListItem } from "../components/ComentarioListItem";
import { Moto } from "../models/Moto";
import { getMoto } from "../services/motoService";

export const ComentariosPage: React.FC = () => {
  const motoId = parseInt(useParams().motoId as string);
  const [moto, setMoto] = useState<Moto>();
  useEffect(() => {
    getMoto(motoId).then(({ data }) => setMoto(data));
  }, []);
  return moto ? (
    <Container>
      <CardMoto moto={moto} />
      <ComentarioForm
        motoId={motoId}
        onComment={(comentarioAdd) => {
          const comentarios = moto.comentarios || [];
          setMoto({ ...moto, comentarios: [comentarioAdd, ...comentarios] });
        }}
      />
      <List sx={{ mb: 3 }}>
        {moto?.comentarios?.map((comentario) => (
          <ComentarioListItem comentario={comentario} key={comentario.id} />
        ))}
      </List>
    </Container>
  ) : (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2c3e50",
      }}
    >
      <CircularProgress />
    </div>
  );
};

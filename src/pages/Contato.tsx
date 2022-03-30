import {
  faFacebook,
  faInstagram,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

export const ContatoPage: React.FC = ({}) => {
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
      <Typography variant="h4">Contato</Typography>
      <Typography variant="body1">
        Entre em contato conosco através das nossas redes sociais:
      </Typography>
      <Stack>
        <ContatoItem
          icon={faFacebook}
          nome="Facebook"
          href="https://facebook.com"
        />
        <ContatoItem
          icon={faTwitter}
          nome="Twitter"
          href="https://twitter.com"
        />
        <ContatoItem
          icon={faInstagram}
          nome="Instagram"
          href="https://instagram.com"
        />
      </Stack>
    </Container>
  );
};

interface ContatoItemProps {
  icon: IconDefinition;
  nome: string;
  href: string;
}
const ContatoItem: React.FC<ContatoItemProps> = ({ icon, nome, href }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#2c3e50",
      }}
      component="a"
      href={href}
      target="_blank"
    >
      <IconButton>
        <FontAwesomeIcon icon={icon} />
      </IconButton>
      <Typography>{nome}</Typography>
    </Box>
  );
};

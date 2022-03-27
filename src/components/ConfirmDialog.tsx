import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  text: string;
  onCloseModal: (agreed: boolean) => void;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  text,
  onCloseModal,
}) => {
  return (
    <Dialog open={open} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onCloseModal(false)}>
          Cancelar
        </Button>
        <Button onClick={() => onCloseModal(true)} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

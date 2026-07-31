import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  selectedMenu,
  item,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete {selectedMenu?.label}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{item?.name}</strong>?
          <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
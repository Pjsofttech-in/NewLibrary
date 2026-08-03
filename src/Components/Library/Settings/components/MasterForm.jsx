import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const MasterForm = ({
  open,
  onClose,
  onSave,
  selectedMenu,
  editData,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
    } else {
      setName("");
    }
  }, [editData, open]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSave({
      id: editData?.id,
      name: name.trim(),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "14px",
          maxWidth: "340px", // Size ko reduce karke 2nd image jaisa kiya
          overflow: "hidden",
          m: 2,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #3fa8ff 0%, #1976d2 100%)",
          color: "#fff",
          px: 2.5,
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: "1.1rem" }}
        >
          {editData
            ? `Edit ${selectedMenu?.label || ""}`
            : `Create ${selectedMenu?.label || ""}`}
        </Typography>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 2.5, pt: 3 }}>
        <TextField
          fullWidth
          size="small"
          label={selectedMenu?.label || ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Button
            onClick={onClose}
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
              color: "#1976d2",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            size="small"
            sx={{
              px: 3,  
              py: 0.8,
              borderRadius: "6px",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MasterForm;
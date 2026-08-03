import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { getAll } from "../services/settingsService";

const fieldStyle = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
};

const emptyForm = {
  title:        "",
  resourceType: "",
  isbnBarcode:  "",
  edition:      "",
  language:     "",
  quantity:     "",
  roomNumber:   "",
  rackNumber:   "",
  status:       "",
};

const ResourceForm = ({ open, onClose, onSave, editData }) => {
  const [form, setForm]               = useState(emptyForm);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [loadingTypes, setLoadingTypes]   = useState(false);

  // Fetch resource types from backend when form opens
  useEffect(() => {
    if (!open) return;
    setLoadingTypes(true);
    getAll("/resource-types")
      .then((data) => setResourceTypes(data || []))
      .catch(() => setResourceTypes([]))
      .finally(() => setLoadingTypes(false));
  }, [open]);

  // Populate form for edit, or reset for create
  useEffect(() => {
    if (editData) {
      setForm({
        title:        editData.title        || "",
        resourceType: editData.resourceType || "",
        isbnBarcode:  editData.isbnBarcode  || "",
        edition:      editData.edition      || "",
        language:     editData.language     || "",
        quantity:     editData.quantity     != null ? String(editData.quantity) : "",
        roomNumber:   editData.roomNumber   || "",
        rackNumber:   editData.rackNumber   || "",
        status:       editData.status       || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData, open]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave({
      title:        form.title.trim(),
      resourceType: form.resourceType  || null,
      isbnBarcode:  form.isbnBarcode.trim()  || null,
      edition:      form.edition.trim()      || null,
      language:     form.language.trim()     || null,
      quantity:     form.quantity !== "" ? parseInt(form.quantity, 10) : null,
      roomNumber:   form.roomNumber.trim()   || null,
      rackNumber:   form.rackNumber.trim()   || null,
      status:       form.status              || null,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "14px", overflow: "hidden", m: 2 },
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
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem" }}>
          {editData ? "Edit Resource" : "Create Resource"}
        </Typography>
      </Box>

      {/* Fields */}
      <DialogContent sx={{ p: 3, pt: 3 }}>
        <Grid container spacing={2}>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth size="small" label="Title *"
              value={form.title}
              onChange={handleChange("title")}
              sx={fieldStyle}
            />
          </Grid>

          {/* Resource Type — dynamic from backend */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" select
              label="Resource Type"
              value={form.resourceType}
              onChange={handleChange("resourceType")}
              sx={fieldStyle}
              InputProps={{
                endAdornment: loadingTypes
                  ? <CircularProgress size={14} sx={{ mr: 1 }} />
                  : null,
              }}
            >
              <MenuItem value="">-- Select Type --</MenuItem>
              {resourceTypes.map((rt) => (
                <MenuItem key={rt.id} value={rt.name}>
                  {rt.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ISBN / Barcode */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="ISBN / Barcode"
              value={form.isbnBarcode}
              onChange={handleChange("isbnBarcode")}
              sx={fieldStyle}
            />
          </Grid>

          {/* Edition */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Edition"
              value={form.edition}
              onChange={handleChange("edition")}
              sx={fieldStyle}
            />
          </Grid>

          {/* Language */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Language"
              value={form.language}
              onChange={handleChange("language")}
              sx={fieldStyle}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" type="number" label="Quantity"
              value={form.quantity}
              onChange={handleChange("quantity")}
              inputProps={{ min: 0 }}
              sx={fieldStyle}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" select label="Status"
              value={form.status}
              onChange={handleChange("status")}
              sx={fieldStyle}
            >
              <MenuItem value="">-- Select Status --</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Issued">Issued</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </TextField>
          </Grid>

          {/* Room Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Room Number"
              value={form.roomNumber}
              onChange={handleChange("roomNumber")}
              sx={fieldStyle}
            />
          </Grid>

          {/* Rack Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Rack Number"
              value={form.rackNumber}
              onChange={handleChange("rackNumber")}
              sx={fieldStyle}
            />
          </Grid>

        </Grid>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 3 }}>
          <Button
            onClick={onClose} variant="text" size="small"
            sx={{ textTransform: "none", color: "#1976d2", fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained" onClick={handleSubmit} size="small"
            sx={{ px: 3, py: 0.8, borderRadius: "6px", textTransform: "none", fontWeight: 600, boxShadow: "none" }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceForm;

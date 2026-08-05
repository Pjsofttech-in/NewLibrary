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
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { getAll } from "../services/settingsService";

const inputSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
  "& .MuiInputLabel-root":    { fontSize: "13px" },
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
  const [form, setForm]                   = useState(emptyForm);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [languages, setLanguages]         = useState([]);
  const [loadingTypes, setLoadingTypes]   = useState(false);
  const [loadingLangs, setLoadingLangs]   = useState(false);

  // Fetch resource types AND languages from backend each time dialog opens
  useEffect(() => {
    if (!open) return;

    setLoadingTypes(true);
    getAll("/resource-types")
      .then((data) => setResourceTypes(data || []))
      .catch(() => setResourceTypes([]))
      .finally(() => setLoadingTypes(false));

    setLoadingLangs(true);
    getAll("/languages")
      .then((data) => setLanguages(data || []))
      .catch(() => setLanguages([]))
      .finally(() => setLoadingLangs(false));
  }, [open]);

  // Populate or reset form
  useEffect(() => {
    if (!open) return;
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

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave({
      title:        form.title.trim(),
      resourceType: form.resourceType       || null,
      isbnBarcode:  form.isbnBarcode.trim() || null,
      edition:      form.edition.trim()     || null,
      language:     form.language           || null,
      quantity:     form.quantity !== ""    ? parseInt(form.quantity, 10) : null,
      roomNumber:   form.roomNumber.trim()  || null,
      rackNumber:   form.rackNumber.trim()  || null,
      status:       form.status             || null,
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
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #3fa8ff 0%, #1976d2 100%)",
          color: "#fff",
          px: 2.5,
          py: 1.8,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.05rem" }}>
          {editData ? "Edit Resource" : "Create Resource"}
        </Typography>
      </Box>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth size="small" label="Title *"
              value={form.title}
              onChange={handleChange("title")}
              sx={inputSx}
            />
          </Grid>

          {/* Resource Type — uses FormControl/Select to avoid label overlap */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "13px" }}>Resource Type</InputLabel>
              <Select
                label="Resource Type"
                value={form.resourceType}
                onChange={handleChange("resourceType")}
                endAdornment={
                  loadingTypes
                    ? <CircularProgress size={14} sx={{ mr: 2 }} />
                    : null
                }
                sx={{ borderRadius: "8px", fontSize: "13px" }}
              >
                <MenuItem value=""><em>-- Select Type --</em></MenuItem>
                {resourceTypes.map((rt) => (
                  <MenuItem key={rt.id} value={rt.name}>
                    {rt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ISBN / Barcode */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="ISBN / Barcode"
              value={form.isbnBarcode}
              onChange={handleChange("isbnBarcode")}
              sx={inputSx}
            />
          </Grid>

          {/* Edition */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Edition"
              value={form.edition}
              onChange={handleChange("edition")}
              sx={inputSx}
            />
          </Grid>

          {/* Language — dynamic from backend */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "13px" }}>Language</InputLabel>
              <Select
                label="Language"
                value={form.language}
                onChange={handleChange("language")}
                endAdornment={
                  loadingLangs
                    ? <CircularProgress size={14} sx={{ mr: 2 }} />
                    : null
                }
                sx={{ borderRadius: "8px", fontSize: "13px" }}
              >
                <MenuItem value=""><em>-- Select Language --</em></MenuItem>
                {languages.map((lang) => (
                  <MenuItem key={lang.id} value={lang.name}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" type="number" label="Quantity"
              value={form.quantity}
              onChange={handleChange("quantity")}
              inputProps={{ min: 0 }}
              sx={inputSx}
            />
          </Grid>

          {/* Status — uses FormControl/Select to avoid label overlap */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "13px" }}>Status</InputLabel>
              <Select
                label="Status"
                value={form.status}
                onChange={handleChange("status")}
                sx={{ borderRadius: "8px", fontSize: "13px" }}
              >
                <MenuItem value=""><em>-- Select Status --</em></MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Issued">Issued</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
                <MenuItem value="Damaged">Damaged</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Room Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Room Number"
              value={form.roomNumber}
              onChange={handleChange("roomNumber")}
              sx={inputSx}
            />
          </Grid>

          {/* Rack Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Rack Number"
              value={form.rackNumber}
              onChange={handleChange("rackNumber")}
              sx={inputSx}
            />
          </Grid>

        </Grid>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 3 }}>
          <Button
            onClick={onClose} variant="text" size="small"
            sx={{ textTransform: "none", color: "#1976d2", fontWeight: 500, fontSize: "13px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained" onClick={handleSubmit} size="small"
            sx={{
              px: 3, py: 0.8, borderRadius: "6px",
              textTransform: "none", fontWeight: 600,
              boxShadow: "none", fontSize: "13px",
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceForm;

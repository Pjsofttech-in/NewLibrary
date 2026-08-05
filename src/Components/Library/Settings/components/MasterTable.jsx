import { useState, useEffect } from "react";
import {
  Box, Button, Paper, Typography, TextField,
  InputAdornment, Chip, CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import MasterForm from "./MasterForm";
import ResourceForm from "./ResourceForm";
import {
  getAll, create, update, remove,
  createResource, updateResource,
} from "../services/settingsService";
import "./MasterTable.css";

const MasterTable = ({ selectedMenu }) => {
  const [openForm, setOpenForm]           = useState(false);
  const [editData, setEditData]           = useState(null);
  const [search, setSearch]               = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [rows, setRows]                   = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);

  const isResource = selectedMenu.id === "resources";
  const endpoint   = selectedMenu.api || `/${selectedMenu.id}`;

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAll(endpoint);
      setRows(data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setSearch("");
    setPaginationModel({ page: 0, pageSize: 25 });
  }, [selectedMenu.id]);

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filteredData = isResource
    ? rows.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.resourceType?.toLowerCase().includes(search.toLowerCase()) ||
        item.isbnBarcode?.toLowerCase().includes(search.toLowerCase())
      )
    : rows.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAdd  = () => { setEditData(null); setOpenForm(true); };
  const handleEdit = (row) => { setEditData(row); setOpenForm(true); };

  const handleDelete = async (row) => {
    try {
      await remove(endpoint, row.id);
      setRows((prev) => prev.filter((item) => item.id !== row.id));
    } catch (err) {
      console.error("Error deleting:", err);
      setError("Delete failed");
    }
  };

  const handleSave = async (data) => {
    try {
      if (isResource) {
        // Resource: multi-field create / update
        if (editData) {
          const updated = await updateResource(editData.id, data);
          setRows((prev) => prev.map((item) => (item.id === editData.id ? updated : item)));
        } else {
          const created = await createResource(data);
          setRows((prev) => [...prev, created]);
        }
      } else {
        // Standard name-only create / update
        if (editData) {
          const updated = await update(endpoint, editData.id, data.name);
          setRows((prev) => prev.map((item) => (item.id === editData.id ? updated : item)));
        } else {
          const created = await create(endpoint, data.name);
          setRows((prev) => [...prev, created]);
        }
      }
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error("Error saving:", err);
      setError("Save failed");
    }
  };

  // ── Columns ────────────────────────────────────────────────────────────────
  const resourceColumns = [
    { field: "id",           headerName: "ID",       width: 70,  headerAlign: "left",   align: "left",   sortable: false },
    { field: "title",        headerName: "Title",    flex: 1,    minWidth: 160, headerAlign: "center", align: "center", sortable: false },
    { field: "resourceType", headerName: "Type",     width: 120, headerAlign: "center", align: "center", sortable: false },
    { field: "isbnBarcode",  headerName: "ISBN",     width: 150, headerAlign: "center", align: "center", sortable: false },
    { field: "quantity",     headerName: "Quantity", width: 90,  headerAlign: "center", align: "center", sortable: false },
    { field: "status",       headerName: "Status",   width: 110, headerAlign: "center", align: "center", sortable: false },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
            sx={{ fontSize: "11px", padding: "3px 8px", height: "24px", textTransform: "none" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row)}
            sx={{ fontSize: "11px", padding: "3px 8px", height: "24px", textTransform: "none" }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const defaultColumns = [
    { field: "id",   headerName: "ID", width: 100, headerAlign: "left", align: "left", sortable: false },
    {
      field: "name",
      headerName: selectedMenu.label,
      flex: 1,
      minWidth: 400,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row)}
          sx={{ fontSize: "11px", padding: "4px 8px", height: "24px", textTransform: "none" }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const columns = isResource ? resourceColumns : defaultColumns;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Box className="master-table-container">

        <Box className="master-table-header">
          <TextField
            size="small"
            placeholder={isResource ? "Search by title, type, ISBN…" : `Search by ${selectedMenu.label}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="master-search-box"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            className="master-create-btn"
          >
            Create {selectedMenu.label}
          </Button>

          <Chip
            label={`${selectedMenu.label}: ${filteredData.length}`}
            variant="outlined"
            className="master-count-chip"
          />
        </Box>

        <div className="master-table-scroll">
        <Paper elevation={2} className="master-table-paper">
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <DataGrid
              rows={filteredData}
              columns={columns}
              autoHeight
              density="spacious"
              rowHeight={48}
              columnHeaderHeight={44}
              disableRowSelectionOnClick
              disableColumnMenu
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders":    { backgroundColor: "#5d89e8", color: "#fff", fontWeight: 600, fontSize: 12 },
                "& .MuiDataGrid-columnHeaderTitle":{ fontWeight: 600 },
                "& .MuiDataGrid-cell":             { fontSize: 12 },
                "& .MuiDataGrid-row:nth-of-type(even)": { backgroundColor: "#fafafa" },
                "& .MuiDataGrid-footerContainer":  { display: "none" },
              }}
            />
          )}
        </Paper>
        </div>

        {!loading && filteredData.length > 0 && (
          <Box className="master-table-pagination">
            <span>
              {paginationModel.page * paginationModel.pageSize + 1} -{" "}
              {Math.min((paginationModel.page + 1) * paginationModel.pageSize, filteredData.length)} of {filteredData.length}
            </span>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                size="small"
                disabled={paginationModel.page === 0}
                onClick={() => setPaginationModel({ ...paginationModel, page: paginationModel.page - 1 })}
                sx={{ fontSize: "12px", minWidth: "auto", padding: "4px 8px" }}
              >&lt;</Button>
              <Typography sx={{ fontSize: "12px" }}>{paginationModel.page + 1}</Typography>
              <Button
                size="small"
                disabled={(paginationModel.page + 1) * paginationModel.pageSize >= filteredData.length}
                onClick={() => setPaginationModel({ ...paginationModel, page: paginationModel.page + 1 })}
                sx={{ fontSize: "12px", minWidth: "auto", padding: "4px 8px" }}
              >&gt;</Button>
              <select
                value={paginationModel.pageSize}
                onChange={(e) => setPaginationModel({ ...paginationModel, pageSize: parseInt(e.target.value), page: 0 })}
                className="master-pagination-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </Box>
          </Box>
        )}

      </Box>

      {/* Name-only form for standard lookup tables */}
      {!isResource && (
        <MasterForm
          open={openForm}
          onClose={() => { setOpenForm(false); setEditData(null); }}
          onSave={handleSave}
          selectedMenu={selectedMenu}
          editData={editData}
        />
      )}

      {/* Rich form for Resources */}
      {isResource && (
        <ResourceForm
          open={openForm}
          onClose={() => { setOpenForm(false); setEditData(null); }}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </>
  );
};

export default MasterTable;

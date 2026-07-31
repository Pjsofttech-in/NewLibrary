import { useState } from "react";
import { Box, Button, Paper, Typography, TextField, InputAdornment, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import MasterForm from "./MasterForm";
import "./MasterTable.css";



const MasterTable = ({ selectedMenu }) => {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

  const [masterData, setMasterData] = useState({
    category: [],
    academic_years: [],
    floors: [],
    publishers: [],
    resource_authors: [],
    resource_categories: [],
    resource_publishers: [],
    resource_statuses: [],
    resource_types: [],
    resources: [],
    rooms: [],
  });

  const filteredData = (masterData[selectedMenu.id] || []).filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpenForm(true);
  };

  const handleDelete = (row) => {
    setMasterData((prev) => ({
      ...prev,
      [selectedMenu.id]: prev[selectedMenu.id].filter(
        (item) => item.id !== row.id
      ),
    }));
  };

  const handleSave = (data) => {
    setMasterData((prev) => {
      const currentRows = prev[selectedMenu.id];

      if (editData) {
        return {
          ...prev,
          [selectedMenu.id]: currentRows.map((item) =>
            item.id === data.id
              ? { ...item, name: data.name }
              : item
          ),
        };
      }

      return {
        ...prev,
        [selectedMenu.id]: [
          ...currentRows,
          {
            id: currentRows.length + 1,
            name: data.name,
          },
        ],
      };
    });

    setOpenForm(false);
    setEditData(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
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
        <Button size="small" variant="contained" color="error" onClick={() => handleDelete(params.row)} sx={{ fontSize: "11px", padding: "4px 8px", height: "24px", textTransform: "none" }}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box className="master-table-container">

        <Box className="master-table-header">
          <TextField size="small" placeholder={`Search by ${selectedMenu.label}`} value={search} onChange={(e) => setSearch(e.target.value)} className="master-search-box" InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }} />

          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} className="master-create-btn">
            Create {selectedMenu.label}
          </Button>

          <Chip label={`${selectedMenu.label}: ${filteredData.length}`} variant="outlined" className="master-count-chip" />
        </Box>

        <Paper elevation={2} className="master-table-paper">
          <DataGrid rows={filteredData} columns={columns} autoHeight density="spacious" rowHeight={48} columnHeaderHeight={44} disableRowSelectionOnClick disableColumnMenu pageSizeOptions={[10, 25, 50]} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} sx={{ border: "none", "& .MuiDataGrid-columnHeaders": { backgroundColor: "#5d89e8", color: "#fff", fontWeight: 600, fontSize: 12 }, "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 }, "& .MuiDataGrid-cell": { fontSize: 12 }, "& .MuiDataGrid-row:nth-of-type(even)": { backgroundColor: "#fafafa" }, "& .MuiDataGrid-footerContainer": { display: "none" } }} />
        </Paper>

        {filteredData.length > 0 && (
          <Box className="master-table-pagination">
            <span>{(paginationModel.page * paginationModel.pageSize) + 1} - {Math.min((paginationModel.page + 1) * paginationModel.pageSize, filteredData.length)} of {filteredData.length}</span>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button size="small" disabled={paginationModel.page === 0} onClick={() => setPaginationModel({ ...paginationModel, page: paginationModel.page - 1 })} sx={{ fontSize: "12px", minWidth: "auto", padding: "4px 8px" }}>&lt;</Button>
              <Typography sx={{ fontSize: "12px" }}>{paginationModel.page + 1}</Typography>
              <Button size="small" disabled={(paginationModel.page + 1) * paginationModel.pageSize >= filteredData.length} onClick={() => setPaginationModel({ ...paginationModel, page: paginationModel.page + 1 })} sx={{ fontSize: "12px", minWidth: "auto", padding: "4px 8px" }}>&gt;</Button>
              <select value={paginationModel.pageSize} onChange={(e) => setPaginationModel({ ...paginationModel, pageSize: parseInt(e.target.value), page: 0 })} className="master-pagination-select">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </Box>
          </Box>
        )}

      </Box>

      <MasterForm open={openForm} onClose={() => { setOpenForm(false); setEditData(null); }} onSave={handleSave} selectedMenu={selectedMenu} editData={editData} />
    </>
  );
};

export default MasterTable;

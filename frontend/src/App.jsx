import { useState } from "react";
import SubmitReport from "./pages/SubmitReport";
import BulkUpload from "./pages/BulkUpload";
import Dashboard from "./pages/Dashboard";
import { Button, Stack } from "@mui/material";

export default function App() {
  const [page, setPage] = useState("submit");

  return (
    <div style={{ padding: 20 }}>
      <h1>NGO Impact System</h1>

      <Stack direction="row" spacing={2} marginBottom={3}>
        <Button variant="contained" onClick={() => setPage("submit")}>
          Submit Report
        </Button>
        <Button variant="contained" onClick={() => setPage("upload")}>
          Bulk Upload
        </Button>
        <Button variant="contained" onClick={() => setPage("dashboard")}>
          Admin Dashboard
        </Button>
      </Stack>

      {page === "submit" && <SubmitReport />}
      {page === "upload" && <BulkUpload />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

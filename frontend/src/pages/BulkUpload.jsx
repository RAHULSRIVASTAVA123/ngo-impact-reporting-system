import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Button } from "@mui/material";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/api/reports/upload", formData);
    setJob(res.data.jobId);
  };

  const checkStatus = async () => {
    const res = await axios.get(`/api/job-status/${job}`);
    alert(`Processed ${res.data.processed} of ${res.data.total}`);
  };

  return (
    <Card>
      <CardContent>
        <h2>Bulk CSV Upload</h2>

        <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
        <br /><br />

        <Button variant="contained" onClick={upload}>
          Upload CSV
        </Button>

        {job && (
          <>
            <p>Job ID: {job}</p>
            <Button variant="outlined" onClick={checkStatus}>
              Check Progress
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

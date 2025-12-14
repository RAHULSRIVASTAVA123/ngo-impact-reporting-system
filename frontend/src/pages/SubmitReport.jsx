import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { TextField, Button, Card, CardContent, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function SubmitReport() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post("/api/report", form);
    alert("Report submitted successfully");
  };

  return (
    <Card>
      <CardContent>
        <h2>Submit Monthly Report</h2>

        <Stack spacing={2}>
          <TextField
            label="NGO ID"
            onChange={e => setForm({ ...form, ngoId: e.target.value })}
          />

          <DatePicker
            views={["year", "month"]}
            label="Select Month"
            onChange={(value) =>
              setForm({ ...form, month: dayjs(value).format("YYYY-MM") })
            }
          />

          <TextField
            label="People Helped"
            type="number"
            onChange={e => setForm({ ...form, peopleHelped: Number(e.target.value) })}
          />

          <TextField
            label="Events Conducted"
            type="number"
            onChange={e => setForm({ ...form, eventsConducted: Number(e.target.value) })}
          />

          <TextField
            label="Funds Utilized"
            type="number"
            onChange={e => setForm({ ...form, fundsUtilized: Number(e.target.value) })}
          />

          <Button variant="contained" onClick={submit}>
            Submit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

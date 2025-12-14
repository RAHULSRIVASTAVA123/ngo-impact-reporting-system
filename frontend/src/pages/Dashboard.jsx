import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Card, CardContent, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await axios.get(`/api/dashboard?month=${month}`);
    setData(res.data);
  };

  return (
    <Card>
      <CardContent>
        <h2>Admin Dashboard</h2>

        <DatePicker
          views={["year", "month"]}
          label="Select Month"
          onChange={(value) =>
            setMonth(dayjs(value).format("YYYY-MM"))
          }
        />

        <br /><br />

        <Button variant="contained" onClick={load}>
          Load Data
        </Button>

        {data && (
          <ul>
            <li>Total NGOs Reporting: {data.totalNGOs}</li>
            <li>Total People Helped: {data.totalPeopleHelped}</li>
            <li>Total Events Conducted: {data.totalEventsConducted}</li>
            <li>Total Funds Utilized: {data.totalFundsUtilized}</li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";

export default function DashboardHome() {

  // Fake demo data (later from backend)
  const monthlyRevenue = [12000, 19000, 8000, 15000, 22000, 18000];
  const monthlyPayments = [9000, 15000, 6000, 12000, 20000, 16000];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>

        {/* Customers Pie */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Customers</Typography>

              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 70, label: "Active" },
                      { id: 1, value: 30, label: "Inactive" },
                    ],
                  },
                ]}
                width={300}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Vendors Pie */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Vendors</Typography>

              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 50, label: "Suppliers" },
                      { id: 1, value: 30, label: "Distributors" },
                      { id: 2, value: 20, label: "Services" },
                    ],
                  },
                ]}
                width={300}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue vs Payments */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Revenue vs Payment</Typography>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Jan","Feb","Mar","Apr","May","Jun"] }]}
                series={[
                  { data: monthlyRevenue, label: "Invoice" },
                  { data: monthlyPayments, label: "Paid" },
                ]}
                width={350}
                height={250}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Outstanding Trend */}
        <Grid item xs={12}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Outstanding Trend</Typography>

              <LineChart
                xAxis={[{ data: ["Jan","Feb","Mar","Apr","May","Jun"] }]}
                series={[
                  { data: [3000, 4000, 2000, 5000, 3500, 4200], label: "Outstanding" },
                ]}
                width={900}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}

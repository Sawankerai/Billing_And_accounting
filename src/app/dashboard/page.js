"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Users, FileText, ShoppingCart, DollarSign } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardHome() {

  const [customers, setCustomers] = useState([]);

  // ✅ SAFE localStorage usage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(stored);
  }, []);

  const recentCustomers = customers.slice(0, 5);

  const lineOptions = {
    chart: { toolbar: { show: false } },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    colors: ["#2563eb", "#16a34a"],
  };

  const lineSeries = [
    { name: "Purchase", data: [2000, 1000, 1500, 1800, 2500, 3000, 4000, 5000, 6000, 9000, 7000, 8000] },
    { name: "Sales", data: [3000, 2000, 2500, 3500, 4500, 6000, 8000, 9000, 12000, 18000, 15000, 17000] },
  ];

  const donutOptions = {
    labels: ["Mini Fridge", "Blackout"],
    colors: ["#7c3aed", "#22c55e"],
    legend: { position: "bottom" }
  };

  const donutSeries = [54, 46];

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* Overview Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <Users size={28} color="#2563eb" />
            <Typography mt={2}>Customers</Typography>
            <Typography variant="h5" fontWeight={600}>
              {customers.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <FileText size={28} color="#7c3aed" />
            <Typography mt={2}>Invoices</Typography>
            <Typography variant="h5" fontWeight={600}>45</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <ShoppingCart size={28} color="#16a34a" />
            <Typography mt={2}>Products</Typography>
            <Typography variant="h5" fontWeight={600}>16</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={cardStyle}>
            <DollarSign size={28} color="#f59e0b" />
            <Typography mt={2}>Revenue</Typography>
            <Typography variant="h5" fontWeight={600}>₹ 5,00,000</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ ...cardStyle }}>
            <Typography mb={2}>Sales by Month</Typography>
            <Chart options={lineOptions} series={lineSeries} type="area" height={250} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ ...cardStyle }}>
            <Typography mb={2}>Top Products</Typography>
            <Chart options={donutOptions} series={donutSeries} type="donut" height={250} />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Customers */}
      <Paper sx={cardStyle}>
        <Typography mb={2}>Recent Customers</Typography>

        {recentCustomers.length === 0 ? (
          <Typography color="text.secondary">No customers available</Typography>
        ) : (
          recentCustomers.map((c, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                py: 1
              }}
            >
              <Typography>{c.customerName}</Typography>
              <Typography>{c.mobile}</Typography>
            </Box>
          ))
        )}
      </Paper>

    </Box>
  );
}
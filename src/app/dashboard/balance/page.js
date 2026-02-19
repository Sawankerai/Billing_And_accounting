"use client";
import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

export default function OutstandingBalance() {
  const [data, setData] = useState({
    customerId: "",
    totalInvoice: "",
    totalPaid: "",
    outstandingAmount: "",
    lastPaymentDate: "",
    lastCalculatedDate: "",
    overdueAmount: "",
    nextDueAmount: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Balance Saved:", data);
    alert("Outstanding Balance Saved!");
  };

  return (
    <div className="card">
      <h2>Outstanding Balance</h2>

      <form className="form" onSubmit={submit}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Customer ID" name="customerId" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Total Invoice" name="totalInvoice" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Total Paid" name="totalPaid" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Outstanding Amount" name="outstandingAmount" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              fullWidth
              label="Last Payment Date"
              name="lastPaymentDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              fullWidth
              label="Last Calculated Date"
              name="lastCalculatedDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Over Due Amount" name="overdueAmount" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Next Due Amount" name="nextDueAmount" onChange={handleChange}/>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth size="large">
              Save Record
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
}
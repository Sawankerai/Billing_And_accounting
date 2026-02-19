"use client";
import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@mui/material";

export default function AddCustomer() {
  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    mobile: "",
    customerType: "",
    industryType: "",
    address: "",
    status: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e) => {
    setForm({ ...form, status: e.target.checked });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Customer Added:", form);
    alert("Customer Added!");
  };

  return (
    <div className="card">
      <h2>Add Customer</h2>

      <form onSubmit={submit} className="form">
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              type="email"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Customer Type"
              name="customerType"
              onChange={handleChange}
            >
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Industry Type"
              name="industryType"
              onChange={handleChange}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.status}
                  onChange={handleSwitch}
                  color="primary"
                />
              }
              label={form.status ? "Active" : "Inactive"}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
            >
              Save Customer
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
}
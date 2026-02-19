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

export default function AddVendor() {
  const [vendor, setVendor] = useState({
    vendorName: "",
    companyName: "",
    email: "",
    mobile: "",
    customerType: "",
    vendorType: "",
    address: "",
    status: true,
  });

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitch = (e) => {
    setVendor({
      ...vendor,
      status: e.target.checked,
    });
  };

  const submitVendor = (e) => {
    e.preventDefault();

    console.log("Vendor Added:", vendor);
    alert("Vendor Saved Successfully!");

    setVendor({
      vendorName: "",
      companyName: "",
      email: "",
      mobile: "",
      customerType: "",
      vendorType: "",
      address: "",
      status: true,
    });
  };

  return (
    <div className="card">
      <h2>Add Vendor</h2>

      <form className="form" onSubmit={submitVendor}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Vendor Name"
              name="vendorName"
              value={vendor.vendorName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={vendor.companyName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              type="email"
              value={vendor.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={vendor.mobile}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Customer Type"
              name="customerType"
              value={vendor.customerType}
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
              label="Vendor Type"
              name="vendorType"
              value={vendor.vendorType}
              onChange={handleChange}
            >
              <MenuItem value="Supplier">Supplier</MenuItem>
              <MenuItem value="Distributor">Distributor</MenuItem>
              <MenuItem value="Service Provider">Service Provider</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              value={vendor.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={vendor.status}
                  onChange={handleSwitch}
                  color="primary"
                />
              }
              label={vendor.status ? "Active" : "Inactive"}
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
              Save Vendor
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Divider,
  Switch,
  FormControlLabel
} from "@mui/material";

export default function AddCustomer() {
  const router = useRouter();

  const [tab, setTab] = useState(0);

  const [form, setForm] = useState({
    customerType: "Business",
    industryType: "",
    customerName: "",
    companyName: "",
    email: "",
    mobile: "",
    gst: "",
    pan: "",
    website: "",
    paymentTerms: "30 Days",
    currency: "INR",
    balance: "",
    tags: "",
    notes: "",

    billingCountry: "",
    billingState: "",
    billingCity: "",
    billingAddress: "",
    billingPin: "",
    billingPhone: "",

    shippingCountry: "",
    shippingState: "",
    shippingCity: "",
    shippingAddress: "",
    shippingPin: "",
    shippingPhone: "",

    contactName: "",
    contactEmail: "",
    contactMobile: "",
    contactAddress: "",

    status: true,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const old = JSON.parse(localStorage.getItem("customers")) || [];
    localStorage.setItem("customers", JSON.stringify([...old, form]));
    router.push("/dashboard/customers");
  };

  const section = (title, children) => (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>Add New Customer</Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Basic Info" />
        <Tab label="Address" />
        <Tab label="Contact Person" />
        <Tab label="Additional Info" />
      </Tabs>

      <form onSubmit={submit}>

        {tab === 0 && (
          <>
            {section("Basic Information",
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField select fullWidth label="Customer Type" name="customerType" defaultValue="Business" onChange={handleChange}>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Individual">Individual</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Industry Type" name="industryType" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Customer Name" name="customerName" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Company Name" name="companyName" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Email" name="email" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Mobile" name="mobile" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="GST Number" name="gst" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="PAN Number" name="pan" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Active Status" />
                </Grid>
              </Grid>
            )}
          </>
        )}

        {tab === 1 && (
          <>
            {section("Billing Address",
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField fullWidth label="Country" name="billingCountry" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="State" name="billingState" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="City" name="billingCity" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Pincode" name="billingPin" onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address" name="billingAddress" onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Phone" name="billingPhone" onChange={handleChange} /></Grid>
              </Grid>
            )}

            {section("Shipping Address",
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField fullWidth label="Country" name="shippingCountry" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="State" name="shippingState" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="City" name="shippingCity" onChange={handleChange} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Pincode" name="shippingPin" onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address" name="shippingAddress" onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Phone" name="shippingPhone" onChange={handleChange} /></Grid>
              </Grid>
            )}
          </>
        )}

        {tab === 2 && (
          section("Contact Person",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField fullWidth label="Name" name="contactName" onChange={handleChange} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Email" name="contactEmail" onChange={handleChange} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Mobile" name="contactMobile" onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Address" name="contactAddress" onChange={handleChange} /></Grid>
            </Grid>
          )
        )}

        {tab === 3 && (
          section("Additional Information",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField select fullWidth label="Payment Terms" name="paymentTerms" defaultValue="30 Days" onChange={handleChange}>
                  <MenuItem value="15 Days">15 Days</MenuItem>
                  <MenuItem value="30 Days">30 Days</MenuItem>
                  <MenuItem value="45 Days">45 Days</MenuItem>
                  <MenuItem value="60 Days">60 Days</MenuItem>
                  <MenuItem value="Due on receipt">Due on receipt</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Currency" name="currency" defaultValue="INR" onChange={handleChange} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Outstanding Balance" name="balance" onChange={handleChange} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Website" name="website" onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Tags" name="tags" onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Notes" name="notes" onChange={handleChange} /></Grid>
            </Grid>
          )
        )}

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => router.back()}>Cancel</Button>
            <Button variant="contained" type="submit">Save Customer</Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

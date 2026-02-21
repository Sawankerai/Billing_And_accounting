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
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function AddCustomer() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [sameAddress, setSameAddress] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    mobile: "",
    billingCountry: "",
    billingState: "",
    billingCity: "",
    billingAddress: "",
    shippingCountry: "",
    shippingState: "",
    shippingCity: "",
    shippingAddress: "",
    contactName: "",
    contactEmail: "",
    contactMobile: "",
    contactAddress: "",
    paymentTerms: "30 Days",
    currency: "INR",
    balance: "",
    notes: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setForm((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleSameAddress = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);

    if (checked) {
      setForm((prev) => ({
        ...prev,
        shippingCountry: prev.billingCountry,
        shippingState: prev.billingState,
        shippingCity: prev.billingCity,
        shippingAddress: prev.billingAddress,
      }));
    }
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.customerName.trim())
      newErrors.customerName = "Customer name is required";

    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required";

    if (!form.email)
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.mobile)
      newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile must be exactly 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const old = JSON.parse(localStorage.getItem("customers")) || [];
    localStorage.setItem("customers", JSON.stringify([...old, form]));
    router.push("/dashboard/customers");
  };

  const section = (title, children) => (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Add New Customer
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Basic Info" />
        <Tab label="Address" />
        <Tab label="Contact Person" />
        <Tab label="Additional Info" />
      </Tabs>

      <form onSubmit={submit}>

        {/* ================= BASIC INFO ================= */}
        {tab === 0 &&
          section("Basic Information",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  error={!!errors.customerName}
                  helperText={errors.customerName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={form.status} onChange={handleStatusChange} />}
                  label="Active Status"
                />
              </Grid>
            </Grid>
          )
        }

        {/* ================= ADDRESS ================= */}
        {tab === 1 &&
          section("Address",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Billing Country" name="billingCountry"
                  value={form.billingCountry} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Billing State" name="billingState"
                  value={form.billingState} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Billing Address" name="billingAddress"
                  value={form.billingAddress} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={sameAddress} onChange={handleSameAddress} />}
                  label="Shipping same as Billing"
                />
              </Grid>
            </Grid>
          )
        }

        {/* ================= CONTACT PERSON ================= */}
        {tab === 2 &&
          section("Contact Person",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Contact Name"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Contact Email"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Contact Mobile"
                  name="contactMobile"
                  value={form.contactMobile}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )
        }

        {/* ================= ADDITIONAL INFO ================= */}
        {tab === 3 &&
          section("Additional Information",
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Outstanding Balance"
                  name="balance"
                  value={form.balance}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3}
                  label="Notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )
        }

        {/* ================= BUTTONS ================= */}
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>

            {tab > 0 && (
              <Button variant="outlined" onClick={() => setTab(tab - 1)}>
                Previous
              </Button>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={() => router.back()}>
                Cancel
              </Button>

              {tab < 3 ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    if (tab === 0 && !validate()) return;
                    setTab(tab + 1);
                  }}
                >
                  Save & Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Final Save
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

      </form>
    </Box>
  );
}
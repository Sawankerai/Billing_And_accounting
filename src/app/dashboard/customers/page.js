"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  // Load saved customers
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(data);
  }, []);

  // 🔥 DELETE FUNCTION
  const handleDelete = (index) => {
    const confirmDelete = confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    const updated = [...customers];
    updated.splice(index, 1);

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
  };

  // Filter search
  const filtered = customers.filter((c) =>
    `${c.customerName} ${c.companyName} ${c.email} ${c.mobile}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="customers-page">

      {/* ================= TOP BAR ================= */}
      <div className="customers-topbar">

        <div className="left-controls">
          <select className="filter-select">
            <option>Filter Customers / Customers</option>
          </select>

          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="right-controls">
          <Link href="/dashboard/customers/add" className="btn btn-green">
            <Plus size={16} />
            New
          </Link>
          <button className="btn btn-light">Export</button>
          <button className="btn btn-light">Import</button>
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="customers-table">

        {/* HEADER */}
        <div
          className="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 2fr 1.5fr 1.5fr",
            padding: "12px",
            fontWeight: "600",
            background: "#f3f4f6",
            borderBottom: "1px solid #ddd"
          }}
        >
          <div>Company name</div>
          <div>Contact name</div>
          <div>Balance</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>Business without customers isn't easy.</h2>
            <p>Create and manage your contacts, all in one place.</p>

            <Link href="/dashboard/customers/add" className="btn btn-blue">
              <Plus size={16} />
              Create New Customer
            </Link>

            <p className="import-link">
              Click here to import customers from a file
            </p>
          </div>
        ) : (
          filtered.map((c, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 2fr 1.5fr 1.5fr",
                padding: "12px",
                borderBottom: "1px solid #eee",
                alignItems: "center"
              }}
            >
              <div>{c.companyName}</div>
              <div>{c.customerName}</div>
              <div>₹ {c.balance || 0}</div>
              <div>{c.email}</div>
              <div>{c.mobile}</div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => alert("Edit feature coming soon")}
                  style={{
                    padding: "4px 10px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  style={{
                    padding: "4px 10px",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}
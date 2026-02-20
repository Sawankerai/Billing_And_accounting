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

        <div className="table-header">
          <div>Company name</div>
          <div>Contact name</div>
          <div>Balance</div>
          <div>Email</div>
          <div>Phone</div>
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
            <div className="table-row" key={i}>
              <div>{c.companyName}</div>
              <div>{c.customerName}</div>
              <div>₹ {c.balance || 0}</div>
              <div>{c.email}</div>
              <div>{c.mobile}</div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

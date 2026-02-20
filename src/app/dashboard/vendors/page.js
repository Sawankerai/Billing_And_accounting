"use client";
import { useState } from "react";

export default function VendorsPage() {
  const [mode, setMode] = useState("view");

  return (
    <div className="page-container">
      <h2>Vendors</h2>

      <div className="top-actions">
        <button
          className={mode === "view" ? "active-btn" : ""}
          onClick={() => setMode("view")}
        >
          View Vendors
        </button>

        <button
          className={mode === "add" ? "active-btn" : ""}
          onClick={() => setMode("add")}
        >
          Add Vendor
        </button>
      </div>

      {mode === "view" ? (
        <div>Your vendors table here</div>
      ) : (
        <div>Your vendor form here</div>
      )}
    </div>
  );
}

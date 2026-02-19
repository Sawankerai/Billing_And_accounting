"use client";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import "../globals.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

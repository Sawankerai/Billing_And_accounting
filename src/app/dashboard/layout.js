"use client";

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { SidebarProvider } from "@/app/context/SidebarContext";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

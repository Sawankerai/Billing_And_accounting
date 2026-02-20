"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSidebar } from "@/app/context/SidebarContext";

import {
  LayoutDashboard,
  Users,
  Building2,
  Receipt,
  Repeat,
  FileText,
  Truck,
  ShoppingCart,
  Package,
  Boxes,
  AlertTriangle,
  ClipboardList,
  ScanLine,
  CalendarClock
} from "lucide-react";

/* ================= LOGO ================= */

function SidebarLogo({ expanded }) {
  return (
    <div className="sidebar-logo">
      {expanded ? (
        <Image src="/companylogo.png" alt="Company Logo" width={150} height={50} priority />
      ) : (
        <Image src="/company-icon.png" alt="Company Icon" width={32} height={32} priority />
      )}
    </div>
  );
}

/* ================= SUB LINK ================= */

function SubMenuLink({ href, icon: Icon, label, active, onClick }) {
  return (
    <Link href={href} onClick={onClick} className={`submenu-link ${active ? "active" : ""}`}>
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { expanded, toggleSidebar, collapseSidebar } = useSidebar();

  const [openMenu, setOpenMenu] = useState(null);

  /* ===== Detect active module ===== */
  useEffect(() => {
    if (pathname.startsWith("/dashboard/customers") ||
        pathname.startsWith("/dashboard/vendors") ||
        pathname.startsWith("/dashboard/balance")) setOpenMenu("cvm");

    else if (pathname.startsWith("/dashboard/invoices") ||
             pathname.startsWith("/dashboard/pos")) setOpenMenu("billing");

    else if (pathname.startsWith("/dashboard/products") ||
             pathname.startsWith("/dashboard/categories") ||
             pathname.startsWith("/dashboard/stock")) setOpenMenu("inventory");

    collapseSidebar();
  }, [pathname]);

  /* ===== Expand first then open ===== */
  const toggleMenu = (key) => {
    if (!expanded) {
      toggleSidebar();
      setOpenMenu(key);
      return;
    }
    setOpenMenu(openMenu === key ? null : key);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  /* ===== MENU CONFIG ===== */

  const menus = [
    {
      key: "cvm",
      title: "Customer & Vendor Management",
      icon: Users,
      items: [
        { label: "Customers", href: "/dashboard/customers", icon: Users },
        { label: "Vendors", href: "/dashboard/vendors", icon: Building2 },
        { label: "Outstanding Balance", href: "/dashboard/balance", icon: AlertTriangle },
      ],
    },
    {
      key: "billing",
      title: "Invoice & Billing",
      icon: Receipt,
      items: [
        { label: "Invoices", href: "/dashboard/invoices", icon: Receipt },
        { label: "Recurring Invoices", href: "/dashboard/invoices/recurring", icon: Repeat },
        { label: "Credit / Debit Note", href: "/dashboard/invoices/notes", icon: FileText },
        { label: "Delivery Challan", href: "/dashboard/invoices/challan", icon: Truck },
        { label: "POS Billing", href: "/dashboard/pos", icon: ShoppingCart },
      ],
    },
    {
      key: "inventory",
      title: "Inventory Management",
      icon: Package,
      items: [
        { label: "Products", href: "/dashboard/products", icon: Boxes },
        { label: "Categories", href: "/dashboard/categories", icon: ClipboardList },
        { label: "Low Stock Alert", href: "/dashboard/stock", icon: AlertTriangle },
        { label: "Purchase Order", href: "/dashboard/purchase-orders", icon: FileText },
        { label: "Barcode Scanner", href: "/dashboard/barcode", icon: ScanLine },
        { label: "Batch & Expiry", href: "/dashboard/batch-expiry", icon: CalendarClock },
      ],
    },
  ];

  /* ================= RENDER ================= */

  return (
    <>
      {expanded && <div className="sidebar-backdrop" onClick={collapseSidebar}></div>}

      <aside className={`sidebar ${expanded ? "expanded" : ""}`}>
        <SidebarLogo expanded={expanded} />

        <nav className="menu">

          {/* Dashboard */}
          <SubMenuLink
            href="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={pathname === "/dashboard"}
            onClick={collapseSidebar}
          />

          {/* Modules */}
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <div key={menu.key} className="menu-module">
                <div className="menu-title" onClick={() => toggleMenu(menu.key)}>
                  <span className="menu-label">
                    <Icon size={18} />
                    <span>{menu.title}</span>
                  </span>

                  <span className="arrow">{openMenu === menu.key ? "▼" : "▶"}</span>
                </div>

                {openMenu === menu.key && (
                  <div className="submenu">
                    {menu.items.map((item) => (
                      <SubMenuLink
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        active={pathname === item.href}
                        onClick={collapseSidebar}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button className="logout" onClick={logout}>Logout</button>
      </aside>
    </>
  );
}

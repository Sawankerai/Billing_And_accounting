"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
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

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (
      pathname.startsWith("/dashboard/customers") ||
      pathname.startsWith("/dashboard/vendors") ||
      pathname.startsWith("/dashboard/balance")
    )
      setOpenMenu("cvm");
    else if (
      pathname.startsWith("/dashboard/invoices") ||
      pathname.startsWith("/dashboard/pos")
    )
      setOpenMenu("billing");
    else if (
      pathname.startsWith("/dashboard/products") ||
      pathname.startsWith("/dashboard/categories") ||
      pathname.startsWith("/dashboard/stock")
    )
      setOpenMenu("inventory");
  }, [pathname]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menus = [
    {
      title: "Customer & Vendor Management",
      key: "cvm",
      icon: Users,
      items: [
        { name: "View Customers", link: "/dashboard/customers", icon: Users },
        { name: "Add Customer", link: "/dashboard/customers/add", icon: UserPlus },
        { name: "View Vendors", link: "/dashboard/vendors", icon: Building2 },
        { name: "Add Vendor", link: "/dashboard/vendors/add", icon: UserPlus },
        { name: "Outstanding Balance", link: "/dashboard/balance", icon: AlertTriangle },
      ],
    },
    {
      title: "Invoice & Billing",
      key: "billing",
      icon: Receipt,
      items: [
        { name: "Invoices", link: "/dashboard/invoices", icon: Receipt },
        { name: "Recurring Invoices", link: "/dashboard/invoices/recurring", icon: Repeat },
        { name: "Credit / Debit Note", link: "/dashboard/invoices/notes", icon: FileText },
        { name: "Delivery Challan", link: "/dashboard/invoices/challan", icon: Truck },
        { name: "POS Billing", link: "/dashboard/pos", icon: ShoppingCart },
      ],
    },
    {
      title: "Inventory Management",
      key: "inventory",
      icon: Package,
      items: [
        { name: "Products", link: "/dashboard/products", icon: Boxes },
        { name: "Categories", link: "/dashboard/categories", icon: ClipboardList },
        { name: "Low Stock Alert", link: "/dashboard/stock", icon: AlertTriangle },
        { name: "Purchase Order", link: "/dashboard/purchase-orders", icon: FileText },
        { name: "Barcode Scanner", link: "/dashboard/barcode", icon: ScanLine },
        { name: "Batch & Expiry", link: "/dashboard/batch-expiry", icon: CalendarClock },
      ],
    },
  ];

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <Image
          src="/companylogo.png"
          alt="Company Logo"
          width={150}
          height={60}
          priority
        />
      </div>

      <nav className="menu">

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`submenu-link ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <LayoutDashboard size={18} style={{ marginRight: 10 }} />
          Dashboard
        </Link>

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <div key={menu.key} className="menu-module">

              <div className="menu-title" onClick={() => toggleMenu(menu.key)}>
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={18} />
                  {menu.title}
                </span>
                <span className="arrow">{openMenu === menu.key ? "▼" : "▶"}</span>
              </div>

              {openMenu === menu.key && (
                <div className="submenu">
                  {menu.items.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={index}
                        href={item.link}
                        className={`submenu-link ${pathname === item.link ? "active" : ""}`}
                      >
                        <ItemIcon size={16} style={{ marginRight: 10 }} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button className="logout" onClick={logout}>Logout</button>

    </div>
  );
}

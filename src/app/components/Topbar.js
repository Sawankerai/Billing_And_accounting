import { Menu } from "lucide-react";
import { useSidebar } from "@/app/context/SidebarContext";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
   <div className="topbar">
  <button className="menu-btn">☰</button>
      </div>
      
  
  );
}

"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(prev => !prev);
  };

  const collapseSidebar = () => {
    setExpanded(false);
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar, collapseSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

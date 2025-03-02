import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import DashboardOverview from "./dashboard/DashboardOverview";
import InventoryModule from "./inventory/InventoryModule";
import POSModule from "./pos/POSModule";
import AnalyticsModule from "./analytics/AnalyticsModule";
import CustomersModule from "./customers/CustomersModule";
import OrdersModule from "./orders/OrdersModule";
import SuppliersModule from "./suppliers/SuppliersModule";
import SettingsModule from "./settings/SettingsModule";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Determine current module based on path
  const getModuleFromPath = () => {
    const path = location.pathname;
    if (path === "/") return "dashboard";
    return path.substring(1); // Remove the leading slash
  };

  const currentModule = getModuleFromPath();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderModuleContent = () => {
    switch (currentModule) {
      case "dashboard":
        return <DashboardOverview />;
      case "inventory":
        return <InventoryModule />;
      case "pos":
        return <POSModule />;
      case "analytics":
        return <AnalyticsModule />;
      case "customers":
        return <CustomersModule />;
      case "orders":
        return <OrdersModule />;
      case "suppliers":
        return <SuppliersModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Module Under Development
              </h2>
              <p className="text-muted-foreground">
                This module is currently being built.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}
          onMenuToggle={toggleSidebar}
        />

        <main className="flex-1 overflow-hidden">{renderModuleContent()}</main>
      </div>
    </div>
  );
};

export default Home;

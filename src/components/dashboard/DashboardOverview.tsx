import React, { useState } from "react";
import KPICardGrid from "./KPICardGrid";
import SalesChart from "./SalesChart";
import InventorySummary from "./InventorySummary";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickActions";

interface DashboardOverviewProps {
  userName?: string;
  businessName?: string;
  dateRange?: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userName = "Admin",
  businessName = "Inventory Management System",
  dateRange = "Today",
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(dateRange);

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with {businessName} today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-6">
        <KPICardGrid />
      </div>

      {/* Charts and Inventory Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <InventorySummary />
        </div>
      </div>

      {/* Recent Transactions and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <RecentTransactions />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

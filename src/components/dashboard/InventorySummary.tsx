import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowUpRight, BarChart3, Package } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  maxStock: number;
  status: "low" | "normal" | "overstocked";
}

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
}

interface InventorySummaryProps {
  lowStockItems?: InventoryItem[];
  topSellingProducts?: {
    name: string;
    sold: number;
    revenue: number;
  }[];
  inventoryByCategory?: CategoryData[];
}

const InventorySummary = ({
  lowStockItems = [
    {
      id: "1",
      name: "Wireless Headphones",
      stock: 5,
      maxStock: 50,
      status: "low",
    },
    { id: "2", name: "USB-C Cables", stock: 8, maxStock: 100, status: "low" },
    { id: "3", name: "Power Banks", stock: 3, maxStock: 30, status: "low" },
  ],
  topSellingProducts = [
    { name: "Smartphone X", sold: 124, revenue: 12400 },
    { name: "Laptop Pro", sold: 89, revenue: 89000 },
    { name: "Wireless Earbuds", sold: 76, revenue: 3800 },
  ],
  inventoryByCategory = [
    { name: "Electronics", value: 45000, percentage: 40 },
    { name: "Accessories", value: 30000, percentage: 25 },
    { name: "Computers", value: 25000, percentage: 20 },
    { name: "Other", value: 15000, percentage: 15 },
  ],
}: InventorySummaryProps) => {
  return (
    <Card className="w-full h-full bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Summary
          </span>
          <Button variant="outline" size="sm" className="text-xs">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Low Stock Alerts */}
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Low Stock Alerts
          </h3>
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(item.stock / item.maxStock) * 100}
                      className="h-1.5 w-24"
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.stock}/{item.maxStock}
                    </span>
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Low Stock
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-2 text-xs w-full">
            Restock Items
          </Button>
        </div>

        {/* Top Selling Products */}
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <ArrowUpRight className="h-4 w-4 text-primary" />
            Top Selling Products
          </h3>
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sold} units sold
                  </p>
                </div>
                <span className="text-sm font-medium">
                  ${product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Value by Category */}
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            Inventory Value by Category
          </h3>
          <div className="space-y-3">
            {inventoryByCategory.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{category.name}</p>
                  <span className="text-sm font-medium">
                    ${category.value.toLocaleString()}
                  </span>
                </div>
                <Progress value={category.percentage} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Generate Inventory Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InventorySummary;

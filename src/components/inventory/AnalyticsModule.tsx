import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryAnalyticsProps {}

const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = () => {
  const [selectedBox, setSelectedBox] = useState<string>("reorder");

  // Sample data for each box
  const boxData = {
    reorder: {
      count: 12,
      items: [
        {
          name: "Wireless Headphones",
          sku: "PRD-001",
          quantity: 5,
          reorderPoint: 10,
        },
        { name: "Smart Watch", sku: "PRD-002", quantity: 3, reorderPoint: 8 },
        {
          name: "Bluetooth Speaker",
          sku: "PRD-003",
          quantity: 4,
          reorderPoint: 10,
        },
        { name: "Laptop Stand", sku: "PRD-004", quantity: 2, reorderPoint: 5 },
        {
          name: "Wireless Mouse",
          sku: "PRD-005",
          quantity: 6,
          reorderPoint: 15,
        },
      ],
      chartData: [
        { name: "Week 1", value: 8 },
        { name: "Week 2", value: 10 },
        { name: "Week 3", value: 12 },
        { name: "Week 4", value: 15 },
        { name: "Week 5", value: 12 },
        { name: "Week 6", value: 10 },
      ],
    },
    lowStock: {
      count: 19,
      items: [
        {
          name: "Wireless Headphones",
          sku: "PRD-001",
          quantity: 5,
          threshold: 10,
        },
        { name: "Smart Watch", sku: "PRD-002", quantity: 3, threshold: 8 },
        {
          name: "Bluetooth Speaker",
          sku: "PRD-003",
          quantity: 4,
          threshold: 10,
        },
        { name: "Laptop Stand", sku: "PRD-004", quantity: 2, threshold: 5 },
        { name: "Wireless Mouse", sku: "PRD-005", quantity: 6, threshold: 15 },
      ],
      chartData: [
        { name: "Electronics", value: 8 },
        { name: "Accessories", value: 5 },
        { name: "Audio", value: 4 },
        { name: "Computers", value: 2 },
      ],
    },
    outOfStock: {
      count: 11,
      items: [
        {
          name: "Laptop Stand",
          sku: "PRD-004",
          lastInStock: "2023-05-15",
          expectedRestock: "2023-06-01",
        },
        {
          name: "Wireless Keyboard",
          sku: "PRD-006",
          lastInStock: "2023-05-10",
          expectedRestock: "2023-06-05",
        },
        {
          name: "USB-C Hub",
          sku: "PRD-007",
          lastInStock: "2023-05-20",
          expectedRestock: "2023-06-10",
        },
        {
          name: "HDMI Cable",
          sku: "PRD-008",
          lastInStock: "2023-05-18",
          expectedRestock: "2023-06-03",
        },
      ],
      chartData: [
        { name: "Jan", value: 4 },
        { name: "Feb", value: 6 },
        { name: "Mar", value: 8 },
        { name: "Apr", value: 10 },
        { name: "May", value: 11 },
        { name: "Jun", value: 8 },
      ],
    },
    inStock: {
      count: 37,
      items: [
        {
          name: "Wireless Headphones",
          sku: "PRD-001",
          quantity: 45,
          value: 3599.55,
        },
        {
          name: "Bluetooth Speaker",
          sku: "PRD-003",
          quantity: 28,
          value: 1679.72,
        },
        {
          name: "Wireless Mouse",
          sku: "PRD-005",
          quantity: 32,
          value: 1119.68,
        },
        {
          name: "Smartphone Case",
          sku: "PRD-009",
          quantity: 56,
          value: 839.44,
        },
        {
          name: "Screen Protector",
          sku: "PRD-010",
          quantity: 78,
          value: 779.22,
        },
      ],
      chartData: [
        { name: "Electronics", value: 15 },
        { name: "Accessories", value: 12 },
        { name: "Audio", value: 6 },
        { name: "Computers", value: 4 },
      ],
    },
    productCategories: {
      count: 13,
      items: [
        { name: "Electronics", itemCount: 45, value: 25000 },
        { name: "Accessories", itemCount: 32, value: 8500 },
        { name: "Audio", itemCount: 28, value: 7200 },
        { name: "Computers", itemCount: 18, value: 3600 },
        { name: "Other", itemCount: 33, value: 1378.99 },
      ],
      chartData: [
        { name: "Electronics", value: 45 },
        { name: "Accessories", value: 32 },
        { name: "Audio", value: 28 },
        { name: "Computers", value: 18 },
        { name: "Other", value: 33 },
      ],
    },
    productSubCategories: {
      count: 23,
      items: [
        {
          name: "Smartphones",
          parentCategory: "Electronics",
          itemCount: 15,
          value: 12500,
        },
        {
          name: "TVs",
          parentCategory: "Electronics",
          itemCount: 8,
          value: 5600,
        },
        {
          name: "Audio",
          parentCategory: "Electronics",
          itemCount: 12,
          value: 3200,
        },
        {
          name: "Wearables",
          parentCategory: "Electronics",
          itemCount: 6,
          value: 2400,
        },
        {
          name: "Computers",
          parentCategory: "Electronics",
          itemCount: 4,
          value: 1300,
        },
      ],
      chartData: [
        { name: "Smartphones", value: 15 },
        { name: "TVs", value: 8 },
        { name: "Audio", value: 12 },
        { name: "Wearables", value: 6 },
        { name: "Computers", value: 4 },
      ],
    },
    highStock: {
      count: 11,
      items: [
        {
          name: "Screen Protector",
          sku: "PRD-010",
          quantity: 78,
          maxThreshold: 50,
        },
        {
          name: "Smartphone Case",
          sku: "PRD-009",
          quantity: 56,
          maxThreshold: 40,
        },
        {
          name: "Wireless Headphones",
          sku: "PRD-001",
          quantity: 45,
          maxThreshold: 30,
        },
        {
          name: "Wireless Mouse",
          sku: "PRD-005",
          quantity: 32,
          maxThreshold: 25,
        },
      ],
      chartData: [
        { name: "Screen Protector", value: 78 },
        { name: "Smartphone Case", value: 56 },
        { name: "Wireless Headphones", value: 45 },
        { name: "Wireless Mouse", value: 32 },
      ],
    },
    highCost: {
      count: 18,
      items: [
        {
          name: "Smart Watch",
          sku: "PRD-002",
          cost: 89.99,
          price: 199.99,
          margin: 55,
        },
        {
          name: "Laptop",
          sku: "PRD-011",
          cost: 599.99,
          price: 999.99,
          margin: 40,
        },
        {
          name: "Tablet",
          sku: "PRD-012",
          cost: 299.99,
          price: 499.99,
          margin: 40,
        },
        {
          name: "Smartphone",
          sku: "PRD-013",
          cost: 399.99,
          price: 699.99,
          margin: 43,
        },
      ],
      chartData: [
        { name: "Smart Watch", value: 89.99 },
        { name: "Laptop", value: 599.99 },
        { name: "Tablet", value: 299.99 },
        { name: "Smartphone", value: 399.99 },
      ],
    },
  };

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Render table based on selected box
  const renderTable = () => {
    const data = boxData[selectedBox as keyof typeof boxData];

    if (!data) return null;

    switch (selectedBox) {
      case "reorder":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Current Quantity</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {item.reorderPoint}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "lowStock":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Current Quantity</TableHead>
                <TableHead className="text-right">
                  Low Stock Threshold
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.threshold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "outOfStock":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Last In Stock</TableHead>
                <TableHead>Expected Restock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.lastInStock}</TableCell>
                  <TableCell>{item.expectedRestock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "inStock":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Value ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.value.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "productCategories":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-right">Item Count</TableHead>
                <TableHead className="text-right">Value ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.itemCount}</TableCell>
                  <TableCell className="text-right">
                    ${item.value.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "productSubCategories":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub Category Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead className="text-right">Item Count</TableHead>
                <TableHead className="text-right">Value ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.parentCategory}</TableCell>
                  <TableCell className="text-right">{item.itemCount}</TableCell>
                  <TableCell className="text-right">
                    ${item.value.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "highStock":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Current Quantity</TableHead>
                <TableHead className="text-right">Max Threshold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {item.maxThreshold}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "highCost":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Cost ($)</TableHead>
                <TableHead className="text-right">Price ($)</TableHead>
                <TableHead className="text-right">Margin (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">
                    ${item.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">{item.margin}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  // Render chart based on selected box
  const renderChart = () => {
    const data = boxData[selectedBox as keyof typeof boxData];

    if (!data) return null;

    switch (selectedBox) {
      case "reorder":
      case "outOfStock":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#444"
                opacity={0.1}
              />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0088FE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "lowStock":
      case "inStock":
      case "productCategories":
      case "productSubCategories":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.chartData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case "highStock":
      case "highCost":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#444"
                opacity={0.1}
              />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-x-hidden overflow-y-hidden">
      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-4 gap-3 scale-95">
        <Card
          onClick={() => setSelectedBox("reorder")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "reorder" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-red-500">
            Reorder Products
          </div>
          <div className="text-xl font-bold mt-1 text-center text-red-500">
            {boxData.reorder.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("lowStock")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "lowStock" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-amber-500">
            Low Stock Products
          </div>
          <div className="text-xl font-bold mt-1 text-center text-amber-500">
            {boxData.lowStock.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("outOfStock")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "outOfStock" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-destructive">
            Out of Stock
          </div>
          <div className="text-xl font-bold mt-1 text-center text-destructive">
            {boxData.outOfStock.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("inStock")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "inStock" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-green-500">
            In Stock Products
          </div>
          <div className="text-xl font-bold mt-1 text-center text-green-500">
            {boxData.inStock.count}
          </div>
        </Card>
      </div>

      <div className="p-3 grid grid-cols-4 gap-3 scale-95">
        <Card
          onClick={() => setSelectedBox("productCategories")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "productCategories" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-blue-500">
            Product Categories
          </div>
          <div className="text-xl font-bold mt-1 text-center text-blue-500">
            {boxData.productCategories.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("productSubCategories")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "productSubCategories" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-purple-500">
            Product SubCategories
          </div>
          <div className="text-xl font-bold mt-1 text-center text-purple-500">
            {boxData.productSubCategories.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("highStock")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "highStock" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-cyan-500">
            High Stock Products
          </div>
          <div className="text-xl font-bold mt-1 text-center text-cyan-500">
            {boxData.highStock.count}
          </div>
        </Card>

        <Card
          onClick={() => setSelectedBox("highCost")}
          className={`p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedBox === "highCost" ? "border-primary border-2" : ""}`}
        >
          <div className="text-sm font-medium text-center text-pink-500">
            High Cost Products
          </div>
          <div className="text-xl font-bold mt-1 text-center text-pink-500">
            {boxData.highCost.count}
          </div>
        </Card>
      </div>

      {/* Data Display Section */}
      <div className="flex-1 p-3 grid grid-cols-2 gap-3 scale-95">
        <Card className="overflow-auto">
          <CardContent className="p-4">{renderTable()}</CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 h-full">
            <div className="h-full">{renderChart()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryAnalytics;

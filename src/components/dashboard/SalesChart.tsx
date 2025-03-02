import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, CalendarIcon } from "lucide-react";

interface SalesChartProps {
  data?: Array<{
    date: string;
    sales: number;
    previousSales?: number;
  }>;
  title?: string;
  description?: string;
}

const defaultData = [
  { date: "Jan", sales: 4000, previousSales: 2400 },
  { date: "Feb", sales: 3000, previousSales: 1398 },
  { date: "Mar", sales: 2000, previousSales: 9800 },
  { date: "Apr", sales: 2780, previousSales: 3908 },
  { date: "May", sales: 1890, previousSales: 4800 },
  { date: "Jun", sales: 2390, previousSales: 3800 },
  { date: "Jul", sales: 3490, previousSales: 4300 },
  { date: "Aug", sales: 4000, previousSales: 2400 },
  { date: "Sep", sales: 3000, previousSales: 1398 },
  { date: "Oct", sales: 2000, previousSales: 9800 },
  { date: "Nov", sales: 2780, previousSales: 3908 },
  { date: "Dec", sales: 3890, previousSales: 4800 },
];

const SalesChart: React.FC<SalesChartProps> = ({
  data = defaultData,
  title = "Sales Overview",
  description = "Monthly sales performance",
}) => {
  const [dateRange, setDateRange] = useState<string>("year");
  const [comparisonEnabled, setComparisonEnabled] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("all");

  // Filter data based on selected date range (simplified for UI scaffolding)
  const filteredData = data.slice(
    0,
    dateRange === "quarter" ? 3 : dateRange === "month" ? 1 : 12,
  );

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex space-x-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={comparisonEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setComparisonEnabled(!comparisonEnabled)}
          >
            Compare
          </Button>

          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#444"
                opacity={0.1}
              />
              <XAxis
                dataKey="date"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => [`$${value}`, "Sales"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Current Period"
              />
              {comparisonEnabled && (
                <Line
                  type="monotone"
                  dataKey="previousSales"
                  stroke="#666"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Previous Period"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;

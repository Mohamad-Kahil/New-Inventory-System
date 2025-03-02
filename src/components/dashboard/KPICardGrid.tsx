import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  percentage: string;
  icon: React.ReactNode;
  color: string;
}

const KPICard = ({
  title = "Metric",
  value = "$0",
  trend = "neutral",
  percentage = "0%",
  icon = <TrendingUp size={24} />,
  color = "bg-blue-500",
}: KPICardProps) => {
  return (
    <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : trend === "down" ? (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              ) : (
                <div className="h-4 w-4 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}`}
              >
                {percentage}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface KPICardGridProps {
  cards?: KPICardProps[];
}

const KPICardGrid = ({ cards }: KPICardGridProps) => {
  const defaultCards: KPICardProps[] = [
    {
      title: "Total Revenue",
      value: "$24,780",
      trend: "up",
      percentage: "12.5%",
      icon: <DollarSign size={24} className="text-primary" />,
      color: "bg-primary",
    },
    {
      title: "Total Orders",
      value: "1,482",
      trend: "up",
      percentage: "8.2%",
      icon: <ShoppingCart size={24} className="text-primary" />,
      color: "bg-primary",
    },
    {
      title: "Inventory Value",
      value: "$89,120",
      trend: "down",
      percentage: "3.1%",
      icon: <Package size={24} className="text-primary" />,
      color: "bg-primary",
    },
    {
      title: "Profit Margin",
      value: "24.8%",
      trend: "up",
      percentage: "4.3%",
      icon: <TrendingUp size={24} className="text-primary" />,
      color: "bg-primary",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <KPICard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KPICardGrid;

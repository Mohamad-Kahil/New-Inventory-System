import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Package,
  FileText,
  Users,
  PlusCircle,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react";

interface QuickActionProps {
  actions?: QuickAction[];
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const QuickActions = ({ actions = defaultActions }: QuickActionProps) => {
  return (
    <div className="w-full h-full bg-background p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <p className="text-muted-foreground">Common tasks and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-card"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {action.icon}
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{action.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant={action.variant || "secondary"}
                className="w-full"
                onClick={action.onClick}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {action.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const defaultActions: QuickAction[] = [
  {
    title: "New Sale",
    description: "Create a new point of sale transaction",
    icon: <ShoppingCart className="h-5 w-5" />,
    onClick: () => console.log("New Sale clicked"),
    variant: "default",
  },
  {
    title: "Add Inventory",
    description: "Add new products to your inventory",
    icon: <Package className="h-5 w-5" />,
    onClick: () => console.log("Add Inventory clicked"),
    variant: "secondary",
  },
  {
    title: "Create Order",
    description: "Create a new purchase order",
    icon: <FileText className="h-5 w-5" />,
    onClick: () => console.log("Create Order clicked"),
    variant: "outline",
  },
  {
    title: "Add Customer",
    description: "Register a new customer",
    icon: <Users className="h-5 w-5" />,
    onClick: () => console.log("Add Customer clicked"),
    variant: "secondary",
  },
  {
    title: "Manage Suppliers",
    description: "View and manage your suppliers",
    icon: <Truck className="h-5 w-5" />,
    onClick: () => console.log("Manage Suppliers clicked"),
    variant: "outline",
  },
  {
    title: "View Reports",
    description: "Access sales and inventory reports",
    icon: <BarChart3 className="h-5 w-5" />,
    onClick: () => console.log("View Reports clicked"),
    variant: "secondary",
  },
  {
    title: "System Settings",
    description: "Configure system preferences",
    icon: <Settings className="h-5 w-5" />,
    onClick: () => console.log("System Settings clicked"),
    variant: "outline",
  },
  {
    title: "Process Returns",
    description: "Handle customer returns and refunds",
    icon: <ShoppingCart className="h-5 w-5" />,
    onClick: () => console.log("Process Returns clicked"),
    variant: "secondary",
  },
];

export default QuickActions;

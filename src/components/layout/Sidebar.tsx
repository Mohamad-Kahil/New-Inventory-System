import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  FileText,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  className,
}: SidebarProps) => {
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
      isActive: true,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "POS",
      href: "/pos",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Suppliers",
      href: "/suppliers",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-background text-white transition-all duration-300",
        collapsed ? "w-20" : "w-72",
        className,
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">InventoryPOS</h1>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-muted-foreground hover:text-white hover:bg-secondary"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 transition-colors",
                        item.isActive
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:text-white hover:bg-secondary",
                      )}
                    >
                      <span className="flex items-center justify-center">
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="ml-3 text-sm">{item.title}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="px-3 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start text-muted-foreground hover:text-white hover:bg-secondary px-3 py-2"
              >
                <HelpCircle className="h-5 w-5" />
                {!collapsed && (
                  <span className="ml-3 text-sm">Help & Support</span>
                )}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Help & Support</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 text-left text-muted-foreground hover:text-white hover:bg-secondary px-3 py-2",
                collapsed && "justify-center",
              )}
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">
                    admin@example.com
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;

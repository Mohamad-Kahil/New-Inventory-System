import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";

interface HeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  onMenuToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications?: {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
  }[];
}

const Header = ({
  title = "Dashboard",
  onSearch = () => {},
  onMenuToggle = () => {},
  user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  },
  notifications = [
    {
      id: "1",
      title: "Low Stock Alert",
      description: "5 items are running low on stock",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "New Order Received",
      description: "Order #1234 has been placed",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Payment Successful",
      description: "Payment for order #1233 was successful",
      time: "3 hours ago",
      read: true,
    },
  ],
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-18 bg-background border-b border-border flex items-center justify-between px-4 py-2 sticky top-0 z-10">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </form>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex justify-between items-center p-2 border-b">
              <span className="font-semibold">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b last:border-0 hover:bg-muted/50 ${!notification.read ? "bg-muted/20" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-0 py-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    user.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  }
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left hidden md:block">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

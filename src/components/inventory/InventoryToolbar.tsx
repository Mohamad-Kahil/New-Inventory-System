import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Printer,
  RefreshCw,
} from "lucide-react";

interface InventoryToolbarProps {
  onSearch?: (query: string) => void;
  onFilter?: (category: string) => void;
  onAddItem?: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

const InventoryToolbar = ({
  onSearch = () => {},
  onFilter = () => {},
  onAddItem = () => {},
  onImport = () => {},
  onExport = () => {},
}: InventoryToolbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFilter(value);
  };

  return (
    <div className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-64">
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-9"
          />
          <Search
            className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
            onClick={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="office">Office Supplies</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={onAddItem} className="flex items-center space-x-1">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </Button>

        <Button
          variant="outline"
          onClick={onImport}
          className="flex items-center space-x-1"
        >
          <Upload className="h-4 w-4" />
          <span>Import</span>
        </Button>

        <Button
          variant="outline"
          onClick={onExport}
          className="flex items-center space-x-1"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Printer className="h-4 w-4 mr-2" />
              Print Inventory
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Manage Categories</DropdownMenuItem>
            <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default InventoryToolbar;

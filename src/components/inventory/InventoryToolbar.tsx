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
  onFilter?: (category: string, subCategory?: string) => void;
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
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Trigger search on input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Immediately trigger search on input change
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory("all"); // Reset subcategory when category changes
    onFilter(value, "all");
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    onFilter(selectedCategory, value);
  };

  // Get subcategories based on selected category
  const getSubCategories = () => {
    switch (selectedCategory) {
      case "Electronics":
        return [
          { value: "Smartphones", label: "Smartphones" },
          { value: "TVs", label: "TVs" },
          { value: "Audio", label: "Audio" },
          { value: "Wearables", label: "Wearables" },
          { value: "Computers", label: "Computers" },
        ];
      case "Clothing":
        return [
          { value: "Men's", label: "Men's" },
          { value: "Women's", label: "Women's" },
          { value: "Kids", label: "Kids" },
          { value: "Accessories", label: "Accessories" },
        ];
      case "Food & Beverages":
        return [
          { value: "Beverages", label: "Beverages" },
          { value: "Snacks", label: "Snacks" },
          { value: "Canned Goods", label: "Canned Goods" },
          { value: "Dairy", label: "Dairy" },
        ];
      case "Office Supplies":
        return [
          { value: "Stationery", label: "Stationery" },
          { value: "Paper Products", label: "Paper Products" },
          { value: "Furniture", label: "Furniture" },
        ];
      case "Furniture":
        return [
          { value: "Living Room", label: "Living Room" },
          { value: "Bedroom", label: "Bedroom" },
          { value: "Dining", label: "Dining" },
          { value: "Office", label: "Office" },
        ];
      case "Accessories":
      case "Audio":
      case "Computers":
      case "Other":
        return [{ value: "General", label: "General" }];
      default:
        return [];
    }
  };

  return (
    <div className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-64">
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={handleSearchInputChange}
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
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Computers">Computers</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>

          {selectedCategory !== "all" && (
            <Select
              value={selectedSubCategory}
              onValueChange={handleSubCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Sub Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub Categories</SelectItem>
                {getSubCategories().map((subCat) => (
                  <SelectItem key={subCat.value} value={subCat.value}>
                    {subCat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedSubCategory("all");
              onFilter("all", "all");
            }}
            title="Reset Filters"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
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

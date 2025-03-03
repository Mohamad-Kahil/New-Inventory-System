import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Package,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  MoreVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoriesModule from "./CategoriesModule";
import SubCategoriesModule from "./SubCategoriesModule";
import InventoryAnalytics from "./AnalyticsModule";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  subCategory: string;
  quantity: number;
  cost: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image?: string;
}

const NewInventoryModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Smartphones");
  const [items] = useState<InventoryItem[]>(defaultItems);
  const [activeTab, setActiveTab] = useState("inventory");

  // Filter items based on search query and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategory === "all" ? true : item.category === selectedCategory;

    const matchesSubCategory =
      selectedSubCategory === "all"
        ? true
        : item.subCategory === selectedSubCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Mock data for inventory stats
  const inventoryStats = {
    totalItems: 156,
    totalValue: 45678.99,
    lowStockItems: 12,
    outOfStockItems: 5,
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header with Tabs */}
      <div className="bg-background p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger
                value="inventory"
                className="flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex items-center gap-2"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="subcategories"
                className="flex items-center gap-2"
              >
                Sub Categories
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar - Only visible in inventory tab */}
      {activeTab === "inventory" && (
        <div className="bg-background p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-9 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedSubCategory}
                  onValueChange={setSelectedSubCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Subcategories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    <SelectItem value="Smartphones">Smartphones</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Wearables">Wearables</SelectItem>
                    <SelectItem value="Computer Accessories">
                      Computer Accessories
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {activeTab === "inventory" && (
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sub Category</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Cost ($)</TableHead>
                  <TableHead className="text-right">Price ($)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.subCategory}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "In Stock"
                            ? "default"
                            : item.status === "Low Stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-sm text-muted-foreground mt-2 text-center">
              Inventory Items
            </div>
          </div>
        )}

        {activeTab === "categories" && <CategoriesModule />}

        {activeTab === "subcategories" && <SubCategoriesModule />}

        {activeTab === "analytics" && <InventoryAnalytics />}
      </div>
    </div>
  );
};

// Default mock data for inventory items
const defaultItems: InventoryItem[] = [
  {
    id: "1",
    sku: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    subCategory: "Audio",
    quantity: 45,
    cost: 35.99,
    price: 79.99,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "2",
    sku: "PRD-002",
    name: "Smart Watch",
    category: "Electronics",
    subCategory: "Wearables",
    quantity: 12,
    cost: 89.99,
    price: 199.99,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "3",
    sku: "PRD-003",
    name: "Bluetooth Speaker",
    category: "Electronics",
    subCategory: "Audio",
    quantity: 28,
    cost: 25.5,
    price: 59.99,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  },
  {
    id: "4",
    sku: "PRD-004",
    name: "Laptop Stand",
    category: "Accessories",
    subCategory: "Computer Accessories",
    quantity: 0,
    cost: 12.99,
    price: 29.99,
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  },
  {
    id: "5",
    sku: "PRD-005",
    name: "Wireless Mouse",
    category: "Accessories",
    subCategory: "Computer Accessories",
    quantity: 32,
    cost: 15.75,
    price: 34.99,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3",
  },
  {
    id: "6",
    sku: "SKU-1740998687327",
    name: "z",
    category: "Uncategorized",
    subCategory: "General",
    quantity: 0,
    cost: 0.0,
    price: 0.0,
    status: "In Stock",
    image: "",
  },
];

export default NewInventoryModule;

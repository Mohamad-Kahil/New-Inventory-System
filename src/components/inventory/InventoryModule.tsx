import React, { useState } from "react";
import InventoryToolbar from "./InventoryToolbar";
import InventoryTable from "./InventoryTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, Tag, AlertTriangle } from "lucide-react";

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
  description?: string;
  supplier?: string;
  reorderPoint?: number;
  lastRestocked?: string;
  image?: string;
}

// Simple placeholder for InventoryItemForm since the actual component isn't implemented yet
const InventoryItemForm = ({
  item,
  onSave = () => {},
  onCancel = () => {},
}: {
  item?: InventoryItem;
  onSave?: (item: InventoryItem) => void;
  onCancel?: () => void;
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        {item ? "Edit Item" : "Add New Item"}
      </h2>
      <div className="space-y-4">
        <p>Form fields for inventory item would go here</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave(
                item || {
                  id: "",
                  sku: "SKU-" + Date.now(),
                  name: "New Item",
                  category: "Electronics",
                  subCategory: "Smartphones",
                  quantity: 10,
                  cost: 10.0,
                  price: 19.99,
                  status: "In Stock",
                },
              )
            }
          >
            Save Item
          </Button>
        </div>
      </div>
    </div>
  );
};

interface InventoryModuleProps {
  initialItems?: InventoryItem[];
}

const InventoryModule = ({ initialItems }: InventoryModuleProps) => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  // Mock data for inventory stats
  const inventoryStats = {
    totalItems: 156,
    totalValue: 45678.99,
    lowStockItems: 12,
    outOfStockItems: 5,
    categories: [
      { name: "Electronics", count: 45, value: 25000 },
      { name: "Accessories", count: 32, value: 8500 },
      { name: "Audio", count: 28, value: 7200 },
      { name: "Computers", count: 18, value: 3600 },
      { name: "Other", count: 33, value: 1378.99 },
    ],
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (item: InventoryItem) => {
    // In a real app, you would call an API to delete the item
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handleViewItem = (item: InventoryItem) => {
    // In a real app, you might navigate to a detailed view
    console.log("View item:", item);
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (currentItem) {
      // Update existing item
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      // Add new item with a generated ID
      const newItem = {
        ...item,
        id: `item-${Date.now()}`,
      };
      setItems([...items, newItem]);
    }
    setIsFormOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter the items based on the query
  };

  const handleFilter = (category: string, subCategory: string = "all") => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    // In a real app, you would filter the items based on the category and subcategory
  };

  const handleImport = () => {
    // In a real app, you would implement import functionality
    console.log("Import inventory");
  };

  const handleExport = () => {
    // In a real app, you would implement export functionality
    console.log("Export inventory");
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <InventoryToolbar
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAddItem={handleAddItem}
        onImport={handleImport}
        onExport={handleExport}
      />

      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {inventoryStats.totalItems}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inventory Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${inventoryStats.totalValue.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Low Stock Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {inventoryStats.lowStockItems}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Out of Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {inventoryStats.outOfStockItems}
                  </div>
                </CardContent>
              </Card>
            </div>

            <InventoryTable
              items={items.length > 0 ? items : undefined}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onView={handleViewItem}
            />
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>
                  Manage your inventory categories and view category statistics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Categories</h3>
                    <Button size="sm">Add Category</Button>
                  </div>

                  <div className="border rounded-md">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Category Name</th>
                          <th className="text-right p-3">Items</th>
                          <th className="text-right p-3">Value</th>
                          <th className="text-right p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryStats.categories.map((category, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3 font-medium">{category.name}</td>
                            <td className="p-3 text-right">{category.count}</td>
                            <td className="p-3 text-right">
                              ${category.value.toLocaleString()}
                            </td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Analytics</CardTitle>
                <CardDescription>
                  View detailed analytics about your inventory performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <p>
                    Inventory analytics charts and reports will be displayed
                    here.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <InventoryItemForm
            item={currentItem || undefined}
            onSave={handleSaveItem}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryModule;

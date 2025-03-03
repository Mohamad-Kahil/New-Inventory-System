import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubCategory {
  name: string;
  parentCategory: string;
  items: number;
}

const SubCategoriesModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  const subCategories: SubCategory[] = [
    { name: "Smartphones", parentCategory: "Electronics", items: 15 },
    { name: "TVs", parentCategory: "Electronics", items: 8 },
    { name: "Audio", parentCategory: "Electronics", items: 12 },
    { name: "Wearables", parentCategory: "Electronics", items: 6 },
    { name: "Computers", parentCategory: "Electronics", items: 4 },
  ];

  const filteredSubCategories = subCategories.filter((subCategory) => {
    const matchesSearch = subCategory.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      subCategory.parentCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Search and Filter Bar */}
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
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="flex items-center gap-1 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Sub Category
          </Button>
        </div>
      </div>

      {/* Sub Categories Table */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-card rounded-md border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Sub Category Name</th>
                <th className="text-left p-4">Parent Category</th>
                <th className="text-right p-4">Items</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubCategories.map((subCategory, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{subCategory.name}</td>
                  <td className="p-4">{subCategory.parentCategory}</td>
                  <td className="p-4 text-right">{subCategory.items}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubCategoriesModule;

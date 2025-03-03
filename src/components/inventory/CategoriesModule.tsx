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

interface Category {
  name: string;
  items: number;
  value: number;
  subcategories?: Subcategory[];
  expanded?: boolean;
}

interface Subcategory {
  name: string;
  items: number;
  value: number;
}

const CategoriesModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Electronics",
      items: 45,
      value: 25000,
      expanded: true,
      subcategories: [
        { name: "Smartphones", items: 15, value: 12500 },
        { name: "TVs", items: 8, value: 5600 },
        { name: "Audio", items: 12, value: 3200 },
      ],
    },
    {
      name: "Accessories",
      items: 32,
      value: 8500,
      expanded: false,
    },
    {
      name: "Audio",
      items: 28,
      value: 7200,
      expanded: false,
    },
    {
      name: "Computers",
      items: 18,
      value: 3600,
      expanded: false,
    },
    {
      name: "Other",
      items: 33,
      value: 1378.99,
      expanded: false,
    },
  ]);

  const toggleCategoryExpansion = (categoryName: string) => {
    setCategories(
      categories.map((category) =>
        category.name === categoryName
          ? { ...category, expanded: !category.expanded }
          : category,
      ),
    );
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Search and Filter Bar */}
      <div className="bg-background p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-card rounded-md border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Category Name</th>
                <th className="text-right p-4">Items</th>
                <th className="text-right p-4">Value</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center">
                        {category.subcategories && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 mr-2"
                            onClick={() =>
                              toggleCategoryExpansion(category.name)
                            }
                          >
                            {category.expanded ? (
                              <span className="text-lg">-</span>
                            ) : (
                              <span className="text-lg">+</span>
                            )}
                          </Button>
                        )}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">{category.items}</td>
                    <td className="p-4 text-right">
                      ${category.value.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {category.expanded && category.subcategories && (
                    <tr className="bg-muted/30">
                      <td colSpan={4} className="p-0">
                        <div className="p-2">
                          <table className="w-full">
                            <tbody>
                              {category.subcategories.map(
                                (subcategory, subIndex) => (
                                  <tr
                                    key={subIndex}
                                    className="border-b border-border/50 hover:bg-muted/50"
                                  >
                                    <td className="p-2 pl-8">
                                      {subcategory.name}
                                    </td>
                                    <td className="p-2 text-right">
                                      {subcategory.items}
                                    </td>
                                    <td className="p-2 text-right">
                                      ${subcategory.value.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-right">
                                      <div className="flex justify-end space-x-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModule;

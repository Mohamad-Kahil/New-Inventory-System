import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

import { Edit, Trash2, Eye, Package } from "lucide-react";

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

interface InventoryTableProps {
  items?: InventoryItem[];
  onEdit?: (item: InventoryItem) => void;
  onDelete?: (item: InventoryItem) => void;
  onView?: (item: InventoryItem) => void;
}

const InventoryTable = ({
  items = defaultItems,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}: InventoryTableProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full bg-background rounded-md border">
      <Table>
        <TableCaption>Inventory Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedItems.length === items.length && items.length > 0
                }
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </TableHead>
            <TableHead>Image</TableHead>
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
          {items.map((item) => (
            <TableRow
              key={item.id}
              data-state={
                selectedItems.includes(item.id) ? "selected" : undefined
              }
            >
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectItem(item.id, !!checked)
                  }
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
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                ${item.cost.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${item.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(item.status)}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?",
                        )
                      ) {
                        onDelete(item);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Default mock data
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
];

export default InventoryTable;

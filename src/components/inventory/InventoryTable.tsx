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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
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
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
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
              <TableCell className="font-medium">{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(item)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(item)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    quantity: 45,
    cost: 35.99,
    price: 79.99,
    status: "In Stock",
  },
  {
    id: "2",
    sku: "PRD-002",
    name: "Smart Watch",
    category: "Electronics",
    quantity: 12,
    cost: 89.99,
    price: 199.99,
    status: "Low Stock",
  },
  {
    id: "3",
    sku: "PRD-003",
    name: "Bluetooth Speaker",
    category: "Audio",
    quantity: 28,
    cost: 25.5,
    price: 59.99,
    status: "In Stock",
  },
  {
    id: "4",
    sku: "PRD-004",
    name: "Laptop Stand",
    category: "Accessories",
    quantity: 0,
    cost: 12.99,
    price: 29.99,
    status: "Out of Stock",
  },
  {
    id: "5",
    sku: "PRD-005",
    name: "Wireless Mouse",
    category: "Accessories",
    quantity: 32,
    cost: 15.75,
    price: 34.99,
    status: "In Stock",
  },
];

export default InventoryTable;

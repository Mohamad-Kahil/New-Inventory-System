import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface InventoryItemFormProps {
  item?: InventoryItem;
  onSave?: (item: InventoryItem) => void;
  onCancel?: () => void;
}

const InventoryItemForm: React.FC<InventoryItemFormProps> = ({
  item,
  onSave = () => {},
  onCancel = () => {},
}) => {
  const [formData, setFormData] = useState<InventoryItem>(
    item || {
      id: "",
      sku: `SKU-${Date.now()}`,
      name: "",
      category: "Electronics",
      subCategory: "",
      quantity: 0,
      cost: 0,
      price: 0,
      status: "In Stock",
      description: "",
      supplier: "",
      reorderPoint: 5,
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "cost" ||
        name === "price" ||
        name === "reorderPoint"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset subcategory when category changes
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        subCategory: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Get subcategories based on selected category
  const getSubCategories = () => {
    switch (formData.category) {
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
        return [
          { value: "Computer Accessories", label: "Computer Accessories" },
          { value: "Phone Accessories", label: "Phone Accessories" },
          { value: "Cables", label: "Cables" },
          { value: "Adapters", label: "Adapters" },
        ];
      case "Audio":
        return [
          { value: "Headphones", label: "Headphones" },
          { value: "Speakers", label: "Speakers" },
          { value: "Microphones", label: "Microphones" },
        ];
      default:
        return [];
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subCategory">Sub Category</Label>
          <Select
            value={formData.subCategory}
            onValueChange={(value) => handleSelectChange("subCategory", value)}
          >
            <SelectTrigger id="subCategory">
              <SelectValue placeholder="Select sub category" />
            </SelectTrigger>
            <SelectContent>
              {getSubCategories().map((subCat) => (
                <SelectItem key={subCat.value} value={subCat.value}>
                  {subCat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Cost ($)</Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              handleSelectChange("status", value as any)
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            name="supplier"
            value={formData.supplier || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reorderPoint">Reorder Point</Label>
          <Input
            id="reorderPoint"
            name="reorderPoint"
            type="number"
            value={formData.reorderPoint || 0}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Item</Button>
      </div>
    </form>
  );
};

export default InventoryItemForm;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  manufacturer?: string;
  manufacturerProductNumber?: string;
  brand?: string;
  uom?: string;

  // Financial Information
  costingMethod?: string;
  baseCost?: number;
  currentCost?: number;
  salesPrice?: number;
  wholesalePrice?: number;
  maxDiscount?: number;
  taxRate?: number;
  profitMargin?: number;
  currency?: string;

  // Specifications and Features
  dimensions?: string;
  weight?: string;
  material?: string;
  color?: string;
  features?: string;
  technicalSpecs?: { key: string; value: string }[];
  certifications?: string;
  warranty?: string;

  // Product-Specific Details
  expiryApplicable?: boolean;
  shelfLife?: string;
  expiryTracking?: string;
  serialApplicable?: boolean;
  serialFormat?: string;
  batchTracking?: boolean;
  batchFormat?: string;
  hazardous?: boolean;
  handlingInstructions?: string;
  customAttributes?: { key: string; value: string }[];

  // Inventory Management
  minStockLevel?: number;
  maxStockLevel?: number;
  reorderQuantity?: number;
  leadTime?: string;
  safetyStock?: number;
  binLocation?: string;
  stockOnHand?: number;
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
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<InventoryItem>(
    item || {
      id: "",
      sku: `SKU-${Date.now()}`,
      name: "",
      category: "",
      subCategory: "",
      quantity: 0,
      cost: 0,
      price: 0,
      status: "In Stock",
      description: "",
      manufacturer: "",
      manufacturerProductNumber: "",
      brand: "",
      uom: "Each",

      // Financial Information
      costingMethod: "AVCO",
      baseCost: 0,
      currentCost: 0,
      salesPrice: 0,
      wholesalePrice: 0,
      maxDiscount: 0,
      taxRate: 0,
      profitMargin: 0,
      currency: "USD",

      // Specifications and Features
      dimensions: "",
      weight: "",
      material: "",
      color: "",
      features: "",
      technicalSpecs: [{ key: "", value: "" }],
      certifications: "",
      warranty: "",

      // Product-Specific Details
      expiryApplicable: false,
      shelfLife: "",
      expiryTracking: "Batch",
      serialApplicable: false,
      serialFormat: "",
      batchTracking: false,
      batchFormat: "",
      hazardous: false,
      handlingInstructions: "",
      customAttributes: [{ key: "", value: "" }],

      // Inventory Management
      minStockLevel: 0,
      reorderLevel: 0,
      maxStockLevel: 0,
      reorderQuantity: 0,
      leadTime: "",
      safetyStock: 0,
      binLocation: "",
      stockOnHand: 0,
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? parseFloat(value) : 0) : value,
    }));

    // Calculate profit margin when sales price or current cost changes
    if (name === "salesPrice" || name === "currentCost") {
      const salesPrice =
        name === "salesPrice"
          ? parseFloat(value) || 0
          : formData.salesPrice || 0;
      const currentCost =
        name === "currentCost"
          ? parseFloat(value) || 0
          : formData.currentCost || 0;

      if (salesPrice > 0) {
        const profitMargin = ((salesPrice - currentCost) / salesPrice) * 100;
        setFormData((prev) => ({
          ...prev,
          profitMargin: parseFloat(profitMargin.toFixed(2)),
        }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTechnicalSpecChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updatedSpecs = [...(formData.technicalSpecs || [])];
    if (!updatedSpecs[index]) {
      updatedSpecs[index] = { key: "", value: "" };
    }
    updatedSpecs[index][field] = value;
    setFormData({ ...formData, technicalSpecs: updatedSpecs });
  };

  const addTechnicalSpec = () => {
    setFormData({
      ...formData,
      technicalSpecs: [
        ...(formData.technicalSpecs || []),
        { key: "", value: "" },
      ],
    });
  };

  const removeTechnicalSpec = (index: number) => {
    const updatedSpecs = [...(formData.technicalSpecs || [])];
    updatedSpecs.splice(index, 1);
    setFormData({ ...formData, technicalSpecs: updatedSpecs });
  };

  const handleCustomAttributeChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updatedAttrs = [...(formData.customAttributes || [])];
    if (!updatedAttrs[index]) {
      updatedAttrs[index] = { key: "", value: "" };
    }
    updatedAttrs[index][field] = value;
    setFormData({ ...formData, customAttributes: updatedAttrs });
  };

  const addCustomAttribute = () => {
    setFormData({
      ...formData,
      customAttributes: [
        ...(formData.customAttributes || []),
        { key: "", value: "" },
      ],
    });
  };

  const removeCustomAttribute = (index: number) => {
    const updatedAttrs = [...(formData.customAttributes || [])];
    updatedAttrs.splice(index, 1);
    setFormData({ ...formData, customAttributes: updatedAttrs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-[900px] h-[675px] px-6 pt-6"
      style={{ minHeight: "675px" }}
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-5 mb-6 mt-8">
          <TabsTrigger
            value="general"
            className="bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 data-[state=active]:from-primary/20 data-[state=active]:to-primary/30"
          >
            General Information
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 hover:from-blue-500/10 hover:to-blue-500/20 data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/30"
          >
            Financial Information
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 hover:from-purple-500/10 hover:to-purple-500/20 data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-500/30"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="bg-gradient-to-r from-amber-500/5 to-amber-500/10 hover:from-amber-500/10 hover:to-amber-500/20 data-[state=active]:from-amber-500/20 data-[state=active]:to-amber-500/30"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="bg-gradient-to-r from-green-500/5 to-green-500/10 hover:from-green-500/10 hover:to-green-500/20 data-[state=active]:from-green-500/20 data-[state=active]:to-green-500/30"
          >
            Inventory Management
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: General Information */}
        <TabsContent
          value="general"
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-12 gap-6">
            {/* Product Image */}
            <div className="col-span-12 md:col-span-4">
              <div className="space-y-4">
                <Label htmlFor="image">Product Image</Label>
                <div className="aspect-square rounded-md bg-muted flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-24 w-24 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    name="image"
                    placeholder="Enter image URL"
                    value={formData.image || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="relative overflow-hidden"
                    >
                      <Upload className="h-4 w-4" />
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setFormData((prev) => ({
                                ...prev,
                                image: event.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </Button>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a URL or upload an image
                </p>
              </div>
            </div>

            {/* General Information Fields */}
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="LED Bulb 9W"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">Product Number (SKU) *</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    placeholder="LB-9W-001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer || ""}
                    onChange={handleChange}
                    placeholder="Philips"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturerProductNumber">
                    Manufacturer Product #
                  </Label>
                  <Input
                    id="manufacturerProductNumber"
                    name="manufacturerProductNumber"
                    value={formData.manufacturerProductNumber || ""}
                    onChange={handleChange}
                    placeholder="9290019533"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand || ""}
                    onChange={handleChange}
                    placeholder="Philips Hue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Computers">Computers</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Food & Beverages">
                        Food & Beverages
                      </SelectItem>
                      <SelectItem value="Office Supplies">
                        Office Supplies
                      </SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCategory">Subcategory</Label>
                  <Select
                    value={formData.subCategory}
                    onValueChange={(value) =>
                      handleSelectChange("subCategory", value)
                    }
                  >
                    <SelectTrigger id="subCategory">
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category === "Electronics" && (
                        <>
                          <SelectItem value="Smartphones">
                            Smartphones
                          </SelectItem>
                          <SelectItem value="TVs">TVs</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                          <SelectItem value="Wearables">Wearables</SelectItem>
                          <SelectItem value="Computers">Computers</SelectItem>
                        </>
                      )}
                      {formData.category === "Clothing" && (
                        <>
                          <SelectItem value="Men's">Men's</SelectItem>
                          <SelectItem value="Women's">Women's</SelectItem>
                          <SelectItem value="Kids">Kids</SelectItem>
                          <SelectItem value="Accessories">
                            Accessories
                          </SelectItem>
                        </>
                      )}
                      {formData.category === "Food & Beverages" && (
                        <>
                          <SelectItem value="Beverages">Beverages</SelectItem>
                          <SelectItem value="Snacks">Snacks</SelectItem>
                          <SelectItem value="Canned Goods">
                            Canned Goods
                          </SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                        </>
                      )}
                      {formData.category === "Office Supplies" && (
                        <>
                          <SelectItem value="Stationery">Stationery</SelectItem>
                          <SelectItem value="Paper Products">
                            Paper Products
                          </SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                        </>
                      )}
                      {formData.category === "Furniture" && (
                        <>
                          <SelectItem value="Living Room">
                            Living Room
                          </SelectItem>
                          <SelectItem value="Bedroom">Bedroom</SelectItem>
                          <SelectItem value="Dining">Dining</SelectItem>
                          <SelectItem value="Office">Office</SelectItem>
                        </>
                      )}
                      {(formData.category === "Accessories" ||
                        formData.category === "Audio" ||
                        formData.category === "Computers" ||
                        formData.category === "Other") && (
                        <SelectItem value="General">General</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uom">Unit of Measure *</Label>
                  <Select
                    value={formData.uom || "Each"}
                    onValueChange={(value) => handleSelectChange("uom", value)}
                  >
                    <SelectTrigger id="uom">
                      <SelectValue placeholder="Select UOM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Each">Each</SelectItem>
                      <SelectItem value="Pack">Pack</SelectItem>
                      <SelectItem value="Kilogram">Kilogram</SelectItem>
                      <SelectItem value="Liter">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">Active</SelectItem>
                      <SelectItem value="Low Stock">Discontinued</SelectItem>
                      <SelectItem value="Out of Stock">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
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
                  placeholder="Energy-efficient 9W LED bulb"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Financial Information */}
        <TabsContent
          value="financial"
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="costingMethod">Costing Method *</Label>
              <Select
                value={formData.costingMethod || "AVCO"}
                onValueChange={(value) =>
                  handleSelectChange("costingMethod", value)
                }
              >
                <SelectTrigger id="costingMethod">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVCO">AVCO</SelectItem>
                  <SelectItem value="FIFO">FIFO</SelectItem>
                  <SelectItem value="LIFO">LIFO</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Specific">Specific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseCost">Base Cost</Label>
              <Input
                id="baseCost"
                name="baseCost"
                type="number"
                min="0"
                step="0.01"
                value={formData.baseCost || 0}
                onChange={handleChange}
                placeholder="5.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCost">Current Cost</Label>
              <Input
                id="currentCost"
                name="currentCost"
                type="number"
                min="0"
                step="0.01"
                value={formData.currentCost || 0}
                onChange={handleChange}
                placeholder="5.50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salesPrice">Sales Price</Label>
              <Input
                id="salesPrice"
                name="salesPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.salesPrice || 0}
                onChange={handleChange}
                placeholder="10.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wholesalePrice">Wholesale Price</Label>
              <Input
                id="wholesalePrice"
                name="wholesalePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.wholesalePrice || ""}
                onChange={handleChange}
                placeholder="8.50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency || "USD"}
                onValueChange={(value) => handleSelectChange("currency", value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxDiscount">Max Discount (%)</Label>
              <Input
                id="maxDiscount"
                name="maxDiscount"
                type="number"
                min="0"
                max="100"
                value={formData.maxDiscount || ""}
                onChange={handleChange}
                placeholder="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                name="taxRate"
                type="number"
                min="0"
                max="100"
                value={formData.taxRate || ""}
                onChange={handleChange}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profitMargin">Profit Margin (%)</Label>
              <Input
                id="profitMargin"
                name="profitMargin"
                type="number"
                value={formData.profitMargin || 0}
                readOnly
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Calculated automatically
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Specifications and Features */}
        <TabsContent
          value="specifications"
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                name="dimensions"
                value={formData.dimensions || ""}
                onChange={handleChange}
                placeholder="10 x 5 x 5 cm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                placeholder="0.2 kg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                name="material"
                value={formData.material || ""}
                onChange={handleChange}
                placeholder="Plastic, Glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                name="color"
                value={formData.color || ""}
                onChange={handleChange}
                placeholder="White"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                name="certifications"
                value={formData.certifications || ""}
                onChange={handleChange}
                placeholder="CE Certified"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty</Label>
              <Input
                id="warranty"
                name="warranty"
                value={formData.warranty || ""}
                onChange={handleChange}
                placeholder="2 Years"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features || ""}
              onChange={handleChange}
              rows={3}
              placeholder="Dimmable, Energy-Saving"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Technical Specifications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTechnicalSpec}
              >
                Add Specification
              </Button>
            </div>

            {formData.technicalSpecs &&
              formData.technicalSpecs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Specification"
                    value={spec.key}
                    onChange={(e) =>
                      handleTechnicalSpecChange(index, "key", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                      handleTechnicalSpecChange(index, "value", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTechnicalSpec(index)}
                    disabled={formData.technicalSpecs.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Tab 4: Product-Specific Details */}
        <TabsContent
          value="details"
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expiryApplicable"
                checked={formData.expiryApplicable || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("expiryApplicable", checked as boolean)
                }
              />
              <Label htmlFor="expiryApplicable">Expiry Applicable</Label>
            </div>

            {formData.expiryApplicable && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="shelfLife">Shelf Life</Label>
                  <Input
                    id="shelfLife"
                    name="shelfLife"
                    value={formData.shelfLife || ""}
                    onChange={handleChange}
                    placeholder="12 Months"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryTracking">Expiry Tracking</Label>
                  <Select
                    value={formData.expiryTracking || "Batch"}
                    onValueChange={(value) =>
                      handleSelectChange("expiryTracking", value)
                    }
                  >
                    <SelectTrigger id="expiryTracking">
                      <SelectValue placeholder="Select tracking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Batch">Batch</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="serialApplicable"
                checked={formData.serialApplicable || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("serialApplicable", checked as boolean)
                }
              />
              <Label htmlFor="serialApplicable">Serial Number Applicable</Label>
            </div>

            {formData.serialApplicable && (
              <div className="pl-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="serialFormat">Serial Format</Label>
                  <Input
                    id="serialFormat"
                    name="serialFormat"
                    value={formData.serialFormat || ""}
                    onChange={handleChange}
                    placeholder="SN-#####"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="batchTracking"
                checked={formData.batchTracking || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("batchTracking", checked as boolean)
                }
              />
              <Label htmlFor="batchTracking">Batch Tracking</Label>
            </div>

            {formData.batchTracking && (
              <div className="pl-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="batchFormat">Batch Format</Label>
                  <Input
                    id="batchFormat"
                    name="batchFormat"
                    value={formData.batchFormat || ""}
                    onChange={handleChange}
                    placeholder="BATCH-YYYYMM"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hazardous"
                checked={formData.hazardous || false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("hazardous", checked as boolean)
                }
              />
              <Label htmlFor="hazardous">Hazardous Material</Label>
            </div>

            {formData.hazardous && (
              <div className="pl-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="handlingInstructions">
                    Handling Instructions
                  </Label>
                  <Textarea
                    id="handlingInstructions"
                    name="handlingInstructions"
                    value={formData.handlingInstructions || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Store below 25°C"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Custom Attributes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomAttribute}
              >
                Add Attribute
              </Button>
            </div>

            {formData.customAttributes &&
              formData.customAttributes.map((attr, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Attribute"
                    value={attr.key}
                    onChange={(e) =>
                      handleCustomAttributeChange(index, "key", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Value"
                    value={attr.value}
                    onChange={(e) =>
                      handleCustomAttributeChange(
                        index,
                        "value",
                        e.target.value,
                      )
                    }
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomAttribute(index)}
                    disabled={formData.customAttributes.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Tab 5: Inventory Management */}
        <TabsContent
          value="inventory"
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minStockLevel">Min Stock Level</Label>
              <Input
                id="minStockLevel"
                name="minStockLevel"
                type="number"
                min="0"
                value={formData.minStockLevel || 0}
                onChange={handleChange}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                name="reorderLevel"
                type="number"
                min="0"
                value={formData.reorderLevel || 0}
                onChange={handleChange}
                placeholder="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStockLevel">Max Stock Level</Label>
              <Input
                id="maxStockLevel"
                name="maxStockLevel"
                type="number"
                min="0"
                value={formData.maxStockLevel || 0}
                onChange={handleChange}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockStatus">Stock Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="stockStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.quantity <= 0
                  ? "No stock available"
                  : formData.quantity <= (formData.minStockLevel || 5)
                    ? "Stock below minimum level"
                    : "Stock level is good"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reorderQuantity">Reorder Quantity</Label>
              <Input
                id="reorderQuantity"
                name="reorderQuantity"
                type="number"
                min="0"
                value={formData.reorderQuantity || 0}
                onChange={handleChange}
                placeholder="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadTime">Lead Time</Label>
              <Input
                id="leadTime"
                name="leadTime"
                value={formData.leadTime || ""}
                onChange={handleChange}
                placeholder="7 Days"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="safetyStock">Safety Stock</Label>
              <Input
                id="safetyStock"
                name="safetyStock"
                type="number"
                min="0"
                value={formData.safetyStock || 0}
                onChange={handleChange}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="binLocation">Bin Location</Label>
              <Input
                id="binLocation"
                name="binLocation"
                value={formData.binLocation || ""}
                onChange={handleChange}
                placeholder="Aisle 3, Rack B, Bin 2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Stock On Hand</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => {
                  handleChange(e);
                  // Update status based on quantity
                  const qty = parseFloat(e.target.value) || 0;
                  let newStatus = "In Stock";
                  if (qty <= 0) {
                    newStatus = "Out of Stock";
                  } else if (qty <= (formData.minStockLevel || 5)) {
                    newStatus = "Low Stock";
                  }
                  handleSelectChange("status", newStatus);
                }}
                placeholder="0"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-4 py-6 px-6 border-t mt-4 bg-background sticky bottom-0 mb-4">
        <Button
          type="button"
          variant="destructive"
          className="bg-red-700 hover:bg-red-800"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-green-700 hover:bg-green-800">
          Save Product
        </Button>
      </div>
    </form>
  );
};

export default InventoryItemForm;

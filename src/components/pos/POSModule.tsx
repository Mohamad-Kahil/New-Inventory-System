import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Search,
  Filter,
  CreditCard,
  ReceiptText,
  LayoutGrid,
  List,
  Barcode,
} from "lucide-react";

import POSProductGrid from "./POSProductGrid";
import POSCart from "./POSCart";
import POSCheckout from "./POSCheckout";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  barcode: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface POSModuleProps {
  products?: Product[];
  categories?: string[];
  onSaleComplete?: (saleData: any) => void;
}

const POSModule: React.FC<POSModuleProps> = ({
  products = defaultProducts,
  categories = defaultCategories,
  onSaleComplete = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Add product to cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Handle checkout completion
  const handleCheckoutComplete = (receiptData: any) => {
    const saleData = {
      ...receiptData,
      items: cartItems,
      total: cartTotal,
    };
    onSaleComplete(saleData);
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* POS Header */}
      <div className="w-full p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Point of Sale</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsCheckoutOpen(true)}
              disabled={cartItems.length === 0}
            >
              <CreditCard className="h-4 w-4" />
              Checkout
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ReceiptText className="h-4 w-4" />
              Transactions
            </Button>
          </div>
        </div>
      </div>

      {/* Main POS Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Products Section */}
        <div className="flex-1 flex flex-col overflow-hidden border-r">
          {/* Product Search and Filters */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-muted" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Barcode className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-2 flex items-center space-x-2">
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className="flex-1 overflow-y-auto p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                <TabsTrigger value="discounted">Discounted</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <POSProductGrid
                  products={filteredProducts}
                  viewMode={viewMode}
                  onProductSelect={addToCart}
                />
              </TabsContent>
              <TabsContent value="popular" className="mt-0">
                <POSProductGrid
                  products={filteredProducts.slice(0, 8)}
                  viewMode={viewMode}
                  onProductSelect={addToCart}
                />
              </TabsContent>
              <TabsContent value="recent" className="mt-0">
                <POSProductGrid
                  products={filteredProducts.slice(4, 12)}
                  viewMode={viewMode}
                  onProductSelect={addToCart}
                />
              </TabsContent>
              <TabsContent value="discounted" className="mt-0">
                <POSProductGrid
                  products={filteredProducts.slice(2, 6)}
                  viewMode={viewMode}
                  onProductSelect={addToCart}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-[400px] flex flex-col bg-muted/30">
          <Card className="flex-1 border-0 rounded-none shadow-none">
            <CardHeader className="px-4 py-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <POSCart
                items={cartItems}
                onUpdateQuantity={updateCartItemQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Dialog */}
      <POSCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={cartTotal}
        onPaymentComplete={handleCheckoutComplete}
      />
    </div>
  );
};

// Default mock data
const defaultCategories = [
  "Electronics",
  "Clothing",
  "Food & Beverages",
  "Home & Kitchen",
  "Beauty & Health",
];

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    stock: 45,
    barcode: "8901234567890",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    stock: 12,
    barcode: "8901234567891",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    stock: 28,
    barcode: "8901234567892",
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Clothing",
    stock: 120,
    barcode: "8901234567893",
  },
  {
    id: "5",
    name: "Denim Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    category: "Clothing",
    stock: 85,
    barcode: "8901234567894",
  },
  {
    id: "6",
    name: "Organic Coffee",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    category: "Food & Beverages",
    stock: 200,
    barcode: "8901234567895",
  },
  {
    id: "7",
    name: "Ceramic Mug Set",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "Home & Kitchen",
    stock: 35,
    barcode: "8901234567896",
  },
  {
    id: "8",
    name: "Face Moisturizer",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    category: "Beauty & Health",
    stock: 60,
    barcode: "8901234567897",
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "Home & Kitchen",
    stock: 75,
    barcode: "8901234567898",
  },
  {
    id: "10",
    name: "Wireless Charger",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1585338069466-600b42b90afb",
    category: "Electronics",
    stock: 40,
    barcode: "8901234567899",
  },
  {
    id: "11",
    name: "Protein Bars (12 Pack)",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc",
    category: "Food & Beverages",
    stock: 150,
    barcode: "8901234567900",
  },
  {
    id: "12",
    name: "Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    category: "Beauty & Health",
    stock: 25,
    barcode: "8901234567901",
  },
];

export default POSModule;

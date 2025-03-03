import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  barcode: string;
}

interface POSProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  onProductSelect: (product: Product) => void;
}

const POSProductGrid: React.FC<POSProductGridProps> = ({
  products = [],
  viewMode = "grid",
  onProductSelect = () => {},
}) => {
  return (
    <div
      className={`w-full ${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"}`}
    >
      {products.length === 0 ? (
        <div className="col-span-full flex items-center justify-center h-40 bg-muted/30 rounded-md">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        products.map((product) => (
          <Card
            key={product.id}
            className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${viewMode === "list" ? "flex items-center" : ""}`}
            onClick={() => onProductSelect(product)}
          >
            {viewMode === "grid" ? (
              <>
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                    <Badge
                      variant={product.stock > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                    <Button size="sm" className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex w-full p-2">
                <div className="h-16 w-16 bg-muted flex items-center justify-center overflow-hidden rounded-md">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 ml-3 flex flex-col justify-center">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-center gap-1">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <Badge
                    variant={product.stock > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="h-8 w-8 p-0 ml-2 self-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductSelect(product);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default POSProductGrid;

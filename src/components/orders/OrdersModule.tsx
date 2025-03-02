import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Calendar,
  User,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  paymentStatus: "paid" | "unpaid" | "refunded";
  items: number;
  shippingMethod: string;
}

interface OrdersModuleProps {}

const OrdersModule: React.FC<OrdersModuleProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Sample data
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-06-15T14:30:00",
      total: 125.99,
      status: "delivered",
      paymentStatus: "paid",
      items: 3,
      shippingMethod: "Standard Shipping",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-06-14T10:15:00",
      total: 89.5,
      status: "processing",
      paymentStatus: "paid",
      items: 2,
      shippingMethod: "Express Shipping",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-06-13T16:45:00",
      total: 245.75,
      status: "shipped",
      paymentStatus: "paid",
      items: 5,
      shippingMethod: "Standard Shipping",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-06-12T09:20:00",
      total: 32.99,
      status: "cancelled",
      paymentStatus: "refunded",
      items: 1,
      shippingMethod: "Standard Shipping",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-06-11T13:10:00",
      total: 175.25,
      status: "returned",
      paymentStatus: "refunded",
      items: 4,
      shippingMethod: "Express Shipping",
    },
    {
      id: "ORD-006",
      customer: "Sarah Brown",
      date: "2023-06-10T11:30:00",
      total: 67.5,
      status: "delivered",
      paymentStatus: "paid",
      items: 2,
      shippingMethod: "Standard Shipping",
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      date: "2023-06-09T15:45:00",
      total: 129.99,
      status: "pending",
      paymentStatus: "unpaid",
      items: 3,
      shippingMethod: "Express Shipping",
    },
    {
      id: "ORD-008",
      customer: "Lisa Taylor",
      date: "2023-06-08T10:05:00",
      total: 45.25,
      status: "delivered",
      paymentStatus: "paid",
      items: 1,
      shippingMethod: "Standard Shipping",
    },
  ];

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending")
      return matchesSearch && order.status === "pending";
    if (activeTab === "processing")
      return matchesSearch && order.status === "processing";
    if (activeTab === "shipped")
      return matchesSearch && order.status === "shipped";
    if (activeTab === "delivered")
      return matchesSearch && order.status === "delivered";
    if (activeTab === "cancelled")
      return (
        matchesSearch &&
        (order.status === "cancelled" || order.status === "returned")
      );

    return matchesSearch;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleEditOrder = (order: Order) => {
    // In a real app, you would open an edit form
    console.log("Edit order:", order);
  };

  const handleDeleteOrder = (order: Order) => {
    // In a real app, you would show a confirmation dialog and delete the order
    console.log("Delete order:", order);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "returned":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "unpaid":
        return "outline";
      case "refunded":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "shipped":
        return <Truck className="h-4 w-4 mr-1" />;
      case "processing":
        return <Package className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 mr-1" />;
      case "returned":
        return <RefreshCw className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Order Management</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "pending").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Shipped Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "shipped").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivered Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "delivered").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(order.status)}
                            className="flex items-center w-fit"
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getPaymentStatusBadgeVariant(
                              order.paymentStatus,
                            )}
                          >
                            {order.paymentStatus.charAt(0).toUpperCase() +
                              order.paymentStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.total.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {order.items}
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
                              <DropdownMenuItem
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditOrder(order)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteOrder(order)}
                              >
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Panel (would be a dialog in a real app) */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[80vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Details</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOrderDetails(false)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedOrder.id}</h2>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedOrder.date)}
                  </div>
                </div>
                <Badge
                  variant={getStatusBadgeVariant(selectedOrder.status)}
                  className="flex items-center"
                >
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status.charAt(0).toUpperCase() +
                    selectedOrder.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {selectedOrder.customer}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Payment Status
                  </div>
                  <Badge
                    variant={getPaymentStatusBadgeVariant(
                      selectedOrder.paymentStatus,
                    )}
                  >
                    {selectedOrder.paymentStatus.charAt(0).toUpperCase() +
                      selectedOrder.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Order Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Total Amount
                        </div>
                        <div className="text-xl font-bold">
                          ${selectedOrder.total.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Items
                        </div>
                        <div className="text-xl font-bold">
                          {selectedOrder.items}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Shipping Information</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {selectedOrder.shippingMethod}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Shipping address would be displayed here in a real
                      application.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Order Items</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">
                      Order items would be listed here in a real application.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderDetails(false)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEditOrder(selectedOrder)}>
                  Update Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrdersModule;

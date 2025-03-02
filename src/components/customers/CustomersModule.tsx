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
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalSpent: number;
  orders: number;
  status: "active" | "inactive";
  type: "regular" | "vip" | "new";
  avatar?: string;
}

interface CustomersModuleProps {}

const CustomersModule: React.FC<CustomersModuleProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // Sample data
  const customers: Customer[] = [
    {
      id: "C001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, CA 12345",
      joinDate: "2022-01-15",
      totalSpent: 1245.67,
      orders: 12,
      status: "active",
      type: "vip",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, NY 67890",
      joinDate: "2022-03-22",
      totalSpent: 876.5,
      orders: 8,
      status: "active",
      type: "regular",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: "C003",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "(555) 456-7890",
      address: "789 Pine Rd, Elsewhere, TX 54321",
      joinDate: "2022-05-10",
      totalSpent: 2345.2,
      orders: 18,
      status: "active",
      type: "vip",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
    {
      id: "C004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 789-0123",
      address: "321 Cedar Ln, Nowhere, FL 13579",
      joinDate: "2022-07-05",
      totalSpent: 432.1,
      orders: 4,
      status: "inactive",
      type: "regular",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      id: "C005",
      name: "Michael Wilson",
      email: "michael.w@example.com",
      phone: "(555) 321-6547",
      address: "654 Maple Dr, Anywhere, WA 97531",
      joinDate: "2022-09-18",
      totalSpent: 156.75,
      orders: 2,
      status: "active",
      type: "new",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: "C006",
      name: "Sarah Brown",
      email: "sarah.b@example.com",
      phone: "(555) 654-9870",
      address: "987 Elm St, Someplace, IL 24680",
      joinDate: "2022-11-30",
      totalSpent: 1789.3,
      orders: 15,
      status: "active",
      type: "vip",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  ];

  // Filter customers based on active tab and search query
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "vip") return matchesSearch && customer.type === "vip";
    if (activeTab === "regular")
      return matchesSearch && customer.type === "regular";
    if (activeTab === "new") return matchesSearch && customer.type === "new";
    if (activeTab === "inactive")
      return matchesSearch && customer.status === "inactive";

    return matchesSearch;
  });

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    // In a real app, you would open an edit form
    console.log("Edit customer:", customer);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    // In a real app, you would show a confirmation dialog and delete the customer
    console.log("Delete customer:", customer);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case "vip":
        return "default";
      case "regular":
        return "secondary";
      case "new":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Customer Management</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customers.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    VIP Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customers.filter((c) => c.type === "vip").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Customers (30d)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customers.filter((c) => c.type === "new").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inactive Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customers.filter((c) => c.status === "inactive").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customers Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatar} />
                              <AvatarFallback>
                                {customer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {customer.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.phone}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(customer.joinDate)}</TableCell>
                        <TableCell>
                          <Badge variant={getCustomerTypeColor(customer.type)}>
                            {customer.type === "vip" && (
                              <Star className="h-3 w-3 mr-1" />
                            )}
                            {customer.type.charAt(0).toUpperCase() +
                              customer.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {customer.orders}
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
                                onClick={() => handleViewCustomer(customer)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditCustomer(customer)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCustomer(customer)}
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

      {/* Customer Details Panel (would be a dialog in a real app) */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[80vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customer Details</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCustomerDetails(false)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCustomer.avatar} />
                  <AvatarFallback>
                    {selectedCustomer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                  <Badge
                    variant={getCustomerTypeColor(selectedCustomer.type)}
                    className="mt-1"
                  >
                    {selectedCustomer.type === "vip" && (
                      <Star className="h-3 w-3 mr-1" />
                    )}
                    {selectedCustomer.type.charAt(0).toUpperCase() +
                      selectedCustomer.type.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Customer ID
                  </div>
                  <div>{selectedCustomer.id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Join Date</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(selectedCustomer.joinDate)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Purchase Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Total Spent
                        </div>
                        <div className="text-xl font-bold">
                          ${selectedCustomer.totalSpent.toFixed(2)}
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
                          Orders
                        </div>
                        <div className="text-xl font-bold">
                          {selectedCustomer.orders}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomerDetails(false)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEditCustomer(selectedCustomer)}>
                  Edit Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomersModule;

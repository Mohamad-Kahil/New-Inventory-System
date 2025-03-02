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
  Truck,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  FileText,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: "active" | "inactive";
  rating: 1 | 2 | 3 | 4 | 5;
  categories: string[];
  totalOrders: number;
  totalSpent: number;
}

interface SuppliersModuleProps {}

const SuppliersModule: React.FC<SuppliersModuleProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);

  // Sample data
  const suppliers: Supplier[] = [
    {
      id: "SUP-001",
      name: "Tech Components Inc.",
      contactPerson: "John Smith",
      email: "john@techcomponents.com",
      phone: "(555) 123-4567",
      address: "123 Tech Blvd, Silicon Valley, CA 94043",
      joinDate: "2022-01-15",
      status: "active",
      rating: 5,
      categories: ["Electronics", "Computers"],
      totalOrders: 45,
      totalSpent: 125000,
    },
    {
      id: "SUP-002",
      name: "Global Gadgets Ltd.",
      contactPerson: "Sarah Johnson",
      email: "sarah@globalgadgets.com",
      phone: "(555) 987-6543",
      address: "456 Innovation Way, Boston, MA 02108",
      joinDate: "2022-03-22",
      status: "active",
      rating: 4,
      categories: ["Electronics", "Accessories"],
      totalOrders: 32,
      totalSpent: 87500,
    },
    {
      id: "SUP-003",
      name: "Premium Audio Systems",
      contactPerson: "Michael Brown",
      email: "michael@premiumaudio.com",
      phone: "(555) 456-7890",
      address: "789 Sound Ave, Nashville, TN 37203",
      joinDate: "2022-05-10",
      status: "active",
      rating: 5,
      categories: ["Audio", "Electronics"],
      totalOrders: 28,
      totalSpent: 65000,
    },
    {
      id: "SUP-004",
      name: "Office Solutions Co.",
      contactPerson: "Emily Davis",
      email: "emily@officesolutions.com",
      phone: "(555) 789-0123",
      address: "321 Business Park, Chicago, IL 60601",
      joinDate: "2022-07-05",
      status: "inactive",
      rating: 3,
      categories: ["Office Supplies", "Furniture"],
      totalOrders: 15,
      totalSpent: 32000,
    },
    {
      id: "SUP-005",
      name: "Digital Displays Ltd.",
      contactPerson: "Robert Wilson",
      email: "robert@digitaldisplays.com",
      phone: "(555) 321-6547",
      address: "654 Tech Park, San Francisco, CA 94105",
      joinDate: "2022-09-18",
      status: "active",
      rating: 4,
      categories: ["Electronics", "Displays"],
      totalOrders: 22,
      totalSpent: 54000,
    },
    {
      id: "SUP-006",
      name: "Smart Home Innovations",
      contactPerson: "Jessica Taylor",
      email: "jessica@smarthome.com",
      phone: "(555) 654-9870",
      address: "987 Innovation Dr, Austin, TX 78701",
      joinDate: "2022-11-30",
      status: "active",
      rating: 5,
      categories: ["Smart Home", "Electronics"],
      totalOrders: 18,
      totalSpent: 42000,
    },
  ];

  // Filter suppliers based on active tab and search query
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && supplier.status === "active";
    if (activeTab === "inactive")
      return matchesSearch && supplier.status === "inactive";
    if (activeTab === "electronics")
      return matchesSearch && supplier.categories.includes("Electronics");
    if (activeTab === "audio")
      return matchesSearch && supplier.categories.includes("Audio");
    if (activeTab === "other") {
      return (
        matchesSearch &&
        !supplier.categories.includes("Electronics") &&
        !supplier.categories.includes("Audio")
      );
    }

    return matchesSearch;
  });

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierDetails(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    // In a real app, you would open an edit form
    console.log("Edit supplier:", supplier);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    // In a real app, you would show a confirmation dialog and delete the supplier
    console.log("Delete supplier:", supplier);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
        />
      ));
  };

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Supplier Management</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Supplier Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{suppliers.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {suppliers.filter((s) => s.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Rated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {suppliers.filter((s) => s.rating === 5).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {suppliers
                      .reduce((sum, s) => sum + s.totalSpent, 0)
                      .toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Suppliers Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Supplier</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {supplier.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {supplier.contactPerson}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {supplier.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {supplier.categories.map((category, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            {renderRatingStars(supplier.rating)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {supplier.totalOrders}
                        </TableCell>
                        <TableCell className="text-right">
                          ${supplier.totalSpent.toLocaleString()}
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
                                onClick={() => handleViewSupplier(supplier)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditSupplier(supplier)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSupplier(supplier)}
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

      {/* Supplier Details Panel (would be a dialog in a real app) */}
      {showSupplierDetails && selectedSupplier && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[80vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Supplier Details</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSupplierDetails(false)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">{selectedSupplier.name}</h2>
                <div className="text-sm text-muted-foreground">
                  {selectedSupplier.id}
                </div>
                <div className="flex mt-2">
                  {renderRatingStars(selectedSupplier.rating)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge
                    variant={
                      selectedSupplier.status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedSupplier.status.charAt(0).toUpperCase() +
                      selectedSupplier.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Join Date</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(selectedSupplier.joinDate)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSupplier.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSupplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSupplier.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Purchase Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Total Orders
                        </div>
                        <div className="text-xl font-bold">
                          {selectedSupplier.totalOrders}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                          ${selectedSupplier.totalSpent.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSupplierDetails(false)}
                >
                  Close
                </Button>
                <Button onClick={() => handleEditSupplier(selectedSupplier)}>
                  Edit Supplier
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuppliersModule;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  FileEdit,
  Trash2,
  Download,
  Filter,
} from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed" | "refunded";
  items: number;
  paymentMethod: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewTransaction?: (id: string) => void;
  onEditTransaction?: (id: string) => void;
  onDeleteTransaction?: (id: string) => void;
  onExportTransactions?: () => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions = defaultTransactions,
  onViewTransaction = () => {},
  onEditTransaction = () => {},
  onDeleteTransaction = () => {},
  onExportTransactions = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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

  return (
    <div className="w-full bg-background rounded-lg border shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={onExportTransactions}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.customer}</TableCell>
              <TableCell>{formatCurrency(transaction.amount)}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(transaction.status)}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>{transaction.items}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
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
                      onClick={() => onViewTransaction(transaction.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEditTransaction(transaction.id)}
                    >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-destructive"
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {indexOfFirstTransaction + 1} to{" "}
          {Math.min(indexOfLastTransaction, transactions.length)} of{" "}
          {transactions.length} transactions
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// Default mock data
const defaultTransactions: Transaction[] = [
  {
    id: "TRX-001",
    customer: "John Doe",
    amount: 125.99,
    date: "2023-06-15T14:30:00",
    status: "completed",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-002",
    customer: "Jane Smith",
    amount: 89.5,
    date: "2023-06-14T10:15:00",
    status: "pending",
    items: 2,
    paymentMethod: "PayPal",
  },
  {
    id: "TRX-003",
    customer: "Robert Johnson",
    amount: 245.75,
    date: "2023-06-13T16:45:00",
    status: "completed",
    items: 5,
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-004",
    customer: "Emily Davis",
    amount: 32.99,
    date: "2023-06-12T09:20:00",
    status: "failed",
    items: 1,
    paymentMethod: "Debit Card",
  },
  {
    id: "TRX-005",
    customer: "Michael Wilson",
    amount: 175.25,
    date: "2023-06-11T13:10:00",
    status: "refunded",
    items: 4,
    paymentMethod: "Cash",
  },
  {
    id: "TRX-006",
    customer: "Sarah Brown",
    amount: 67.5,
    date: "2023-06-10T11:30:00",
    status: "completed",
    items: 2,
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-007",
    customer: "David Miller",
    amount: 129.99,
    date: "2023-06-09T15:45:00",
    status: "pending",
    items: 3,
    paymentMethod: "PayPal",
  },
  {
    id: "TRX-008",
    customer: "Lisa Taylor",
    amount: 45.25,
    date: "2023-06-08T10:05:00",
    status: "completed",
    items: 1,
    paymentMethod: "Debit Card",
  },
];

export default RecentTransactions;

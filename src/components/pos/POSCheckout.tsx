import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, DollarSign, Receipt, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CheckoutFormValues {
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cashAmount?: string;
}

interface POSCheckoutProps {
  isOpen?: boolean;
  onClose?: () => void;
  cartTotal?: number;
  onPaymentComplete?: (receiptData: any) => void;
}

const POSCheckout = ({
  isOpen = true,
  onClose = () => {},
  cartTotal = 125.75,
  onPaymentComplete = () => {},
}: POSCheckoutProps) => {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cashAmount: "",
    },
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
    },
    { id: "cash", name: "Cash", icon: <DollarSign className="h-5 w-5" /> },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
  ];

  const handlePaymentMethodChange = (value: string) => {
    setSelectedMethod(value);
    form.setValue("paymentMethod", value);
  };

  const processPayment = (data: CheckoutFormValues) => {
    setPaymentStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success");

      // Generate receipt data
      const receiptData = {
        transactionId: `TRX-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        amount: cartTotal,
        paymentMethod: data.paymentMethod,
        status: "completed",
      };

      onPaymentComplete(receiptData);

      // Reset form after successful payment
      setTimeout(() => {
        form.reset();
        setPaymentStatus("idle");
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your purchase by selecting a payment method below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Payment Summary */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${(cartTotal * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Tax (10%):</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-4 text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  type="button"
                  variant={selectedMethod === method.id ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => handlePaymentMethodChange(method.id)}
                >
                  {method.icon}
                  <span className="text-xs">{method.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Details Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(processPayment)}
              className="space-y-4"
            >
              {selectedMethod === "card" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="4242 4242 4242 4242" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardCvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "cash" && (
                <FormField
                  control={form.control}
                  name="cashAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cash Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount received"
                          {...field}
                        />
                      </FormControl>
                      {parseFloat(field.value || "0") > cartTotal && (
                        <FormDescription>
                          Change: $
                          {(parseFloat(field.value) - cartTotal).toFixed(2)}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedMethod === "wallet" && (
                <div className="p-6 border rounded-md flex flex-col items-center justify-center space-y-4">
                  <Receipt className="h-16 w-16 text-muted-foreground" />
                  <p className="text-center text-sm">
                    Scan the QR code on the customer's device or have them scan
                    your POS terminal QR code.
                  </p>
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={paymentStatus === "processing"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={paymentStatus !== "idle"}>
                  {paymentStatus === "idle" && "Complete Payment"}
                  {paymentStatus === "processing" && "Processing..."}
                  {paymentStatus === "success" && "Payment Successful!"}
                  {paymentStatus === "error" && "Payment Failed"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default POSCheckout;

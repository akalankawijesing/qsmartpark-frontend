"use client";

import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { CreditCard, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PaymentConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    cost: number;
    currency: string;
  };
  onConfirmPayment: () => Promise<void>;
}

export function PaymentConfirmationDialog({
  open,
  onOpenChange,
  bookingDetails,
  onConfirmPayment,
}: PaymentConfirmationDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      await onConfirmPayment();
      toast.success("Payment initiated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "hh:mm a");
  };

  const formatDate = (isoString: string) => {
    return format(new Date(isoString), "PPP");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            Please review your booking details and confirm payment to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Date</span>
              <span className="text-sm">{formatDate(bookingDetails.date)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Time</span>
              <span className="text-sm">
                {formatTime(bookingDetails.startTime)} -{" "}
                {formatTime(bookingDetails.endTime)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount</span>
              <span className="text-sm font-bold">
                {bookingDetails.currency} {bookingDetails.cost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Secure payment processing powered by PayHere</span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${bookingDetails.currency} ${bookingDetails.cost.toFixed(2)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

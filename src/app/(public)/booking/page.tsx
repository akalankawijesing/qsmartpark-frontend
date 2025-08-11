"use client";

import { useState } from "react";
import { toast } from "sonner";
import BookingCalendar from "@/components/BookingCalendar";
import { TimeSlotSelector } from "@/components/TimeSlotSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  TimerIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentConfirmationDialog } from "@/components/PaymentConfirmationDialog";

interface BookingData {
  userId: string;
  slotId: string;
  date: string;
  vehicleNo: string;
  vehicleType: string;
  startTime: string;
  endTime: string;
  status: string;
  qrCode: string;
}

interface BookingConfirmationData {
  id: string;
  userId: string;
  slotId: string;
  date: string;
  vehicleNo: string;
  vehicleType: string;
  cost: number;
  orderId: string;
  currency: string;
  startTime: string;
  endTime: string;
  status: string;
  qrCode: string;
  createdAt: string | null;
  updatedAt: string | null;
}

interface PaymentRequest {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
}

interface PaymentConfig {
  sandbox: boolean;
  merchantId: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  orderId: string;
  items: string;
  amount: number;
  currency: string;
  hash: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

// Duration options in minutes
const DURATION_OPTIONS = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
];

export default function BookNowPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(90); // Default 1.5 hours
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [bookingConfirmationData, setBookingConfirmationData] =
    useState<BookingConfirmationData | null>(null);

  const { user, logout } = useAuth();

  const dummyBookedSlots = ["10:00 AM", "01:00 PM"];

  const convertTimeSlotToDateTime = (
    date: Date,
    timeSlot: string,
    durationMinutes: number
  ): { startTime: string; endTime: string } => {
    // Parse the time slot (e.g., "10:00 AM", "02:30 PM")
    const timeParts = timeSlot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeParts) {
      throw new Error(`Invalid time format: ${timeSlot}`);
    }

    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    // Convert to 24-hour format
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // ✅ FIX: Create start time using the exact date components to avoid timezone issues
    const startDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      0,
      0
    );

    // Create end time based on duration
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(startDateTime.getMinutes() + durationMinutes);

    // ✅ FIX: Format to local ISO string to maintain the correct date/time
    const formatToLocalISO = (d: Date): string => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hour = String(d.getHours()).padStart(2, "0");
      const minute = String(d.getMinutes()).padStart(2, "0");
      const second = String(d.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    };

    return {
      startTime: formatToLocalISO(startDateTime),
      endTime: formatToLocalISO(endDateTime),
    };
  };

  const formatEndTime = (timeSlot: string, durationMinutes: number): string => {
    const timeParts = timeSlot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeParts) return "";

    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    // Convert to 24-hour format
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Add duration
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;

    // Convert back to 12-hour format
    const displayHours =
      endHours === 0 ? 12 : endHours > 12 ? endHours - 12 : endHours;
    const displayPeriod = endHours >= 12 ? "PM" : "AM";

    return `${displayHours}:${endMinutes
      .toString()
      .padStart(2, "0")} ${displayPeriod}`;
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select both a date and time slot");
      return;
    }
    setIsConfirming(true);
  };

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // Handle payment dialog close
  const handlePaymentDialogClose = (open: boolean) => {
    setShowPaymentDialog(open);
    if (!open) {
      toast.info("You can retry payment by clicking 'Confirm Booking' again");
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) return;

    setIsLoading(true);

    try {
      // If we already have a booking in PAYMENT_PENDING state, reuse it
      if (bookingConfirmationData?.status === "PAYMENT_PENDING") {
        setShowPaymentDialog(true);
        return;
      }

      const { startTime, endTime } = convertTimeSlotToDateTime(
        selectedDate,
        selectedSlot,
        duration
      );

      const startTimeQuery = startTime.split(".")[0];
      const endTimeQuery = endTime.split(".")[0];

      const slotAvailability = await fetch(
        `http://localhost:8080/api/parking-slots/available?startDateTime=${startTimeQuery}&endDateTime=${endTimeQuery}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!slotAvailability.ok) {
        throw new Error(`HTTP error! status: ${slotAvailability.status}`);
      }

      const slotAvailabilityResult = await slotAvailability.json();

      if (!slotAvailabilityResult || slotAvailabilityResult.length === 0) {
        toast.error("Selected time slot is not available");
        return;
      }

      const slotId = slotAvailabilityResult[0].id;

      const bookingData: BookingData = {
        userId: "d8c888a3-6071-4b02-8955-23fd1ad96c66",
        slotId,
        date: selectedDate.toISOString().split("T")[0],
        vehicleNo: "ABC1234",
        vehicleType: "CAR",
        startTime,
        endTime,
        status: "PAYMENT_PENDING",
        qrCode: "CUSTOM_QR_CODE_123",
      };

      const response = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setBookingConfirmationData(result);
      setShowPaymentDialog(true);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!bookingConfirmationData) return;

    const paymentRequest: PaymentRequest = {
      orderId: bookingConfirmationData.orderId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "Anytown",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/initiate",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentRequest), // Send directly, not nested
        }
      );
      console.log("Payment initiation request:", paymentRequest);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentResult = await response.json();

      console.log("Payment result:", paymentResult);

  const { paymentConfig } = await response.json();

  // Declare payhere as a global variable (if loaded via script tag)
  // @ts-ignore
  const payhere = (window as any).payhere;
  if (!payhere) {
    throw new Error("PayHere SDK is not loaded.");
  }

  // Initialize PayHere payment
  payhere.startPayment({
    sandbox: paymentConfig.sandbox,
    merchant_id: paymentConfig.merchantId,
    return_url: paymentConfig.returnUrl,
    cancel_url: paymentConfig.cancelUrl,
    notify_url: paymentConfig.notifyUrl,
    order_id: paymentConfig.orderId,
    items: paymentConfig.items,
    amount: paymentConfig.amount.toFixed(2),
    currency: paymentConfig.currency,
    hash: paymentConfig.hash,
    first_name: paymentConfig.firstName,
    last_name: paymentConfig.lastName,
    email: paymentConfig.email,
    phone: paymentConfig.phone,
    address: paymentConfig.address,
    city: paymentConfig.city,
    country: paymentConfig.country
  });
      /*
      // Redirect to payment gateway or handle the response as needed
      if (paymentResult.redirectUrl) {
        window.location.href = paymentResult.redirectUrl;
      }
*/
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span>Payment initiated successfully!</span>
        </div>
      );

      // Reset form
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setIsConfirming(false);
      setShowPaymentDialog(false);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Failed to initiate payment. Please try again.");
      throw error; // Re-throw to be handled by the dialog
    }
  };

  const handleBack = () => {
    // Only clear booking data if payment was successful or user wants to start over
    if (bookingConfirmationData?.status === "CONFIRMED") {
      setBookingConfirmationData(null);
    }
    setIsConfirming(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Book Your Appointment
        </h1>
        <p className="text-muted-foreground">
          Select your preferred date, time, and duration
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        <div
          className={`flex items-center space-x-2 ${
            !isConfirming ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              !isConfirming
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Select Time</span>
        </div>
        <Separator className="w-12" />
        <div
          className={`flex items-center space-x-2 ${
            isConfirming ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              isConfirming
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Confirm</span>
        </div>
      </div>

      {!isConfirming ? (
        // Step 1: Date and Time Selection
        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Select Date</h2>
              </div>
              <BookingCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            </div>

            {/* Time Slots Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Available Time Slots</h2>
              </div>

              {/* Duration Selector */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TimerIcon className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">
                    Appointment Duration
                  </label>
                </div>
                <Select
                  value={duration.toString()}
                  onValueChange={(value) => setDuration(parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <TimeSlotSelector
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSlotSelect={setSelectedSlot}
                bookedSlots={dummyBookedSlots}
              />
            </div>
          </div>

          {/* Summary Bar */}
          {(selectedDate || selectedSlot) && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-wrap items-center gap-4">
                {selectedDate && (
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary">
                      {format(selectedDate, "PPP")}
                    </Badge>
                  </div>
                )}
                {selectedSlot && (
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary">
                      {selectedSlot} - {formatEndTime(selectedSlot, duration)}
                    </Badge>
                  </div>
                )}
                {selectedSlot && (
                  <div className="flex items-center space-x-2">
                    <TimerIcon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline">
                      {
                        DURATION_OPTIONS.find((d) => d.value === duration)
                          ?.label
                      }
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleContinue}
            className="w-full mt-6"
            size="lg"
            disabled={!selectedDate || !selectedSlot}
          >
            Continue to Confirmation
          </Button>
        </Card>
      ) : (
        // Step 2: Confirmation
        <Card className="p-6">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
              <p className="text-muted-foreground mt-2">
                Please review your appointment details
              </p>
            </div>

            {/* Booking Summary */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="p-6 bg-muted/50 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Date</span>
                  </div>
                  <span className="text-right">
                    {selectedDate && format(selectedDate, "PPP")}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Time</span>
                  </div>
                  <span className="text-right">
                    {selectedSlot} -{" "}
                    {selectedSlot && formatEndTime(selectedSlot, duration)}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TimerIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <span className="text-right">
                    {DURATION_OPTIONS.find((d) => d.value === duration)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
                disabled={isLoading}
              >
                Back to Selection
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Booking...</span>
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Payment Confirmation Dialog */}
      {bookingConfirmationData && (
        <PaymentConfirmationDialog
          open={showPaymentDialog}
          onOpenChange={handlePaymentDialogClose}
          bookingDetails={{
            id: bookingConfirmationData.id,
            date: bookingConfirmationData.date,
            startTime: bookingConfirmationData.startTime,
            endTime: bookingConfirmationData.endTime,
            cost: bookingConfirmationData.cost,
            currency: bookingConfirmationData.currency,
          }}
          onConfirmPayment={handlePaymentConfirmation}
        />
      )}
    </div>
  );
}

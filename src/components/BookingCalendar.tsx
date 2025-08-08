"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function BookingCalendar({
  selectedDate,
  onDateChange,
}: BookingCalendarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="w-full flex items-center justify-center">
      {mounted ? (
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          className="rounded-md"
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
        />
      ) : (
        <div className="text-center py-20 text-slate-400">
          Loading calendar...
        </div>
      )}
      {selectedDate && (
        <p className="text-center mt-2 text-sm text-muted-foreground">
          Selected date: {format(selectedDate, "PPP")}
        </p>
      )}
    </Card>
  );
}

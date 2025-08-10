"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        {mounted ? (
          <div className="flex flex-col items-center space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              className="rounded-md"
              disabled={(date) => date < today}
              showOutsideDays={false}
              fixedWeeks
            />
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading calendar...</p>
            </div>
          </div>
        )}
      </Card>

      {/* Selected Date Display */}
      {selectedDate && (
        <Card className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Selected:</span>
            <Badge variant="secondary" className="text-sm">
              {format(selectedDate, "EEEE, MMMM do, yyyy")}
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
}
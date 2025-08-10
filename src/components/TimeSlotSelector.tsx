"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, XCircleIcon } from "lucide-react";

interface TimeSlotSelectorProps {
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
  bookedSlots: string[];
}

function generateTimeSlots(start = 9, end = 17): string[] {
  const slots: string[] = [];

  for (let hour = start; hour <= end; hour++) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    const timeStr = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    slots.push(timeStr.toUpperCase());
  }

  return slots;
}

const ALL_SLOTS = generateTimeSlots();

export const TimeSlotSelector = ({
  selectedDate,
  selectedSlot,
  onSlotSelect,
  bookedSlots,
}: TimeSlotSelectorProps) => {
  if (!selectedDate) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
        <ClockIcon className="h-12 w-12 text-muted-foreground/50" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Please select a date first
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Choose a date from the calendar to view available time slots
          </p>
        </div>
      </div>
    );
  }

  const availableSlots = ALL_SLOTS.filter(slot => !bookedSlots.includes(slot));
  const bookedCount = bookedSlots.length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-xs">
            {availableSlots.length} available
          </Badge>
          {bookedCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {bookedCount} booked
            </Badge>
          )}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ALL_SLOTS.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = selectedSlot === slot;

          return (
            <Button
              key={slot}
              variant={isSelected ? "default" : isBooked ? "destructive" : "outline"}
              disabled={isBooked}
              onClick={() => onSlotSelect(slot)}
              className={`
                relative h-12 text-sm font-medium transition-all duration-200
                ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                ${isBooked ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
              `}
            >
              <div className="flex items-center space-x-2">
                {isBooked && <XCircleIcon className="h-3 w-3" />}
                <span>{slot}</span>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <ClockIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Selected time:</span>
            <Badge className="bg-primary text-primary-foreground">
              {selectedSlot}
            </Badge>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-border rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-destructive rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};
"use client";

import { Button } from "@/components/ui/button";

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
      <p className="text-sm text-muted-foreground">
        Please select a date first.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {ALL_SLOTS.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        const isSelected = selectedSlot === slot;

        return (
          <Button
            key={slot}
            variant={isSelected ? "default" : "outline"}
            disabled={isBooked}
            onClick={() => onSlotSelect(slot)}
          >
            {slot}
          </Button>
        );
      })}
    </div>
  );
};

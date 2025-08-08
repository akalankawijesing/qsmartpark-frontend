"use client"

import { Button } from "@/components/ui/button"

interface TimeSlotSelectorProps {
  selectedDate: Date | undefined
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
  bookedSlots: string[]
}

const ALL_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM"
]

export const TimeSlotSelector = ({
  selectedDate,
  selectedSlot,
  onSlotSelect,
  bookedSlots,
}: TimeSlotSelectorProps) => {
  if (!selectedDate) {
    return <p className="text-sm text-muted-foreground">Please select a date first.</p>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {ALL_SLOTS.map((slot) => {
        const isBooked = bookedSlots.includes(slot)
        const isSelected = selectedSlot === slot

        return (
          <Button
            key={slot}
            variant={isSelected ? "default" : "outline"}
            disabled={isBooked}
            onClick={() => onSlotSelect(slot)}
          >
            {slot}
          </Button>
        )
      })}
    </div>
  )
}

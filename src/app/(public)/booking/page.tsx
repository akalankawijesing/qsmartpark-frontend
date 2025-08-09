"use client"

import { useState } from "react"
import { toast } from "sonner"
import BookingCalendar from "@/components/BookingCalendar"
import { TimeSlotSelector } from "@/components/TimeSlotSelector"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const BookNowPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const dummyBookedSlots = ["10:00 AM", "01:00 PM"] // Replace with real fetch based on selectedDate

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select both a date and time slot")
      return
    }

    toast.success(`Booked for ${format(selectedDate, "PPP")} at ${selectedSlot}`)
  }

  return (
    <Card className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Book an Appointment</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="w-full md:w-1/2">
          <BookingCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {/* Time Slots */}
        <div className="w-full md:w-1/2">
          <h2 className="text-md font-medium mb-2">Available Time Slots</h2>
          <TimeSlotSelector
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            bookedSlots={dummyBookedSlots}
          />
        </div>
      </div>

      <Button onClick={handleBooking} className="w-full mt-6">Book Now</Button>
    </Card>
  )
}

export default BookNowPage

import { useState } from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs'

interface CalendarProps {
  isOpen: boolean
  onClose: () => void
}

const Calendar = ({ isOpen, onClose }: CalendarProps) => {
  const [value, setValue] = useState<Date>(new Date())

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop to close calendar when clicking outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Calendar popup */}
      <div className="calendar-popup">
        <ReactCalendar
          onChange={(value) => setValue(value as Date)}
          value={value}
          locale="en-US"
          calendarType="gregory"
        />

        {/* Current time at bottom */}
        <div className="calendar-footer">
          <p>{dayjs().format('h:mm:ss A')}</p>
        </div>
      </div>
    </>
  )
}

export default Calendar

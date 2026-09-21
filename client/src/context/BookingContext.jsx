import React from 'react'
import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export const useBooking = () => useContext(BookingContext)

function BookingProvider({ children }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  return (
    <BookingContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
      {children}
    </BookingContext.Provider>
  )
}

export default BookingProvider;

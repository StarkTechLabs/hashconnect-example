import React, { createContext, useState } from 'react'
import EventEmitter from 'events'

export const BusContext = createContext(null)

const BusProvider = ({ bus: _bus, children }) => {
  const [bus] = useState(_bus || new EventEmitter())

  return (
    <BusContext.Provider value={bus}>
      {children}
    </BusContext.Provider>
  )
}

export default BusProvider

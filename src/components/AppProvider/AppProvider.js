/* global localStorage */
import React, { createContext, useState } from 'react'

export const AppContext = createContext(null)

const parseLocalItem = (key, defaultVal) => {
  try {
    const data = localStorage.getItem(key) || '[]'
    return JSON.parse(data)
  } catch (err) {
    return defaultVal
  }
}

const storageKeys = {
  settings: 'settings-data',
  filters: 'filters-data',
  transforms: 'transforms-data'
}

const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(parseLocalItem(storageKeys.settings, {}))
  const [filters, setFilters] = useState(parseLocalItem(storageKeys.filters, {}))
  const [transforms, setTransforms] = useState(parseLocalItem(storageKeys.transforms, {}))

  const handleSettings = data => {
    setSettings(data)
    localStorage.setItem(storageKeys.settings, JSON.stringify(data))
  }

  const handleFilters = data => {
    setFilters(data)
    localStorage.setItem(storageKeys.filters, JSON.stringify(data))
  }

  const handleTransforms = data => {
    setTransforms(data)
    localStorage.setItem(storageKeys.transforms, JSON.stringify(data))
  }

  return (
    <AppContext.Provider value={{
      settings,
      setSettings: handleSettings,
      filters,
      setFilters: handleFilters,
      transforms,
      setTransforms: handleTransforms
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

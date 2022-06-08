import React, { createContext, useContext, useState, useEffect } from 'react'
import { ConnectService, ConnectEvents } from '../../common/connect'

export const HashContext = createContext(null)

export const useHashConnect = () => {
  const value = useContext(HashContext)
  return value
}

const HashProvider = ({ network, children }) => {
  const [instance, setInstance] = useState()
  const [status, setStatus] = useState()

  const handleStatusChange = status => {
    console.log('status changed -- app', status)
    setStatus(status)
  }

  useEffect(() => {
    if (instance) return

    const service = new ConnectService(network)
    service.initConnect()

    service.on(ConnectEvents.STATUS_CHANGED, handleStatusChange)
    setInstance(service)

    return () => {
      if (service) {
        service.destroyEvents()

        service.off(ConnectEvents.STATUS_CHANGED, handleStatusChange)
      }
    }
  }, [])

  const getBalance = async () => {
    const balance = await instance.getProvider().getAccountBalance(instance.accountId)
    window.balance = balance
    return balance
  }

  return (
    <HashContext.Provider value={{
      instance,
      status,
      saveData: instance && instance.saveData,
      availableExtensions: instance && instance.availableExtensions,
      getBalance
    }}
    >
      {children}
    </HashContext.Provider>
  )
}

export default HashProvider

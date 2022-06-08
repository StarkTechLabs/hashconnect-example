import { useContext } from 'react'

import { BusContext } from '../../components/BusProvider/BusProvider'

const useEventBus = () => {
  const bus = useContext(BusContext)
  return bus
}

export default useEventBus

import { useEffect } from 'react'

import useEventBus from '../useEventBus/useEventBus'

const useSubscribe = (eventName, callback) => {
  const bus = useEventBus()
  useEffect(() => {
    bus.on(eventName, callback)
    return () => bus.off(eventName, callback)
  }, [bus])
}

export default useSubscribe

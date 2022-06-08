import { useContext } from 'react'

import { AppContext } from '../../components/AppProvider/AppProvider'

const useAppData = () => {
  const appData = useContext(AppContext)
  return appData || {}
}

export default useAppData

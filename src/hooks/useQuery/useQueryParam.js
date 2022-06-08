import React from 'react'
import { useSearchParams } from 'react-router-dom'

const useQueryParam = (key) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramValue = searchParams.get(key)

  const value = React.useMemo(() => paramValue, [paramValue])

  const setValue = React.useCallback(
    (newValue, options) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, newValue)
      setSearchParams(newSearchParams, options)
    },
    [key, searchParams, setSearchParams]
  )

  return [value, setValue]
}

export default useQueryParam

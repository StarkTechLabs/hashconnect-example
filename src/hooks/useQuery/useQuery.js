import React from 'react'

const useQuery = () => {
  const { search } = window.location

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default useQuery

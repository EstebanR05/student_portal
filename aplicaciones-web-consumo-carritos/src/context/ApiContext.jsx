import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ApiContext = createContext(null)

export function ApiProvider({ children }) {
  const [apiStatus, setApiStatus] = useState('idle')
  const [lastSuccessfulRequest, setLastSuccessfulRequest] = useState(null)

  const updateApiStatus = useCallback((status) => {
    setApiStatus(status)
    if (status === 'online') {
      setLastSuccessfulRequest(new Date())
    }
  }, [])

  const value = useMemo(
    () => ({
      apiStatus,
      updateApiStatus,
      lastSuccessfulRequest,
    }),
    [apiStatus, updateApiStatus, lastSuccessfulRequest]
  )

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useApiContext() {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApiContext debe utilizarse dentro de un ApiProvider.')
  }
  return context
}

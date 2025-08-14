import { useState, useEffect } from 'react'

const useStoreHydration = (
  store: unknown & {
    persist: { onFinishHydration: (fn: (state: unknown) => void) => () => void; hasHydrated: () => boolean }
  }
) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.

    const unsubFinishHydration = store.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(store.persist.hasHydrated())

    return () => {
      unsubFinishHydration()
    }
  }, [])

  return hydrated
}

export default useStoreHydration

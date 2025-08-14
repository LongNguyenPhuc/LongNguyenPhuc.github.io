// Core
import { isUndefined } from 'lodash-es'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// App
import { createStorage } from '../utils/storage'

// Types
// States
export interface States {
  isSignedIn: boolean
  token: string | null
  expiredAt: Date | null
  storedUsername: string | null
  storedPassword: string | null
}

// Actions
interface SetStoreActionValues {
  isSignedIn?: States['isSignedIn']
  token?: States['token']
  expiredAt?: States['expiredAt']
  storedUsername?: States['storedUsername']
  storedPassword?: States['storedPassword']
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void
  resetStore: () => void
}

// Store
type Store = States & Actions

export const authStoreName = 'auth-store'

// Constants
const INITIAL_STATES: States = {
  isSignedIn: false,
  token: null,
  expiredAt: null,
  storedUsername: null,
  storedPassword: null
}

// Define store
const authStore: StateCreator<Store> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Methods
  setStore: ({ isSignedIn, token, expiredAt, storedUsername, storedPassword }) =>
    set((state) => ({
      isSignedIn: isUndefined(isSignedIn) ? state.isSignedIn : isSignedIn,
      token: isUndefined(token) ? state.token : token,
      expiredAt: isUndefined(expiredAt) ? state.expiredAt : expiredAt,
      storedUsername: isUndefined(storedUsername) ? state.storedUsername : storedUsername,
      storedPassword: isUndefined(storedPassword) ? state.storedPassword : storedPassword
    })),
  resetStore: () =>
    set({ isSignedIn: INITIAL_STATES.isSignedIn, token: INITIAL_STATES.token, expiredAt: INITIAL_STATES.expiredAt })
})

const useAuthStore = create<Store>()(
  devtools(
    persist(authStore, {
      name: authStoreName,
      storage: createStorage<States>()
    })
  )
)

export default useAuthStore

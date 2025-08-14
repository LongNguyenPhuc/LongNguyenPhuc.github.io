// Core
import { isUndefined } from 'lodash-es'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
// App
import { createStorage } from '../utils/storage'

// Types
export interface Permission {
  id: string
  permission_id: string
  permission: {
    id: string
    name: string
    code: string
  }
}

// States
export interface States {
  id: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  avatar: string | null
  birthday: string | null
  address: string | null
  phone: string | null
  gender: string | null
  is_active: boolean | null
  created_at: string | null
  updated_at: string | null
  username: string | null
  user_permisions: Permission[] | null
}

// Actions
interface SetStoreActionValues {
  id?: States['id']
  email?: States['email']
  first_name?: States['first_name']
  last_name?: States['last_name']
  avatar?: States['avatar']
  birthday?: States['birthday']
  address?: States['address']
  phone?: States['phone']
  gender?: States['gender']
  is_active?: States['is_active']
  created_at?: States['created_at']
  updated_at?: States['updated_at']
  username?: States['username']
  user_permisions?: States['user_permisions']
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void
  resetStore: () => void
}

// Store
export type ProfileStore = States & Actions

export const profileStoreName = 'profile-store'

// Constants
export const INITIAL_STATES: States = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  avatar: null,
  birthday: null,
  address: null,
  phone: null,
  gender: null,
  is_active: null,
  created_at: null,
  updated_at: null,
  username: null,
  user_permisions: null
}

// Define store
const profileStore: StateCreator<ProfileStore> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Actions
  setStore: ({
    id,
    email,
    first_name,
    last_name,
    avatar,
    birthday,
    address,
    phone,
    gender,
    is_active,
    created_at,
    updated_at,
    username,
    user_permisions
  }) =>
    set((state) => {
      return {
        id: isUndefined(id) ? state.id : id,
        email: isUndefined(email) ? state.email : email,
        first_name: isUndefined(first_name) ? state.first_name : first_name,
        last_name: isUndefined(last_name) ? state.last_name : last_name,
        avatar: isUndefined(avatar) ? state.avatar : avatar,
        birthday: isUndefined(birthday) ? state.birthday : birthday,
        address: isUndefined(address) ? state.address : address,
        phone: isUndefined(phone) ? state.phone : phone,
        gender: isUndefined(gender) ? state.gender : gender,
        is_active: isUndefined(is_active) ? state.is_active : is_active,
        created_at: isUndefined(created_at) ? state.created_at : created_at,
        updated_at: isUndefined(updated_at) ? state.updated_at : updated_at,
        username: isUndefined(username) ? state.username : username,
        user_permisions: isUndefined(user_permisions) ? state.user_permisions : user_permisions
      }
    }),
  resetStore: () => set({ ...INITIAL_STATES })
})

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(profileStore, {
      name: profileStoreName,
      storage: createStorage<States>()
    })
  )
)

export default useProfileStore

// Core
import { useCallback, useState } from 'react'

// App
// import { logger } from '@/utils/logger'
import useAuthStore from '../stores/auth'
import useProfileStore from '@stores/profile'
// import useProfileStore from '../stores/profile'
// import { useDeleteAuthLogout } from '@/api/endpoints/authentication'
// import useLanguageAwareNavigation from '@/hooks/use-language-aware-navigation'

// Hook
const useSignOutHandler = () => {
  // const navigate = useLanguageAwareNavigation()
  const [isPending, setIsPending] = useState(false)

  // Stores
  const resetProfileStore = useProfileStore((state) => state.resetStore)
  const resetAuthStore = useAuthStore((state) => state.resetStore)

  // Mutations
  // const signOutMutation = useDeleteAuthLogout()

  // Methods
  // Handle sign out
  const handleSignOut = useCallback(async () => {
    try {
      setIsPending(true)
      // await signOutMutation.mutateAsync()
    } catch (error) {
      console.error(error)
      // logger('Sign out', error)
    } finally {
      resetAuthStore()
      resetProfileStore()
      setIsPending(false)
    }
  }, [resetAuthStore, resetProfileStore])

  return {
    handleSignOut,
    isPending
  }
}

export default useSignOutHandler

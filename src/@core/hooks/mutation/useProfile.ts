import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { queryKey } from '@/@core/querykey'
import type { ProfileApiPayload, ProfilePayload } from '@/types/apps/profileTypes'

// Custom hook for profile mutation
const useProfile = () => {
  // Define the profile handler function
  const handleProfile = async (profileDetails: ProfilePayload): Promise<any> => {
    const { firstName, lastName, ...restDetails } = profileDetails

    const apiPayload: ProfileApiPayload = {
      ...restDetails,
      first_name: firstName,
      last_name: lastName
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ironcore/users-api/v0/user/39fc9d06-218f-409d-aaec-7c39dd6e274f/`,
      apiPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  }

  const handleSuccess = (userData: any) => {
    toast.success('Name Change Success!')
  }

  const handleError = (error: any) => {
    toast.error('Error while logging in please try again')
    console.error('login error', error)
  }

  // Use useMutation and pass handleLogin as the first argument
  const mutation = useMutation({
    mutationFn: handleProfile,
    onSuccess: handleSuccess,
    onError: handleError,
    mutationKey: [queryKey.profile] // Options object goes as second argument
  })

  return mutation
}

export default useProfile

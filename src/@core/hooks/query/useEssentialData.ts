import { useEffect } from 'react'

import { useQueries } from '@tanstack/react-query'

import { queryKey } from '@/@core/querykey'
import { useEssentialDataStore } from '@/@core/stores'
import type { EssentialData } from '@/types/apps/stateStoreTypes'
import axiosInstance from '@/@core/api/interceptor'

const getAllStores = async () => {
  const res = await axiosInstance.get(`/ironcore/store-api/v0/storefront/`)

  return res.data
}

const getPaymentDetails = async () => {
  const res = await axiosInstance.get(`/ironcore/users-api/v0/payment-detail/`)

  return res.data
}

const getCategoryMetaData = async () => {
  const res = await axiosInstance.get('/ironcore/product-api/v0/category/taxonomy')

  return res.data
}

const getOrganizationData = async () => {
  const res = await axiosInstance.get('/ironcore/organisation/')

  return res.data
}

const useEssentialData = () => {
  const { setEssentialData } = useEssentialDataStore()

  const { currentShopData, allShops } = useEssentialDataStore()

  const handleDataSuccess = (data: EssentialData) => {
    setEssentialData(data)
  }

  const combinedQueries = useQueries({
    queries: [
      {
        queryKey: [queryKey.getAllStore],
        queryFn: getAllStores,
        staleTime: Infinity
      },
      {
        queryKey: [queryKey.getPaymentDetails],
        queryFn: getPaymentDetails,
        staleTime: Infinity
      },
      {
        queryKey: [queryKey.getCategoryMetaData],
        queryFn: getCategoryMetaData,
        staleTime: Infinity
      },
      {
        queryKey: [queryKey.getOrganizationData],
        queryFn: getOrganizationData,
        staleTime: Infinity
      }
    ],
    combine: results => {
      const allCategories = results[2]?.data?.data
        ? Object.entries(results[2].data?.data as Record<string, { is_active?: boolean }>)
            .map(([key, value]: [string, { is_active?: boolean }]) => {
              if (value?.is_active) return key

              return ''
            })
            .filter(Boolean)
        : []

      // If the currentShopData is not set, set it to the first shop data
      const shopData = currentShopData ? currentShopData : allShops?.[0]

      return {
        data: {
          allShops: results[0]?.data,
          paymentDetails: results[1]?.data,
          categoryMetaData: results[2]?.data?.data,
          organizationData: results[3]?.data,
          allCategories: allCategories,
          currentShopData: shopData
        },
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError),
        error: {
          allShops: results[0]?.error,
          paymentDetails: results[1]?.error,
          categoryMetaData: results[2]?.error,
          organizationData: results[3]?.error
        }
      }
    }
  })

  // Set the essential data in the store
  useEffect(() => {
    if (combinedQueries.data && !combinedQueries.isLoading && !combinedQueries.isError) {
      handleDataSuccess(combinedQueries.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedQueries.isLoading, combinedQueries.isError, combinedQueries.data])

  return combinedQueries
}

export default useEssentialData

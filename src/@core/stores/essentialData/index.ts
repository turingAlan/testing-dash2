import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { categoryMetaData, StoreDetails, PaymentDetail, VariantData } from '@/types/apps/storeTypes'
import type { EssentialData, EssentialDataStore } from '@/types/apps/stateStoreTypes'

const initialEssentialData: EssentialData = {
  allShops: null,
  allCategories: [],
  paymentDetails: null,
  categoryMetaData: null,
  organizationData: null,
  variantData: null,
  variantDataId: null,
  currentShopData: null
}

const useEssentialDataStore = create<EssentialDataStore>()(
  devtools(
    persist(
      set => ({
        ...initialEssentialData,
        setEssentialData: (data: EssentialData) => set(data),
        resetEssentialData: () => set(initialEssentialData), // Method to reset to initial state
        setAllShops: (updateStoreList: StoreDetails[]) =>
          set(state => {
            let currentShopData = state.currentShopData || updateStoreList[0]

            currentShopData = updateStoreList.find(shop => shop.id === currentShopData?.id) || updateStoreList[0]

            return { allShops: updateStoreList, currentShopData }
          }),
        setVariantData: (data: VariantData | null) => set({ variantData: data }),
        setVariantDataId: (data: string | null) => set({ variantDataId: data }),
        setPaymentDetails: (data: PaymentDetail[]) => set({ paymentDetails: data }),
        setCurrentShopData: (shopData: StoreDetails) => set({ currentShopData: shopData }),
        setCategoryMetaData: (data: categoryMetaData) => {
          const categories = Object.entries(data)
            .map(([key, value]) => {
              if (value?.is_active) return key
              
return ''
            })
            .filter(value => value !== '') ?? ['']

          set({ categoryMetaData: data, allCategories: categories })
        },
        setOrgainzationData: (data: any) => set({ organizationData: data })
      }),
      {
        name: 'essential-data-store' // local storage key for persistence
      }
    ),
    {
      enabled: process.env.NODE_ENV === 'development' // Enable devtools in development
    }
  )
)

export default useEssentialDataStore

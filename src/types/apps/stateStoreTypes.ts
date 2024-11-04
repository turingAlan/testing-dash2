import type { categoryMetaData, PaymentDetail, StoreDetails, VariantData } from '@/types/apps/storeTypes'

type EssentialData = {
  allShops: StoreDetails[] | null
  paymentDetails: PaymentDetail[] | null
  allCategories: string[]
  categoryMetaData: categoryMetaData | null
  organizationData: any | null
  variantData: VariantData | null
  variantDataId: string | null
  currentShopData: any
}

type EssentialDataStore = {
  allShops: StoreDetails[] | null
  paymentDetails: PaymentDetail[] | null
  allCategories: string[]
  categoryMetaData: categoryMetaData | null
  organizationData: any | null
  variantData: VariantData | null
  variantDataId: string | null
  currentShopData: StoreDetails
  setAllShops: (data: StoreDetails[]) => void
  setVariantData: (data: VariantData | null) => void
  setVariantDataId: (data: string | null) => void
  setPaymentDetails: (data: PaymentDetail[]) => void
  setCategoryMetaData: (data: categoryMetaData) => void
  setEssentialData: (data: EssentialData) => void
  setOrgainzationData: (data: any) => void
  setCurrentShopData: (data: any) => void
  resetEssentialData: () => void
}

export type { EssentialDataStore, EssentialData }

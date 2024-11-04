import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/@core/api/interceptor'
import { useEssentialDataStore } from '@/@core/stores'
import { queryKey } from '@/@core/querykey'

const getProductByStoreId = async (storeId: string, productId: string) => {
  const res = await axiosInstance.get(`/ironcore/product-api/v0/products/${productId}/`, {
    params: {
      store_id: storeId
    }
  })

  return res.data
}

const useProduct = ({ productId }: { productId: string | number | undefined }) => {
  const { allShops } = useEssentialDataStore(state => state)

  const storeId = allShops?.[1]?.id // Assuming you want the first store's ID

  return useQuery({
    queryKey: [queryKey.getInventoryItem, storeId, productId],
    queryFn: () => getProductByStoreId(storeId as string, productId as string),
    enabled: !!productId
  })
}

export default useProduct

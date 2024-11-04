import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/@core/api/interceptor'
import { useEssentialDataStore } from '@/@core/stores'
import { queryKey } from '@/@core/querykey'

const getProductsByStoreId = async (storeId: string, sortOrder: string, stockStatus: string, productStatus: string, search: string | undefined) => {
    const res = await axiosInstance.get(`/ironcore/product-api/v0/products/`, {
        params: {
            store_id: storeId,
            ordering: sortOrder,
            in_stock: stockStatus === 'in_stock' ? true : stockStatus === 'out_of_stock' ? false : undefined,
            status: productStatus,
            search: search,
        }
    })


    return res.data
}

const useProductsByStoreId = ({ sortOrder, stockStatus, productStatus, search }: {
    sortOrder: string
    stockStatus: string
    productStatus: string
    search?: string
}) => {
    const { allShops } = useEssentialDataStore(state => state)

    const storeId = allShops?.[1]?.id // Assuming you want the first store's ID

    return useQuery({
        queryKey: [queryKey.getInventoryItems, storeId, sortOrder, stockStatus, productStatus],
        queryFn: () => getProductsByStoreId(storeId as string, sortOrder, stockStatus, productStatus, search),
        enabled: !!storeId // Only run the query if storeId is available
    })
}

export default useProductsByStoreId

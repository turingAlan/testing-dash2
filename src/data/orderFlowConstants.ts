export const orderStatus = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PACKED: 'Packed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  RETURN: 'Return',
  RETURN_DELIVERED: 'Return_Delivered',
  OUT_FOR_DELIVERY: 'Out-for-delivery',
  ORDER: 'Order',
  ORDER_DELIVERED: 'Order-delivered'
}

export const readOnlyOrderStatus = ['Packed', 'Processing', 'Cancelled']

export const orderPaymentStatusMap = {
  'ON-FULFILLMENT': 'Cash on Delivery',
  PREPAID: 'Prepaid'
}

export const cancelReasons = [
  {
    label: 'Logistics partner has not arrived yet',
    id: '007'
  },
  {
    label: 'You, as the seller, wish to cancel the order due to inventory issues',
    id: '002'
  }
]

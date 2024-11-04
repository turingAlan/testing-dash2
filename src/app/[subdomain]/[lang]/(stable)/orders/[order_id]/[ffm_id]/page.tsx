'use client'

import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, Grid, InputAdornment } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomFFMDetailHeader from '@/views/apps/invoice/preview/CustomFFMDetailHeader'
import useGetOrderDetails from '@/@core/hooks/query/useOrderDetails'
import type { FulfillmentDetails, OrderDetailResponse } from '@/types/apps/orderTypes'
import { formatDateIso } from '@/utils/string'

export default function FFM_id() {
  const params = useParams()

  const { ffm_id: fulfillmentId, order_id: orderId } = params

  const [orderData, setOrderData] = useState<OrderDetailResponse | null>(null)
  const [fulfillmentData, setFulfillmentData] = useState<FulfillmentDetails | null>(null)

  const { getOrderDetails } = useGetOrderDetails(Array.isArray(orderId) ? orderId[0] : orderId)

  const { data: orderDataResponse } = getOrderDetails

  useEffect(() => {
    if (orderDataResponse) {
      setOrderData(orderDataResponse)

      const fulfillment = orderDataResponse.fulfillment.find(fulfillment => {
        return fulfillment.id === fulfillmentId
      })

      if (fulfillment) {
        setFulfillmentData(fulfillment)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDataResponse])

  if (!orderData || !fulfillmentData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <CustomFFMDetailHeader orderDetails={orderData} fulfillmentData={fulfillmentData} />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={`Logistics Provider`} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='Logistics Provider'
                    value={fulfillmentData?.delivery_partner}
                    placeholder='135 ABlock'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='Pick Up Agent Details'
                    value={
                      fulfillmentData?.pickup_agent_details
                        ? fulfillmentData?.pickup_agent_details?.name +
                          ', ' +
                          fulfillmentData?.pickup_agent_details?.phone
                        : ''
                    }
                    placeholder='135 ABlock'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='Expected Pickup Time'
                    value={
                      fulfillmentData?.expected_pickup_time ? formatDateIso(fulfillmentData?.expected_pickup_time) : ''
                    }
                    placeholder=''
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField disabled fullWidth label='Any Other Details' value={``} placeholder='' />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='OTP'
                    value={fulfillmentData?.pickup_instructions?.short_desc || ''}
                    placeholder='1234'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={`Weight Difference (if any)`} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='Additional Weight Difference'
                    value={fulfillmentData?.weight_difference ?? '0'}
                    placeholder='0 Grm'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    disabled
                    fullWidth
                    label='Extra Cost of Logistics'
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                    }}
                    value={fulfillmentData?.cost_weight_difference ?? '0'}
                    placeholder='0'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

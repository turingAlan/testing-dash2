'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// Type Imports
import { string } from 'valibot'

import type { ThemeColor } from '@core/types'

// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

type BillingCardData = {
  badgeColor?: ThemeColor
  accountHolderName: string
  accountNumber: string
  confirmAccountNumber: string
  bankName: string
  branch: string
  IFSCCode: string
  UPIId: string

  // cardNumber?: string
  // name?: string
  // expiryDate?: string
  // cardCvv?: string
  // imgSrc?: string
  // imgAlt?: string
  // cardStatus?: string
}

type BillingCardProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: BillingCardData
}

const initialCardData: BillingCardProps['data'] = {
  accountHolderName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  bankName: '',
  branch: '',
  IFSCCode: '',
  UPIId: '',
  badgeColor: 'primary'
}

const AddPaymentCard = ({ open, setOpen, data }: BillingCardProps) => {
  // States
  const [cardData, setCardData] = useState(initialCardData)

  const handleClose = () => {
    setOpen(false)
    setCardData(initialCardData)
  }

  useEffect(() => {
    setCardData(data ?? initialCardData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Edit Payment Details' : 'Add New Payment Method'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit your saved Ppayment details' : 'Add payment details for future billings'}
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 p-6 sm:pli-16'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='accHolderName'
                autoComplete='off'
                label='Account Holder Name'
                placeholder='First Name Last Name'
                value={cardData.accountHolderName}
                onChange={e => setCardData({ ...cardData, accountHolderName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='number'
                autoComplete='off'
                label='Account Number'
                placeholder='0000 0000 0000 0000'
                value={cardData.accountNumber}
                onChange={e => setCardData({ ...cardData, accountNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='number'
                autoComplete='off'
                label='Confirm Account Number'
                placeholder='0000 0000 0000 0000'
                value={cardData.confirmAccountNumber}
                onChange={e => setCardData({ ...cardData, confirmAccountNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='bankName'
                label='Bank Name'
                autoComplete='off'
                placeholder='SBI'
                value={cardData.bankName}
                onChange={e => setCardData({ ...cardData, bankName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                name='branch'
                autoComplete='off'
                label='branch'
                placeholder='Canought Place'
                value={cardData.branch}
                onChange={e => setCardData({ ...cardData, branch: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CustomTextField
                fullWidth
                name='ifscCode'
                label='IFSC Code'
                autoComplete='off'
                placeholder='SBI0000000'
                value={cardData.IFSCCode}
                onChange={e => setCardData({ ...cardData, IFSCCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CustomTextField
                fullWidth
                name='upiId'
                label='UPI ID'
                autoComplete='off'
                placeholder='name@sbiyono'
                value={cardData.UPIId}
                onChange={e => setCardData({ ...cardData, UPIId: e.target.value })}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel control={<Switch defaultChecked />} label='Save Card for future billing?' />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' onClick={handleClose}>
            {data ? 'Update' : 'Submit'}
          </Button>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddPaymentCard

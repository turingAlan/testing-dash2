// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { ButtonProps } from '@mui/material/Button'

// Component Imports
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import AddPaymentCard from '@/components/dialogs/add-payment-card'

const CustomDialogAddPayment = () => {
  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Show'
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col items-center text-center gap-4'>
          <i className='tabler-credit-card text-[34px] text-textPrimary' />
          <Typography variant='h5'>Payment Mentod</Typography>
          <Typography color='text.primary'>This payment method will be used in all stores created by user!</Typography>
          <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={AddPaymentCard} />
        </CardContent>
      </Card>
    </>
  )
}

export default CustomDialogAddPayment

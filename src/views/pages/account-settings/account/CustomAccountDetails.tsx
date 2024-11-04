'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import type { SelectChangeEvent } from '@mui/material/Select'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import useProfile from '@/@core/hooks/mutation/useProfile'
import CustomTextFieldDisabled from '@/@core/components/mui/CustomTextFieldDisabled'

type Data = {
  firstName: string
  lastName: string
  email: string
  organization: string
  phoneNumber: number | string
  aadhar: string
  pan: string
  address: string
  state: string
  zipCode: string
  country: string
  language: string
  timezone: string
  currency: string
}

// Vars
const initialData: Data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  organization: 'Pixinvent',
  phoneNumber: '+1 (917) 543-9876',
  aadhar: '3232 2323 2323',
  pan: 'AXJP2363ST',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zipCode: '634880',
  country: 'usa',
  language: 'english',
  timezone: 'gmt-12',
  currency: 'usd'
}

const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']

const CustomAccountDetails = () => {
  // States
  const [formData, setFormData] = useState<Data>(initialData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [language, setLanguage] = useState<string[]>(['English'])

  const { mutate: profileMutate } = useProfile()

  const handleDelete = (value: string) => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const handleSave = () => {
    profileMutate({ firstName: formData.firstName, lastName: formData.lastName })
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name'
                value={formData.firstName}
                placeholder='John'
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name'
                value={formData.lastName}
                placeholder='Doe'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextFieldDisabled
                fullWidth
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextFieldDisabled
                fullWidth
                label='Phone Number'
                disabled
                value={formData.phoneNumber}
                placeholder='+1 (234) 567-8901'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className='flex flex-wrap justify-between'>
              <div className='flex gap-4'>
                <Button variant='contained' type='submit' onClick={() => handleSave()}>
                  Save Changes
                </Button>
                <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                  Reset
                </Button>
              </div>
              <Button
                color='error'
                variant='contained'
                startIcon={<i className='tabler-logout' />}
                onClick={() => {}}
                className='is-full sm:is-auto'
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomAccountDetails

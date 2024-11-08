'use client'

import { useRouter } from 'next/navigation'

// React Imports

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Component Imports
import { Grid, Typography } from '@mui/material'

const data = {
  title: ['Add More Store', 'Know More About ONDC', 'Increase Your Sales', 'Know More About SellerSetu'],
  icon: [
    'tabler-building-store',
    'tabler-inner-shadow-top-right-filled',
    'tabler-brand-storytel',
    'tabler-playstation-triangle'
  ],
  route: ['/addstore', 'https://ondc.org/', '/nextstep', 'https://sellersetu.in/']
}

const CustomNextSteps = () => {
  const router = useRouter()

  const handleRedirect = (route: string) => {
    if (route.startsWith('/')) {
      router.push(route)
    } else {
      window.open(route, '_blank')
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.title.map((title, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              key={index}
              onClick={() => handleRedirect(data.route[index])}
              sx={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
            >
              <CardContent className='flex flex-col items-center text-center gap-4'>
                <Typography variant='h5'>{title}</Typography>
                <i className={`${data.icon[index]} text-[34px] text-textPrimary`} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CustomNextSteps

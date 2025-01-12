import React from 'react'
import ClientOnboarding from '../components/ClientOnboarding'
import { Box, Typography } from '@mui/material'
import axios from 'axios'

export const getCase2Config = (clientId) => ({
    stages: [
      {
        type: 'documentCapture',
        documentType: {
          national_identity_card: true,
          residence_permit: {
            country: 'GB',
          },
        },
      },
      {
        name: 'poaCapture',
        options: {
          documentTypes: {
            bank_statement: true,
            utility_bill: false,
          },
        },
      },
    ],
    onComplete: async (data) => {
        console.log('onComplete capture ', data)
        const response = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/staggered-screening`,
            {
              documentId: data.documentCapture.documentId,
              livePhotoId: data.faceCapture.livePhotoId,
              clientId,
            }
          )
          return response.data
      },
  })
  
const Case2 = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography fontWeight="bold" fontSize={20}>
        Staggered Screening with Monitoring
      </Typography>
      <Box>
        Flow:
        <Typography>
          1 - Start with a Standard Screening Check to quickly identify major
          compliance issues.
        </Typography>
        <Typography>
          2- If the Standard Screening Check is Clear, upgrade to an Extensive
          Screening Check.
        </Typography>
        <Typography>
          3- Enable Continuous Monitoring on the client if both checks are
          clear, ensuring any future compliance risks are flagged.
        </Typography>
        <Typography fontSize={12} marginTop={2}>
          Checks flow is trigger in the BE once the onboarding is complete{' '}
        </Typography>
      </Box>
      <ClientOnboarding getConfigs={getCase2Config} />
    </Box>
  )
}

export default Case2

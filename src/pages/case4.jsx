import React from 'react'
import ClientOnboarding from '../components/ClientOnboarding'
import { Box, Typography } from '@mui/material'
import axios from 'axios'

export const getCase4Config = (clientId) => ({
    clientId,
    stages: [
      {
        name: 'faceCapture',
        options: {
          mode: 'video',
        },
      },
      {
        type: 'document_capture',
        documentType: 'government_id',
      },
    ],
    onComplete: async (data) => {
        console.log('onComplete capture ', data)
        const response = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/api/age-restriction`,
            {
              documentId: data.documentCapture.documentId,
              livePhotoId: data.faceCapture.livePhotoId,
              clientId,
            }
          )
          return response.data
      },
  })
  
const Case1 = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography fontWeight="bold" fontSize={20}>
        Age-Restricted Screening
      </Typography>
      <Box>
        Flow:
        <Typography>
          1 - Perform an Age Estimation Check using a live photo.
        </Typography>
        <Typography>
          2- If the client’s age is above the required threshold (e.g., 18 years
          old), allow the onboarding process to proceed.
        </Typography>
        <Typography>
          3- If the Age Estimation Check fails, trigger a manual document check
          for a government-issued ID to confirm the client’s age.
        </Typography>
        <Typography>Why:</Typography>
        <Typography>
          Useful for businesses with age restrictions, like alcohol sales or
          gambling.
        </Typography>
        <Typography>
          Combines biometric and document-based validation for accuracy.
        </Typography>
        <Typography fontSize={12} marginTop={2}>
          Checks flow is trigger in the BE once the onboarding is complete{' '}
        </Typography>
      </Box>
      <ClientOnboarding getConfigs={getCase4Config} />
    </Box>
  )
}

export default Case1

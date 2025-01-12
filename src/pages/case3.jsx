import React from 'react'
import ClientOnboarding from '../components/ClientOnboarding'
import { Box, Typography } from '@mui/material'
import axios from 'axios'

export const getCase3Config = (clientId) => ({
  stages: [
    {
      name: 'poaCapture',
      options: {
        documentTypes: {
          bank_statement: true,
          utility_bill: true,
        },
      },
    },
  ],
  onComplete: async (data) => {
    console.log('onComplete capture ', data)
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/document-validation`,
      {
        documentId: data.documentCapture.documentId,
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
        Multi-Stage Document Validation
      </Typography>
      <Box>
        Flow:
        <Typography>
          1 - Perform a Document Check on a utility bill to verify the client’s
          address.
        </Typography>
        <Typography>
          2- If the document is Clear, perform a Proof of Address Check to
          ensure compliance with KYC regulations.
        </Typography>
        <Typography>
          3- If the Proof of Address Check passes, mark the client’s address as
          verified in the portal.
        </Typography>
        <Typography>Why:</Typography>
        <Typography>
          Useful in scenarios where address verification is critical, such as
          property rentals or insurance.
        </Typography>
        <Typography fontSize={12} marginTop={2}>
          Checks flow is trigger in the BE once the onboarding is complete{' '}
        </Typography>
      </Box>
      <ClientOnboarding getConfigs={getCase3Config} />
    </Box>
  )
}

export default Case1

import React from 'react'
import ClientOnboarding from '../components/ClientOnboarding'
import { getCase1Config } from '../integration-configs/config-case-1'
import { Box, Typography } from '@mui/material'

const Case1 = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography fontWeight="bold" fontSize={20}>
        Case 1: Identity Check -> Biometric Verification
      </Typography>
      <Box>
        Flow:
        <Typography>
          1 - Perform an Identity Check using a government-issued ID.
        </Typography>
        <Typography>
          2- If the identity is Clear, trigger a Face Authentication Check to match
          the live photo with the ID.
        </Typography>
        <Typography>
          3- If the Face Authentication Check passes, proceed to approve the client
          for onboarding.
        </Typography>
        <Typography>Why:</Typography>
        <Typography>
          Verifies that the client is who they claim to be, using both document
          and biometric validation.
        </Typography>
        <Typography fontSize={12} marginTop={2}>
          Checks flow is trigger in the BE once the onboarding is complete{' '}
        </Typography>
      </Box>
      <ClientOnboarding getConfigs={getCase1Config} />
    </Box>
  )
}

export default Case1

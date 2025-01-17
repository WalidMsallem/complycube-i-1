import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material'
import axios from 'axios'
import VerificationButton from '../components/VerificationButton'
// ^ A custom button/component that opens the ComplyCube modal and triggers onVerificationComplete when finished

export const getConfig = (clientId, onFinishCaptureInformation) => ({
  // stages: [
  // 'userConsentCapture',
  // {
  //   name: 'documentCapture',
  //   options: {
  //     documentTypes: {
  //       passport: true,
  //       driving_license: false,
  //       national_identity_card: true,
  //       residence_permit: {
  //         country: 'GB',
  //       },
  //     },
  //   },
  // },
  // {
  //   type: 'faceCapture',
  // },
  // ],
  onComplete: async (data) => {
    console.log('onComplete capture ', data)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/identity-check`,
        {
          documentId: data.documentCapture.documentId,
          livePhotoId: data.faceCapture.livePhotoId,
          clientId,
        }
      )
      console.log(response.data)
      onFinishCaptureInformation()
    }catch(e){
      console.error(e)
    }
  
  },
})

// Simulate checking status from your backend after verification completes
// In a real scenario, you'd call something like:
// const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/check-status?clientId=${clientId}`);
// return res.data; // e.g. { status: 'clear' } or { status: 'pending' }
// or BE will set a a flag on the user Data like onboarded / verify = true

function checkVerificationStatus(clientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock: we pretend it's always "clear"
      resolve({ status: 'clear' })
    }, 2000)
  })
}

const GovernmentPortalAccess = () => {
  // The flow steps:
  // 'welcome' -> 'enterData' -> 'verificationPrompt' -> 'processing' -> 'result'
  const [step, setStep] = useState('welcome')

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tokenResponse, setTokenResponse] = useState(null)
  const [verificationOutcome, setVerificationOutcome] = useState(null)

  // 1) Welcome Screen -> Move to form
  const handleBegin = () => {
    setStep('enterData')
  }

  // 2) Submitting user data (the user doesn’t see “token” jargon)
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // The user just sees “Verifying” or “Submitting”, but under the hood we’re calling /api/client-token
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/client-token`,
        {
          type: 'person',
          ...formData,
        }
      )
      setTokenResponse(res.data) // contains { token, clientId }
      setStep('verificationPrompt')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // 3) When the verification modal is closed or completes
  const handleVerificationComplete = async () => {
    // Show a short “Processing” step
    setStep('processing')
    try {
      const status = await checkVerificationStatus(tokenResponse.clientId)
      if (status.status === 'clear') {
        setVerificationOutcome('success')
      } else {
        setVerificationOutcome('fail')
      }
    } catch (err) {
      setVerificationOutcome('fail')
    }
    setStep('result')
  }

  // Final screen: success or fail
  const renderResult = () => {
    if (verificationOutcome === 'success') {
      return (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main" gutterBottom>
            You’re Verified!
          </Typography>
          <Typography>
            Welcome to the Government Portal. You can now securely view and
            manage your personal information, including taxes and other
            benefits.
          </Typography>
        </Box>
      )
    }
    return (
      <Box textAlign="center">
        <Typography variant="h5" color="error" gutterBottom>
          Verification Failed
        </Typography>
        <Typography>
          We couldn’t confirm your identity. Please try again or contact
          customer support.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      {step === 'welcome' && (
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Government Portal Access
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Securely verify your identity to access your private data and
              manage official documents.
            </Typography>
            <Button variant="contained" onClick={handleBegin}>
              Begin
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'enterData' && (
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Typography>
              Please fill out your details so we can verify your identity.
            </Typography>
            <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Continue'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {step === 'verificationPrompt' && tokenResponse && (
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Verification
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Please complete the ID and biometric checks. Once the pop-up
              closes, we will confirm your verification status.
            </Typography>
            <VerificationButton
              token={tokenResponse.token}
              clientId={tokenResponse.clientId}
              configs={getConfig(tokenResponse.clientId, () =>
                handleVerificationComplete()
              )}
              label="Start Verification"
            />
          </CardContent>
        </Card>
      )}

      {step === 'processing' && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Verifying your details...</Typography>
        </Box>
      )}

      {step === 'result' && (
        <Card>
          <CardContent>
            {renderResult()}

            {/* Explanation of the flow for the user, after they've seen the outcome */}
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
      </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default GovernmentPortalAccess

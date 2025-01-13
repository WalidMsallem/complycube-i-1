// src/pages/TraderOnboarding.jsx
import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material'
import VerificationButton from '../components/VerificationButton'

/**
 * getConfig - For a Trader Onboarding scenario
 * @param {string} clientId
 * @param {function} onFinishCaptureInformation - Callback once checks are complete
 * @returns {object} ComplyCube config object
 */
export const getConfig = (clientId, onFinishCaptureInformation) => ({
  branding: {
    // Customize the modal colors, fonts, or logo
    primaryColor: '#1565c0',
    buttonTextColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    logo: {
      lightLogoUrl:
        'https://static.vecteezy.com/system/resources/thumbnails/000/609/739/small/3-19.jpg',
    },
  },

  stages: [
    {
      type: 'documentCapture',
      options: {
        documentTypes: {
          passport: true,
          driving_license: true,
          national_identity_card: true,
        },
      },
    },
    {
      type: 'faceCapture',
      options: {
        mode: 'photo',
      },
    },
    {
      type: 'faceCapture',
      options: {
        mode: 'video',
      },

    },
  ],
  onComplete: async (data) => {
    // data contains e.g. data.documentCapture.documentId, data.faceCapture.livePhotoId
    console.log('SDK capture complete:', data)

    try {
      // Now call your "staggered-screening" endpoint
      // e.g., it might first do a standard_screening_check, then extensive, then enable monitoring.
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/staggered-screening`,
        {
          clientId,
          documentId: data.documentCapture?.documentId,
          livePhotoId: data.faceCapture?.livePhotoId,
        }
      )
      console.log('Staggered Screening Result:', response.data)

      // Finally, tell the parent component we’re done
      onFinishCaptureInformation()
    } catch (error) {
      console.error('Error in onComplete:', error)
      // Optionally handle UI feedback if checks fail
      onFinishCaptureInformation()
    }
  },
})

// Mock check to see if results are cleared (simulating a final pass/fail status)
function checkVerificationStatus(clientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock: always returns "clear"
      resolve({ status: 'clear' })
    }, 2000)
  })
}

const TraderOnboarding = () => {
  // Steps: 'welcome' -> 'enterData' -> 'verificationPrompt' -> 'processing' -> 'result'
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

  // 1) Welcome screen -> form
  const handleBegin = () => {
    setStep('enterData')
  }

  // 2) Submit user details to get token
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/client-token`,
        {
          type: 'person',
          ...formData,
        }
      )
      setTokenResponse(res.data) // { token, clientId }
      setStep('verificationPrompt')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // 3) Once the Web SDK finishes capturing data, it calls onComplete from config,
  //    which calls onFinishCaptureInformation -> we come here
  const handleVerificationComplete = async () => {
    // We can do a final check or show a spinner
    setStep('processing')

    try {
      const status = await checkVerificationStatus(tokenResponse.clientId)
      if (status.status === 'clear') {
        setVerificationOutcome('success')
      } else {
        setVerificationOutcome('fail')
      }
    } catch (error) {
      setVerificationOutcome('fail')
    }

    setStep('result')
  }

  // 4) Final result screen
  const renderResult = () => {
    if (verificationOutcome === 'success') {
      return (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main" gutterBottom>
            You’re Verified!
          </Typography>
          <Typography>
            Welcome to CC Trading! You can now buy and sell stocks, bonds, and
            crypto securely.
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
          We couldn’t confirm your identity. Please try again or contact support
          for help.
        </Typography>
      </Box>
    )
  }

  // Render the flow
  return (
    <Box sx={{ width: 600, mx: 'auto', mt: 5 }}>
      {step === 'welcome' && (
        <Card sx={{ backgroundColor: '#f0f3ff' /* Light bluish background */ }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/000/609/739/small/3-19.jpg"
                alt="CC Trading Logo"
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              CC Trading Onboarding
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Securely verify your identity to start trading with us.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBegin}
              sx={{
                backgroundColor: '#1e88e5',
                ':hover': { backgroundColor: '#1565c0' },
              }}
            >
              Begin
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'enterData' && (
        // <Card sx={{ backgroundColor: '#fff7e6' }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Please provide your details, and we'll verify you for a safe
              trading environment.
            </Typography>
            <Box component="form" onSubmit={handleFormSubmit}>
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
                disabled={loading}
                sx={{
                  mt: 3,
                  width: '100%',
                  // backgroundColor: '#ffa726',
                  // ':hover': { backgroundColor: '#fb8c00' },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Continue'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {step === 'verificationPrompt' && tokenResponse && (
        <Card sx={{ backgroundColor: '#eef7ee' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Identity Verification
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Please complete the required checks. We’ll confirm your status
              once the pop-up closes.
            </Typography>
            <VerificationButton
              token={tokenResponse.token}
              clientId={tokenResponse.clientId}
              // IMPORTANT: pass the dynamic config with your onComplete logic
              config={getConfig(tokenResponse.clientId, () =>
                handleVerificationComplete()
              )}
              label="Start verification"
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
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
              <Typography fontWeight="bold" fontSize={20}>
                Staggered Screening with Monitoring
              </Typography>
              <Box variant="h6" fontWeight="bold" gutterBottom>
                Flow:
                <Typography>
                  1 - Start with a Standard Screening Check to quickly identify
                  major compliance issues.
                </Typography>
                <Typography>
                  2- If the Standard Screening Check is Clear, upgrade to an
                  Extensive Screening Check.
                </Typography>
                <Typography>
                  3- Enable Continuous Monitoring on the client if both checks
                  are clear, ensuring any future compliance risks are flagged.
                </Typography>
                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Why:</Typography>
                <Typography>
                  This ensures we comply with financial regulations and provide
                  a safe trading platform.
                </Typography>
                <Typography fontSize={12} marginTop={2}>
                  Checks flow is trigger in the BE once the onboarding is
                  complete{' '}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default TraderOnboarding

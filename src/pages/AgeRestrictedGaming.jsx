// src/pages/AgeRestrictedGaming.jsx
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

export const getConfig = (clientId, onFinishCaptureInformation) => ({
  branding: {
    primaryColor: '#9C27B0', // Neon purple for buttons/accents
    buttonTextColor: '#ffffff',
    textColor: '#ffffff',
    // You can also set backgroundColor, fontFamily, logoUrl, etc.
    logo: {
      lightLogoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVzhq1gqrjoL3QCQhX3Qrk4E-ScJxy3kyOQ&s',
    },
  },
  stages: [
    // For age verification, you might capture a face photo or an ID document
    {
      type: 'faceCapture',
    },
    {
      type: 'documentCapture',
      options: {
        documentTypes: {
          driving_license: true,
          national_identity_card: true,
          passport: true,
        },
      },
    },
  ],
  onComplete: async (data) => {
    console.log('18+ Gaming capture complete:', data)

    try {
      // Example call to your age-verification endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/age-verification`,
        {
          clientId,
          livePhotoId: data.faceCapture?.livePhotoId,
          documentId: data.documentCapture?.documentId,
        }
      )
      console.log('Age verification result:', response.data)

      // Once done, let the parent component know
      onFinishCaptureInformation()
    } catch (error) {
      console.error('Error verifying age:', error)
      onFinishCaptureInformation()
    }
  },
})

// Example function to mock a final status check
function checkVerificationStatus(clientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // We'll pretend it's always clear
      resolve({ status: 'clear' })
    }, 2000)
  })
}

const AgeRestrictedGaming = () => {
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

  // 1) Welcome
  const handleBegin = () => {
    setStep('enterData')
  }

  // 2) Enter Data -> get token
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

  // Called when the SDK completes
  const handleVerificationComplete = async () => {
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

  const renderResult = () => {
    if (verificationOutcome === 'success') {
      return (
        <Box textAlign="center">
          <Typography
            variant="h5"
            color="#00e676"
            gutterBottom /* Neon Green */
          >
            Access Granted!
          </Typography>
          <Typography>
            Welcome to NeoGaming! Enjoy our 18+ content responsibly.
          </Typography>
        </Box>
      )
    }
    return (
      <Box textAlign="center">
        <Typography variant="h5" color="#ff1744" gutterBottom /* Neon Red */>
          Verification Failed
        </Typography>
        <Typography>
          We could not confirm you’re over 18. Please try again or contact
          support.
        </Typography>
      </Box>
    )
  }

  // **Dark theme styling** for the entire container
  const containerStyle = {
    backgroundColor: '#121212', // Dark background
    minHeight: '100vh',
    py: 5,
    color: '#ffffff', // White text
    width:"100%"
  }

  // **Card** styling: a lighter dark shade
  const cardStyle = {
    backgroundColor: '#1D1F24',
    color: '#E0E0E0',
    margin: 'auto',
    maxWidth: 600,
    mb: 4,
  }

  // **Button** styling: neon purple accent
  const neonButtonStyle = {
    backgroundColor: '#9C27B0',
    color: '#ffffff',
    ':hover': { backgroundColor: '#7B1FA2' },
  }

  return (
    <Box sx={containerStyle}>
      {/* STEP: WELCOME */}
      {step === 'welcome' && (
        <Card sx={cardStyle}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            {/* Fake "NeoGaming" or "NightArcade" Logo */}
            <Box sx={{ mb: 2 }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVzhq1gqrjoL3QCQhX3Qrk4E-ScJxy3kyOQ&s"
                alt="NeoGaming Logo"
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to NeoGaming
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Ready to dive into thrilling 18+ games? Let’s quickly verify your
              age to keep it safe and legal.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBegin}
              sx={neonButtonStyle}
            >
              Verify Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* STEP: ENTER DATA */}
      {step === 'enterData' && (
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Player Details
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Enter your info to prove you’re 18 or older. We keep it
              confidential!
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
                sx={{
                  input: { color: '#ffffff' },
                  label: { color: '#9e9e9e' },
                }}
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
                sx={{
                  input: { color: '#ffffff' },
                  label: { color: '#9e9e9e' },
                }}
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
                sx={{
                  input: { color: '#ffffff' },
                  label: { color: '#9e9e9e' },
                }}
              />

              {error && (
                <Typography color="#ff1744" sx={{ mt: 2 }}>
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
                  backgroundColor: '#9C27B0',
                  ':hover': { backgroundColor: '#7B1FA2' },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Continue'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* STEP: VERIFICATION PROMPT */}
      {step === 'verificationPrompt' && tokenResponse && (
        <Card sx={cardStyle}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Age Verification
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Just one quick check and you’re in! Close the pop-up when done,
              and we’ll confirm your status.
            </Typography>
            <VerificationButton
              token={tokenResponse.token}
              clientId={tokenResponse.clientId}
              config={getConfig(
                tokenResponse.clientId,
                handleVerificationComplete
              )}
            />
          </CardContent>
        </Card>
      )}

      {/* STEP: PROCESSING */}
      {step === 'processing' && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <CircularProgress sx={{ color: '#9C27B0' }} />
          <Typography sx={{ mt: 2 }}>Verifying your age...</Typography>
        </Box>
      )}

      {/* STEP: RESULT */}
      {step === 'result' && (
        <Card sx={cardStyle}>
          <CardContent>
            {renderResult()}
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
                  2- If the client’s age is above the required threshold (e.g.,
                  18 years old), allow the onboarding process to proceed.
                </Typography>
                <Typography>
                  3- If the Age Estimation Check fails, trigger a manual
                  document check for a government-issued ID to confirm the
                  client’s age.
                </Typography>
                <Typography>Why:</Typography>
                <Typography>
                  Useful for businesses with age restrictions, like alcohol
                  sales or gambling.
                </Typography>
                <Typography>
                  Combines biometric and document-based validation for accuracy.
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

export default AgeRestrictedGaming

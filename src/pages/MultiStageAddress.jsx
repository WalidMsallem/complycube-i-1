// src/pages/MultiStageAddress.jsx
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
    primaryColor: '#FF9800',
    buttonTextColor: '#FFFFFF',
    textColor: '#333333',
    fontFamily: 'Segoe UI, sans-serif',
    logo: {
      lightLogoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiKY8SmRi-q0Kj3WfVcGRq0C61qvEDEnOBA&s',
        darkLogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiKY8SmRi-q0Kj3WfVcGRq0C61qvEDEnOBA&s',
    },
  },
  stages: [
    "userConsentCapture",
    {
      type: 'documentCapture',
    },
    {
      type: 'poaCapture',
      options: {
        documentTypes: {
          utility_bill: true,
          bank_statement: true,
        },
      },
    },
  ],
  onComplete: async (data) => {
    console.log('Multi-stage address capture complete:', data)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/document-validation`,
        {
          clientId,
          documentId: data.documentCapture?.documentId,
          // If the second doc is stored differently in 'data', adapt accordingly
        }
      )
      console.log('Address check response:', response.data)
      onFinishCaptureInformation()
    } catch (error) {
      console.error('Error in multi-stage address flow:', error)
      onFinishCaptureInformation()
    }
  },
})

// Mock function simulating final status check
function checkVerificationStatus(clientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'clear' }) // Pretend success
    }, 2000)
  })
}

const MultiStageAddress = () => {
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

  // Flow: 'welcome' -> 'enterData' -> 'verificationPrompt' -> 'processing' -> 'result'

  // 1) Welcome
  const handleBegin = () => {
    setStep('enterData')
  }

  // 2) Submit user data -> get token
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

  // Called after the Web SDK completes capturing multiple docs
  const handleVerificationComplete = async () => {
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

  const renderResult = () => {
    if (verificationOutcome === 'success') {
      return (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main" gutterBottom>
            Address Verified!
          </Typography>
          <Typography>
            You’re all set to proceed with your rental application on{' '}
            <b>Rently</b>.
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
          We couldn’t confirm your address. Please try again or contact support.
        </Typography>
      </Box>
    )
  }

  // Some simple styling for a warm, renting-oriented theme
  const containerStyle = {
    // backgroundColor: '#faf8f4',
    minHeight: '100vh',
    py: 5,
  }
  const cardStyle = {
    backgroundColor: '#ffffff',
    margin: 'auto',
    width: "100%",
    mb: 4,
  }
  const headerColor = '#4CAF50' // e.g. a bright green accent
  const buttonColor = '#FF9800' // warm orange for main CTA

  return (
    <Box sx={containerStyle}>
      {/* STEP: WELCOME */}
      {step === 'welcome' && (
        <Card sx={cardStyle}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiKY8SmRi-q0Kj3WfVcGRq0C61qvEDEnOBA&s"
                alt="Rently Logo"
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color={headerColor}
            >
              Welcome to Rently
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Let's verify your address documents so you can secure your new
              home.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBegin}
              sx={{
                backgroundColor: buttonColor,
                ':hover': { backgroundColor: '#F57C00' },
              }}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      )}

      {/* STEP: ENTER DATA */}
      {step === 'enterData' && (
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Applicant Information
            </Typography>
            <Typography sx={{ mb: 2 }}>
              We’ll need a few details to generate your verification link.
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
                  backgroundColor: buttonColor,
                  ':hover': { backgroundColor: '#F57C00' },
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
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color={headerColor}
            >
              Address Verification
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Please upload your utility bill and any additional proof of
              address. We’ll confirm once the pop-up closes.
            </Typography>
            <VerificationButton
              token={tokenResponse.token}
              clientId={tokenResponse.clientId}
              configs={getConfig(tokenResponse.clientId, () =>
                handleVerificationComplete()
              )}

            />
          </CardContent>
        </Card>
      )}

      {/* STEP: PROCESSING */}
      {step === 'processing' && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <CircularProgress sx={{ color: headerColor }} />
          <Typography sx={{ mt: 2 }}>Validating your documents...</Typography>
        </Box>
      )}

      {/* STEP: RESULT */}
      {step === 'result' && (
        <Card sx={cardStyle}>
          <CardContent>
            {renderResult()}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                How This Works
              </Typography>
              <Typography>
                1 - You capture a utility bill (or similar) to confirm your
                current residence.
              </Typography>
              <Typography>
                2 - If the first doc is clear, we need an additional proof of
                address for full compliance.
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Why:</Typography>
              <Typography>
                Renting a property is a big commitment. We verify your address
                thoroughly to protect both you and the landlord.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default MultiStageAddress

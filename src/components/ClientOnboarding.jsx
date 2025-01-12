import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  ListItem,
  List,
} from '@mui/material'
import axios from 'axios'
import VerificationButton from './VerificationButton'
import ClientChecksList from './ClientChecksList'

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }

  return true
}

const ClientOnboarding = ({ getConfigs }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/client-token`,
        {
          type: 'person',
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }
      )

      setResponse(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAnother = () => {
    setResponse(null)
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
    })
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      {isEmpty(response) ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Create Client
          </Typography>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Client Details
              </Typography>
              <List sx={{ mt: 2 }}>
                <ListItem>
                  <Box sx={{ display: 'flex', gap: 5 }}>
                    <Typography variant="subtitle1" sx={{ flex: 1 }}>
                      Email:
                    </Typography>
                    <Typography variant="body1">{formData.email}</Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box sx={{ display: 'flex', gap: 5 }}>
                    <Typography variant="subtitle1" sx={{ flex: 1 }}>
                      First Name:
                    </Typography>
                    <Typography variant="body1">
                      {formData.firstName}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box sx={{ display: 'flex', gap: 5 }}>
                    <Typography variant="subtitle1" sx={{ flex: 1 }}>
                      Last Name:
                    </Typography>
                    <Typography variant="body1">{formData.lastName}</Typography>
                  </Box>
                </ListItem>
              </List>
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {console.log('getConfigs', getConfigs)}
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box display="flex" flexDirection="column">
                    <VerificationButton
                      token={response.token}
                      clientId={response.clientId}
                      label="Start standard verification"
                      configs={getConfigs ? getConfigs(response.clientId) : {}}
                    />
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCreateAnother}
                >
                  Create Another User
                </Button>
              </Box>
            </CardContent>
          </Card>
          <ClientChecksList clientId={response.clientId} />
        </Box>
      )}
    </Box>
  )
}

export default ClientOnboarding

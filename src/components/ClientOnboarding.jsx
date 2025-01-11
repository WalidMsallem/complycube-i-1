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
import { standardConfig } from '../integration-config/standard'
import { customConfig1 } from '../integration-config/custom1'
import { customConfig2 } from '../integration-config/custom2'

const ClientOnboarding = () => {
  const [showVerifyButton, setShowVerifyButton] = useState(true)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiTURNd1kyWmhOVFV6TUdFelpXUTJNemMyT0dVNE1EQTFObVZtTVdVeU5tRmlZelZtTW1FNVl6WTRZVGhpTTJJd00yWTNaV1kyWmpReE5qVmhaV05oTWpFeFptVTNNVGM0TlRJMk56QmhZbVE1WkdGbU9EZzNNVEprTXpWaU56ZGxaV1kzT1dKaVpEYzBZamt5TnpkaU9UTmhOMkZqWW1GbVpqWmtaalZrTWpjMU5XWXhNVGd6TXpJd1kyTXpPR1UyTXpneVkyVmtOV0V6TXpnek1qWXhPVEV6TWpZNFkyWXhNR1E1WWpnMk9UVTNaamxqTldGaU9XUTBZakJpTXpoa01XUXpNbU13TW1NeU5UQTVZekl5T0dVMlpEZ3dNemM1TjJJeE5XVXlNRGM0Wm1ReE5qVmtaRGt3TUdVeU56aG1PVGxrWmpJME56VTNOVE13TlRabE9XTmpOVFEzTkdWbU9HUTFOVGxqWlRKbVkyRmxPR0ZqT1RreU0ySXpZak5sIiwidXJscyI6eyJhcGkiOiJodHRwczovL2FwaS5jb21wbHljdWJlLmNvbSIsInN5bmMiOiJ3c3M6Ly94ZHMuY29tcGx5Y3ViZS5jb20iLCJjcm9zc0RldmljZSI6Imh0dHBzOi8veGQuY29tcGx5Y3ViZS5jb20ifSwib3B0aW9ucyI6eyJoaWRlQ29tcGx5Q3ViZUxvZ28iOmZhbHNlLCJlbmFibGVDdXN0b21Mb2dvIjp0cnVlLCJlbmFibGVUZXh0QnJhbmQiOnRydWUsImVuYWJsZUN1c3RvbUNhbGxiYWNrcyI6dHJ1ZSwiZW5hYmxlTmZjIjpmYWxzZSwiaWRlbnRpdHlDaGVja0xpdmVuZXNzQXR0ZW1wdHMiOjUsImRvY3VtZW50SW5mbGlnaHRUZXN0QXR0ZW1wdHMiOjIsIm5mY1JlYWRBdHRlbXB0cyI6NSwiZW5hYmxlQWRkcmVzc0F1dG9jb21wbGV0ZSI6dHJ1ZSwiZW5hYmxlV2hpdGVMYWJlbGluZyI6ZmFsc2V9LCJpYXQiOjE3MzY2MTAzODIsImV4cCI6MTczNjYxMzk4Mn0.kfV04m_Sq2hvF7__40I9neyhsVXDJMneoSIxcylMoTU',
    clientId: '6782924dd4773c00082cea39',
  })
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
    setShowVerifyButton(true)
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
    })
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      {!response ? (
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
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box display="flex" flexDirection="column">
                    <Typography>run basic check</Typography>
                    <VerificationButton
                      token={response.token}
                      clientId={response.clientId}
                      setShowVerifyButton={setShowVerifyButton}
                      label="Start standard verification"
                      config={standardConfig(response.clientId)}
                    />
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Typography>run custom checks</Typography>
                    <VerificationButton
                      token={response.token}
                      clientId={response.clientId}
                      setShowVerifyButton={setShowVerifyButton}
                      label="Start custom verification1"
                      config={customConfig1()}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    {/* <Typography>Test custom checks</Typography> */}
                    <VerificationButton
                      token={response.token}
                      clientId={response.clientId}
                      setShowVerifyButton={setShowVerifyButton}
                      label="Start verification in arabic"
                      config={customConfig2()}
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

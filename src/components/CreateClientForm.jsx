import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import axios from 'axios'
import ComplyCubeIntegration from './ComplyCubeIntegration'

const CreateClientForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
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
      {!response ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Create and verify Client
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
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Client Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography variant="body1">{response.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">First Name:</Typography>
                <Typography variant="body1">
                  {response.personDetails.firstName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Last Name:</Typography>
                <Typography variant="body1">
                  {response.personDetails.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}
            >
              <ComplyCubeIntegration token={response.token} />
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
      )}
    </Box>
  )
}

export default CreateClientForm

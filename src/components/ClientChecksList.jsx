import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import axios from 'axios'

const ClientChecksList = ({ clientId }) => {
  const [checks, setChecks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })

  const fetchChecks = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/checks`,
        {
          params: {
            clientId,
            page: pagination.page,
            pageSize: pagination.pageSize,
          },
        }
      )
      const { page, pageSize, totalItems, pages, items } = response.data

      items && setChecks(items)
      setPagination(page, pageSize, totalItems, pages)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch checks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchChecks()
    }
  }, [clientId, pagination])

  const handleNextPage = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
  }

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
    }
  }

  const handleRefresh = () => {
    if (clientId) {
      fetchChecks()
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Client Checks
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="outlined" onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Outcome</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checks.map((check) => (
                  <TableRow key={check.id}>
                    <TableCell>{check.type}</TableCell>
                    <TableCell>{check.status}</TableCell>
                    <TableCell>{check.result?.outcome || 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(check.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={handlePreviousPage}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <Button variant="outlined" onClick={handleNextPage}>
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ClientChecksList

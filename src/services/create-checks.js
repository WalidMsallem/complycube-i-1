import axios from 'axios'

export const createChecks = async (checks, clientId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/create-checks`,
      {
        checks,
        clientId,
      }
    )
    return response.data
    // setResponse(res.data)
  } catch (err) {
    console.error(err.response?.data?.message || 'Something went wrong')
    // setError(err.response?.data?.message || 'Something went wrong')
  }
}

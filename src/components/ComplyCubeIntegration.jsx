import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ComplyCubeIntegration = ({ clientId }) => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/generate-token`,
          { clientId },
          {
            headers: {
              Authorization: process.env.REACT_APP_COMPLYCUBE_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        )
        setToken(response.data.token)
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  const startVerification = () => {
    if (token) {
      window.ComplyCube.mount({
        token: token,
        onComplete: function (data) {
          console.log('Capture complete', data)
        },
      })
    }
  }

  return (
    <>
      <div id="complycube-mount"></div>

      <button onClick={() => startVerification()}>Start verification</button>
    </>
  )
}

export default ComplyCubeIntegration

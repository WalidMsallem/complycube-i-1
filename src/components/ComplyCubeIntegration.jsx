import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ComplyCubeIntegration = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/generate-token'
        )
        setToken(response.data.token)
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  //   useEffect(() => {
  //     if (token) {
  //       const initComplyCube = async () => {
  //         // const complycube = new window.ComplyCube({ token });
  //         // complycube
  //         //   .render("#complycube-container")
  //         //   .then(() => console.log("ComplyCube WebSDK rendered"))
  //         //   .catch((err) => console.error("Error rendering WebSDK", err));

  //         window.ComplyCube.mount({
  //           token:
  //             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiWVRJNVpUY3pNR1ExWW1GbU9EUTBNamxtWXpVM1kyRTRNbVV6T1dGbE1EQTBNalF5TWpnNFlUUTNNemsxTUdRNVpUYzNPVFpqWlRaaVpqSTNNV05pWVdFellqVmlOak0xT0RCaE16RmtZamc1TldSaE5UYzJNelZoWWpSalpqYzFZekJpTmpVeE5URTNNekZqT1RFMU9ETTRPVFJqT1dSaU16STRNVGhpWldJd09USXhaR0poTVdZM1lqSTJZVE00WmpZNE1qZGtZelk1TmpFek9HTTFaRGhrTTJJM1pqQTJNV1ZoWTJFek16VXlabUkyWkRBNFptUTNaR1U0TkRVek5qVmlNR0U0TVRjeFpXTm1Nek00TVRrMU1tUmtZemhqT0dWak56SmhNak01TlRoaFpEazVNekl3TkRZM1lqbGhOVE5qWkdOa1pqaGtaV0psTm1ZME16Y3pNak01TUdNMlpEVTBaV0ZoT1RreFltWmlOamd3Wm1NM01EZ3laamM1IiwidXJscyI6eyJhcGkiOiJodHRwczovL2FwaS5jb21wbHljdWJlLmNvbSIsInN5bmMiOiJ3c3M6Ly94ZHMuY29tcGx5Y3ViZS5jb20iLCJjcm9zc0RldmljZSI6Imh0dHBzOi8veGQuY29tcGx5Y3ViZS5jb20ifSwib3B0aW9ucyI6eyJoaWRlQ29tcGx5Q3ViZUxvZ28iOmZhbHNlLCJlbmFibGVDdXN0b21Mb2dvIjp0cnVlLCJlbmFibGVUZXh0QnJhbmQiOnRydWUsImVuYWJsZUN1c3RvbUNhbGxiYWNrcyI6dHJ1ZSwiZW5hYmxlTmZjIjpmYWxzZSwiaWRlbnRpdHlDaGVja0xpdmVuZXNzQXR0ZW1wdHMiOjUsImRvY3VtZW50SW5mbGlnaHRUZXN0QXR0ZW1wdHMiOjIsIm5mY1JlYWRBdHRlbXB0cyI6NSwiZW5hYmxlQWRkcmVzc0F1dG9jb21wbGV0ZSI6dHJ1ZSwiZW5hYmxlV2hpdGVMYWJlbGluZyI6ZmFsc2V9LCJpYXQiOjE3MzY1MDE4MDksImV4cCI6MTczNjUwNTQwOX0.U-7jnnYQyNe4gLJhZVnhdzXjRYgn7IU1c2ghztrPBfw',
  //           onComplete: function (data) {
  //             console.log('Capture complete', data)
  //           },
  //         })
  //       }

  //       initComplyCube()
  //     }
  //   }, [token])

  const startVerification = () => {
    if (token) {
      window.ComplyCube.mount({
        token: token,
        //   token:
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiWVRJNVpUY3pNR1ExWW1GbU9EUTBNamxtWXpVM1kyRTRNbVV6T1dGbE1EQTBNalF5TWpnNFlUUTNNemsxTUdRNVpUYzNPVFpqWlRaaVpqSTNNV05pWVdFellqVmlOak0xT0RCaE16RmtZamc1TldSaE5UYzJNelZoWWpSalpqYzFZekJpTmpVeE5URTNNekZqT1RFMU9ETTRPVFJqT1dSaU16STRNVGhpWldJd09USXhaR0poTVdZM1lqSTJZVE00WmpZNE1qZGtZelk1TmpFek9HTTFaRGhrTTJJM1pqQTJNV1ZoWTJFek16VXlabUkyWkRBNFptUTNaR1U0TkRVek5qVmlNR0U0TVRjeFpXTm1Nek00TVRrMU1tUmtZemhqT0dWak56SmhNak01TlRoaFpEazVNekl3TkRZM1lqbGhOVE5qWkdOa1pqaGtaV0psTm1ZME16Y3pNak01TUdNMlpEVTBaV0ZoT1RreFltWmlOamd3Wm1NM01EZ3laamM1IiwidXJscyI6eyJhcGkiOiJodHRwczovL2FwaS5jb21wbHljdWJlLmNvbSIsInN5bmMiOiJ3c3M6Ly94ZHMuY29tcGx5Y3ViZS5jb20iLCJjcm9zc0RldmljZSI6Imh0dHBzOi8veGQuY29tcGx5Y3ViZS5jb20ifSwib3B0aW9ucyI6eyJoaWRlQ29tcGx5Q3ViZUxvZ28iOmZhbHNlLCJlbmFibGVDdXN0b21Mb2dvIjp0cnVlLCJlbmFibGVUZXh0QnJhbmQiOnRydWUsImVuYWJsZUN1c3RvbUNhbGxiYWNrcyI6dHJ1ZSwiZW5hYmxlTmZjIjpmYWxzZSwiaWRlbnRpdHlDaGVja0xpdmVuZXNzQXR0ZW1wdHMiOjUsImRvY3VtZW50SW5mbGlnaHRUZXN0QXR0ZW1wdHMiOjIsIm5mY1JlYWRBdHRlbXB0cyI6NSwiZW5hYmxlQWRkcmVzc0F1dG9jb21wbGV0ZSI6dHJ1ZSwiZW5hYmxlV2hpdGVMYWJlbGluZyI6ZmFsc2V9LCJpYXQiOjE3MzY1MDE4MDksImV4cCI6MTczNjUwNTQwOX0.U-7jnnYQyNe4gLJhZVnhdzXjRYgn7IU1c2ghztrPBfw',
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

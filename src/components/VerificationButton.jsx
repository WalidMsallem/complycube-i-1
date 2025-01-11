import React from 'react'
import axios from 'axios'

const ComplyCubeIntegration = ({ token, clientId, setShowVerifyButton }) => {
  const startVerification = () => {
    if (token) {
      window.ComplyCube.mount({
        token: token,
        onComplete: async function (data) {
          console.log('Capture complete', data)
          try {
            const checks = [
              {
                documentId: data.documentCapture.documentId,
                type: 'proof_of_address_check',
              },
              {
                type: 'document_check',
                documentId: data.documentCapture.livePhotoId,
              },
              {
                livePhotoId: data.faceCapture.documentId,
                documentId: data.documentCapture.documentId,
                type: 'identity_check',
              },
              { type: 'extensive_screening_check' },
            ]
            const response = await axios.post(
              `${process.env.REACT_APP_API_ENDPOINT}/api/checks`,
              {
                checks,
                clientId,
              }
            )
            return response.data
          } catch (e) {
            console.error(e.response?.data?.message || 'Something went wrong')
          }
        },
        onModalClose: function () {
          setShowVerifyButton(false)
          window.ComplyCube.updateSettings({ isModalOpen: false })
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
